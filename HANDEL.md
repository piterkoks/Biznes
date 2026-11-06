# Handel: kupić taniej, sprzedać drożej, z pomocą bota i AI

Data analizy: 6.11.2026. Liczby z artykułów i portali, nie z twardych statystyk sprzedaży.

## Szczera ocena

Handel używanymi rzeczami działa, ale **zysk powstaje przy zakupie**: trzeba kupić co najmniej 20–30% poniżej realnej ceny rynkowej. Tym samym zajmuje się już wielu ludzi, więc o wyniku decyduje **szybkość** (kto pierwszy napisze do sprzedającego) i **wiedza o cenach**. Bot i AI dają przewagę dokładnie w tych dwóch miejscach.

Sam handel to jednak praca na czas i marżę, a nie automat do pieniędzy. Najlepiej działa tam, gdzie **dodajesz wartość**: naprawiasz, czyścisz, ulepszasz, ładnie fotografujesz i opisujesz.

## Ranking pomysłów

| Pomysł | Ocena | Dlaczego |
|---|---|---|
| **Laptopy i elektronika z wartością dodaną** | ⭐ 8/10 | znane modele = łatwo sprawdzić cenę; wymiana dysku na SSD, baterii, czyszczenie i świeży system podnoszą wartość; studenci w Częstochowie to stały popyt, szczyt we wrześniu i październiku; rynek odnowionych laptopów rośnie |
| Telefony, konsole, karty graficzne z OLX | 7/10 | bardzo płynne, ale duża konkurencja i ryzyko oszustw, kradzionych lub zablokowanych urządzeń |
| Elektronarzędzia i rowery | 6/10 | dobre marże na markowych narzędziach; rowery sezonowe, od wiosny |
| Licytacje komornicze ruchomości | 6/10 | cena wywołania 3/4 wartości szacunkowej, w drugiej licytacji 1/2; trzeba obejrzeć towar na miejscu, wycena komornika bywa różna od rynkowej |
| Ubrania z lumpeksów na Vinted | 5/10 | sprawdzony model (np. kupno za 20–30 zł, sprzedaż za 60–100 zł), ale niskie kwoty i dużo pracy na sztukę |
| Palety ze zwrotami Amazona | 2/10 | „loteria”, często elektrośmieci i towar klasy D |
| Nowe karty Pokémon i boostery | 2/10 | według branżowych blogów korekta cen 20–50% przez nadprodukcję; spekulacja |
| Dropshipping tanich produktów z Chin | 2/10 | konkurencja z Temu i AliExpress |

## Rekomendacja: laptopy i elektronika z wartością dodaną

**Model:**
1. Bot wyszukuje oferty laptopów biznesowych (Dell Latitude, Lenovo ThinkPad, HP EliteBook), MacBooków i konsol poniżej ceny rynkowej, także „uszkodzone”, „bez dysku”, „słaba bateria”.
2. Kupujesz najlepsze okazje lokalnie w Częstochowie i okolicy albo z wysyłką.
3. Dodajesz wartość: dysk SSD, bateria, czyszczenie, pasta termoprzewodząca, czysty system, dobre zdjęcia.
4. Sprzedajesz na OLX, Allegro i grupach studenckich, z krótką gwarancją rozruchową, która buduje zaufanie.

**Start:** kilka tysięcy złotych wystarczy na pierwsze 2–4 sztuki. Zaczynasz od 1–2, żeby nauczyć się rynku.

**Jak sprawdzić opłacalność przed zakupem:** dla 3–4 modeli zapisz z 20–30 ogłoszeń, za ile wystawiane są sprzęty w różnym stanie i ile kosztują części. Dopiero to pokaże prawdziwą marżę w Częstochowie.

**Ryzyka:**
- kradziony sprzęt: proś o fakturę lub dowód zakupu, sprawdzaj numer seryjny;
- blokady: konto iCloud w MacBookach, hasło BIOS w laptopach poleasingowych;
- oszuści przy płatnościach i wysyłce: odbiór osobisty albo bezpieczne płatności platformy.

## Bot i AI do wyszukiwania okazji

**Ważne:** OLX nie ma publicznego interfejsu do wyszukiwania cudzych ogłoszeń, jego API służy do zarządzania własnymi ogłoszeniami. Automatyczne pobieranie stron (scraping) może naruszać regulamin. Bot powinien korzystać z oficjalnych dróg.

**Architektura zgodna z regulaminami:**

