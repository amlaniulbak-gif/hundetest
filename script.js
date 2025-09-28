// Global variabler
let currentQuestion = 0;
let userAnswers = {};
let userPriorities = {};
let quizStarted = false;

// Udvidede quiz data med flere nuancerede spørgsmål
const questions = [
    {
        id: 'size',
        text: 'Hvilken størrelse hund foretrækker du?',
        description: 'Tænk på din boligsituation og livsstil',
        options: [
            { text: 'Lille hund (under 10 kg) - let at håndtere', value: 1 },
            { text: 'Lille-medium (10-20 kg) - perfekt balance', value: 2 },
            { text: 'Medium hund (20-30 kg) - familievenlig størrelse', value: 3 },
            { text: 'Stor hund (30-45 kg) - kræver mere plads', value: 4 },
            { text: 'Meget stor hund (over 45 kg) - imponerende størrelse', value: 5 }
        ]
    },
    {
        id: 'alone',
        text: 'Hvor mange timer om dagen kan hunden være alene hjemme?',
        description: 'Vær realistisk omkring din arbejds- og livssituation',
        options: [
            { text: 'Næsten aldrig alene (0-2 timer) - jeg er hjemme det meste af tiden', value: 1 },
            { text: 'Få timer (2-4 timer) - fleksibelt arbejde eller hjemmearbejde', value: 2 },
            { text: 'Halv arbejdsdag (4-6 timer) - normal arbejdstid med pauser', value: 3 },
            { text: 'Fuld arbejdsdag (6-8 timer) - traditionel arbejdstid', value: 4 },
            { text: 'Længere perioder (8+ timer) - lange arbejdsdage eller rejser', value: 5 }
        ]
    },
    {
        id: 'social',
        text: 'Hvor social skal hunden være?',
        description: 'Overvej dit sociale liv og familiesituation',
        options: [
            { text: 'Meget social - elsker alle mennesker og hunde', value: 5 },
            { text: 'Social med familie og venner - varm og velkommende', value: 4 },
            { text: 'Moderat social - varm med familien, neutral med fremmede', value: 3 },
            { text: 'Reserveret men venlig - tager tid at varme op', value: 2 },
            { text: 'Beskyttende/vagthund karakter - loyal men selektiv', value: 1 }
        ]
    },
    {
        id: 'activity',
        text: 'Hvor aktiv er du og din familie?',
        description: 'Tænk på din daglige rutine og fritidsaktiviteter',
        options: [
            { text: 'Meget lidt aktiv - korte gåture og indendørs aktiviteter', value: 1 },
            { text: 'Moderat aktiv - daglige gåture og weekend aktiviteter', value: 2 },
            { text: 'Aktiv - længere ture, løb og regelmæssige outdoor aktiviteter', value: 3 },
            { text: 'Meget aktiv - daglig motion, hundesport og intensive aktiviteter', value: 4 },
            { text: 'Ekstrem aktiv - hundesport, lange vandreture og konstant aktivitet', value: 5 }
        ]
    },
    {
        id: 'experience',
        text: 'Hvor meget erfaring har du med hunde?',
        description: 'Ærlighed her sikrer den bedste anbefaling',
        options: [
            { text: 'Ingen erfaring - dette er min første hund', value: 1 },
            { text: 'Lidt erfaring - har haft hund før som barn eller hjulpet andre', value: 2 },
            { text: 'Moderat erfaring - har ejet flere hunde gennem årene', value: 3 },
            { text: 'Meget erfaren - mange års erfaring med forskellige racer', value: 4 },
            { text: 'Ekspert - træner, avler eller professionel hundearbejder', value: 5 }
        ]
    },
    {
        id: 'grooming',
        text: 'Hvor meget pelspleje kan og vil du håndtere?',
        description: 'Overvej både tid og budget til pelspleje',
        options: [
            { text: 'Minimal - kort pels, sjælden børstning', value: 1 },
            { text: 'Let - ugentlig børstning derhjemme', value: 2 },
            { text: 'Moderat - flere gange ugentlig børstning', value: 3 },
            { text: 'Høj - daglig børstning og regelmæssig pleje', value: 4 },
            { text: 'Maksimal - daglig pleje og professionel klipning hver 6-8 uge', value: 5 }
        ]
    },
    {
        id: 'family',
        text: 'Beskriv din familiesituation:',
        description: 'Tænk på alle medlemmer af husstanden',
        options: [
            { text: 'Single eller par uden børn - roligt voksent hjem', value: 1 },
            { text: 'Familie med baby/småbørn (0-4 år) - behov for tålmodig hund', value: 2 },
            { text: 'Familie med skolebørn (5-12 år) - aktive børn der kan hjælpe', value: 3 },
            { text: 'Familie med teenagere (13+ år) - ansvarlige unge mennesker', value: 4 },
            { text: 'Stor familie eller flere generationer - travlt og socialt hjem', value: 5 }
        ]
    },
    {
        id: 'training',
        text: 'Hvor vigtig er træning og lydighed for dig?',
        description: 'Overvej hvor meget tid du vil bruge på træning',
        options: [
            { text: 'Ikke så vigtig - grundlæggende kommandoer er nok', value: 1 },
            { text: 'Lidt vigtig - god hverdagslydighed ønskes', value: 2 },
            { text: 'Moderat vigtig - ønsker en vellydig hund', value: 3 },
            { text: 'Meget vigtig - høj grad af kontrol og lydighed', value: 4 },
            { text: 'Ekstremt vigtig - perfekt lydighed og avancerede tricks', value: 5 }
        ]
    },
    {
        id: 'noise',
        text: 'Hvor meget gøen og støj kan du tolerere?',
        description: 'Tænk på naboer, arbejde hjemmefra og dit stressniveau',
        options: [
            { text: 'Meget lav tolerance - hunden må næsten ikke gø', value: 1 },
            { text: 'Lav tolerance - kun gøen ved behov (besøgende, fare)', value: 2 },
            { text: 'Moderat tolerance - acceptabel mængde gøen', value: 3 },
            { text: 'Høj tolerance - gøen er naturligt hundeadfærd', value: 4 },
            { text: 'Meget høj tolerance - støj er ikke et problem for mig', value: 5 }
        ]
    },
    {
        id: 'climate',
        text: 'Hvilket klima bor du i, og hvor meget tid tilbringer hunden udendørs?',
        description: 'Nogle racer trives bedre i bestemte klimaer',
        options: [
            { text: 'Køligt klima - hunden er mest indendørs', value: 1 },
            { text: 'Tempereret klima - blandet inde/ude tid', value: 2 },
            { text: 'Mildt klima - meget tid udendørs året rundt', value: 3 },
            { text: 'Varmt klima - begrænset udendørs tid om sommeren', value: 4 },
            { text: 'Varierende klima - hunden skal tilpasse sig årstider', value: 5 }
        ]
    },
    {
        id: 'budget',
        text: 'Hvad er dit månedlige budget til hund (mad, forsikring, dyrlæge, pleje)?',
        description: 'Vær realistisk - hunde kan være dyre i drift',
        options: [
            { text: 'Lavt budget (under 1.500 kr/måned) - grundlæggende behov', value: 1 },
            { text: 'Moderat budget (1.500-2.500 kr/måned) - god standard', value: 2 },
            { text: 'Godt budget (2.500-4.000 kr/måned) - høj standard', value: 3 },
            { text: 'Højt budget (4.000-6.000 kr/måned) - premium pleje', value: 4 },
            { text: 'Ubegrænset budget (over 6.000 kr/måned) - intet er for godt', value: 5 }
        ]
    }
];

