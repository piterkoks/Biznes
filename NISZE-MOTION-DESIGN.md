# Motion design z danych: którą niszę wybrać

Data analizy: listopad 2026. Uzupełnia plik MOTION-DESIGN.md.

## Czego szukałem

Twoja przewaga to **filmy generowane z danych** (Remotion + Claude Code): jeden szablon, setki filmów, prawie zero pracy na kolejną sztukę. Najlepszy klient:

1. ma **dużo powtarzalnych danych**, które często się zmieniają;
2. film **bezpośrednio daje mu pieniądze lub zasięg**;
3. **ma budżet** i łatwo do niego dotrzeć;
4. **nie ma** jeszcze tanich gotowych narzędzi AI do tego;
5. da się zacząć **z Częstochowy**, bez wielkiego portfolio.

## Ranking nisz

| Nisza | Dane | Budżet | Konkurencja | Ocena |
|---|---|---|---|---|
| **Imprezy biegowe i sportowe masowe** | wyniki z pomiaru czasu | organizator + sponsorzy | duże maratony mają iRewind/Pic2Go, małe i średnie biegi prawie nic | ⭐ **9/10** |
| **Akademie piłkarskie i kluby amatorskie** | terminarz, wyniki, składy | akademie: rodzice płacą; kluby: małe | w USA Box Out Sports (60–275 $/mies.), w Polsce głównie Canva | **7/10** |
| Filmy premierowe dla SaaS i aplikacji | zrzuty ekranu, opis funkcji | wysoki, w dolarach | duża, globalna | 7/10 na portfolio i dolary |
| Spersonalizowane „podsumowanie roku” (styl Spotify Wrapped) | dane klientów firmy | wysoki | korporacyjne Idomoo, SundaySky, Blings; małe firmy bez oferty | 6/10, okazja sezonowa **teraz** |
| Biura nieruchomości | ogłoszenia | średni | rosnąca | 6/10 |
| Komisy samochodowe | ogłoszenia Otomoto | średni | brak danych | 6/10 |
| Biura i agenci turystyczni | oferty last minute | mały–średni | nie sprawdzałem dokładnie | 5/10, hipoteza |
| Filmy produktowe dla sklepów internetowych | feed produktów | średni | **bardzo duża**: Creatify od 39 $/mies., Higgsfield ok. 1,5 $/film | 3/10 |

## ⭐ Zwycięzca: „Twój bieg” – spersonalizowane filmy dla biegaczy

### Co to jest

Po biegu **każdy uczestnik dostaje własny 15–20-sekundowy film**: imię, czas, miejsce w kategorii, międzyczasy, animowana trasa, medal, logo biegu i sponsorów. Wszystko generowane automatycznie z wyników pomiaru czasu. **Bez kamer, bez operatorów.**

Biegacz wrzuca film na Instagram/Facebook/Stravę, oznacza bieg i sponsora. Organizator dostaje setki darmowych reklam przed kolejną edycją.

### Dlaczego to najlepsza nisza

- **Model jest sprawdzony za granicą i na dużych biegach.** iRewind zrobił 33 000 filmów dla maratonu w Nowym Jorku i ponad 100 000 dla Paryża. Pic2Go zrobił ponad 2 700 filmów na Maratonie Warszawskim.
- **Ludzie już za to płacą w Polsce.** Na Maratonie Warszawskim FotoMaraton.pl sprzedaje klipy z mety po **21 zł za sztukę**.
- **Małe i średnie biegi są nieobsłużone.** Rozwiązania kamerowe opłacają się dopiero przy tysiącach uczestników. Twoja wersja z samych danych kosztuje Cię prawie zero na film, więc opłaca się nawet na biegu na 200 osób. Nie znalazłem w Polsce nikogo, kto robi to z samych wyników.
- **Rynek jest duży.** W 2019 r. w Polsce odbyło się **3 916 imprez biegowych**. Do tego triathlony, biegi przeszkodowe, zawody MTB, pływanie, nordic walking.
- **To jest Twój pomysł z pośrednikiem.** Firmy pomiaru czasu obsługują dziesiątki biegów w sezonie. Jedna umowa z taką firmą, która dosprzedaje Twoje filmy jako dodatek, daje Ci dziesiątki imprez.
- **Idealny moment.** Teraz jest po sezonie. Organizatorzy planują edycje 2027 zimą, a Ty masz 3–4 miesiące na zbudowanie produktu.
- **Licencja nic nie kosztuje.** Remotion jest darmowy dla jednej osoby i firm do 3 osób, także komercyjnie.

### Kto płaci: trzy modele, można łączyć

| Model | Przykładowa cena | Komentarz |
|---|---|---|
| Organizator kupuje pakiet | 3–6 zł za uczestnika, min. ok. 800 zł za imprezę | najprostsze, organizator dopisuje to do budżetu |
| Sponsor płaci za logo we wszystkich filmach | 1 000–3 000 zł za imprezę | organizator dostaje filmy „za darmo”, łatwiej sprzedać |
| Biegacz dopłaca za wersję premium | 10–20 zł | np. ze zdjęciami z trasy; precedens 21 zł za klip |

To moje propozycje cen, nie stawki rynkowe. Sprawdź je na pierwszych rozmowach.

### Przykładowy sezon (scenariusz, nie obietnica)

| | Wariant ostrożny | Wariant dobry |
|---|---|---|
| Imprezy w sezonie (marzec–październik) | 15 | 40 |
| Średnio za imprezę | 1 200 zł | 1 800 zł |
| **Przychód za sezon** | **ok. 18 000 zł** | **ok. 72 000 zł** |
| Twoja praca na imprezę po zbudowaniu systemu | 1–3 h | 1–3 h |

