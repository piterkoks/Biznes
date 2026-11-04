# „Twój bieg” – automatyczne filmy dla biegaczy

Szablon w Remotion i generator, który z pliku z wynikami robi film dla każdego biegacza. Pionowy film 1080×1920, 18 sekund, pod Instagram, TikTok i Facebook.

Gotowy przykład: `przyklad-twoj-bieg.mp4` (dane zmyślone).

## Jak działa system

```
Excel/CSV od organizatora  ─┐
                            ├─►  scripts/generuj.mjs  ─►  filmy MP4 + raport.csv + index.html
wydarzenie.json (Ty)       ─┘
```

1. **Organizator przysyła wyniki** w Excelu (.xlsx) albo CSV. Taki, jaki dostaje od firmy pomiaru czasu.
2. **Ty wypełniasz `wydarzenie.json`**: nazwa biegu, dystans, data, kolory, sponsor, hashtag. Raz na imprezę, 5 minut.
3. **Uruchamiasz jedno polecenie.** Skrypt sam:
   - znajduje wiersz z nagłówkami, nawet jeśli nad nim jest tytuł;
   - rozpoznaje kolumny po różnych nazwach, np. „M-ce”, „Msc”, „Miejsce”, „Nr startowy”, „Bib”, „Czas netto”, „Kat.”;
   - wykrywa kolumny z międzyczasami, np. „Międzyczas 5 km”, „21,1 km”;
   - pomija osoby bez czasu (DNF, DNS, DSQ) i wpisuje je do raportu;
   - **sam liczy** brakujące miejsca open i w kategorii, liczbę uczestników i tempo;
   - renderuje film dla każdego biegacza;
   - jeśli przerwiesz, przy kolejnym uruchomieniu pomija gotowe filmy i kontynuuje.
4. **Dostajesz folder** z filmami, `raport.csv` (kto ma film, kogo pominięto i dlaczego) i `index.html` – stronę, na której biegacz wpisuje numer startowy, ogląda i pobiera swój film.

## Polecenia

```
npm install

# przykładowy Excel do testów
npm run przyklad-excel

# wszystkie filmy
node scripts/generuj.mjs --wyniki przyklad/wyniki.xlsx --wydarzenie przyklad/wydarzenie.json --wyjscie out/bieg-demo

# tylko 3 pierwsze, do sprawdzenia przed pełnym renderem
node scripts/generuj.mjs --wyniki przyklad/wyniki.xlsx --wydarzenie przyklad/wydarzenie.json --wyjscie out/bieg-demo --tylko 3
```

Opcje:
- `--tylko N` – tylko N pierwszych filmów;
- `--nadpisz` – renderuj ponownie istniejące;
- `--jakosc 23` – CRF, wyższa liczba = mniejszy plik;
- `--przegladarka <ścieżka>` – własna przeglądarka Chrome Headless Shell, gdy Remotion nie może pobrać swojej.

Nowe nazwy kolumn od innej firmy pomiaru czasu dopisujesz w `ALIASY` na górze `scripts/generuj.mjs`.

Podgląd szablonu na żywo: `npm run studio`.

## Wydajność

Zmierzone na serwerze z 4 rdzeniami: **ok. 27 s na film**.

| Biegaczy | Jeden komputer z 4 rdzeniami | Komputer z 8–16 rdzeniami (szacunek) | Chmura, Remotion Lambda |
|---|---|---|---|
| 300 | ok. 2,5 h | ok. 1–1,5 h | kilka minut |
| 1 000 | ok. 7,5 h | ok. 3–4 h | kilka–kilkanaście minut |

Na start wystarczy zostawić komputer na noc. Przy większej skali Remotion Lambda renderuje setki filmów równolegle w AWS.

Rozmiar pliku: ok. 4–5 MB na film, czyli ok. 4–5 GB na 1 000 biegaczy. Do hostingu filmów nadaje się np. tani magazyn plików w chmurze.

## Co dalej, żeby to był pełny produkt

- Prawdziwe logo biegu i trasa z pliku GPX zamiast zaślepek.
- Muzyka z licencją komercyjną.
- Hosting filmów i strony do pobierania pod adresem internetowym.
- Wysyłka linków mailem przez organizatora albo przez Ciebie.
- Panel, w którym organizator sam wrzuca Excela, a filmy robią się automatycznie.
- Płatności za wersję premium.
