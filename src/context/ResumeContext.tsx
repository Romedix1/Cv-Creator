"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslations } from "use-intl";

type ResumeContextType = {
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  title: string;
  setTitle: (value: string) => void;
  saveError: string | null;
  setSaveError: (value: string | null) => void;
};

type ResumeProviderType = {
  children: ReactNode;
  initialTitle: string;
  isAuthenticated: boolean;
  resumeId: string;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({
  children,
  initialTitle,
  isAuthenticated,
  resumeId,
}: ResumeProviderType) {
  const tBuilderNav = useTranslations("BuilderNav");

  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState(
    initialTitle || tBuilderNav("documentName"),
  );
  const [saveError, setSaveError] = useState<string | null>(null);
  const hasHydratedTitle = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasHydratedTitle.current) {
      const savedTitle = localStorage.getItem(`guest_title_${resumeId}`);

      if (savedTitle) {
        setTitle(savedTitle);
      }
      hasHydratedTitle.current = true;
    }
  }, [isAuthenticated, resumeId]);

  useEffect(() => {
    if (!isAuthenticated && hasHydratedTitle.current) {
      localStorage.setItem(`guest_title_${resumeId}`, title);
    }
  }, [title, isAuthenticated, resumeId]);

  return (
    <ResumeContext.Provider
      value={{
        isSaving,
        setIsSaving,
        title,
        setTitle,
        saveError,
        setSaveError,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const context = useContext(ResumeContext);

  if (!context) throw new Error("useResume must be used within ResumeProvider");
  return context;
};
