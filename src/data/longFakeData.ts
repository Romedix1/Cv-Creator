import { ResumeData } from "@/types/resumeData";

export const LONG_FAKE_DATA: ResumeData = {
    personalInfo: {
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
        firstName: "Aleksander Maksymilian",
        lastName: "Wojciechowski-Kowalski",
        jobTitle: "Senior Full Stack Cloud Architect & Lead Developer",
        phone: "+48 123 456 789",
        email: "aleksander.maksymilian.wojciechowski@enterprise-solutions.com",
        address: "ul. Powstańców Wielkopolskich 123/45A, 00-001 Warszawa, Polska",
        profile: "Innowacyjny architekt rozwiązań chmurowych z ponad 10-letnim doświadczeniem w projektowaniu skalowalnych systemów rozproszonych. Specjalizuję się w transformacji cyfrowej przedsiębiorstw z sektora bankowego i e-commerce. Skutecznie łączę głęboką wiedzę techniczną (React, Node.js, AWS) z umiejętnościami strategicznego zarządzania produktem. Mentor i lider zespołów technologicznych, skoncentrowany na optymalizacji procesów CI/CD oraz wdrażaniu standardów Clean Code i architektury Hexagonalnej.",
        links: [
            { id: "1", platform: "LinkedIn", url: "https://linkedin.com/in/aleksander-wojciechowski-architect" },
            { id: "2", platform: "GitHub", url: "https://github.com/aleks-architect-dev" },
            { id: "3", platform: "Website", url: "https://wojciechowski-tech.io" },
            { id: "4", platform: "Twitter", url: "https://twitter.com/aleks_tech" }
        ]
    },
    experience: [
        {
            id: "exp-1",
            position: "Senior Lead Cloud Architect",
            company: "Global FinTech Hub Sp. z o.o.",
            startDate: "01.2021",
            endDate: "Obecnie",
            description: [
                { id: "d-1-1", value: "Projektowanie i nadzór nad migracją monolitycznego systemu transakcyjnego na architekturę mikroserwisową (AWS Lambda, Kubernetes)." },
                { id: "d-1-2", value: "Zarządzanie międzynarodowym zespołem 15 deweloperów w modelu Agile/Scalable Scrum." },
                { id: "d-1-3", value: "Redukcja kosztów infrastruktury chmurowej o 35% poprzez optymalizację zasobów i wprowadzenie strategii FinOps." },
                { id: "d-1-4", value: "Wdrożenie rygorystycznych standardów bezpieczeństwa danych zgodnie z normami ISO 27001 oraz PCI DSS." },
                { id: "d-1-5", value: "Prowadzenie rekrutacji technicznych i opracowanie ścieżek rozwoju dla deweloperów poziomu Mid i Senior." }
            ]
        },
        {
            id: "exp-2",
            position: "Senior Full Stack Developer",
            company: "E-Commerce Titans International",
            startDate: "05.2017",
            endDate: "12.2020",
            description: [
                { id: "d-2-1", value: "Budowa silnika rekomendacji opartego na AI, który zwiększył średnią wartość koszyka o 18%." },
                { id: "d-2-2", value: "Optymalizacja wydajności frontendu (Next.js), osiągając wynik Core Web Vitals na poziomie 95+ punktów." },
                { id: "d-2-3", value: "Integracja systemów płatności międzynarodowych (Stripe, PayPal, Adyen) dla 12 rynków europejskich." },
                { id: "d-2-4", value: "Automatyzacja procesów testowych (Cypress, Jest), co skróciło czas release'u o połowę." }
            ]
        },
        {
            id: "exp-3",
            position: "Software Developer",
            company: "Innovative Startup Studio",
            startDate: "06.2014",
            endDate: "04.2017",
            description: [
                { id: "d-3-1", value: "Rozwój aplikacji mobilnych w technologii React Native dla branży medycznej." },
                { id: "d-3-2", value: "Współpraca z działem UI/UX przy tworzeniu systemów projektowych (Design Systems)." }
            ]
        }
    ],
    education: [
        {
            id: "edu-1",
            institution: "Polsko-Japońska Akademia Technik Komputerowych w Warszawie",
            major: "Systemy Rozproszone i Architektura Chmurowa",
            degree: "Studia Podyplomowe",
            startDate: "2021",
            endDate: "2022"
        },
        {
            id: "edu-2",
            institution: "Politechnika Warszawska, Wydział Elektroniki i Technik Informacyjnych",
            major: "Informatyka Stosowana",
            degree: "Magister Inżynier",
            startDate: "2012",
            endDate: "2014"
        },
        {
            id: "edu-3",
            institution: "Politechnika Warszawska",
            major: "Informatyka",
            degree: "Inżynier",
            startDate: "2008",
            endDate: "2012"
        }
    ],
    skillsCat: [
        {
            id: "cat-1",
            name: "Frontend Stack",
            skills: [
                { id: "s-1-1", name: "React 18 / Next.js 14", level: 5 },
                { id: "s-1-2", name: "TypeScript / JavaScript ESNext", level: 5 },
                { id: "s-1-3", name: "Tailwind CSS / Framer Motion", level: 4 },
                { id: "s-1-4", name: "State Management (Redux, Zustand)", level: 4 }
            ]
        },
        {
            id: "cat-2",
            name: "Backend & Cloud",
            skills: [
                { id: "s-2-1", name: "Node.js / NestJS", level: 5 },
                { id: "s-2-2", name: "Amazon Web Services (AWS)", level: 4 },
                { id: "s-2-3", name: "Docker / Kubernetes / Terraform", level: 4 },
                { id: "s-2-4", name: "PostgreSQL / MongoDB / Redis", level: 5 }
            ]
        },
        {
            id: "cat-3",
            name: "Soft Skills & Management",
            skills: [
                { id: "s-3-1", name: "Technical Leadership", level: 5 },
                { id: "s-3-2", name: "Public Speaking", level: 3 },
                { id: "s-3-3", name: "Conflict Resolution", level: 4 }
            ]
        }
    ],
    languages: [
        { id: "l-1", value: "Polski", level: "Native" },
        { id: "l-2", value: "Angielski", level: "C2 (Bilingual)" },
        { id: "l-3", value: "Niemiecki", level: "B2 (Professional)" },
        { id: "l-4", value: "Hiszpański", level: "A2 (Elementary)" }
    ],
    certificates: [
        { id: "c-1", name: "AWS Certified Solutions Architect – Professional", organizer: "Amazon Web Services", date: "2023" },
        { id: "c-2", name: "Google Professional Cloud Architect", organizer: "Google Cloud", date: "2022" },
        { id: "c-3", name: "Certified Scrum Professional (CSP-PO)", organizer: "Scrum Alliance", date: "2021" },
        { id: "c-4", name: "Microsoft Certified: Azure Solutions Architect", organizer: "Microsoft", date: "2020" }
    ],
    interests: [
        { id: "int-1", name: "Astronomia", value: "Astrofotografia głębokiego nieba i mechanika orbitalna." },
        { id: "int-2", name: "Sport", value: "Triathlon (Ironman 70.3), żeglarstwo morskie." },
        { id: "int-3", name: "Muzyka", value: "Produkcja muzyki elektronicznej i gra na syntezatorach modularnych." }
    ],
    customSection: [
        {
            id: "cust-1",
            title: "Osiągndddddddddddddddddddddddddddddddddddddddddddddięcia i Nagrody",
            type: "list",
            layout: "left",
            items: [
                {
                    id: "it-1",
                    title: "Nagrody Branżowe",
                    description: "",
                    startDate: "",
                    endDate: "",
                    elements: [
                        { id: "el-1", type: "text", value: "Zwycięzca Forbes 30 Under 30 w kategorii Technologia (2022)" },
                        { id: "el-2", type: "text", value: "1. Miejsce w globalnym konkursie AWS Hackathon: Sustainable AI (2021)" },
                        { id: "el-3", type: "text", value: "Nagroda 'Best Tech Leader' od Polish IT Community (2023)" },
                        { id: "el-4", type: "text", value: "Wyróżnienie za wkład w Open Source (projekt React-Query-Advanced)" }
                    ]
                }
            ]
        },
        {
            id: "cust-2",
            title: "Działalność Dodatkdddddddddddddddddddddddddddddddddddddddowa",
            type: "text",
            layout: "center",
            items: [
                {
                    id: "vol-1",
                    title: "Wystąpienia Konferencyjne",
                    startDate: "2019",
                    endDate: "2024",
                    description: "Regularny prelegent na konferencjach InfoShare, Meet.js oraz AWS Summit. Tematyka: Serverless, Micro-Frontends i optymalizacja performance'u.",
                    elements: []
                },
                {
                    id: "vol-2",
                    title: "Open Source Contributor",
                    startDate: "",
                    endDate: "",
                    description: "Aktywny współtwórca bibliotek w ekosystemie React i Next.js. Ponad 500 wkładów w ciągu ostatniego roku.",
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
                    title: "System 'Aurora' - Bankowość Nowej Generacji",
                    startDate: "06.2022",
                    endDate: "12.2023",
                    description: "Kompletna przebudowa warstwy prezentacji dla jednego z największych banków w Polsce. Projekt obejmował stworzenie autorskiego frameworka UI oraz integrację z systemami legacy.",
                    elements: [
                        { id: "pe-1", type: "text", value: "Obsługa 10 mln aktywnych sesji dziennie." },
                        { id: "pe-2", type: "text", value: "Skrócenie czasu ładowania pierwszej strony (LCP) z 4s do 1.2s." }
                    ]
                },
                {
                    id: "proj-2",
                    title: "Global Logistics Platform",
                    startDate: "01.2021",
                    endDate: "05.2022",
                    description: "System śledzenia przesyłek w czasie rzeczywistym wykorzystujący technologie IoT oraz WebSockets.",
                    elements: [
                        { id: "pe-3", type: "text", value: "Zintegrowanie danych z 50 000 czujników GPS." },
                        { id: "pe-4", type: "text", value: "Wdrożenie dashboardu analitycznego opartego na grafach." }
                    ]
                }
            ]
        }
    ],
    rodoSection: [{
        id: "rodo-1",
        type: "standard",
        value: "Wyrażam zgodę na przetwarzanie moich danych osobowych przez (nazwa firmy) w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko, a także na potrzeby przyszłych rekrutacji zgodnie z art. 6 ust. 1 lit. a Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (RODO).",
        company: ""
    }],
    settings: {
        skillsType: "categories",
        showSkillsLevel: true,
        showLanguageLevel: true,
        template: "modern-blue",
        color: "#2563EB",
        sectionOrder: ["contact", "profile", "experience", "education", "skills", "languages", "certificates", "cust-3", "cust-1", "cust-2", "interests"]
    }
};