```
Zapisane wyszukiwania i powiadomienia w OLX, Vinted, Allegro Lokalnie
+ oficjalne API Allegro (ceny ofert i liczba transakcji z 30 dni)
+ licytacje komornicze (publiczne ogłoszenia)
            │
            ▼
AI (Claude) ocenia ofertę: model, stan, czerwone flagi, szacowana cena odsprzedaży, marża
            │
            ▼
Powiadomienie na telefon (np. Telegram): „Okazja: ThinkPad T14, 900 zł, rynkowo ok. X zł, zysk ok. Y zł”
```

Co AI robi dobrze:
- czyta opis i zdjęcia i wyłapuje ukryte wady, podejrzane sformułowania, brak ładowarki;
- porównuje cenę z cenami rynkowymi i liczy marżę po kosztach części i prowizji;
- pisze wiadomość do sprzedającego i gotowe ogłoszenie przy odsprzedaży.

Co jest potrzebne do zbudowania:
- konto deweloperskie Allegro z kluczami API;
- bot Telegram, czyli token od BotFather;
- klucz API do Claude;
- dostęp sieciowy w środowisku do tych serwisów.

## Czy lepiej handlować droższymi rzeczami? (6.11.2026)

**Krótko:** częściowo tak, bo na jednej transakcji zarabiasz więcej przy podobnym nakładzie pracy. Ale „kup za 3 000, sprzedaj za 4 000”, czyli 33% marży, to przy drogich rzeczach wyjątek, nie reguła. Im droższa rzecz, tym lepiej sprzedający znają jej wartość i tym więcej handlarzy poluje na okazje. **Marża procentowa spada wraz z ceną.**

### Co mówią dane

| Towar | Typowy zysk na sztuce | Źródło |
|---|---|---|
| Ubrania z lumpeksu na Vinted | kupno 20–30 zł, sprzedaż 60–100 zł | poradniki |
| Używany iPhone | ok. 60–120 $ na sztuce, sprzedaż w 3–14 dni | blogi narzędzi i handlarz z USA |
| MacBook | najwyższy zysk w dolarach wśród elektroniki; przykład M1 Air: zakup 200–300 $, sprzedaż 450–550 $ | blog z USA, zakup zwykle uszkodzonych lub źle opisanych |
| Używane auto | handlarz: zwykle 6–8%, najlepiej 11–12%; ok. 3–5 tys. zł na aucie | money.pl i inne |

Realnie na rzeczy za 3 000 zł zarobisz zwykle **300–600 zł**, czyli 10–20%. Więcej tylko wtedy, gdy:
- kupujesz rzecz uszkodzoną lub źle opisaną i sam ją naprawiasz;
- sprzedający musi szybko sprzedać, np. przeprowadzka albo spadek;
- sprzedajesz w lepszym kanale, z lepszymi zdjęciami, gwarancją i opisem.

### Plusy droższych rzeczy

- mniej transakcji na ten sam zysk, czyli mniej spotkań, wysyłek i pisania;
- bot i AI dają większą wartość, bo jedna znaleziona okazja to kilkaset złotych.

### Minusy, o których łatwo zapomnieć

- **zamrożona gotówka:** przy 3 sztukach po 3 000 zł masz 9 000 zł w towarze, zanim cokolwiek sprzedasz;
- **wolniejsza sprzedaż:** mniej kupujących stać na drogą rzecz, a ci, których stać, mocniej negocjują;
- **jedna wpadka zjada kilka zysków:** ukryta wada, blokada iCloud albo kradziony sprzęt za 3 000 zł to strata kilku udanych transakcji;
- **oszuści celują w drogie rzeczy:** fałszywe potwierdzenia przelewu i fałszywe strony kurierskie;
- **firma od razu:** limit działalności nierejestrowanej to 10 813,50 zł przychodu na kwartał, więc kończy się po 2–3 sprzedażach po 4 000 zł. Potem płacisz co najmniej składkę zdrowotną, ok. 433 zł miesięcznie, czyli potrzebujesz kilku transakcji miesięcznie, żeby to się spinało.

### Rekomendacja

- **Przedział 1 500–4 000 zł**, w elektronice, w której sam dodajesz wartość: MacBooki, laptopy biznesowe, komputery do gier składane z używanych części.
- **Twarda zasada zakupu:** kupujesz tylko wtedy, gdy po wszystkich kosztach zostaje co najmniej 15–20%. Bot liczy to przed każdą ofertą.
- **Auta odłóż na później.** Wymagają kilkudziesięciu tysięcy złotych, wiedzy mechanicznej i formalności, a sami handlarze mówią, że to hazard.
- **Zacznij od 1–2 tańszych transakcji**, żeby nauczyć się rynku, zanim zamrozisz kilka tysięcy.

## Podatki i formalności (ważne)

