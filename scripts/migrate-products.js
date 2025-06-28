// scripts/migrate-products.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const products = [
    {
      title: "Morpheus-8",
    slug: "morpheus",
    description: `


Morpheus 8 to najnowsze, zaawansowane technologicznie urządzenie do pielęgnacji skóry, które łączy moc **radiofrekwencji (RF)** z izolowanymi mikronakłuciami (igłami o głębokości 8 mm) oraz technologią matrycową.  
Dzięki temu urządzeniu możesz cieszyć się nowoczesnymi, minimalnie inwazyjnymi zabiegami, które odmładzają skórę, poprawiają jej elastyczność i redukują niedoskonałości.

&nbsp;  

---

&nbsp;  
# **Zalety Morpheus 8**
&nbsp;  
- **Głębsza Penetracja:**  
  Morpheus 8 umożliwia penetrację do 8 mm w głąb skóry, co jest głębiej niż większość dostępnych na rynku urządzeń. Dzięki temu efekty zabiegów są bardziej widoczne i trwałe.
  
- **Technologia Burst Mode:**  
  Unikalna technologia Burst Mode pozwala na automatyczne rozprowadzanie energii RF na różnych głębokościach w jednym cyklu. To skraca czas zabiegu i zapewnia równomierne działanie na różnych warstwach skóry.

- **Bezpieczeństwo i Komfort:**  
  Izolowane mikronakłucia minimalizują uszkodzenia naskórka oraz redukują ból i ryzyko infekcji. Zabiegi są bezpieczniejsze i bardziej komfortowe dla pacjentów.

- **Wszechstronność:**  
  Urządzenie wyposażone jest w wymienne końcówki (12p, 24p, 40p, nanokrystaliczne), co pozwala na dostosowanie zabiegu do różnych obszarów ciała i typów skóry.

- **Szybka Regeneracja:**  
  Dzięki precyzyjnemu działaniu skóra szybko się regeneruje, a efekty są widoczne już po kilku dniach od zabiegu. Pełne rezultaty pojawiają się w ciągu 2–3 miesięcy, gdy proces produkcji kolagenu osiąga maksimum.
&nbsp;  
&nbsp;  
---
&nbsp;  
### Porównanie z innymi urządzeniami

- **Głębsze i Bezpieczniejsze Zabiegi:**  
  W porównaniu z innymi urządzeniami do mikronakłuwania i RF, Morpheus 8 oferuje głębsze działanie bez ryzyka uszkodzeń naskórka dzięki izolowanym igłom.

- **Zaawansowana Technologia:**  
  Podczas gdy wiele urządzeń oferuje jedynie powierzchowne działanie, Morpheus 8 wykorzystuje zaawansowaną technologię RF i Burst Mode, co przekłada się na lepsze i szybsze rezultaty.

- **Wszechstronność i Dostępność Końcówek:**  
  W przeciwieństwie do prostszych urządzeń, które mają ograniczone zastosowania, Morpheus 8 oferuje różne końcówki umożliwiające dostosowanie zabiegu do indywidualnych potrzeb pacjenta.

- **Minimalny Czas Rekonwalescencji:**  
  Dzięki precyzyjnemu działaniu i minimalnym uszkodzeniom skóry, czas rekonwalescencji po zabiegu z użyciem Morpheus 8 jest znacznie krótszy niż w przypadku innych urządzeń.
    `,
    price: "9 900zł",
    image: "/products/morpheus.webp",
    },
    {
      title: "Frax Ultra Laser Frakcyjny Hybrydowy Er.-YAG / Co2",
      slug: "Frax-Ultra",
      description: `
      Frax Ultra ER-YAG – Laser Frakcyjny
 

Frax Ultra ER-YAG Laser Frakcyjny to zaawansowany laser oparty na technologii CO₂, zaprojektowany z myślą o zastosowaniach w medycynie estetycznej i kosmetologii.
Urządzenie jest niezwykle skuteczne w regeneracji skóry, redukcji blizn, zmarszczek oraz poprawie ogólnego wyglądu skóry.
Dzięki precyzji działania, Frax Ultra pozwala na kontrolowane i efektywne leczenie różnych obszarów ciała.

 
 

Zastosowanie Frax Ultra
 

Regeneracja skóry:
Pobudzanie produkcji kolagenu i elastyny, poprawa tekstury skóry.

Leczenie blizn:
Redukcja blizn potrądzikowych, chirurgicznych oraz pourazowych.

Zmniejszanie zmarszczek:
Gładzenie drobnych i głębszych zmarszczek.

Usuwanie przebarwień:
Leczenie zmian pigmentacyjnych i wyrównanie kolorytu skóry.

Zabiegi ginekologiczne:
Leczenie nietrzymania moczu oraz rewitalizacja miejsc intymnych (w zależności od dodatkowych akcesoriów).

 
 

Dane techniczne
 

Typ lasera:
Laser CO₂ frakcyjny.

Długość fali:
10,6 µm (standardowa dla laserów CO₂).

Tryby pracy:

Tryb frakcyjny dla minimalnie inwazyjnych zabiegów.

Tryb chirurgiczny dla bardziej precyzyjnych cięć.

Głowice i akcesoria:
Możliwość zastosowania różnych końcówek do zabiegów twarzy, ciała oraz ginekologicznych.

Regulacja intensywności:
Dostosowanie głębokości i mocy działania lasera do indywidualnych potrzeb pacjenta.

System chłodzenia:
Wbudowany system chłodzenia w celu zwiększenia komfortu pacjenta.

Panel sterowania:
Intuicyjny ekran dotykowy z predefiniowanymi ustawieniami dla różnych procedur.

 
 

Zalety Frax Ultra
 

Precyzja i bezpieczeństwo:
Dokładne przeprowadzanie zabiegów z minimalnym ryzykiem powikłań.

Minimalny czas rekonwalescencji:
Pacjenci mogą szybko wrócić do codziennych aktywności.

Wszechstronność zastosowań:
Możliwość wykonywania zabiegów w kosmetologii i medycynie estetycznej.

Wysoka efektywność:
Widoczne rezultaty już po jednej sesji.

 
 

Frax Ultra vs Fotona 4D
 

Frax Ultra – Laser Frakcyjny Hybrydowy Er:YAG / CO₂
 

Precyzja i bezpieczeństwo:
Minimalne ryzyko powikłań i wysoka kontrola podczas zabiegu.

Krótki czas rekonwalescencji:
Pacjenci szybko wracają do normalnej aktywności.

Wszechstronność:
Szerokie zastosowanie w zabiegach estetycznych i dermatologicznych.

Wysoka efektywność:
Efekty widoczne po jednej sesji.

Technologia hybrydowa:
Łączy funkcje klasycznego lasera CO₂ i Er:YAG w jednym urządzeniu.

Długość fali:
Zakres aż do 1060 nm dla zwiększonej uniwersalności.

Kompleksowe odmładzanie:
Cztery tryby zabiegowe: EndoLifting®, FRAC3®, PIANO® i SupErficial™.

Pełna przebudowa kolagenu:
Skurcz kolagenu na całej grubości skóry dla trwałego efektu napięcia.

Nieinwazyjność:
Zabiegi bez użycia wypełniaczy lub interwencji chirurgicznej.

Technologie laserowe:

Er:YAG (2940 nm): precyzyjne i mniej inwazyjne działanie.

Nd:YAG: głębsze działanie termiczne.
      `,
      price: "39 000zł",
      image: "/products/FraxUltra.webp",
    },
    {
      title: "VENOM – Laser hybrydowy 2 w 1 – Diodowy + Nd:Yag",
      slug: "Venom",
      description: `VENOM – Laser Hybrydowy 2 w 1
Diodowy + Nd:YAG | Depilacja, Tatuaże, Peeling Węglowy
 

VENOM to zaawansowane urządzenie laserowe łączące technologię diodową oraz Nd:YAG Pico.
Zaprojektowane z myślą o gabinetach kosmetycznych, klinikach medycyny estetycznej i SPA, oferuje szeroki zakres zabiegów z zachowaniem maksymalnej skuteczności i bezpieczeństwa.

 
 

Zastosowania
 

🔹 Depilacja laserowa – Laser diodowy
Trwałe usuwanie owłosienia dla wszystkich fototypów skóry

Widoczne efekty już po kilku zabiegach

Obszary zabiegowe: twarz, pachy, bikini, nogi, plecy, klatka piersiowa

 

🔹 Usuwanie tatuaży – Nd:YAG Pico
Skuteczne usuwanie tatuaży czarnych i kolorowych

Redukcja ryzyka powstania blizn i przebarwień

Możliwość usunięcia makijażu permanentnego

 

🔹 Peeling węglowy (Carbon Peel)
Głębokie oczyszczanie porów i wygładzenie skóry

Efekt rozjaśniający i antybakteryjny

Odmłodzenie i poprawa struktury skóry

 

🔹 Usuwanie przebarwień i odmładzanie (Pico)
Skuteczność w walce z melasmą, plamami posłonecznymi, piegami

Stymulacja kolagenu i poprawa elastyczności skóry

 
 

Najważniejsze zalety urządzenia VENOM
 

✅ 2 technologie w jednym urządzeniu – oszczędność miejsca i kosztów

✅ Wysoka moc działania – do 3000W mocy wyjściowej

✅ Duży dotykowy ekran 15,6” – intuicyjna obsługa i szybki dostęp do ustawień

✅ System radiatorowego chłodzenia – cicha praca i wysoki komfort użytkowania

✅ Długa żywotność rękojeści – do 20 milionów impulsów

✅ Szybkie sesje zabiegowe – częstotliwość pracy do 10 Hz

 
 

Dane techniczne
 

🔹 Laser diodowy
Długości fal: 808 nm + 755 nm + 1064 nm + 940 nm

Moc: 1200W

Czas impulsu: 1–400 ms

Energia: do 150 J/cm²

Rozmiar spotu: 15×25 mm

 

🔹 Laser Pico Nd:YAG
Długości fal: 532 nm + 1064 nm + 1320 nm

Moc: 1000W

Energia: 0.4–2.0 J/cm²

Częstotliwość: 1–10 Hz

Żywotność: praktycznie nieskończona

 
 

Dostępność i warianty
 

Urządzenie VENOM dostępne jest w dwóch wersjach kolorystycznych – dopasowanych do wystroju gabinetów.

 
 

VENOM to kompleksowe rozwiązanie dla specjalistów, którzy oczekują niezawodności, skuteczności i nowoczesnej technologii w jednym kompaktowym urządzeniu.`,
      price: "39 000 zł",
      image: "/products/venom.webp",
    },
    {
      title: "ANGELO Laser CO2",
      slug: "Angelo",
      description: `ANGELO – Laser CO2
Rewolucja w Rewitalizacji Okolic Intymnych
 

ANGELO Laser CO2 to nowoczesne urządzenie medyczne stworzone z myślą o kobietach, które chcą zadbać o komfort, zdrowie i młodość swoich stref intymnych – bezinwazyjnie i bezpiecznie.

 

 

🔹 Dlaczego warto wybrać ANGELO?
✅ Efektywne ujędrnienie pochwy – widoczna poprawa już po pierwszym zabiegu

✅ Nawilżenie i komfort – koniec z uczuciem suchości

✅ Zwiększona wrażliwość – poprawa jakości życia intymnego

✅ Bezbolesność i bezpieczeństwo – brak konieczności rekonwalescencji

 

 

🎯 Dla kogo jest przeznaczony ANGELO Laser CO2?
Dla kobiet po porodach naturalnych

Dla pań z oznakami wiotkości i suchości pochwy

Dla kobiet, które chcą odzyskać pewność siebie i satysfakcję z życia seksualnego

 

 

⚙️ Jak działa ANGELO?
Technologia frakcyjna CO2 o długości fali 10 600 nm

Precyzyjna i kontrolowana emisja energii

Stymulacja tkanki śluzówki do regeneracji i przebudowy

Zastosowanie innowacyjnej końcówki 360° radial emission zapewnia równomierne działanie wokół całego kanału pochwy

 

 

🔒 Bezpieczeństwo i jakość zabiegów
Certyfikowane urządzenie medyczne

Zabiegi przeprowadzane przez wykwalifikowany personel

Brak konieczności znieczulenia i długiego okresu gojenia

Pełna zgodność z normami europejskimi i medycznymi

 

 

💎 Dlaczego ANGELO?
✔ Nowoczesna technologia – unikatowe rozwiązanie na rynku

✔ Doświadczeni specjaliści – pełen profesjonalizm i indywidualne podejście

✔ Zadowolone pacjentki – tysiące udanych zabiegów i pozytywnych opinii

 

 

🌸 Odzyskaj pewność siebie i komfort – zaufaj sprawdzonej technologii!
📞 Umów się na konsultację już dziś i poznaj możliwości zabiegu z ANGELO Laser CO2.`,
      price: "34 900 zł",
      image: "/products/Angelo.webp",
    },
    {
      title: "HiFUSONIX + Liposonix (niechirurgiczny lifting + spalanie tłuszczu)",
      slug: "HiFUSONIX",
      description: `HiFUSONIX + Liposonix
Niechirurgiczny lifting i spalanie tłuszczu w jednej technologii
 

HiFUSONIX + Liposonix to innowacyjne urządzenie łączące najnowsze osiągnięcia technologii ultradźwiękowej i fal radiowych. Stworzone z myślą o profesjonalnym modelowaniu twarzy i sylwetki – bez skalpela, bólu i rekonwalescencji.

 

 

🔹 Dlaczego warto wybrać HiFUSONIX + Liposonix?
✅ Nieinwazyjny lifting twarzy – wyraźne napięcie i wygładzenie skóry

✅ Redukcja tkanki tłuszczowej – skuteczne spalanie tłuszczu bez zabiegu chirurgicznego

✅ Precyzyjne modelowanie sylwetki – działanie na głębokościach 6–18 mm

✅ Brak rekonwalescencji – zabiegi bez naruszenia naskórka

✅ Zaawansowane głowice 13D i 18D RS – pełna kontrola parametrów zabiegu

✅ Nowoczesny ekran 13,3” i intuicyjny interfejs – komfort pracy i elegancki wygląd urządzenia

 

 

🎯 Funkcje i technologie
✳ V-HIFU / P-HIFU (HiFUSONIX)
Skoncentrowane ultradźwięki docierają do warstw SMAS

Pobudzają produkcję kolagenu i elastyny

Efekt: lifting, poprawa owalu twarzy, redukcja zmarszczek

✳ High-Intensity Focused Ultrasound (Liposonix)
Działanie na głębokości tłuszczu (6–18 mm)

Rozbijanie komórek tłuszczowych i ich naturalna eliminacja

Efekt: wyszczuplenie, ujędrnienie i wymodelowanie sylwetki

 

 

🔬 Najważniejsze efekty zabiegowe
Widoczne napięcie i lifting skóry twarzy

Ujędrnienie skóry: twarz, szyja, dekolt

Skuteczne spalanie tłuszczu: brzuch, uda, pośladki, ramiona

Redukcja wiotkości i poprawa elastyczności skóry

Wygładzenie zmarszczek i rewitalizacja struktury skóry

Modelowanie sylwetki bez ryzyka i bólu

 

 

👩‍⚕️ Dla kogo przeznaczone jest urządzenie?
HiFUSONIX + Liposonix to idealne rozwiązanie dla:

Klinik medycyny estetycznej

Profesjonalnych salonów kosmetycznych

Gabinetów SPA i odnowy biologicznej

Doskonała alternatywa dla inwazyjnych zabiegów – bez ryzyka, bez blizn, bez długiej rekonwalescencji.

 

 

💼 Postaw na skuteczność i technologię przyszłości
Z HiFUSONIX + Liposonix oferujesz swoim klientkom:

Najwyższy standard zabiegów odmładzających i wyszczuplających

Bezpieczne i komfortowe rozwiązania w zasięgu ręki

Widoczne efekty już po pierwszej sesji

 

📞 Skontaktuj się z nami i dowiedz się, jak wprowadzić HiFUSONIX + Liposonix do swojej oferty!`,
      price: "19 900 zł",
      image: "/products/hifu.webp",
    },
    {
      title: "Hot and Cold Plasma 6W1",
      slug: "HotandColdPlasma",
      description: `Hot and Cold Plasma 6W1
Zaawansowana technologia pielęgnacji skóry i włosów
 

Hot and Cold Plasma 6W1 to wielofunkcyjne urządzenie nowej generacji, które łączy działanie plazmy na zimno i gorąco, oferując kompleksową pielęgnację skóry i włosów. Dzięki sześciu dedykowanym końcówkom zapewnia szeroki zakres nieinwazyjnych zabiegów – od odmładzania skóry, przez leczenie trądziku i blizn, aż po stymulację wzrostu włosów.

 

🔹 Najważniejsze funkcje i zastosowania
✅ Redukcja zmarszczek, blizn i rozstępów

✅ Leczenie trądziku i stanów zapalnych

✅ Odmładzanie i lifting skóry twarzy

✅ Stymulacja wzrostu i regeneracji włosów

✅ Leczenie grzybicy, ran i infekcji bakteryjnych

✅ Poprawa tekstury, elastyczności i kolorytu skóry

 

✳ 6 technologii w jednym urządzeniu
🔸 Ozone Plasma
Działanie antybakteryjne, regulacja sebum, oczyszczanie skóry.

🔸 Warm Plasma
Lifting, ujędrnianie, redukcja zmarszczek, napinanie powiek.

🔸 Hyper Plasma (zimna)
Wzrost włosów, leczenie skóry po zabiegach, regeneracja i oczyszczanie.

🔸 Scalp Plasma
Aktywacja mieszków włosowych, redukcja wypadania, poprawa krążenia.

🔸 Derma Plasma
Regeneracja kolagenu, poprawa kolorytu skóry, leczenie trądziku.

🔸 Stamp Plasma
Zabiegi punktowe: wygładzanie, ujędrnianie, leczenie blizn i porów.

 

📊 Specyfikacja techniczna
Technologia: zimna i gorąca plazma

Moc wyjściowa: 10–100 W

Częstotliwość: 15–200 Hz

Ekran dotykowy: 10,4 cala

Końcówki: Ozone, Gold, Stamp, Scalp, Hyper, Derma

Waga netto: 13,5 kg

Wymiary opakowania: 45 × 39 × 39 cm

Zasilanie: 100–240V, 50/60 Hz

Gwarancja: 12 miesięcy na urządzenie, 3 miesiące na części

 

🌟 Dlaczego warto?
✔ Wielofunkcyjność – jedno urządzenie do wielu potrzeb
✔ Skuteczność – szybkie i zauważalne efekty
✔ Komfort i bezpieczeństwo – bezboleśnie i bez rekonwalescencji
✔ Elegancki design i intuicyjna obsługa – idealne do każdego gabinetu

📞 Skontaktuj się z nami i poznaj możliwości Hot and Cold Plasma 6W1 – technologii, która zmienia podejście do pielęgnacji skóry i włosów.

`,
      price: "29 900 zł",
      image: "/products/hotandcoldplasma.webp",
    },
    {
      title: "Laser Picosekundowy Aura XPL ULTIMATE 1200MJ",
      slug: "AuraXPL",
      description: `Laser Picosekundowy Aura XPL ULTIMATE 1200MJ
Nowa era w zabiegach estetycznych – skuteczność picosekundy w Twoim gabinecie!
 

Poznaj Aura XPL ULTIMATE 1200MJ – laser picosekundowy nowej generacji, który wyznacza nowe standardy w kosmetologii i medycynie estetycznej. Wyposażony w ultrakrótki impuls, zapewnia niespotykaną dotąd precyzję, skuteczność i komfort zabiegów – bez kompromisów i bez ryzyka uszkodzenia skóry.

 

🔹 Najważniejsze zalety
✅ Ultrakrótki impuls – picosekundy
Precyzyjne rozbijanie pigmentów bez uszkadzania otaczających tkanek – mniej podrażnień, szybsze efekty, krótsza rekonwalescencja.

✅ Wszechstronność zastosowań
Usuwanie tatuaży, przebarwień, odmładzanie skóry, leczenie blizn, peeling węglowy, redukcja naczynek i wiele więcej – jedno urządzenie, dziesiątki zabiegów!

✅ Szybsze efekty – mniej sesji
Technologia picosekundowa znacząco skraca liczbę potrzebnych wizyt, zapewniając zauważalne rezultaty już po kilku zabiegach.

✅ Maksymalne bezpieczeństwo i komfort
Minimalne przegrzewanie skóry, mniejsze odczucia bólowe, szybki powrót do codziennych aktywności.

✅ Najlepszy stosunek ceny do jakości
Zaawansowana technologia prosto z Korei w cenie dostępnej dla każdego gabinetu.

 

✳ Zabiegi, które wykonasz laserem Aura XPL ULTIMATE
🔸 Usuwanie tatuaży
Skuteczne rozbijanie barwnika, niezależnie od koloru i głębokości.

🔸 Redukcja przebarwień i melasmy
Efektywna eliminacja plam pigmentacyjnych, piegów, znamion Ota i lentigo.

🔸 Peeling węglowy (Black Doll)
Dogłębne oczyszczenie porów, wygładzenie skóry, działanie przeciwstarzeniowe.

🔸 Odmładzanie skóry (Skin Rejuvenation)
Pobudzenie produkcji kolagenu, wygładzenie zmarszczek, poprawa jędrności.

🔸 Redukcja blizn potrądzikowych i nierówności
Wygładzenie powierzchni skóry i przywrócenie równomiernej tekstury.

🔸 Usuwanie rogowacenia łojotokowego
Precyzyjne i bezpieczne eliminowanie zmian skórnych.

🔸 Terapia rozszerzonych porów i skóry wrażliwej
Zwężenie porów, poprawa struktury skóry, delikatne działanie idealne dla cer wrażliwych.

🔸 Leczenie zmian naczyniowych i plam starczych
Redukcja rumienia, teleangiektazji, przebarwień posłonecznych i hormonalnych.

 

📊 Specyfikacja techniczna (wybrane parametry)
Typ lasera: Picosekundowy

Energia impulsu: do 1200 MJ

Czas impulsu: picosekundy

Zastosowanie: twarz, ciało, skóra głowy

Producent: Korea Południowa

Tryby pracy: Tatuaże, pigmenty, skin toning, carbon peel, anti-aging

Dodatkowo: możliwość pracy bez znieczulenia, szybka regeneracja skóry

 

🌟 Dlaczego warto wybrać laser Aura?
✔ Technologia premium w przystępnej cenie
✔ Szybkie ROI – większa liczba zabiegów, mniej sesji
✔ Bezpieczny nawet dla skóry wrażliwej
✔ Kompaktowa, nowoczesna konstrukcja
✔ Możliwość zakupu w systemie ratalnym 0% – bez banku, bez prowizji!`,
      price: "32 900 zł",
      image: "/products/PicoLaser.webp",
    },
    {
      title: "EternaSilk Laser 808nm do usuwania owłosienia -bezbolesny",
      slug: "EternaSilk",
      description: `EternaSilk 808nm – Profesjonalny laser do trwałego i bezbolesnego usuwania owłosienia
Komfort, skuteczność i bezpieczeństwo – nowy standard w depilacji laserowej!
 

EternaSilk 808nm to innowacyjne urządzenie stworzone z myślą o skutecznym i całkowicie bezbolesnym usuwaniu owłosienia. Wyposażone w technologię lasera diodowego o długości fali 808 nm oraz zaawansowany system chłodzenia TEC + Sapphire, zapewnia maksymalną efektywność zabiegów przy jednoczesnym zachowaniu pełnego komfortu klienta.

 

🔹 Dlaczego warto wybrać EternaSilk?
✅ Bezbolesna depilacja
System natychmiastowego chłodzenia skóry (do 5°C) eliminuje uczucie pieczenia i dyskomfortu – nawet podczas zabiegów na wrażliwych partiach ciała.

✅ Trwałe efekty
Precyzyjny laser 808 nm penetruje głęboko do cebulek włosowych, skutecznie je niszcząc i zapobiegając ponownemu wzrostowi.

✅ Pełne bezpieczeństwo
Technologia selektywnej fototermolizy działa wyłącznie na mieszek włosowy, chroniąc skórę przed uszkodzeniami. Wbudowane czujniki i zabezpieczenia eliminują ryzyko poparzeń.

✅ Indywidualne dopasowanie parametrów
Możliwość regulacji energii, częstotliwości i szerokości impulsu pozwala idealnie dopasować zabieg do fototypu skóry i grubości włosa.

✅ Zastosowanie na całe ciało
Jedno urządzenie – wiele możliwości: twarz, pachy, bikini, nogi, ramiona czy plecy – skuteczność i bezpieczeństwo w każdej strefie.

 

✳ EternaSilk – dla kogo?
🔸 Salony kosmetyczne i SPA
Wprowadź nowoczesną usługę bezbolesnej depilacji do swojej oferty.

🔸 Kliniki medycyny estetycznej
Zaawansowane narzędzie dla specjalistów ceniących skuteczność, komfort i bezpieczeństwo.

🔸 Klienci indywidualni
Dla osób, które oczekują domowej skuteczności na poziomie profesjonalnym (wymaga odpowiedniego przeszkolenia).

 

📊 Dane techniczne
Typ lasera: Diodowy

Długość fali: 808 nm

Moc lasera: 300W / 500W

Gęstość energii: 120–150 J/cm²

System chłodzenia: TEC + Sapphire (do 5°C)

Obszary zabiegowe: Twarz, ciało, bikini, pachy, nogi, ręce

Tryby pracy: Pojedynczy / szybki impuls, automatyczne chłodzenie

 

🌟 EternaSilk – Twój wybór nr 1 w depilacji
✔ Trwały efekt już po kilku zabiegach
✔ Całkowity komfort dzięki innowacyjnemu chłodzeniu
✔ Technologia odpowiednia dla różnych fototypów i struktur włosów
✔ Intuicyjna obsługa i ergonomiczny design

📞 Dołącz do grona profesjonalistów i zapewnij swoim klientom bezbolesną depilację na najwyższym poziomie – wybierz EternaSilk 808nm!`,
      price: "14 900 zł",
      image: "/products/EternaSilk.webp",
    },
    {
      title: "Velure 1927nm - Laser Tulowy",
      slug: "Velure",
      description: `# Velure™ 1927 – Profesjonalny laser tulowy do odmładzania i regeneracji skóry

**Velure™ 1927** to zaawansowany **laser tulowy o długości fali 1927 nm**, zaprojektowany do nieinwazyjnych i mikroablacyjnych zabiegów estetycznych. Dzięki wyjątkowej precyzji działania na warstwy skóry zapewnia doskonałe efekty odmłodzenia, wygładzenia i poprawy kolorytu – przy minimalnym czasie rekonwalescencji.

---

## 🎯 Zastosowanie

- ✅ Usuwanie przebarwień i zmian pigmentacyjnych (melazma, plamy słoneczne)
- ✅ Redukcja drobnych zmarszczek i linii
- ✅ Leczenie blizn potrądzikowych i trądziku
- ✅ Ujędrnianie i lifting skóry
- ✅ Zwężanie porów i poprawa tekstury
- ✅ Odświeżenie i rozjaśnienie cery

---

## 🌟 Dlaczego laser tulowy?

Laser tulowy działa selektywnie na cząsteczki wody w skórze, co pozwala na:

- bezpieczne oddziaływanie na naskórek i skórę właściwą
- stymulację regeneracji komórkowej
- zwiększoną produkcję kolagenu
- widoczne odmłodzenie już po pierwszym zabiegu

---

## ⚙️ Najważniejsze cechy Velure™ 1927

- **Długość fali:** 1927 nm – idealna do terapii depigmentacyjnych i odmładzających
- **Tryby pracy:** Nieinwazyjny, Frakcyjny, Ślizgowy
- **Wielopoziomowe działanie:** Na warstwy powierzchniowe, środkowe i głębokie skóry
- **Ekran dotykowy:** 10,4” – intuicyjny interfejs użytkownika
- **System chłodzenia:** Chłodzenie powietrzem – komfort i bezpieczeństwo
- **Kompaktowa budowa:** Przenośny i idealny do gabinetów estetycznych

---

## 🧪 Parametry techniczne

- **Moc wyjściowa:** do 12W
- **Energia impulsu:** 1–300 mJ (regulowana)
- **Szerokość impulsu:** 0,1–20 ms
- **Kształty skanowania:** kwadrat, koło, trójkąt, sześciokąt, własny
- **Rozstaw punktów:** 0,1–2,0 mm
- **Zasilanie:** AC 220V ±10%, 50Hz
- **Waga netto:** 13 kg

---

## ✅ Podsumowanie

Velure™ 1927 to **laser tulowy nowej generacji**, który łączy bezpieczeństwo, skuteczność i nowoczesną technologię w jednym kompaktowym urządzeniu. Idealny wybór dla profesjonalnych gabinetów medycyny estetycznej i kosmetologii.

**Zainwestuj w jakość – wybierz Velure™ 1927 i oferuj swoim klientom zabiegi, które naprawdę działają.**


`,
      price: "49 900 zł",
      image: "/products/velure.webp",
    },
        {
      title: "DermaPen 4.0",
      slug: "Dermapen",
      description: `## Dermapen 4 – używany, w pełni sprawny, komplet, gwarancja

Urządzenie **Dermapen 4**, używane przez zaledwie **1 miesiąc**, w pełni sprawne technicznie i gotowe do pracy.  
Urządzenie sprzedawane jest **bez oryginalnego pudełka**, jednak w zestawie znajduje się wszystko, co niezbędne do natychmiastowego rozpoczęcia pracy.

### W zestawie:
- Dermapen 4 (oryginalny)  
- Zasilacz sieciowy  
- Ładowarka  
- 3 akumulatory  
- 2 kartridże 16-igłowe  
- Instrukcja obsługi w wersji elektronicznej (na życzenie)

### Dodatkowe informacje:
- Urządzenie objęte **roczną gwarancją**  
- **Brak uszkodzeń mechanicznych**  
- **Bezpiecznie zapakowane do transportu**

To doskonała okazja dla **gabinetów kosmetologicznych**, które chcą rozpocząć lub rozbudować ofertę zabiegów mikronakłuwania za pomocą sprawdzonego, nowoczesnego urządzenia klasy premium.



`,
      price: "3 500 zł",
      image: "/products/dermapen.webp",
    },
  ];
  