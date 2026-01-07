import { ExperienceItem } from "./experience";
import { EducationItem } from "./education";
import { PersonalInfo } from "./personalInfo";
import { SkillsCategory } from "./skillsCategory";
import { LanguagesItem } from "./languages";
import { CustomSection } from "./customSection";

export type ResumeData = {
    personalInfo: PersonalInfo;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: SkillsCategory[];
    languages: LanguagesItem[];
    customSection: CustomSection[]
}