// Udvidet hunde database med detaljerede beskrivelser
const dogs = {
    cavalier: {
        name: 'Cavalier King Charles Spaniel',
        category: 'Selskabshund',
        size: 'Lille (5-8 kg)',
        origin: 'Storbritannien',
        lifespan: '12-15 år',
        description: 'Cavalier King Charles Spaniel er den perfekte familiehund for dem, der ønsker en kælen og venlig følgesvend. Oprindeligt avlet som selskabshund for det engelske aristokrati, har denne race bevaret sin elegante og rolige natur. De er kendt for deres silkeagtige pels og store, udtryksfulde øjne, der giver dem et nærmest uimodståeligt udseende.',
        detailedDescription: 'Cavaliers er utroligt tilpasselige hunde, der trives lige så godt i en lejlighed som i et hus med have. De elsker at være tæt på deres familie og er kendt for at være "skødehunde" selv som voksne. Racen er fantastisk med børn af alle aldre og kommer godt ud af det med andre kæledyr. De kræver moderat motion - en eller to gåture dagligt er som regel tilstrækkeligt. Deres største glæde er at være sammen med deres mennesker, hvad enten det er på sofaen eller på en tur i skoven.',
        traits: {
            size: 1,
            alone: 2,
            social: 5,
            activity: 2,
            experience: 1,
            grooming: 3,
            family: 5,
            training: 3,
            noise: 2,
            climate: 3,
            budget: 3
        },
        pros: [
            'Fantastisk familiehund og særligt god med børn',
            'Rolig og kælen personlighed',
            'Tilpasser sig let til forskellige livssituationer',
            'Smuk og elegant udseende',
            'God med andre kæledyr',
            'Moderat motionsbehov'
        ],
        cons: [
            'Kan udvikle separationsangst hvis alene for længe',
            'Sårbar overfor hjertesygdomme',
            'Kræver regelmæssig pelspleje',
            'Kan være tilbøjelig til overvægt',
            'Relativt høje dyrlægeudgifter'
        ],
        idealFor: [
            'Førstegangs hundeejere',
            'Familier med børn',
            'Ældre personer',
            'Lejlighedsbeboere',
            'Dem der ønsker en kælen følgesvend'
        ]
    },
    cockapoo: {
        name: 'Cockapoo',
        category: 'Designerhund (Krydsning)',
        size: 'Lille-Medium (6-15 kg)',
        origin: 'USA (Cocker Spaniel × Pudel)',
        lifespan: '12-16 år',
        description: 'Cockapoo er en charmerende krydsning mellem Cocker Spaniel og Pudel, der kombinerer det bedste fra begge racer. Denne "designerhund" er blevet enormt populær på grund af sin intelligens, venlighed og hypoallergene pels, der gør den perfekt for familier med allergier.',
        detailedDescription: 'Cockapoos findes i forskellige størrelser afhængigt af, om der er brugt en toy-, mini- eller standard pudel i krydsningen. De har arvet pudelens intelligens og træningsvillighed samt cocker spaniels venlige og sociale natur. Deres krøllede eller bølgede pels fælder minimalt og er derfor ideel for allergi-ramte. De trives i næsten alle livssituationer og tilpasser deres energiniveau til familiens. Cockapoos elsker at lære nye ting og er fantastiske til både basic lydighed og avancerede tricks.',
        traits: {
            size: 2,
            alone: 3,
            social: 5,
            activity: 3,
            experience: 1,
            grooming: 4,
            family: 5,
            training: 4,
            noise: 2,
            climate: 3,
            budget: 3
        },
        pros: [
            'Hypoallergene pels - perfekt for allergi-ramte',
            'Meget intelligent og let at træne',
            'Fantastisk familiehund der elsker børn',
            'Tilpasselig til forskellige aktivitetsniveauer',
            'Venskabelig og social personlighed',
            'Kommer i forskellige størrelser'
        ],
        cons: [
            'Kræver professionel pelsklipning hver 6-8 uge',
            'Kan udvikle separationsangst',
            'Højere anskaffelsespris end traditionelle racer',
            'Kan være energisk som ung',
            'Behov for mental stimulation'
        ],
        idealFor: [
            'Familier med allergier',
            'Førstegangs hundeejere',
            'Aktive familier',
            'Dem der vil have en intelligent følgesvend',
            'Familier med børn i alle aldre'
        ]
    },
    french_bulldog: {
        name: 'Fransk Bulldog',
        category: 'Selskabshund',
        size: 'Lille (8-14 kg)',
        origin: 'Frankrig',
        lifespan: '10-12 år',
        description: 'Den Franske Bulldog, eller "Frenchie" som den kærligt kaldes, er blevet byens absolutte favorithund. Med sine karakteristiske "flagermusører" og flade ansigt er den blevet et ikon for moderne byboere, der ønsker en rolig og charmerende følgesvend.',
        detailedDescription: 'Fransk Bulldog er den perfekte byhund - rolig, tilpasselig og med minimale motionsbehov. De er kendt for deres komiske personlighed og evne til at læse deres ejeres stemninger. Trods deres lille størrelse har de en stolt og selvsikker holdning. De trives bedst i tempererede klimaer og skal beskyttes mod ekstrem varme på grund af deres flade ansigt. Racen er fantastisk til lejlighedsliv og kræver ikke store mængder motion, selvom de nyder daglige gåture og leg.',
        traits: {
            size: 1,
            alone: 3,
            social: 4,
            activity: 1,
            experience: 1,
            grooming: 1,
            family: 4,
            training: 2,
            noise: 2,
            climate: 2,
            budget: 4
        },
        pros: [
            'Perfekt til lejlighedsliv og byboere',
            'Lavt motionsbehov - korte gåture er nok',
            'Charmerende og komisk personlighed',
            'Minimal pelspleje påkrævet',
            'God med børn og andre dyr',
            'Rolig indendørs'
        ],
        cons: [
            'Vejrtrækningsproblemer på grund af fladt ansigt',
            'Meget høj anskaffelsespris',
            'Problemer med varmt vejr',
            'Kan være stædig at træne',
            'Tilbøjelig til forskellige sundhedsproblemer',
            'Høje dyrlægeudgifter'
        ],
        idealFor: [
            'Byboere og lejlighedsbeboere',
            'Travle personer med begrænset tid',
            'Dem der ønsker lav-vedligeholdelse hund',
            'Førstegangs hundeejere',
            'Ældre personer'
        ]
    },
    beagle: {
        name: 'Beagle',
        category: 'Jagthund',
        size: 'Medium (9-11 kg)',
        origin: 'England',
        lifespan: '12-15 år',
        description: 'Beagle er en medium-lille jagthund med et venskabeligt temperament og en utrolig lugtesans. Oprindeligt avlet til at jage harer, har denne race udviklet sig til en populær familiehund, der kombinerer sin jagt-arv med en kærlig og social natur.',
        detailedDescription: 'Beagles er kendt for deres venlige og udgående personlighed. De elsker at være sammen med mennesker og andre hunde, hvilket gør dem til fantastiske familiehunde. Deres stærke jagt-instinkt betyder, at de kan følge interessante dufte og "glemme" alt andet omkring sig. De er energiske hunde, der nyder lange gåture og leg, men de er også glade for at slappe af hjemme. Beagles er kendt for deres karakteristiske hyl og gøen, hvilket kan være en udfordring i tæt bebyggede områder.',
        traits: {
            size: 2,
            alone: 3,
            social: 5,
            activity: 3,
            experience: 2,
            grooming: 1,
            family: 5,
            training: 3,
            noise: 4,
            climate: 3,
            budget: 2
        },
        pros: [
            'Fantastisk familiehund og social med alle',
            'God størrelse - ikke for lille eller stor',
            'Robust sundhed og lang levetid',
            'Minimal pelspleje påkrævet',
            'Elsker børn og er meget tålmodig',
            'Relativt nemme at pleje økonomisk'
        ],
        cons: [
            'Meget vokal - hyler og gør ofte',
            'Stærk jagt-instinkt kan føre til at de stikker af',
            'Kan være stædige at træne',
            'Tilbøjelige til overvægt',
            'Behov for meget mental stimulation',
            'Kan ikke lades løs uden snor i utrygge områder'
        ],
        idealFor: [
            'Aktive familier med børn',
            'Dem der kan håndtere støj',
            'Erfarne hundeejere',
            'Familier med stor have eller adgang til natur',
            'Dem der ønsker en social og venlig hund'
        ]
    },
    cocker_spaniel: {
        name: 'Cocker Spaniel',
        category: 'Jagthund',
        size: 'Medium (12-16 kg)',
        origin: 'England',
        lifespan: '12-14 år',
        description: 'Cocker Spaniel er en elegant jagthund, der har vundet hjerterne som familiehund. Med deres silkeagtige pels og venlige øjne er de både smukke og kærlige følgesvende, der trives i aktive familier.',
        detailedDescription: 'Cocker Spaniels kombinerer skønhed med funktionalitet. De er energiske og intelligente hunde, der elsker at arbejde og lege. Deres oprindelige formål som jagthunde betyder, at de har masser af energi og en stærk vilje til at behage. De kræver regelmæssig motion og mental stimulation for at være lykkelige. Deres smukke pels er deres stolthed, men kræver også daglig pleje for at se bedst ud. Cocker Spaniels er kendt for deres "frøkne hale", der aldrig holder op med at vifte, når de er glade.',
        traits: {
            size: 2,
            alone: 2,
            social: 4,
            activity: 4,
            experience: 2,
            grooming: 4,
            family: 4,
            training: 4,
            noise: 3,
            climate: 3,
            budget: 3
        },
        pros: [
            'Smuk og elegant udseende',
            'Intelligent og træningsvillig',
            'Fantastisk familiegenlighed',
            'Energisk og elsker aktiviteter',
            'God med børn når socialiseret korrekt',
            'Alsidige hunde der kan bruges til mange ting'
        ],
        cons: [
            'Kræver daglig børstning og regelmæssig professionel pleje',
            'Kan være følsomme og have temperament',
            'Behov for meget motion og mental stimulation',
            'Tilbøjelige til øre-infektioner',
            'Kan udvikle separationsangst'
        ],
        idealFor: [
            'Aktive familier der elsker udendørs aktiviteter',
            'Dem der har tid til daglig pelspleje',
            'Erfarne hundeejere eller dem villige til at lære',
            'Familier der ønsker en smuk og intelligent hund'
        ]
    },
    labrador: {
        name: 'Labrador Retriever',
        category: 'Apporterende hund',
        size: 'Stor (25-36 kg)',
        origin: 'Canada',
        lifespan: '10-12 år',
        description: 'Labrador Retriever er Danmarks mest elskede familiehund og samtidig en af verdens mest populære hunderacer. Kendt for deres venlige natur, intelligens og alsidighed, er Labs den perfekte kombination af familiemedlem, legekammerat og loyale følgesvend.',
        detailedDescription: 'Labradors er født med en naturlig kærlighed til mennesker og et ønske om at behage. De excel i næsten alle aspekter af hundeliv - fra at være familiekæledyr til service- og arbejdshunde. Deres høje energiniveau som unge hunde kræver konsekvent motion og træning, men de modnes til rolige og pålidelige voksne hunde. Labs elsker vand og er naturlige svømmere. De er kendt for deres "bløde mund", hvilket gør dem fantastiske apportører. Deres tykke dobbeltpels beskytter dem i koldt vejr, men betyder også at de fælder en del.',
        traits: {
            size: 4,
            alone: 3,
            social: 5,
            activity: 4,
            experience: 2,
            grooming: 2,
            family: 5,
            training: 5,
            noise: 2,
            climate: 4,
            budget: 3
        },
        pros: [
            'Fantastisk familiehund - elsker børn',
            'Ekstremt intelligent og let at træne',
            'Venlig og social med alle',
            'Alsidige - kan bruges til mange aktiviteter',
            'Loyal og pålidelig',
            'God sundhed og robust konstitution'
        ],
        cons: [
            'Kræver meget daglig motion',
            'Fælder enormt meget året rundt',
            'Kan blive overvægtige hvis ikke motioneret nok',
            'Høj energi som unge hunde (0-3 år)',
            'Stor appetit - spiser næsten alt',
            'Behov for mental stimulation'
        ],
        idealFor: [
            'Aktive familier med børn',
            'Dem med tid til daglig motion og træning',
            'Familier med have eller adgang til natur',
            'Dem der ønsker en træningspartner',
            'Erfarne eller dedikerede førstegangs ejere'
        ]
    },
    golden_retriever: {
        name: 'Golden Retriever',
        category: 'Apporterende hund',
        size: 'Stor (25-34 kg)',
        origin: 'Skotland',
        lifespan: '10-12 år',
        description: 'Golden Retriever er synonymet med den perfekte familiehund. Med deres gyldne pels og endnu mere gyldne hjerte er de kendt verden over for deres tålmodighed, intelligens og ubetingede kærlighed til deres familie, især børn.',
        detailedDescription: 'Golden Retrievers er måske de mest tålmodige hunde, der findes, hvilket gør dem utrolige med børn af alle aldre. De har en naturlig intuition for, hvordan de skal opføre sig omkring små børn versus teenagere eller voksne. Deres intelligens gør dem ikke kun lette at træne, men også ivrige efter at lære og behage. De trives på struktur og rutiner og elsker at have "jobs" at udføre. Deres lange, gyldne pels er smuk, men kræver daglig børstning for at undgå filtrering. Goldens er aktive hunde, der elsker lange gåture, svømning og apporterings-lege.',
        traits: {
            size: 4,
            alone: 3,
            social: 5,
            activity: 4,
            experience: 2,
            grooming: 4,
            family: 5,
            training: 5,
            noise: 2,
            climate: 3,
            budget: 3
        },
        pros: [
            'Utrolig tålmodig og kærlig med børn',
            'Ekstremt intelligent - lærer hurtigt',
            'Smuk og elegant udseende',
            'Fantastisk temperament og social',
            'Alsidige - familiehund og arbejdshund',
            'Loyal og dedikeret til familien'
        ],
        cons: [
            'Fælder enormt meget - daglig støvsugning nødvendig',
            'Kræver daglig børstning af lang pels',
            'Høje motionsbehov - minimum 1-2 timer dagligt',
            'Kan blive mudrede og beskidte på ture',
            'Tilbøjelige til cancer i ældre år',
            'Bringer snavs ind i huset med pelsen'
        ],
        idealFor: [
            'Familier med børn - især små børn',
            'Dem med tid til daglig pelspleje',
            'Aktive familier der elsker udendørs aktiviteter',
            'Dem der ønsker en smuk og kærlig følgesvend',
            'Familier med erfaring eller villighed til at lære'
        ]
    },
    border_collie: {
        name: 'Border Collie',
        category: 'Hyrdehund',
        size: 'Medium-Stor (14-20 kg)',
        origin: 'Skotland/England grænse',
        lifespan: '12-15 år',
        description: 'Border Collie er anerkendt som verdens mest intelligente hunderace. Oprindeligt avlet til at vogte får i de skotske højlande, besidder disse hunde en utrolig arbejdsvilje, intelligens og intensitet, der kræver erfarne ejere.',
        detailedDescription: 'Border Collies er ikke blot intelligente - de er geniale. De kan lære komplekse kommandoer på få gentagelser og husker dem livet ud. Men med stor intelligens kommer stort ansvar - de SKAL have mentale udfordringer dagligt, ellers bliver de destruktive eller udvikler tvangstanker. De er arbejdshunde i sjælen og har brug for et "job" - hvad enten det er hundesport, daglige træningsøvelser, eller faktisk hyrdegør. Deres intense blik og fokus kan være overvældende for små børn eller andre dyr. De excel i hundesport som agility, obedience og herding trials.',
        traits: {
            size: 3,
            alone: 2,
            social: 3,
            activity: 5,
            experience: 5,
            grooming: 3,
            family: 3,
            training: 5,
            noise: 3,
            climate: 4,
            budget: 3
        },
        pros: [
            'Verdens mest intelligente hunderace',
            'Utrolig træningsvillig og lærer alt',
            'Fantastisk til hundesport og aktiviteter',
            'Loyal og dedikeret til deres ejer',
            'Robust sundhed og god levetid',
            'Kan lære at udføre komplekse opgaver'
        ],
        cons: [
            'Kræver MEGET mental og fysisk stimulation dagligt',
            'Ikke egnet til uerfarne hundeejere',
            'Kan blive destruktive eller tvangsagtige hvis kedelige',
            'Intensitet kan være overvældende for børn',
            'Hyrdeingtinkt kan føre til at de "hyrder" børn og andre dyr',
            'Kan være for smarte til deres eget bedste'
        ],
        idealFor: [
            'Meget erfarne hundeejere',
            'Aktive mennesker med tid til daglige udfordringer',
            'Hundesport entusiaster',
            'Dem der ønsker en intelligente arbejdspartner',
            'Mennesker med store haver eller adgang til åbne områder'
        ]
    },
    german_shepherd: {
        name: 'Tysk Schæferhund',
        category: 'Hyrdehund/Arbejdshund',
        size: 'Stor (22-40 kg)',
        origin: 'Tyskland',
        lifespan: '9-13 år',
        description: 'Tysk Schæferhund er en af verdens mest alsidige og respekterede arbejdshunde. Kendt for deres mod, loyalitet og intelligens, bruges de som politihunde, militærhunde, servicehunde og ikke mindst som dedikerede familiebeskyttere.',
        detailedDescription: 'Tyske Schæferhunde er født beskyttere med en naturlig vagt-instinkt, der gør dem utroligt loyale overfor deres familie. De er ikke blot store og imponerende - de er også utrolig intelligente og træningsvillige. Men denne race kræver konsekvent lederskab og socialisering fra ung alder. De har brug for et klart hierarki og trives under struktur. Som arbejdshunde har de høje motions- og mentale stimulationsbehov. De excel i beskyttelsesarbejde, lydighed og mange former for hundesport. Deres dobbeltpels fælder meget, især to gange årligt hvor de "skifter pels".',
        traits: {
            size: 5,
            alone: 4,
            social: 2,
            activity: 4,
            experience: 5,
            grooming: 3,
            family: 3,
            training: 4,
            noise: 3,
            climate: 4,
            budget: 4
        },
        pros: [
            'Utrolig loyal og beskyttende overfor familien',
            'Meget intelligent og træningsvillig',
            'Fremragende vagthund egenskaber',
            'Alsidige - mange anvendelsesmuligheder',
            'Imponerende udseende og præsence',
            'Stærk og atletisk'
        ],
        cons: [
            'Kræver meget erfarne og konsekvente ejere',
            'Kan være territorial og beskyttende overfor fremmede',
            'Høje motions- og træningsbehov',
            'Fælder enormt meget',
            'Kan udvikle separationsangst',
            'Potentielle hofteledsproblemer',
            'Høje forsikrings- og dyrlægeudgifter'
        ],
        idealFor: [
            'Meget erfarne hundeejere',
            'Dem der ønsker en beskyttelseshund',
            'Aktive mennesker med tid til træning',
            'Familier med teenagere eller voksne børn',
            'Dem med sikker indhegnet have',
            'Mennesker der respekterer kraftfulde hunde'
        ]
    }
};

