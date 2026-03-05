import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { getIsAuthenticated } from "@/lib/isAuthenticated";
import { useSignOut } from "@/hooks/useSignOut";
import AuthLink from "@/components/templates/shared/AuthLink";

export default async function Footer() {
  const tFooter = useTranslations("Footer");

  const date = new Date();
  const year = date.getFullYear();

  const isAuthenticated = await getIsAuthenticated();
  const { signOut, loading } = useSignOut();

  return (
    <footer className="py-16 px-8 bg-surface flex flex-col gap-6 md:px-16">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-col gap-4 md:flex-1">
          <p className="text-[16px] font-semibold">CV Creator</p>
          <p className="text-text-muted text-[14px]">{tFooter("text")}</p>
        </div>

        <ul className="gap-3.5 flex flex-col text-[14px] text-text-muted md:flex-1 duration-200">
          <li className="hover:text-default-hover">
            <Link href="/templates">{tFooter("templates")}</Link>
          </li>
          <li className="hover:text-default-hover">
            <AuthLink isAuthenticated={isAuthenticated} />
          </li>
          <li className="hover:text-default-hover">
            <Link href="/privacy">{tFooter("policyPrivacy")}</Link>
          </li>
          <li className="hover:text-default-hover">
            <Link href="/terms">{tFooter("terms")}</Link>
          </li>
        </ul>
      </div>

      <Separator />
      <p className="text-[14px] md:text-right">
        © {year} CV Creator. {tFooter("rights")}
      </p>
    </footer>
  );
}
