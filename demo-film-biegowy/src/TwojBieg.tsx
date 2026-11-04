import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type DaneBiegacza = {
  imie: string;
  nazwisko: string;
  numer: number | string;
  bieg: string;
  dystans: string;
  data: string;
  czas: string;
  tempo: string;
  miejsce: number;
  uczestnicy: number;
  kategoria: string;
  miejsceKategoria: number;
  uczestnicyKategoria: number;
  miedzyczasy: { punkt: string; czas: string }[];
  sponsor: string;
  hashtag: string;
  napisMedal?: string;
  kolorAkcent: string;
  kolorTlo: string;
};

const FONT = "Inter, 'DejaVu Sans', sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const naSekundy = (czas: string) =>
  czas.split(":").map(Number).reduce((acc, v) => acc * 60 + v, 0);

const formatCzas = (s: number, zGodzinami: boolean) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sek = Math.floor(s % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return zGodzinami ? `${h}:${pad(m)}:${pad(sek)}` : `${pad(m)}:${pad(sek)}`;
};

// Wejście i wyjście sceny: płynne pojawienie się i zniknięcie
const useScena = (dlugosc: number) => {
  const frame = useCurrentFrame();
  const wejscie = interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const wyjscie = interpolate(frame, [dlugosc - 10, dlugosc], [1, 0], { ...clamp, easing: Easing.in(Easing.cubic) });
  return { frame, alpha: Math.min(wejscie, wyjscie), przesuniecie: (1 - wejscie) * 60 + (1 - wyjscie) * -60 };
};

const rgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

// Tło liczone gradientami: wygląda jak rozmyte plamy, a renderuje się wielokrotnie szybciej niż filter: blur
const Tlo: React.FC<{ akcent: string; tlo: string }> = ({ akcent, tlo }) => {
  const frame = useCurrentFrame();
  const x1 = 300 + Math.sin(frame / 40) * 180;
  const y1 = 500 + Math.cos(frame / 55) * 220;
  const x2 = 800 + Math.cos(frame / 47) * 160;
  const y2 = 1450 + Math.sin(frame / 38) * 200;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: tlo,
        backgroundImage: `radial-gradient(circle 650px at ${x1}px ${y1}px, ${rgba(akcent, 0.32)}, ${rgba(akcent, 0)}), radial-gradient(circle 600px at ${x2}px ${y2}px, rgba(59, 91, 255, 0.26), rgba(59, 91, 255, 0))`,
        overflow: "hidden",
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ position: "absolute", left: -200, right: -200, top: 1700 + i * 34 - ((frame * 2) % 34), height: 2, background: "rgba(255,255,255,0.05)", transform: "rotate(-8deg)" }} />
      ))}
    </AbsoluteFill>
  );
};

const GornyPasek: React.FC<{ d: DaneBiegacza }> = ({ d }) => {
  const frame = useCurrentFrame();
  const alpha = interpolate(frame, [70, 85], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", top: 90, left: 80, right: 80, display: "flex", justifyContent: "space-between", alignItems: "center", opacity: alpha, fontFamily: FONT, color: "rgba(255,255,255,0.75)", fontSize: 30, fontWeight: 600, letterSpacing: 1 }}>
      <span>{d.bieg.toUpperCase()}</span>
      <span style={{ color: d.kolorAkcent }}>{d.dystans.toUpperCase()}</span>
    </div>
  );
};

const PasekPostepu: React.FC<{ akcent: string }> = ({ akcent }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, height: 10, width: `${(frame / durationInFrames) * 100}%`, background: akcent }} />
  );
};

const PasekSponsora: React.FC<{ d: DaneBiegacza }> = ({ d }) => (
  <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, fontFamily: FONT, color: "rgba(255,255,255,0.6)", fontSize: 26, fontWeight: 500 }}>
    <span>partner biegu</span>
    <span style={{ padding: "12px 28px", border: "2px solid rgba(255,255,255,0.35)", borderRadius: 14, color: "white", fontWeight: 800, letterSpacing: 2 }}>{d.sponsor}</span>
  </div>
);

