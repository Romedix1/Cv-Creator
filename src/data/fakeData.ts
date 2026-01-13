import { ResumeData } from "@/types/resumeData";

export const FAKE_DATA: ResumeData = {
    personalInfo: {
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
        firstName: "Jan",
        lastName: "Kowalski",
        jobTitle: "Senior Product Manager",
        phone: "+48 600 700 800",
        email: "jan.kowalski@example.com",
        address: "Warszawa, Polska",
        profile: "Kreatywny Senior Product Manager z ponad 7-letnim doświadczeniem w tworzeniu produktów cyfrowych dla sektorów FinTech i SaaS. Ekspert w łączeniu potrzeb użytkowników z celami biznesowymi. Posiadam udokumentowane sukcesy w zwiększaniu zaangażowania użytkowników o 20% dzięki intuicyjnym rozwiązaniom.",
        links: [
            { id: "1", platform: "LinkedIn", url: "https://linkedin.com/in/jankowalsddsdddki" },
            { id: "2", platform: "Website", url: "https://jankowalski.com" },
            { id: "3", platform: "github", url: "https://github.com/jankowalski" }
        ]
    },
    experience: [
        {
            id: "exp-1",
            position: "Senior Product Manager",
            company: "Tech Solutions Sp. z o.o.",
            startDate: "03.2021",
            endDate: "Obecnie",
            description: [
                { id: "d-1-1", value: "Zarządzanie 10-osobowym zespołem produktowym i deweloperskim." },
                { id: "d-1-2", value: "Zwiększenie konwersji sprzedaży o 25% w ciągu pierwszego roku." },
                { id: "d-1-3", value: "Wdrożenie nowej strategii roadmapy produktowej." }
            ]
        },
        {
            id: "exp-2",
            position: "Product Owner",
            company: "Creative Apps Ltd.",
            startDate: "02.2018",
            endDate: "02.2021",
            description: [
                { id: "d-2-1", value: "Skuteczne wdrożenie metodyki Scrum w nowym zespole." },
                { id: "d-2-2", value: "Nadzór nad pełnym cyklem życia aplikacji mobilnej." },
                { id: "d-2-3", value: "Redukcja długu technologicznego o 15%." }
            ]
        }
    ],
    education: [
        {
            id: "edu-1",
            institution: "Politechnika Warszawska",
            major: "Informatyka",
            degree: "Magister Inżynier",
            startDate: "10.2019",
            endDate: "06.2021"
        },
        {
            id: "edu-2",
            institution: "Politechnika Warszawska",
            major: "Informatyka",
            degree: "Inżynier",
            startDate: "10.2015",
            endDate: "06.2019"
        }
    ],
    skillsType: "categories",
    skillsCat: [
        {
            id: "cat-1",
            name: "Zarządzanie",
            skills: [
                { id: "s-1-1", name: "Agile & Scrum", level: "Expert" },
                { id: "s-1-2", name: "Strategia Produktu", level: "Advanced" },
                { id: "s-1-3", name: "Zarządzanie Zespołem", level: "Advanced" }
            ]
        },
        {
            id: "cat-2",
            name: "Narzędzia",
            skills: [
                { id: "s-2-1", name: "Jira / Confluence", level: "Expert" },
                { id: "s-2-2", name: "Figma", level: "Intermediate" },
                { id: "s-2-3", name: "Google Analytics", level: "Advanced" }
            ]
        }
    ],
    languages: [
        { id: "l-1", value: "Angielski", level: "C1" },
        { id: "l-2", value: "Niemiecki", level: "B2" }
    ],
    certificates: [
        {
            id: "c-1",
            name: "AWS Certified Cloud Practitioner",
            organizer: "Amazon Web Services",
            date: "05.2023"
        },
        {
            id: "c-2",
            name: "Google UX Design Professional Certificate",
            organizer: "Coursera",
            date: "11.2022"
        }
    ],
    interests: [
        { id: "int-1", name: "Nowe Technologie", value: "AI, IoT" },
        { id: "int-2", name: "Sport", value: "Squash, Bieganie" }
    ],
    customSection: [
        {
            id: "cust-1",
            title: "Wyróżnienia",
            type: "list",
            layout: "left",
            items: [
                {
                    id: "it-1",
                    title: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                    elements: [
                        { id: "el-1", type: "text", value: "1. Miejsce Hackathon 2021" },
                        { id: "el-2", type: "text", value: "Stypendium Rektora" },
                        { id: "el-3", type: "text", value: "Pracownik Roku 2022" }
                    ]
                }
            ]
        },
        {
            id: "cust-2",
            title: "Wolontariat",
            type: "text",
            layout: "center",
            items: [
                {
                    id: "vol-1",
                    title: "Szlachetna Paczka",
                    startDate: "2019",
                    endDate: "2021",
                    description: "Koordynacja działań zespołu wolontariuszy w rejonie Warszawa-Mokotów. Odpowiedzialność za logistykę i kontakt z darczyńcami.",
                    elements: []
                },
                {
                    id: "vol-2",
                    title: "Mentoring IT",
                    startDate: "",
                    endDate: "",
                    description: "Prowadzenie darmowych warsztatów z podstaw zarządzania produktem dla osób wykluczonych cyfrowo.",
                    elements: []
                }
            ]
        },
        {
            id: "cust-3",
            title: "Kluczowe Projekty",
            type: "detailed",
            layout: "center",
            items: [
                {
                    id: "proj-1",
                    title: "System CRM dla Bankowości",
                    startDate: "01.2022",
                    endDate: "12.2022",
                    description: "",
                    elements: [
                        { id: "pe-1", type: "text", value: "Zaprojektowanie architektury informacji dla 5000+ użytkowników." },
                        { id: "pe-2", type: "text", value: "Redukcja czasu obsługi klienta o 30%." }
                    ]
                },
                {
                    id: "proj-2",
                    title: "Aplikacja Mobilna E-commerce",
                    startDate: "06.2021",
                    endDate: "12.2021",
                    description: "",
                    elements: [
                        { id: "pe-3", type: "text", value: "Wdrożenie płatności BLIK i Apple Pay." },
                        { id: "pe-4", type: "text", value: "Osiągnięcie oceny 4.8 w App Store." }
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
}
