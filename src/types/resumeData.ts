import { ExperienceItem } from "./experience";
import { EducationItem } from "./education";
import { PersonalInfo } from "./personalInfo";
import { SkillsCategory } from "./skillsCategory";
import { LanguagesItem } from "./languages";
import { CustomSection } from "./customSection";
import { Certificates } from "./certificates";
import { Interests } from "./interests";
import { SkillsType } from "./skillsType";

export type ResumeData = {
    personalInfo: PersonalInfo;
    experience: ExperienceItem[];
    education: EducationItem[];
    skillsCat: SkillsCategory[];
    skillsType: SkillsType;
    languages: LanguagesItem[];
    certificates: Certificates[];
    interests: Interests[];
    customSection: CustomSection[];
}