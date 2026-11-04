# Demo: „Twój bieg” – spersonalizowany film dla biegacza

Szablon w Remotion. Pionowy film 1080×1920, 18 sekund, pod Instagram, TikTok i Facebook.

Gotowy przykład: `przyklad-twoj-bieg.mp4` (dane zmyślone).

## Sceny

1. Logo i nazwa biegu
2. „Brawo, imię nazwisko” + numer startowy
3. Czas z animowanym licznikiem + tempo
4. Rysująca się trasa + międzyczasy
5. Miejsce open i w kategorii
6. Medal, „Ukończone!”, hashtag

Na każdej scenie jest pasek sponsora.

## Jak zrobić film z innymi danymi

1. Zmień wartości w `data/biegacz.json`: imię, czas, miejsca, międzyczasy, nazwę biegu, kolory, sponsora.
2. Zainstaluj zależności i wyrenderuj:

```
npm install
npm run render
```

Film pojawi się w `out/twoj-bieg.mp4`.

Podgląd na żywo z możliwością edycji danych: `npm run studio`.

W środowisku bez pobranej przeglądarki Remotion dodaj do polecenia `--browser-executable=<ścieżka do chrome-headless-shell>`.

## Co dalej, żeby to był produkt

- Prawdziwe logo biegu zamiast kółka „LOGO BIEGU”.
- Prawdziwy kształt trasy z pliku GPX zamiast przykładowej linii.
- Skrypt: CSV z wynikami → film dla każdego wiersza.
- Muzyka z licencją komercyjną.
- Strona do pobierania filmu po numerze startowym.
