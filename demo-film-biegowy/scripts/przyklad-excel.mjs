// Tworzy przykładowy plik z wynikami, taki jak eksport od firmy pomiaru czasu.
// Dane są zmyślone. Nagłówki celowo są „brudne”, żeby sprawdzić rozpoznawanie kolumn.
import ExcelJS from "exceljs";

const wyjscie = process.argv[2] ?? "przyklad/wyniki.xlsx";
const imiona = [
  ["Anna", "Nowak", "K20"], ["Piotr", "Kowalski", "M20"], ["Marek", "Wiśniewski", "M40"],
  ["Ewa", "Wójcik", "K30"], ["Tomasz", "Kamiński", "M30"], ["Kasia", "Lewandowska", "K20"],
  ["Jan", "Zieliński", "M50"], ["Ola", "Szymańska", "K40"], ["Paweł", "Woźniak", "M20"],
  ["Magda", "Dąbrowska", "K30"], ["Łukasz", "Kozłowski", "M30"], ["Zofia", "Jankowska", "K50"],
];
const wb = new ExcelJS.Workbook();
const ws = wb.addWorksheet("Wyniki");
ws.addRow(["Wyniki – Bieg Demo Częstochowa 10 km"]);
ws.addRow([]);
ws.addRow(["M-ce", "Nr startowy", "Imię", "Nazwisko", "Kat.", "Czas netto", "Międzyczas 5 km"]);
let czas = 37 * 60 + 12;
let miejsce = 0;
imiona.forEach(([imie, nazwisko, kat], i) => {
  czas += 60 + ((i * 97) % 180);
  const s = czas;
  const fmt = (t) => `${Math.floor(t / 3600)}:${String(Math.floor((t % 3600) / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
  const wynik = i === 10 ? "DNF" : fmt(s);
  ws.addRow([i === 10 ? "" : ++miejsce, 100 + i * 7, imie, nazwisko, kat, wynik, i === 10 ? "" : fmt(Math.round(s * 0.49))]);
});
await wb.xlsx.writeFile(wyjscie);
console.log(`Zapisano ${wyjscie}`);
