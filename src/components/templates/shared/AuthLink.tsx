"use client";

import { useTranslations } from "next-intl";
import { useSignOut } from "@/hooks/useSignOut";
import Link from "next/link";

export default function AuthLink({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const tFooter = useTranslations("Footer");
  const { signOut, loading } = useSignOut();

  if (isAuthenticated) {
    return (
      <button
        onClick={() => signOut()}
        disabled={loading}
        className="cursor-pointer"
      >
        {tFooter("logout")}
      </button>
    );
  }

  return <Link href="/login">{tFooter("login")}</Link>;
}
