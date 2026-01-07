import { SocialLink } from "./socialLink";

export type PersonalInfo = {
    avatarUrl: string | null;
    firstName: string;
    lastName: string;
    jobTitle: string;
    phone: string;
    email: string;
    address: string;
    links: SocialLink[];
}