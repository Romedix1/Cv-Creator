import { ResumeData } from "@/types/resumeData";
import { AtSign, Dot, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Inter, Roboto_Mono } from "next/font/google";
import Link from "next/link";
import { PiAddressBook } from "react-icons/pi";
import LeftSectionHeader from "./shared/LeftSectionHeader";
import TemplateHeader from "./shared/SectionHeader";
import { useSectionOrder } from "@/hooks/useSectionOrder";
import { LinkIcon } from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/LinkIcon";
import { cn } from "@/lib/utils";
import AppImage from "../ui/AppImage";

const inter = Inter({
  subsets: ["latin"],
});

const roboto = Roboto_Mono({
  subsets: ["latin"],
});

export default function TechMinimal({ data }: { data: ResumeData }) {
  const tTemplate = useTranslations("Template");
  const tAlt = useTranslations("ImgAlt");

  const showContactSection =
    data.personalInfo.phone ||
    data.personalInfo.email ||
    data.personalInfo.address ||
    (data.personalInfo.links && data.personalInfo.links.length > 0);

  const LANGUAGE_LEVELS = [
    { label: "Native", value: 7 },
    { label: "C2", value: 6 },
    { label: "C1", value: 5 },
    { label: "B2", value: 4 },
    { label: "B1", value: 3 },
    { label: "A2", value: 2 },
    { label: "A1", value: 1 },
  ];

  const sectionsMap: Record<
    string,
    {
      title: string;
      position: "left" | "center";
      isVisible: boolean;
      content: React.ReactNode;
    }
  > = {
    contact: {
      title: tTemplate("contactHeader"),
      isVisible: !!showContactSection,
      position: "left",
      content: (
        <ul className="text-[10px] gap-2 flex flex-col">
          {data.personalInfo.phone && (
            <li
              className={cn(
                "flex gap-2 items-center break-all",
                roboto.className,
              )}
            >
              <span className="shrink-0">
                <Phone className="w-3 h-3" />
              </span>{" "}
              {data.personalInfo.phone}
            </li>
          )}
          {data.personalInfo.email && (
            <li
              className={cn(
                "flex gap-2 items-center break-all",
                roboto.className,
              )}
            >
              <span className="shrink-0">
                <AtSign className="w-3 h-3" />
              </span>{" "}
              {data.personalInfo.email}
            </li>
          )}
          {data.personalInfo.address && (
            <li
              className={cn(
                "flex gap-2 items-center break-all",
                roboto.className,
              )}
            >
              <span className="shrink-0">
                <PiAddressBook className="w-3 h-3" />
              </span>{" "}
              {data.personalInfo.address}
            </li>
          )}
          {data.personalInfo.links?.map((link) => {
            return (
              <li
                key={link.id}
                className={cn(
                  "flex gap-2 items-center break-all",
                  roboto.className,
                )}
              >
                <span className="shrink-0">
                  {<LinkIcon platform={link.platform} />}
                </span>{" "}
                <Link href={link.url} className="break-all underline">
                  {link.url}
                </Link>
              </li>
            );
          })}
        </ul>
      ),
    },
    profile: {
      title: tTemplate("profileHeader"),
      isVisible: !!data.personalInfo.profile,
      position: "center",
      content: (
        <p className="text-[11px] leading-3.75 wrap-break-word">
          {data.personalInfo.profile}
        </p>
      ),
    },
    experience: {
      title: tTemplate("experienceHeader"),
      isVisible: data.experience && data.experience.length > 0,
      position: "center",
      content: (
        <div className="flex flex-col gap-4">
          {data.experience.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-2.5">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">
                      {item.position}
                    </h3>
                    <span
                      className={cn(
                        "text-[10px] text-text-muted font-medium whitespace-nowrap",
                        roboto.className,
                      )}
                    >
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#2563EB] mb-1 wrap-break-word flex-1 min-w-0">
                    {item.company}
                  </p>
                </div>

                <ul className="list-none gap-1 flex flex-col text-black">
                  {item.description?.map((descItem) => {
                    return (
                      <li
                        className="text-[10px] flex items-start justify-items-start"
                        key={descItem.id}
                      >
                        <span className="shrink-0">
                          <Dot className="stroke-3 w-4 h-4" />
                        </span>
                        <span className="wrap-break-word flex-1 min-w-0">
                          {descItem.value}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ),
    },
    education: {
      title: tTemplate("educationHeader"),
      isVisible: data.education && data.education.length > 0,
      position: "center",
      content: (
        <div className="flex flex-col gap-4">
          {data.education.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">
                      {item.institution}
                    </h3>
                    <span
                      className={cn(
                        "text-[10px] text-text-muted font-medium whitespace-nowrap",
                        roboto.className,
                      )}
                    >
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <p className="text-text-muted text-[10px] shrink-0">
                    {tTemplate("majorLabel")}:{" "}
                    <span className="break-all">{item.major}</span>
                  </p>
                  <p className="text-text-muted text-[10px] shrink-0">
                    {tTemplate("degreeLabel")}:{" "}
                    <span className="break-all">{item.degree}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    skills: {
      title: tTemplate("skillsHeader"),
      isVisible: data.skillsCat && data.skillsCat.length > 0,
      position: "left",
      content: (
        <div className="text-[11px] w-full">
          {data.settings.skillsType === "categories" ? (
            <div className="flex flex-col items-start gap-3">
              {data.skillsCat.map((cat) => (
                <div key={cat.id} className="w-full flex flex-col gap-3">
                  <h3 className="font-bold text-[10px] wrap-break-word">
                    {cat.name}:
                  </h3>

                  <ul className="flex flex-col gap-3">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.id}
                        className={cn(
                          "font-medium wrap-break-word px-2",
                          roboto.className,
                        )}
                      >
                        {skill.name}
                        {data.settings.showSkillsLevel && (
                          <div className="bg-[#D1D5DB] h-1 w-full mt-1.5">
                            <span
                              style={{ width: `${(skill.level || 0) * 20}%` }}
                              className={`h-1 bg-[#111827] block`}
                            ></span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {data.skillsCat
                .flatMap((cat) => cat.skills)
                .map((skill) => (
                  <li
                    key={skill.id}
                    className={cn(
                      "font-medium wrap-break-word",
                      roboto.className,
                    )}
                  >
                    {skill.name}
                    {data.settings.showSkillsLevel && (
                      <div className="bg-[#D1D5DB] h-1 w-full mt-1.5">
                        <span
                          style={{ width: `${(skill.level || 0) * 20}%` }}
                          className={`h-1 bg-[#111827] block`}
                        ></span>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ),
    },
    languages: {
      title: tTemplate("languagesHeader"),
      isVisible: data.languages.length > 0,
      position: "left",
      content: (
        <div className="text-[11px]">
          <ul className="flex flex-col gap-3">
            {data.languages.map((language) => {
              const levelObj = LANGUAGE_LEVELS.find(
                (lang) => lang.label === language.level,
              );
              const levelValue = levelObj ? levelObj.value : 0;

              const levelPercent = Math.round((levelValue / 7) * 100);

              return (
                <li
                  key={language.id}
                  className={cn("px-2 wrap-break-word", roboto.className)}
                >
                  {language.value}

                  {!data.settings.showLanguageLevel ? (
                    <span>
                      {" "}
                      - <span className="font-bold">{language.level}</span>
                    </span>
                  ) : (
                    <div className="bg-[#D1D5DB] h-1 w-full mt-1.5">
                      <span
                        style={{ width: `${levelPercent}%` }}
                        className={`h-1 bg-[#111827] block`}
                      ></span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ),
    },
    certificates: {
      title: tTemplate("certificatesHeader"),
      isVisible: data.certificates.length > 0,
      position: "center",
      content: (
        <div className="flex flex-col gap-4">
          {data.certificates.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">
                      {item.name}
                    </h3>
                    <span
                      className={cn(
                        "text-[10px] text-text-muted font-medium whitespace-nowrap",
                        roboto.className,
                      )}
                    >
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <p className="text-text-muted text-[10px]">
                    {tTemplate("organizerLabel")}:{" "}
                    <span className="break-all">{item.organizer}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    interests: {
      title: tTemplate("interestsHeader"),
      isVisible: data.interests.length > 0,
      position: "center",
      content: (
        <div className="flex flex-col gap-4">
          {data.interests.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <p className="text-text-muted text-[10px] wrap-break-word">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
  };

  data.customSection?.forEach((section) => {
    if (section.items.length > 0) {
      sectionsMap[section.id] = {
        title: section.title,
        isVisible: section.items.length > 0,
        position: section.layout,
        content: (() => {
          return section.type === "text" ? (
            <div className="flex flex-col gap-4">
              {section.items.map((item) => {
                return (
                  <div key={item.id} className="flex flex-col gap-1">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">
                          {item.title}
                        </h3>
                        <span
                          className={cn(
                            "text-[10px] text-text-muted font-medium whitespace-nowrap",
                            roboto.className,
                          )}
                        >
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <p className="text-text-muted text-[10px] wrap-break-word min-w-0">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : section.type === "detailed" ? (
            <div className="flex flex-col gap-4">
              {section.items.map((item) => {
                return (
                  <div key={item.id} className="flex flex-col gap-2.5">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">
                          {item.title}
                        </h3>
                        <span
                          className={cn(
                            "text-[10px] text-text-muted font-medium whitespace-nowrap",
                            roboto.className,
                          )}
                        >
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>
                    </div>

                    <ul className="list-none gap-1 flex flex-col w-full min-w-0">
                      {item.elements?.map((element) => {
                        return (
                          <li
                            className={cn(
                              "text-[10px] flex items-start justify-items-start w-full min-w-0",
                              element.type === "label"
                                ? "text-text-muted font-semibold text-[11px]"
                                : "mb-0.5",
                            )}
                            key={element.id}
                          >
                            <span className="flex-1 min-w-0 wrap-break-word">
                              {element.value}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            section.type === "list" && (
              <div className="text-[11px] w-full">
                <ul className="flex flex-col gap-3">
                  {section.items.map((secItem) => {
                    if (secItem.title) {
                      return (
                        <div
                          key={secItem.id}
                          className="w-full flex flex-col gap-3"
                        >
                          <h3 className="font-bold text-[10px] wrap-break-word">
                            {secItem.title}:
                          </h3>
                          <ul className="flex flex-col gap-3">
                            {secItem.elements?.map((element) => (
                              <li
                                key={element.id}
                                className="px-2 wrap-break-word"
                              >
                                {element.value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return (
                      <ul key={secItem.id} className="flex flex-col gap-3">
                        {secItem.elements?.map((element) => (
                          <li key={element.id} className="px-2 wrap-break-word">
                            {element.value}
                          </li>
                        ))}
                      </ul>
                    );
                  })}
                </ul>
              </div>
            )
          );
        })(),
      };
    }
  });

  const sectionsToRender = useSectionOrder(data, sectionsMap);

  return (
    <div
      className={cn(
        "bg-white flex",
        inter.className,
        "w-full text-black min-h-[297mm]",
      )}
    >
      {/* LEFT */}
      <div className="p-6 bg-[#F9FAFB] w-50 shrink-0 flex flex-col items-stretch gap-8 min-h-210.5">
        {data.personalInfo.avatarUrl && (
          <AppImage
            src={data.personalInfo.avatarUrl}
            alt={tAlt("userImage")}
            width={400}
            height={400}
            quality={100}
            className="rounded-[12px] w-25 h-25 object-cover"
          />
        )}

        {sectionsToRender.map((section, index) => {
          if (!section) return;

          if (section.position === "left") {
            return (
              <div
                key={`left-${index}`}
                className="flex flex-col items-stretch w-full gap-3"
              >
                <LeftSectionHeader
                  text={section.title}
                  font={roboto.className}
                />
                <div className="flex-1 min-w-0 pt-0.5">{section.content}</div>
              </div>
            );
          }
        })}
      </div>
      {/* RIGHT */}
      <div className="p-8 flex-1 min-w-0 flex flex-col">
        {/* NAME */}
        {(data.personalInfo.firstName ||
          data.personalInfo.lastName ||
          data.personalInfo.jobTitle) && (
          <div className="mb-6">
            {(data.personalInfo.firstName || data.personalInfo.lastName) && (
              <h1 className="font-bold text-3xl upper wrap-break-word">
                {data.personalInfo.firstName}
                {data.personalInfo.lastName && ` ${data.personalInfo.lastName}`}
              </h1>
            )}
            {data.personalInfo.jobTitle && (
              <p
                className={cn(
                  "text-[16px] break-all font-bold",
                  roboto.className,
                )}
              >
                {data.personalInfo.jobTitle}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col gap-8 mb-6">
          {sectionsToRender.map((section, index) => {
            if (!section) return;
            if (section.position === "center") {
              return (
                <div key={`center-${index}`}>
                  <TemplateHeader
                    text={section.title}
                    font={roboto.className}
                  />
                  {section.content}
                </div>
              );
            }
          })}
        </div>

        {/* CLAUSE */}
        {data.rodoSection.length > 0 && (
          <div className="mt-auto">
            <p className="text-text-muted text-[10px] text-justify leading-tight">
              {data.rodoSection[0].value}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
