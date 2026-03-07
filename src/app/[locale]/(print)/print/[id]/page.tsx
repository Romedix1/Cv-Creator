"use client";

import { useEffect, useState, use } from "react";
import { getTemplate } from "@/lib/getTemplate";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import { ResumeData } from "@/types/resumeData";
import { useResume } from "@/context/ResumeContext";

export default function PrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const tError = useTranslations("Errors");

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [templateName, setTemplateName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { title } = useResume();

  useEffect(() => {
    const loadData = async () => {
      const localData = localStorage.getItem(`guest_resume_${id}`);
      const localTemplate = localStorage.getItem(`guest_template_${id}`);

      if (localData) {
        const parsedData = JSON.parse(localData);
        setResumeData(parsedData);
        setTemplateName(
          localTemplate || parsedData?.settings?.template || "modern-blue",
        );

        setLoading(false);
        return;
      }
      const supabase = createClient();
      const { data: resume } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", id)
        .single();

      if (resume) {
        setResumeData(resume.content);
        setTemplateName(resume.template);
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  useEffect(() => {
    document.title = title || "Curriculum Vitae";
  }, [title]);

  if (loading)
    return (
      <div id="loading-state" className="p-10">
        Loading PDF...
      </div>
    );

  if (!resumeData) return <div className="p-10">{tError("cvNotFound")}</div>;

  return (
    <main id="resume-preview">
      {getTemplate(templateName || "modern-blue", resumeData)}
    </main>
  );
}
