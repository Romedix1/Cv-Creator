import { ResumeData } from "@/types/resumeData";

export const LONG_FAKE_DATA: ResumeData = {
    personalInfo: {
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
        firstName: "Maksymilian Włodzimierz",
        lastName: "Brzęczyszczykiewicz-Grzegorzewski (Hrabia von Tyszkiewicz)",
        jobTitle: "Senior Executive Vice President of Global Strategic Operations & International Business Development Director (Interim)",
        phone: "+48 600 700 800 (numer prywatny) / +1 555 0199 (biuro USA)",
        email: "maksymilian.wlodzimierz.brzeczyszczykiewicz.grzegorzewski.prywatny@bardzo-dluga-domena-firmowa-w-polsce.com.pl",
        address: "Aleje Jerozolimskie 123/45 m. 789, 00-950 Warszawa-Śródmieście, Polska (Województwo Mazowieckie)",
        profile: "Jestem wysokiej klasy ekspertem z ponad 25-letnim doświadczeniem w zarządzaniu procesami transformacji cyfrowej w międzynarodowych korporacjach o strukturze rozproszonej. Specjalizuję się w optymalizacji łańcucha dostaw poprzez implementację zaawansowanych algorytmów sztucznej inteligencji oraz uczenia maszynowego, co w moich poprzednich projektach skutkowało redukcją kosztów operacyjnych o ponad 45% w skali roku fiskalnego. Poszukuję wyzwań, które pozwolą mi wykorzystać moje unikalne kompetencje.",
        links: [
            { id: "1", platform: "LinkedIn", url: "https://linkedin.com/in/maksymilian-brzeczyszczykiewicz-super-senior-profile-updated-2024" },
            { id: "2", platform: "Portfolio", url: "https://mojeportfolio.com/bardzodluganazwaprojektuktoranielamiesienaturalnieboniemaspacji" },
            { id: "3", platform: "Github", url: "https://github.com/bardzo-dlugi-nick-uzytkownika/bardzo-dluga-nazwa-repozytorium" }
        ]
    },
    experience: [
        {
            id: "exp-1",
            position: "Chief Executive Officer & Founder",
            company: "Pneumonoultramicroscopicsilicovolcanoconiosis Solutions International Group Spółka z ograniczoną odpowiedzialnością",
            startDate: "Styczeń 2020",
            endDate: "Obecnie (Urlop Sabbatical)",
            description: [
                { id: "d-1-1", value: "Odpowiedzialność za kompleksową restrukturyzację działu IT obejmującą 500 pracowników w 15 krajach, co wymagało codziennej koordynacji w 4 strefach czasowych oraz negocjacji z międzynarodowymi związkami zawodowymi w celu wypracowania kompromisu." },
                { id: "d-1-2", value: "Odpowiedzialność_za_moduł_bezpieczeństwa_ERROR_LOG_X78932478238947238947892374892374892374892378947238947238947_Koniec_Loga_Test_Break_All" },
                { id: "d-1-3", value: "Zarządzanie budżetem rocznym w wysokości 500,000,000 PLN." }
            ]
        },
        {
            id: "exp-2",
            position: "Senior Project Manager (Wdrożenia Systemów ERP)",
            company: "Przedsiębiorstwo Robót Inżynieryjnych i Budowlanych S.A.",
            startDate: "Marzec 2010",
            endDate: "Grudzień 2019",
            description: [
                { id: "d-2-1", value: "Nadzór nad realizacją kluczowych inwestycji strategicznych dla sektora energetycznego w Polsce." },
                { id: "d-2-2", value: "Koordynacja pracy podwykonawców." },
                { id: "d-2-3", value: "Przygotowywanie dokumentacji przetargowej zgodnie z Prawem Zamówień Publicznych." },
                { id: "d-2-4", value: "Reprezentowanie spółki w kontaktach z urzędami centralnymi." },
                { id: "d-2-5", value: "Opracowywanie harmonogramów rzeczowo-finansowych." },
                { id: "d-2-6", value: "Rozliczanie dotacji unijnych z Programu Operacyjnego Infrastruktura i Środowisko." }
            ]
        }
    ],
    education: [
        {
            id: "edu-1",
            institution: "Uniwersytet im. Adama Mickiewicza w Poznaniu (Wydział Matematyki, Fizyki, Informatyki i Astronomii)",
            major: "Informatyka Stosowana i Systemy Przetwarzania Danych Masowych",
            degree: "Magister Inżynier Architekt Systemów",
            startDate: "Październik 2015",
            endDate: "Czerwiec 2020"
        }
    ],
    skillsType: "categories",
    skillsCat: [
        {
            id: "cat-1",
            name: "Zarządzanie Zasobami Ludzkimi i Psychologia Biznesu",
            skills: [
                { id: "s-1-1", name: "Rozwiązywanie konfliktów w zespołach rozproszonych", level: "Expert" },
                { id: "s-1-2", name: "Budowanie strategii employer brandingowych", level: "Advanced" },
                { id: "s-1-3", name: "Negocjacje handlowe z klientami kluczowymi", level: "Expert" }
            ]
        },
        {
            id: "cat-2",
            name: "Certyfikaty Branżowe i Uprawnienia Państwowe",
            skills: [
                { id: "s-2-1", name: "Uprawnienia Budowlane do projektowania bez ograniczeń", level: "Expert" },
                { id: "s-2-2", name: "Certyfikat Biegłego Rewidenta (Krajowa Izba)", level: "Advanced" }
            ]
        }
    ],
    languages: [
        { id: "l-1", value: "Angielski (Specjalistyczny Techniczny)", level: "C2 (Proficiency)" },
        { id: "l-2", value: "Niemiecki (Dialekt Szwajcarski)", level: "B2/C1" },
        { id: "l-3", value: "Hiszpański (Ameryka Łacińska)", level: "B1" }
    ],
    certificates: [
        {
            id: "c-1",
            name: "AWS Certified Solutions Architect – Professional Level (Global Certification Program)",
            organizer: "Amazon Web Services Inc. (Seattle HQ)",
            date: "Maj 2023"
        }
    ],
    interests: [
        {
            id: "int-1",
            name: "Literatura Faktu i Reportaż",
            value: "Czytanie monografii historycznych dotyczących okresu międzywojennego w Europie Środkowej, kolekcjonowanie pierwodruków polskiej szkoły reportażu, analiza geopolityczna regionu." 
        },
        {
            id: "int-2",
            name: "Sporty Wytrzymałościowe",
            value: "Udział w ultramaratonach górskich na dystansie powyżej 100km (Bieg Rzeźnika, Łemkowyna Ultra Trail), Triathlon na dystansie Ironman."
        }
    ],
    customSection: [
        {
            id: "cust-1",
            title: "Osiągnięcia Pozazawodowe i Wolontariat",
            type: "list",
            layout: "left",
            items: [
                {
                    id: "it-1",
                    title: "", description: "", startDate: "", endDate: "",
                    elements: [
                        { id: "el-1", type: "text", value: "Organizator charytatywnego balu dla fundacji wspierającej dzieci z chorobami onkologicznymi (zebrano 200 tys. PLN)." },
                        { id: "el-2", type: "text", value: "Prezes Koła Naukowego Studentów Informatyki i Robotyki Politechniki Warszawskiej w latach 2018-2020." }
                    ]
                }
            ]
        }
    ],
    rodoSection: [{
        id: "rodo-1",
        type: "standard",
        value: "Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji obecnego oraz przyszłych procesów rekrutacyjnych zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).",
        company: ""
    }]
};