- **Kupowanie po to, żeby odsprzedać, to działalność gospodarcza**, nawet na OLX. Sprzedaż własnych rzeczy po 6 miesiącach od zakupu jest bez podatku, ale to nie dotyczy handlu.
- **Działalność nierejestrowana:** limit 10 813,50 zł **przychodu** na kwartał, czyli całej kwoty sprzedaży, a nie zysku. W handlu elektroniką przekroczysz go szybko, np. kilkoma laptopami. Potem trzeba założyć firmę, z ulgą na start.
- **DAC7:** platformy zgłaszają do skarbówki sprzedawców z co najmniej 30 transakcjami **albo** ponad 2 000 € przychodu w roku, osobno na każdej platformie. Za 2025 rok zgłoszono prawie 290 tys. sprzedawców, a do stycznia 2026 skarbówka wszczęła 1 523 czynności sprawdzające.
- **Odpowiedzialność za wady:** firma sprzedająca konsumentom odpowiada za wady towaru, także używanego. Przed startem zapytaj księgową o VAT marża przy towarach używanych.

## Źródła

- Marża handlarzy autami: https://www.money.pl/pieniadze/sprzedaje-setki-aut-miesiecznie-zdradza-na-czym-zarabia-dealer-7229489409340481v.html oraz https://motoryzacja.interia.pl/wiadomosci/news-polski-handlarz-oszukany-przez-niemca-zrobili-mnie-na-bmw,nId,21401016
- Zysk na iPhone'ach: https://flipsy.com/article/?p=5635 oraz https://www.underpriced.app/blog/phone-tablet-flipping-iphone-samsung-guide-2026
- MacBooki: https://www.underpriced.app/blog/apple-products-flipping-guide
- Handel iPhone'ami na dużą skalę: https://verifieddealers.pages.dev/phone-reselling-business/how-to-start-phone-reselling-business/flipping-iphones/
- Oszustwa na OLX: https://android.com.pl/tech/919970-olx-vinted-oszustwo-relacja-ofiar/ oraz https://android.com.pl/tech/729971-oszustwo-na-kupujacego-olx-vinted-spam/

- DAC7, dane MF za 2025: https://finwire.pl/artykuly/sprzedaz-w-internecie-podatek-2026-dac7-dane-290-tys-osob-allegro-olx-vinted
- DAC7, czynności sprawdzające: https://www.telepolis.pl/wiadomosci/fiskus-kontrole-dac7-sprzedawcy-powiadomienie
- Handel a działalność gospodarcza: https://www.eporady24.pl/sprzedaz-na-allegro-i-olx-a-podatki,pytania,9,32,21872.html oraz https://kancelariapiotrowski.pl/podatek-od-sprzedazy-na-vinted-olx-i-allegro/
- Co sprzedawać na OLX, Allegro, Vinted: https://www.inwestycyjny.pl/co-kupowac-i-sprzedawac-z-zyskiem-sprawdzone-pomysly-2/ oraz https://sprzedajeto.pl/blog/sprzedaz-uzywanych-rzeczy-poradnik
- API OLX: https://biznes.olx.pl/integracja-api/ oraz https://developer.olx.pl/doc/regulations.pl.pdf
- API Allegro, dostęp do danych o ofertach: https://antyweb.pl/sledzenie-historii-transakcji-i-cen-przedmiotow-allegro oraz https://spolecznosc.allegro.pl/t5/zaawansowani-sprzedawcy/10-09-2025-nowy-regulamin-rest-api/m-p/1078997
- Licytacje ruchomości, cena wywołania: https://lexlege.pl/ustawa-o-postepowaniu-egzekucyjnym-w-administracji/art-106/
- Palety ze zwrotami: https://www.instalki.pl/news/internet/palety-ze-zwrotami-amazon-co-to-jest-czy-warto/ oraz https://bezprawnik.pl/500-zl-za-palete-z-amazona-i-karton-pelen-smieci-tak-wyglada-okazja-ktorej-tiktok-ci-nie-pokaze/
- Karty Pokémon 2026: https://www.cardsnpacks.com/pl/blog/investir-cartes-pokemon-2026/
- Rynek odnowionych laptopów: https://www.pap.pl/mediaroom/rynek-odnowionych-laptopow-w-polsce-rosnie-mimo-spowolnienia-sprzedazy-nowych-urzadzen oraz https://root-nation.com/pl/articles-pl/analityka-pl/pl-laptop-poleasingowy-w-2026-roku-czy-warto-kupic-praktyczny-poradnik-dla-oszczednych/
- Aukcje firm leasingowych: https://pro.rp.pl/prawo-w-firmie/art14730041-aukcje-w-firmach-leasingowych