// 1. Intro
const Intro: React.FC<{ d: DaneBiegacza; dl: number }> = ({ d, dl }) => {
  const { frame, alpha, przesuniecie } = useScena(dl);
  const { fps } = useVideoConfig();
  const skala = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: alpha, transform: `translateY(${przesuniecie}px)`, fontFamily: FONT, color: "white" }}>
      <div style={{ width: 260, height: 260, borderRadius: "50%", border: `8px solid ${d.kolorAkcent}`, display: "flex", justifyContent: "center", alignItems: "center", transform: `scale(${skala})`, fontSize: 34, fontWeight: 800, textAlign: "center", lineHeight: 1.1 }}>
        LOGO<br />BIEGU
      </div>
      <div style={{ marginTop: 70, fontSize: 88, fontWeight: 900, textAlign: "center", lineHeight: 1.0, padding: "0 60px" }}>{d.bieg}</div>
      <div style={{ marginTop: 30, fontSize: 40, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{d.dystans} · {d.data}</div>
    </AbsoluteFill>
  );
};

// 2. Imię biegacza
const Imie: React.FC<{ d: DaneBiegacza; dl: number }> = ({ d, dl }) => {
  const { frame, alpha } = useScena(dl);
  const { fps } = useVideoConfig();
  const wjazd = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  const linia = interpolate(frame, [10, 35], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px", opacity: alpha, fontFamily: FONT, color: "white" }}>
      <div style={{ fontSize: 56, fontWeight: 600, color: d.kolorAkcent, letterSpacing: 4 }}>BRAWO,</div>
      <div style={{ fontSize: 190, fontWeight: 900, lineHeight: 0.95, transform: `translateX(${(1 - wjazd) * -700}px)` }}>{d.imie.toUpperCase()}</div>
      <div style={{ fontSize: 110, fontWeight: 300, lineHeight: 1.1, transform: `translateX(${(1 - wjazd) * 700}px)`, color: "rgba(255,255,255,0.85)" }}>{d.nazwisko}</div>
      <div style={{ marginTop: 40, height: 8, width: `${linia * 100}%`, background: d.kolorAkcent, borderRadius: 4 }} />
      <div style={{ marginTop: 40, display: "inline-flex", alignSelf: "flex-start", padding: "14px 34px", borderRadius: 999, background: "rgba(255,255,255,0.1)", fontSize: 42, fontWeight: 700 }}>nr startowy {d.numer}</div>
    </AbsoluteFill>
  );
};

