// Generator filmów „Twój bieg”.
// Użycie:
//   node scripts/generuj.mjs --wyniki wyniki.xlsx --wydarzenie wydarzenie.json --wyjscie out/moj-bieg
// Opcje: --tylko 5 (tylko pierwsze 5 filmów), --nadpisz (renderuj ponownie istniejące),
//        --jakosc 23 (CRF: wyżej = mniejszy plik), --przegladarka <ścieżka do chrome-headless-shell>
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import ExcelJS from "exceljs";
import { bundle } from "@remotion/bundler";
import { openBrowser, renderMedia, selectComposition } from "@remotion/renderer";

// ---------- argumenty ----------
const argv = process.argv.slice(2);
const arg = (nazwa, dom) => {
  const i = argv.indexOf(`--${nazwa}`);
  if (i === -1) return dom;
  const v = argv[i + 1];
  return v === undefined || v.startsWith("--") ? true : v;
};
const plikWynikow = arg("wyniki");
const plikWydarzenia = arg("wydarzenie");
const katalog = path.resolve(arg("wyjscie", "out/filmy"));
const tylko = arg("tylko") ? Number(arg("tylko")) : Infinity;
const nadpisz = Boolean(arg("nadpisz", false));
const crf = Number(arg("jakosc", 23));
const przegladarka = arg("przegladarka", process.env.REMOTION_BROWSER || undefined);
if (!plikWynikow || !plikWydarzenia) {
  console.error("Podaj --wyniki <plik.xlsx|csv> i --wydarzenie <plik.json>");
  process.exit(1);
}
const wydarzenie = JSON.parse(fs.readFileSync(plikWydarzenia, "utf8"));

// ---------- odczyt pliku z wynikami ----------
const norm = (s) =>
  String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/[^a-z0-9]/g, "");

// Różne firmy pomiaru czasu różnie nazywają kolumny. Tu są znane warianty.
const ALIASY = {
  numer: ["nr", "numer", "nrstartowy", "numerstartowy", "bib", "startnr", "nrstart"],
  imie: ["imie", "firstname", "imiona"],
  nazwisko: ["nazwisko", "lastname", "surname"],
  imieNazwisko: ["imieinazwisko", "imienazwisko", "nazwiskoimie", "nazwiskoiimie", "zawodnik", "uczestnik", "name"],
  czas: ["czasnetto", "netto", "nettime", "czas", "wynik", "czaskoncowy", "czasbrutto", "brutto", "time", "guntime"],
  miejsce: ["miejsce", "msc", "mce", "m", "miejsceopen", "open", "mscopen", "place", "pos", "lp"],
  kategoria: ["kategoria", "kat", "katwiek", "kategoriawiekowa", "category", "cat"],
  miejsceKategoria: ["miejscewkategorii", "msckat", "mscwkat", "mkat", "mcekat", "miejscekat", "catplace", "msckategoria"],
};

const tekstKomorki = (v) => {
  if (v === null || v === undefined) return "";
  if (v instanceof Date) return v;
  if (typeof v === "object") {
    if ("result" in v) return tekstKomorki(v.result);
    if ("text" in v) return String(v.text);
    if ("richText" in v) return v.richText.map((r) => r.text).join("");
  }
  return v;
};

// CSV: sam wykrywa kodowanie (UTF-8 albo polskie Windows-1250) i separator (; , albo tabulator)
const czytajCsv = (plik) => {
  const bajty = fs.readFileSync(plik);
  let tekst;
  try { tekst = new TextDecoder("utf-8", { fatal: true }).decode(bajty); }
  catch { tekst = new TextDecoder("windows-1250").decode(bajty); }
  tekst = tekst.replace(/^\uFEFF/, "");
  const probka = tekst.split(/\r?\n/).slice(0, 10).join("\n");
  const sep = [";", "\t", ","].map((z) => [z, probka.split(z).length]).sort((a, b) => b[1] - a[1])[0][0];
  const wiersze = [];
  let wiersz = [], pole = "", cudzyslow = false;
  for (let i = 0; i < tekst.length; i++) {
    const c = tekst[i];
    if (cudzyslow) {
      if (c === '"' && tekst[i + 1] === '"') { pole += '"'; i++; }
      else if (c === '"') cudzyslow = false;
      else pole += c;
    } else if (c === '"') cudzyslow = true;
    else if (c === sep) { wiersz.push(pole); pole = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && tekst[i + 1] === "\n") i++;
      wiersz.push(pole); pole = "";
      if (wiersz.some((x) => x.trim() !== "")) wiersze.push(wiersz);
      wiersz = [];
    } else pole += c;
  }
  wiersz.push(pole);
  if (wiersz.some((x) => x.trim() !== "")) wiersze.push(wiersz);
  return wiersze.map((w) => w.map((x) => x.trim()));
};

