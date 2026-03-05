import { ResumeData } from "@/types/resumeData";
import { useTranslations } from "next-intl";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Dot } from "lucide-react";
import { useSectionOrder } from "@/hooks/useSectionOrder";
import { cn } from "@/lib/utils";
import AppImage from "../ui/AppImage";

const inter = Inter({
  subsets: ["latin"],
});

export default function SwissMinimalist({ data }: { data: ResumeData }) {
  const tTemplate = useTranslations("Template");
  const tAlt = useTranslations("ImgAlt");

  const showContactSection =
    data.personalInfo.phone ||
    data.personalInfo.email ||
    data.personalInfo.address;

  const SectionHeader = (number: number, text: string) => {
    return (
      <div className="w-50 shrink-0 pr-6">
        <h2 className="text-[16px] font-bold flex">
          <span className="shrink-0">
            {number.toString().padStart(2, "0")}.
          </span>{" "}
          <span className="w-full wrap-break-word [word-break:break-word]">
            {text}
          </span>
        </h2>
      </div>
    );
  };

  const ItemHeader = (text: string) => {
    return (
      <h3 className="font-bold text-[14px] text-black wrap-break-word flex-1 min-w-0">
        {text}
      </h3>
    );
  };

  const ItemDate = (date: string) => {
    return (
      <span className="text-[10px] text-black font-medium whitespace-nowrap">
        {date}
      </span>
    );
  };

  const sectionsMap: Record<
    string,
    {
      title: string;
      isVisible: boolean;
      content: React.ReactNode;
      position?: "left" | "center";
    }
  > = {
    contact: {
      title: tTemplate("contactHeader"),
      isVisible: !!showContactSection,
      content: (
        <ul className="text-[12px] flex flex-col gap-2.5">
          {data.personalInfo.phone && (
            <li className="break-all">{data.personalInfo.phone}</li>
          )}
          {data.personalInfo.email && (
            <li className="break-all">{data.personalInfo.email}</li>
          )}
          {data.personalInfo.address && (
            <li className="break-all">{data.personalInfo.address}</li>
          )}
          {data.personalInfo.links?.map((link) => {
            return (
              <li key={link.id}>
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
      content: (
        <p className="text-[11px] leading-3.75 wrap-break-word">
          {data.personalInfo.profile}
        </p>
      ),
    },
    experience: {
      title: tTemplate("experienceHeader"),
      isVisible: data.experience && data.experience.length > 0,
      content: (
        <div className="flex flex-col gap-4">
          {data.experience.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-2.5">
                <div>
                  <div className="flex justify-between items-baseline">
                    {ItemHeader(item.position)}
                    {ItemDate(
                      `${item.startDate} ${item.endDate && "-"} ${item.endDate}`,
                    )}
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
                          <Dot className="stroke-2 w-4 h-4" />
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
      content: (
        <div className="flex flex-col gap-4">
          {data.education.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    {ItemHeader(item.institution)}
                    {ItemDate(
                      `${item.startDate} ${item.endDate && "-"} ${item.endDate}`,
                    )}
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
      content: (
        <div className="text-[11px] w-full">
          {data.settings.skillsType === "categories" ? (
            <div className="flex flex-col items-start gap-3">
              {data.skillsCat.map((cat) => (
                <div key={cat.id} className="w-full flex flex-col gap-3">
                  {ItemHeader(cat.name)}
                  <ul className="flex gap-2">
                    {cat.skills.map((skill, index) => (
                      <li key={skill.id} className="wrap-break-word">
                        {skill.name} {index + 1 !== cat.skills.length && ","}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="flex gap-2">
              {data.skillsCat
                .flatMap((cat) => cat.skills)
                .map((skill, index) => (
                  <li key={skill.id} className="wrap-break-word">
                    {skill.name} {index + 1 !== data.skillsCat.length && ","}
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
      content: (() => {
        const fluentLevels = ["Native", "C2", "C1"];

        const fluentLangs = data.languages.filter((lang) =>
          fluentLevels.includes(lang.level),
        );
        const basicLangs = data.languages.filter(
          (lang) => !fluentLevels.includes(lang.level),
        );

        return (
          <div className="text-[11px] w-full">
            <ul className="flex flex-col gap-2">
              <li>
                {ItemHeader(tTemplate("fluentLanguages"))}
                <ul>
                  {fluentLangs.map((lang, index) => (
                    <li key={lang.id}>
                      {lang.value} {"(" + lang.level + ")"}
                      {index + 1 !== fluentLangs.length && ","}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                {ItemHeader(tTemplate("basicLanguages"))}
                <ul>
                  {basicLangs.map((lang, index) => (
                    <li key={lang.id}>
                      {lang.value} {"(" + lang.level + ")"}
                      {index + 1 !== basicLangs.length && ","}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        );
      })(),
    },
    certificates: {
      title: tTemplate("certificatesHeader"),
      isVisible: data.certificates.length > 0,
      content: (
        <div className="flex flex-col gap-4">
          {data.certificates.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    {ItemHeader(item.name)}
                    {ItemDate(`${item.date}`)}
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
      content: (
        <div className="flex flex-col gap-4">
          {data.interests.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    {ItemHeader(item.name)}
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
            <div key={section.id}>
              <div className="flex flex-col gap-4">
                {section.items.map((item) => {
                  return (
                    <div key={item.id} className="flex flex-col gap-1">
                      <div>
                        <div className="flex justify-between items-baseline">
                          {ItemHeader(item.title)}
                          {ItemDate(
                            `${item.startDate} ${item.endDate && "-"} ${item.endDate}`,
                          )}
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
            </div>
          ) : section.type === "detailed" ? (
            <div className="flex flex-col gap-4">
              {section.items.map((item) => {
                return (
                  <div key={item.id} className="flex flex-col gap-2.5">
                    <div>
                      <div className="flex justify-between items-baseline">
                        {ItemHeader(item.title)}
                        {ItemDate(
                          `${item.startDate} ${item.endDate && "-"} ${item.endDate}`,
                        )}
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
          ) : null;
        })(),
      };
    }
  });

  const sectionsToRender = useSectionOrder(data, sectionsMap);

  return (
    <div
      className={cn(
        "bg-white flex flex-col gap-8",
        inter.className,
        "w-full text-black p-10 min-h-[297mm] print:w-full print:shadow-none print:mx-0",
      )}
    >
      {/* NAME */}
      <div className="relative flex w-full min-h-33.25">
        <div className="flex flex-col w-9/12">
          {(data.personalInfo.firstName || data.personalInfo.lastName) && (
            <h1 className="font-extrabold text-[42px] uppercase wrap-break-word leading-9 ">
              {data.personalInfo.firstName}
              <br />
              {data.personalInfo.lastName && ` ${data.personalInfo.lastName}`}
            </h1>
          )}
          {data.personalInfo.jobTitle && (
            <p className="font-extrabold text-center text-[14px] break-all">
              {data.personalInfo.jobTitle}
            </p>
          )}
        </div>

        {data.personalInfo.avatarUrl && (
          <div className="absolute right-0 top-0 shrink-0">
            <AppImage
              src={data.personalInfo.avatarUrl}
              alt={tAlt("userImage")}
              width={400}
              height={400}
              quality={100}
              className="w-30 h-30 object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-12 mb-6">
        {sectionsToRender.map((section, index) => {
          if (!section) return;
          if (section.position !== "left") {
            return (
              <div key={index} className="flex w-full items-start">
                {SectionHeader(index + 1, section.title)}
                <div className="flex-1 min-w-0 pt-0.5">{section.content}</div>
              </div>
            );
          }
        })}
      </div>

      {data.rodoSection.length > 0 && (
        <div className="mt-auto">
          <p className="text-text-muted text-[10px] text-justify leading-tight">
            {data.rodoSection[0].value}
          </p>
        </div>
      )}
    </div>
  );
}
