import { Globe } from "lucide-react";
import { FaBehance, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

type LinkIconProps = {
    platform: string;
    className?: string;
}

export const LinkIcon = ({platform, className = "w-3 h-3"}: LinkIconProps) => {
    switch(platform) {
        case "linkedin":
            return <FaLinkedin className={className} />
        case "github":
            return <FaGithub className={className} />
        case "website":
            return <Globe className={className} />
        case "behance":
            return <FaBehance className={className} />
        case "twitter":
            return <FaTwitter className={className} />
        case "other":
            return <Globe className={className} />
        default:
            return <Globe className={className} />
    }
}