// Event listeners for sliders
document.addEventListener('DOMContentLoaded', function() {
    // Setup priority sliders
    const priorities = ['size', 'alone', 'social', 'activity', 'experience', 'grooming', 'family', 'training', 'noise'];
    
    priorities.forEach(priority => {
        const slider = document.getElementById(priority + '-priority');
        const valueDisplay = document.getElementById(priority + '-priority-value');
        
        if (slider && valueDisplay) {
            slider.addEventListener('input', function() {
                valueDisplay.textContent = this.value;
                userPriorities[priority] = parseInt(this.value);
            });
            
            // Initialize
            userPriorities[priority] = parseInt(slider.value);
        }
    });
});

function startQuiz() {
    document.getElementById('priorities-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    quizStarted = true;
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    const container = document.getElementById('question-container');
    
    // Update progress
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    
    container.innerHTML = `
        <div class="question-card">
            <h3 class="question-text">${question.text}</h3>
            ${question.description ? `<p class="question-description">${question.description}</p>` : ''}
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectAnswer('${question.id}', ${option.value}, this)">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
            <div class="navigation">
                <button class="prev-btn" onclick="previousQuestion()" ${currentQuestion === 0 ? 'style="visibility:hidden"' : ''}>
                    ← Forrige
                </button>
                <button class="next-btn" id="next-btn" onclick="nextQuestion()" disabled>
                    ${currentQuestion === questions.length - 1 ? 'Se Resultater' : 'Næste →'}
                </button>
            </div>
        </div>
    `;
    
    // Restore previous answer if exists
    if (userAnswers[question.id]) {
        const options = container.querySelectorAll('.option');
        const answerIndex = question.options.findIndex(opt => opt.value === userAnswers[question.id]);
        if (answerIndex !== -1 && options[answerIndex]) {
            options[answerIndex].classList.add('selected');
            document.getElementById('next-btn').disabled = false;
        }
    }
}

function selectAnswer(questionId, value, element) {
    // Remove selection from other options
    const options = element.parentNode.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selection to clicked option
    element.classList.add('selected');
    
    // Store answer
    userAnswers[questionId] = value;
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function calculateResults() {
    const results = [];
    
    Object.keys(dogs).forEach(dogKey => {
        const dog = dogs[dogKey];
        let totalScore = 0;
        let maxPossibleScore = 0;
        
        Object.keys(dog.traits).forEach(trait => {
            const userAnswer = userAnswers[trait] || 3;
            const dogTrait = dog.traits[trait];
            const priority = userPriorities[trait] || 3;
            
            // Beregn kompatibilitet (jo tættere på, jo bedre)
            const difference = Math.abs(userAnswer - dogTrait);
            const compatibility = Math.max(0, 5 - difference);
            
            // Vægt med brugerens prioritet
            const weightedScore = compatibility * priority;
            totalScore += weightedScore;
            maxPossibleScore += 5 * priority;
        });
        
        const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
        
        results.push({
            dog: dog,
            score: percentage,
            key: dogKey
        });
    });
    
    return results.sort((a, b) => b.score - a.score);
}

function showResults() {
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
    
    displayResults();
    createAdjustmentSliders();
}

function displayResults() {
    const results = calculateResults();
    const container = document.getElementById('results-container');
    
    container.innerHTML = results.map((result, index) => `
        <div class="breed-result ${index === 0 ? 'top-match' : ''}">
            <div class="breed-header">
                <div>
                    <div class="breed-name">${index + 1}. ${result.dog.name}</div>
                    <div class="breed-category">${result.dog.category} • ${result.dog.origin} • ${result.dog.lifespan}</div>
                </div>
                <div class="breed-score">${result.score}%</div>
            </div>
            
            <div class="breed-description">
                ${result.dog.description}
            </div>
            
            <div class="breed-details">
                <div class="detail-item">
                    <span class="detail-label">Størrelse</span>
                    <span class="detail-value">${result.dog.size}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Levetid</span>
                    <span class="detail-value">${result.dog.lifespan}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Oprindelse</span>
                    <span class="detail-value">${result.dog.origin}</span>
                </div>
            </div>
            
            <div class="breed-traits">
                <h4>Egenskaber (1-5 skala):</h4>
                ${Object.entries(result.dog.traits).map(([trait, value]) => `
                    <div class="trait-item">
                        <span class="trait-name">${getTraitName(trait)}</span>
                        <div class="trait-stars">
                            ${Array.from({length: 5}, (_, i) => 
                                `<span class="star ${i < value ? 'filled' : ''}">★</span>`
                            ).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="breed-pros-cons">
                <div class="pros">
                    <h4>✅ Fordele:</h4>
                    <ul>
                        ${result.dog.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="cons">
                    <h4>⚠️ Udfordringer:</h4>
                    <ul>
                        ${result.dog.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(76, 175, 80, 0.05); border-radius: 8px;">
                <strong>💡 Detaljeret beskrivelse:</strong>
                <p style="margin-top: 0.5rem; line-height: 1.6;">${result.dog.detailedDescription}</p>
            </div>
            
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(33, 150, 243, 0.05); border-radius: 8px;">
                <strong>🎯 Perfekt til:</strong>
                <ul style="margin-top: 0.5rem;">
                    ${result.dog.idealFor.map(ideal => `<li>${ideal}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function createAdjustmentSliders() {
    const container = document.getElementById('adjust-sliders');
    const priorities = ['size', 'alone', 'social', 'activity', 'experience', 'grooming', 'family', 'training', 'noise'];
    
    container.innerHTML = priorities.map(priority => `
        <div class="slider-container">
            <label for="adjust-${priority}">${getTraitName(priority)}:</label>
            <div class="slider-wrapper">
                <span>Ikke vigtig</span>
                <input type="range" id="adjust-${priority}" min="1" max="5" value="${userPriorities[priority] || 3}">
                <span>Meget vigtig</span>
            </div>
            <div class="value">Vægt: <span id="adjust-${priority}-value">${userPriorities[priority] || 3}</span></div>
        </div>
    `).join('');
    
    // Add event listeners to adjustment sliders
    priorities.forEach(priority => {
        const slider = document.getElementById(`adjust-${priority}`);
        const valueDisplay = document.getElementById(`adjust-${priority}-value`);
        
        if (slider && valueDisplay) {
            slider.addEventListener('input', function() {
                valueDisplay.textContent = this.value;
                userPriorities[priority] = parseInt(this.value);
            });
        }
    });
}

function recalculateResults() {
    displayResults();
    
    // Scroll to results
    document.getElementById('results-container').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function getTraitName(trait) {
    const names = {
        size: 'Størrelse',
        alone: 'Alene hjemme',
        social: 'Social adfærd',
        activity: 'Aktivitetsniveau',
        experience: 'Erfaring krævet',
        grooming: 'Pelspleje',
        family: 'Familie-venlighed',
        training: 'Træning & lydighed',
        noise: 'Støjniveau',
        climate: 'Klima tolerance',
        budget: 'Budget krav'
    };
    return names[trait] || trait;
}

function restartTest() {
    currentQuestion = 0;
    userAnswers = {};
    // Don't reset priorities - user might want to keep them
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('priorities-section').style.display = 'block';
}

function shareResults() {
    const results = calculateResults();
    const topDog = results[0];
    
    const shareText = `🐕 Jeg tog hundevalgstesten og fik ${topDog.dog.name} som min perfekte match med ${topDog.score}% kompatibilitet! Tag testen selv og find din perfekte hundeven.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Min perfekte hund',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
            alert('Resultatet er kopieret til udklipsholderen!');
        }).catch(() => {
            // Final fallback
            const textArea = document.createElement('textarea');
            textArea.value = shareText + ' ' + window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Resultatet er kopieret til udklipsholderen!');
        });
    }
}
