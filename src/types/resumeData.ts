import { ExperienceItem } from "./experience";
import { EducationItem } from "./education";
import { PersonalInfo } from "./personalInfo";
import { SkillsCategory } from "./skillsCategory";
import { LanguagesItem } from "./languages";
import { CustomSection } from "./customSection";
import { Certificates } from "./certificates";
import { Interests } from "./interests";
import { Rodo } from "./rodo";
import { Settings } from "./settings";

export type ResumeData = {
    personalInfo: PersonalInfo;
    experience: ExperienceItem[];
    education: EducationItem[];
    skillsCat: SkillsCategory[];
    languages: LanguagesItem[];
    certificates: Certificates[];
    interests: Interests[];
    customSection: CustomSection[];
    rodoSection: Rodo[];
    settings: Settings;
}