const czytajWiersze = async (plik) => {
  if (plik.toLowerCase().endsWith(".csv") || plik.toLowerCase().endsWith(".txt")) return czytajCsv(plik);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(plik);
  const ws = wb.worksheets[0];
  const wiersze = [];
  ws.eachRow({ includeEmpty: false }, (row) => wiersze.push(row.values.slice(1).map(tekstKomorki)));
  return wiersze;
};

// Czas z Excela może być tekstem, ułamkiem doby albo datą
const naSekundy = (v) => {
  if (v instanceof Date) return v.getUTCHours() * 3600 + v.getUTCMinutes() * 60 + v.getUTCSeconds();
  if (typeof v === "number") return v < 1 ? Math.round(v * 86400) : Math.round(v);
  const s = String(v).trim().replace(",", ".");
  if (!/^\d{1,2}(:\d{1,2}){1,2}(\.\d+)?$/.test(s)) return null;
  const czesci = s.split(":").map(Number);
  return Math.floor(czesci.reduce((a, x) => a * 60 + x, 0));
};
const formatCzas = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sek = s % 60;
  const p = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${p(m)}:${p(sek)}` : `${p(m)}:${p(sek)}`;
};
const formatTempo = (sekNaKm) => `${Math.floor(sekNaKm / 60)}:${String(Math.round(sekNaKm % 60)).padStart(2, "0")} min/km`;

const wiersze = await czytajWiersze(plikWynikow);
// wiersz nagłówka = pierwszy, w którym rozpoznajemy kolumnę z czasem i co najmniej 2 inne
const znajdzKolumny = (naglowek) => {
  const n = naglowek.map(norm);
  const kol = {};
  for (const [pole, aliasy] of Object.entries(ALIASY)) {
    for (const a of aliasy) {
      const i = n.indexOf(a);
      if (i !== -1 && !Object.values(kol).includes(i)) { kol[pole] = i; break; }
    }
  }
  const miedzyczasy = [];
  naglowek.forEach((h, i) => {
    const t = String(h ?? "");
    const km = t.match(/(\d+(?:[.,]\d+)?)\s*km/i);
    if ((/mi[eę]dzyczas|split/i.test(t) || /^\s*\d+(?:[.,]\d+)?\s*km\s*$/i.test(t)) && i !== kol.czas) {
      miedzyczasy.push({ i, punkt: km ? `${km[1].replace(".", ",")} km` : t.trim() });
    }
  });
  return { kol, miedzyczasy };
};
let start = -1, mapa;
for (let r = 0; r < Math.min(wiersze.length, 30); r++) {
  const m = znajdzKolumny(wiersze[r]);
  const ile = Object.keys(m.kol).length;
  if (m.kol.czas !== undefined && ile >= 3) { start = r; mapa = m; break; }
}
if (start === -1) {
  console.error("Nie znalazłem wiersza z nagłówkami (potrzebna m.in. kolumna z czasem). Sprawdź plik lub dopisz alias w ALIASY.");
  process.exit(1);
}
const { kol, miedzyczasy } = mapa;
console.log("Rozpoznane kolumny:", Object.fromEntries(Object.entries(kol).map(([k, i]) => [k, wiersze[start][i]])));
if (miedzyczasy.length) console.log("Międzyczasy:", miedzyczasy.map((m) => m.punkt).join(", "));

// ---------- przygotowanie danych ----------
const pominiete = [];
const biegacze = [];
for (const w of wiersze.slice(start + 1)) {
  const pobierz = (pole) => (kol[pole] === undefined ? "" : w[kol[pole]]);
  let imie = String(pobierz("imie") || "").trim();
  let nazwisko = String(pobierz("nazwisko") || "").trim();
  if (!imie && kol.imieNazwisko !== undefined) {
    const czesci = String(pobierz("imieNazwisko")).trim().split(/\s+/);
    // w polskich wynikach częściej jest „Nazwisko Imię”
    [nazwisko, imie] = czesci.length > 1 ? [czesci.slice(0, -1).join(" "), czesci.at(-1)] : [czesci[0], ""];
  }
  const numer = String(pobierz("numer") ?? "").trim();
  const sek = naSekundy(pobierz("czas"));
  if (!imie && !nazwisko) continue;
  if (sek === null || sek <= 0) { pominiete.push({ numer, imie, nazwisko, powod: `brak czasu (${pobierz("czas") || "puste"})` }); continue; }
  const mcz = miedzyczasy
    .map((m) => ({ punkt: m.punkt, s: naSekundy(w[m.i]) }))
    .filter((m) => m.s)
    .map((m) => ({ punkt: m.punkt, czas: formatCzas(m.s) }));
  biegacze.push({
    numer, imie, nazwisko, sek,
    kategoria: String(pobierz("kategoria") || "").trim(),
    miejsce: Number(pobierz("miejsce")) || null,
    miejsceKategoria: Number(pobierz("miejsceKategoria")) || null,
    miedzyczasy: mcz,
  });
}
// brakujące miejsca liczymy z czasów
const poCzasie = [...biegacze].sort((a, b) => a.sek - b.sek);
poCzasie.forEach((b, i) => { if (!b.miejsce) b.miejsce = i + 1; });
const wKategorii = {};
for (const b of poCzasie) {
  if (!b.kategoria) continue;
  wKategorii[b.kategoria] = (wKategorii[b.kategoria] ?? 0) + 1;
  if (!b.miejsceKategoria) b.miejsceKategoria = wKategorii[b.kategoria];
}
console.log(`Biegaczy z czasem: ${biegacze.length}, pominiętych: ${pominiete.length}`);
// kontrola danych od organizatora: miejsce większe niż liczba sklasyfikowanych to zwykle błąd w pliku
const podejrzane = biegacze.filter((b) => b.miejsce > biegacze.length || (b.kategoria && b.miejsceKategoria > wKategorii[b.kategoria]));
for (const b of podejrzane) {
  b.uwaga = `sprawdź: miejsce ${b.miejsce}/${biegacze.length}, w kategorii ${b.miejsceKategoria}/${wKategorii[b.kategoria] ?? "-"}`;
  console.warn(`UWAGA nr ${b.numer} ${b.imie} ${b.nazwisko}: ${b.uwaga}`);
}

// ---------- render ----------
fs.mkdirSync(katalog, { recursive: true });
const tag = (s) => norm(s).slice(0, 30);
const doZrobienia = biegacze.slice(0, tylko);

console.log("Przygotowuję szablon…");
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const browser = await openBrowser("chrome", { browserExecutable: przegladarka });

const raport = [];
const t0 = Date.now();
for (const [i, b] of doZrobienia.entries()) {
  const plik = `${b.numer || i + 1}-${tag(b.imie)}-${tag(b.nazwisko)}.mp4`;
  const sciezka = path.join(katalog, plik);
  const props = {
    ...wydarzenie,
    imie: b.imie,
    nazwisko: b.nazwisko,
    numer: b.numer,
    czas: formatCzas(b.sek),
    tempo: wydarzenie.dystansKm ? formatTempo(b.sek / wydarzenie.dystansKm) : "",
    miejsce: b.miejsce,
    uczestnicy: biegacze.length,
    kategoria: b.kategoria || "OPEN",
    miejsceKategoria: b.miejsceKategoria ?? b.miejsce,
    uczestnicyKategoria: b.kategoria ? wKategorii[b.kategoria] : biegacze.length,
    miedzyczasy: [...b.miedzyczasy, { punkt: "Meta", czas: formatCzas(b.sek) }].slice(-4),
  };
  if (fs.existsSync(sciezka) && !nadpisz) {
    raport.push({ ...b, plik, status: "już istniał" });
    continue;
  }
  const t = Date.now();
  try {
    const composition = await selectComposition({ serveUrl, id: "TwojBieg", inputProps: props, puppeteerInstance: browser });
    await renderMedia({ composition, serveUrl, codec: "h264", crf, outputLocation: sciezka, inputProps: props, puppeteerInstance: browser, concurrency: os.cpus().length });
    raport.push({ ...b, plik, status: "ok" });
    const sr = (Date.now() - t0) / (i + 1) / 1000;
    console.log(`[${i + 1}/${doZrobienia.length}] ${plik} – ${((Date.now() - t) / 1000).toFixed(1)} s (zostało ok. ${Math.ceil((sr * (doZrobienia.length - i - 1)) / 60)} min)`);
  } catch (e) {
    raport.push({ ...b, plik, status: `błąd: ${e.message.split("\n")[0]}` });
    console.error(`[${i + 1}] BŁĄD ${plik}: ${e.message.split("\n")[0]}`);
  }
}
await browser.close({ silent: true });

// ---------- raport i strona do pobierania ----------
const csv = [
  "numer;imie;nazwisko;czas;miejsce;kategoria;miejsce_kat;plik;status",
  ...raport.map((r) => [r.numer, r.imie, r.nazwisko, formatCzas(r.sek), r.miejsce, r.kategoria, r.miejsceKategoria, r.plik, r.uwaga ? `${r.status}; ${r.uwaga}` : r.status].join(";")),
  ...pominiete.map((p) => [p.numer, p.imie, p.nazwisko, "", "", "", "", "", `pominięty: ${p.powod}`].join(";")),
].join("\n");
fs.writeFileSync(path.join(katalog, "raport.csv"), "﻿" + csv);

const lista = Object.fromEntries(raport.filter((r) => r.status !== "błąd" && !r.status.startsWith("błąd")).map((r) => [r.numer, r.plik]));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
fs.writeFileSync(path.join(katalog, "index.html"), `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(wydarzenie.bieg)} – Twój film</title>
<style>
:root{--akcent:${esc(wydarzenie.kolorAkcent)};--tlo:${esc(wydarzenie.kolorTlo)}}
body{margin:0;min-height:100vh;background:var(--tlo);color:#fff;font-family:Inter,system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;padding:32px 16px;box-sizing:border-box}
h1{font-size:28px;text-align:center;margin:0 0 4px}p{color:#bbb;margin:0 0 24px;text-align:center}
form{display:flex;gap:8px;width:100%;max-width:420px}
input{flex:1;font-size:20px;padding:14px;border-radius:12px;border:0}
button,a.btn{white-space:nowrap;font-size:18px;padding:14px 20px;border-radius:12px;border:0;background:var(--akcent);color:#fff;font-weight:700;text-decoration:none;cursor:pointer}
video{width:100%;max-width:360px;border-radius:16px;margin:24px 0 16px}
#blad{color:#ff8a80;margin-top:16px}
</style></head><body>
<h1>${esc(wydarzenie.bieg)}</h1><p>${esc(wydarzenie.dystans)} · ${esc(wydarzenie.data)}</p>
<form id="f"><input id="nr" inputmode="numeric" placeholder="Twój numer startowy" required><button>Pokaż film</button></form>
<div id="blad"></div><div id="wynik" style="display:flex;flex-direction:column;align-items:center"></div>
<script>
const filmy=${JSON.stringify(lista)};
document.getElementById("f").addEventListener("submit",e=>{e.preventDefault();
const nr=document.getElementById("nr").value.trim(),plik=filmy[nr],w=document.getElementById("wynik"),b=document.getElementById("blad");
w.innerHTML="";b.textContent="";
if(!plik){b.textContent="Nie ma filmu dla tego numeru. Sprawdź numer albo napisz do organizatora.";return}
w.innerHTML='<video controls playsinline src="'+encodeURI(plik)+'"></video><a class="btn" download href="'+encodeURI(plik)+'">Pobierz film</a>';});
</script></body></html>`);

const ok = raport.filter((r) => r.status === "ok").length;
console.log(`\nGotowe: ${ok} nowych filmów w ${((Date.now() - t0) / 60000).toFixed(1)} min. Raport: ${path.join(katalog, "raport.csv")}, strona: ${path.join(katalog, "index.html")}`);