Koszty: renderowanie w chmurze to grosze na film, hosting stron z filmami kilkadziesiąt złotych miesięcznie.

### Plan działania

**Listopad–grudzień 2026: budowa**
1. Zbuduj z Claude Code szablon Remotion „Twój bieg”: imię, czas, miejsce, międzyczasy, trasa, medal, logo sponsorów. Najlepiej 2–3 style graficzne.
2. Zbuduj skrypt: plik CSV z wynikami → setki filmów MP4 → strona, na której biegacz wpisuje numer startowy i pobiera swój film.
3. Demo zrób na **swoim wyniku albo zmyślonych danych**. Nie publikuj filmów z danymi prawdziwych biegaczy bez zgody organizatora. Wyniki są publiczne, ale publikacja to już przetwarzanie danych osobowych, a zgodę z RODO załatwia organizator w regulaminie.

**Styczeń–luty 2027: sprzedaż**
4. Lista 50–100 organizatorów biegów 300–3 000 osób w śląskim, łódzkim, małopolskim i opolskim. Kalendarze biegów są publiczne.
5. Każdemu wyślij gotowe demo z **logo jego biegu**. To 15 minut pracy na organizatora dzięki automatyzacji.
6. Pierwsze 2–3 imprezy za darmo lub po kosztach, w zamian za referencje i statystyki: ile osób pobrało film i ile udostępniło.
7. Napisz do firm pomiaru czasu z propozycją współpracy: one sprzedają filmy jako dodatek, Ty dajesz im 20–30% prowizji.

**Marzec 2027 i dalej: sezon**
8. Obsługujesz imprezy i zbierasz statystyki udostępnień. To Twój najlepszy argument sprzedażowy.
9. Rozszerzasz na triathlony, biegi przeszkodowe, zawody rowerowe i pływackie.

### Ryzyka

- **Sezonowość:** przychód głównie marzec–październik. Zimą sprzedajesz i rozwijasz produkt.
- **Dostęp do danych:** potrzebujesz pliku z wynikami od organizatora lub firmy pomiaru czasu, tak samo jak do zgód RODO. Dlatego partnerstwo z firmą pomiaru czasu jest kluczowe.
- **Kopiowanie:** model łatwo podpatrzeć. Twoja ochrona to szybkość, relacje z organizatorami i jakość wyglądu.

## Druga opcja: akademie piłkarskie

Rodzice płacą akademiom co miesiąc, a akademie konkurują o dzieci, więc **mają budżet na marketing**, w przeciwieństwie do amatorskich klubów seniorskich.

- **Produkt:** automatyczne animowane rolki: zapowiedź meczu, wynik, strzelcy, zawodnik meczu, urodziny zawodnika, podsumowanie sezonu każdego dziecka. Ten ostatni film rodzice uwielbiają udostępniać.
- **Dowód, że model działa:** w USA Box Out Sports sprzedaje podobne grafiki szkolnym drużynom za 60–275 $/mies. W Polsce kluby robią to ręcznie w Canvie.
- **Cena:** np. 150–400 zł/mies. za akademię.
- **Plus:** przychód przez cały rok i cykliczny. **Minus:** dane o meczach trzeba wpisywać albo pobierać ze stron związków, więc automatyzacja jest trudniejsza.
- **Dobre połączenie z biegami:** ten sam silnik, inne szablony. Zimą, gdy biegów nie ma, liga juniorów gra w hali.

## Szybka okazja na teraz: podsumowanie roku 2026

Listopad–grudzień to sezon na filmy w stylu Spotify Wrapped. Duże firmy kupują je od korporacyjnych dostawców. Małe nie mają oferty. Możesz w 2–3 tygodnie zrobić pierwszy projekt, np. „Twój rok w klubie” dla klubu biegowego, siłowni, szkoły tańca czy akademii piłkarskiej. To szybkie pieniądze, gotowe portfolio i test silnika przed sezonem biegowym.

## Źródła

- iRewind, 33 000 filmów na maratonie w Nowym Jorku: https://startupticker.ch/index.php/en/news/irewind-supplies-the-new-york-city-marathon-with-33-000-finisher-videos
- iRewind, model biznesowy i sponsorzy: https://irewind.com/irewind-plus/ oraz https://www.racedirectorshq.com/listen/irewind-personalized-race-videos-515
- Pic2Go na Maratonie Warszawskim: https://www.endurancesportswire.com/pic2go-delivered-race-photo-based-video-clips-at-the-warsaw-marathon-2021/
- Maraton Warszawski, klipy z mety: https://maratonwarszawski.com/?p=37855
- 9Pic Flow, filmy z danych pomiaru czasu: https://9pic.ai/products/flow/
- Liczba imprez biegowych w Polsce: https://ezeszyty.wne.tu.koszalin.pl/index.php/zeszyty/article/download/162/136/939
- GUS, kluby sportowe 2024: https://stat.gov.pl/obszary-tematyczne/kultura-turystyka-sport/sport/kultura-fizyczna-w-polsce-w-2024-r-,13,8.html?pdf=1
- Box Out Sports, ceny: https://boxoutsports.com/a/smm
- Podsumowania roku dla firm: https://www.blings.io/blog/news/why-your-brand-needs-to-make-a-2025-year-in-review-video-campaign/ oraz https://sundaysky.com/blog/5-year-end-recap-videos-every-business-should-create/
- Konkurencja w filmach produktowych: https://fast.io/resources/creatify-ai-review-2026/ oraz https://higgsfield.ai/blog/best-creatify-alternatives
- Remotion, przykłady biznesów: https://www.remotion.dev/success-stories/a-million-dollars
- Licencja Remotion: https://www.remotion.dev/docs/license/faq