// 3. Czas
const Czas: React.FC<{ d: DaneBiegacza; dl: number }> = ({ d, dl }) => {
  const { frame, alpha, przesuniecie } = useScena(dl);
  const { fps } = useVideoConfig();
  const sekundy = naSekundy(d.czas);
  const postep = interpolate(frame, [8, 75], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const zGodzinami = sekundy >= 3600;
  const pulse = spring({ frame: frame - 75, fps, config: { damping: 8, mass: 0.6 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: alpha, transform: `translateY(${przesuniecie}px)`, fontFamily: FONT, color: "white" }}>
      <div style={{ fontSize: 50, fontWeight: 700, letterSpacing: 8, color: "rgba(255,255,255,0.7)" }}>TWÓJ CZAS</div>
      <div style={{ fontSize: zGodzinami ? 200 : 260, fontWeight: 900, fontVariantNumeric: "tabular-nums", letterSpacing: -6, transform: `scale(${1 + interpolate(pulse, [0, 1], [0, 0.05]) * (frame < 95 ? 1 : 0)})` }}>
        {formatCzas(Math.round(sekundy * postep), zGodzinami)}
      </div>
      <div style={{ marginTop: 20, padding: "18px 40px", borderRadius: 20, background: d.kolorAkcent, fontSize: 46, fontWeight: 800, opacity: interpolate(frame, [70, 85], [0, 1], clamp), transform: `translateY(${interpolate(frame, [70, 85], [30, 0], clamp)}px)` }}>
        tempo {d.tempo}
      </div>
    </AbsoluteFill>
  );
};

// 4. Trasa i międzyczasy
const TRASA = "M 140 520 C 140 300, 360 180, 520 260 S 820 420, 900 250 S 980 80, 760 90 S 380 120, 300 330 S 520 600, 760 560 S 960 600, 940 700";
const Miedzyczasy: React.FC<{ d: DaneBiegacza; dl: number }> = ({ d, dl }) => {
  const { frame, alpha } = useScena(dl);
  const { fps } = useVideoConfig();
  const rysowanie = interpolate(frame, [5, 70], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const DL = 3200;
  return (
    <AbsoluteFill style={{ opacity: alpha, fontFamily: FONT, color: "white", padding: "220px 80px 0" }}>
      <div style={{ fontSize: 50, fontWeight: 700, letterSpacing: 8, color: "rgba(255,255,255,0.7)" }}>TWOJA TRASA</div>
      <svg width={920} height={760} viewBox="80 40 920 720" style={{ marginTop: 20 }}>
        <path d={TRASA} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={22} strokeLinecap="round" />
        <path d={TRASA} fill="none" stroke={rgba(d.kolorAkcent, 0.3)} strokeWidth={48} strokeLinecap="round" strokeDasharray={DL} strokeDashoffset={DL * (1 - rysowanie)} />
        <path d={TRASA} fill="none" stroke={d.kolorAkcent} strokeWidth={22} strokeLinecap="round" strokeDasharray={DL} strokeDashoffset={DL * (1 - rysowanie)} />
        <circle cx={140} cy={520} r={26} fill="white" />
        <text x={140} y={600} fill="white" fontSize={34} fontWeight={700} textAnchor="middle" fontFamily={FONT}>START</text>
        <circle cx={940} cy={700} r={30} fill={d.kolorAkcent} opacity={rysowanie > 0.97 ? 1 : 0} />
        <text x={940} y={650} fill="white" fontSize={34} fontWeight={700} textAnchor="middle" fontFamily={FONT} opacity={rysowanie > 0.97 ? 1 : 0}>META</text>
      </svg>
      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 22 }}>
        {d.miedzyczasy.map((m, i) => {
          const w = spring({ frame: frame - 20 - i * 10, fps, config: { damping: 15 } });
          return (
            <div key={m.punkt} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 36px", borderRadius: 20, background: i === d.miedzyczasy.length - 1 ? d.kolorAkcent : "rgba(255,255,255,0.08)", opacity: w, transform: `translateX(${(1 - w) * 300}px)`, fontSize: 48, fontWeight: 700 }}>
              <span>{m.punkt}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{m.czas}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 5. Miejsca
const Licznik: React.FC<{ etykieta: string; wartosc: number; z: number; opoznienie: number; akcent: string }> = ({ etykieta, wartosc, z, opoznienie, akcent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame - opoznienie, [0, 40], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const w = spring({ frame: frame - opoznienie, fps, config: { damping: 14 } });
  // licznik spada od liczby uczestników do miejsca, jak w wyścigu
  const pokaz = Math.round(z - (z - wartosc) * p);
  return (
    <div style={{ opacity: w, transform: `scale(${0.8 + w * 0.2})`, textAlign: "center" }}>
      <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: 6, color: "rgba(255,255,255,0.7)" }}>{etykieta}</div>
      <div style={{ fontSize: 230, fontWeight: 900, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {pokaz.toLocaleString("pl-PL")}<span style={{ fontSize: 80, color: akcent }}>.</span>
      </div>
      <div style={{ fontSize: 44, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>na {z.toLocaleString("pl-PL")}</div>
    </div>
  );
};
const Miejsca: React.FC<{ d: DaneBiegacza; dl: number }> = ({ d, dl }) => {
  const { alpha, przesuniecie } = useScena(dl);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 90, opacity: alpha, transform: `translateY(${przesuniecie}px)`, fontFamily: FONT, color: "white" }}>
      <Licznik etykieta="MIEJSCE OPEN" wartosc={d.miejsce} z={d.uczestnicy} opoznienie={4} akcent={d.kolorAkcent} />
      <Licznik etykieta={`KATEGORIA ${d.kategoria}`} wartosc={d.miejsceKategoria} z={d.uczestnicyKategoria} opoznienie={22} akcent={d.kolorAkcent} />
    </AbsoluteFill>
  );
};

// 6. Finał z medalem
const Final: React.FC<{ d: DaneBiegacza; dl: number }> = ({ d, dl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const alpha = interpolate(frame, [0, 10], [0, 1], clamp);
  const medal = spring({ frame, fps, config: { damping: 9, mass: 0.8 } });
  const obrot = interpolate(frame, [0, 40], [-25, 0], { ...clamp, easing: Easing.out(Easing.back(2)) });
  const tekst = spring({ frame: frame - 14, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: alpha, fontFamily: FONT, color: "white" }}>
      <div style={{ position: "relative", width: 380, height: 200, marginBottom: -70, transform: `scale(${medal})`, transformOrigin: "bottom" }}>
        <div style={{ position: "absolute", left: 120, bottom: 0, width: 80, height: 230, background: d.kolorAkcent, transform: "rotate(-18deg)", transformOrigin: "bottom center", borderRadius: 6 }} />
        <div style={{ position: "absolute", right: 120, bottom: 0, width: 80, height: 230, background: "#3B5BFF", transform: "rotate(18deg)", transformOrigin: "bottom center", borderRadius: 6 }} />
      </div>
      <div style={{ width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #FFE7A3, #E0A526 55%, #9C6A0E)", boxShadow: "inset 0 0 0 14px rgba(255,255,255,0.25)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transform: `scale(${medal}) rotate(${obrot}deg)`, color: "#5A3A00" }}>
        <div style={{ fontSize: (d.napisMedal ?? d.dystans).length <= 6 ? 110 : Math.round(460 / (d.napisMedal ?? d.dystans).length), fontWeight: 900, lineHeight: 1, letterSpacing: -1 }}>{(d.napisMedal ?? d.dystans).replace(" ", "\u00A0")}</div>
        <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 4 }}>FINISHER</div>
      </div>
      <div style={{ marginTop: 80, fontSize: 120, fontWeight: 900, opacity: tekst, transform: `translateY(${(1 - tekst) * 60}px)` }}>UKOŃCZONE!</div>
      <div style={{ marginTop: 10, fontSize: 52, fontWeight: 600, opacity: tekst }}>{d.imie} · {d.czas.replace(/^0+:?/, "")}</div>
      <div style={{ marginTop: 40, fontSize: 46, fontWeight: 800, color: d.kolorAkcent, opacity: tekst }}>{d.hashtag}</div>
    </AbsoluteFill>
  );
};

const SCENY = [
  { od: 0, dl: 80, C: Intro },
  { od: 80, dl: 90, C: Imie },
  { od: 170, dl: 110, C: Czas },
  { od: 280, dl: 120, C: Miedzyczasy },
  { od: 400, dl: 80, C: Miejsca },
  { od: 480, dl: 60, C: Final },
];

export const TwojBieg: React.FC<DaneBiegacza> = (d) => (
  <AbsoluteFill>
    <Tlo akcent={d.kolorAkcent} tlo={d.kolorTlo} />
    {SCENY.map(({ od, dl, C }) => (
      <Sequence key={od} from={od} durationInFrames={dl}>
        <C d={d} dl={dl} />
      </Sequence>
    ))}
    <GornyPasek d={d} />
    <PasekSponsora d={d} />
    <PasekPostepu akcent={d.kolorAkcent} />
  </AbsoluteFill>
);
