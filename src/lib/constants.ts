export const SECTION_IDS = {
    CONTACT: "contact",
    PROFILE: "profile",
    EXPERIENCE: "experience",
    EDUCATION: "education",
    SKILLS: "skills",
    LANGUAGES: "languages",
    CERTIFICATES: "certificates",
    INTERESTS: "interests",
} as const;

export const DEFAULT_SECTION_ORDER = [
    SECTION_IDS.CONTACT,
    SECTION_IDS.PROFILE,
    SECTION_IDS.EXPERIENCE,
    SECTION_IDS.EDUCATION,
    SECTION_IDS.SKILLS,
    SECTION_IDS.LANGUAGES,
    SECTION_IDS.CERTIFICATES,
    SECTION_IDS.INTERESTS,
];