import { formatDistanceToNow } from "date-fns";
import { enUS, pl } from "date-fns/locale";
import { cookies } from "next/headers";
import Link from "next/link";
import ResumeSnapshot from "./ResumeSnapshot";
import ResumeInfobar from "./ResumeInfoBar";

type ResumeDataType = {
    id: string;
    title: string;
    updated_at: string;
}

type CvBlockType = {
    data: ResumeDataType;
    snapshotUrl: string;
}

export default async function ResumeBlock({ data, snapshotUrl }: CvBlockType) {
    const cookieStore = await cookies()
    let language = cookieStore.get("NEXT_LOCALE")?.value

    if (!language) language = "pl"

    const lastEdited = formatDistanceToNow(new Date(data.updated_at), { addSuffix: true, locale: language === "pl" ? pl : enUS })

    return (
        <article className="bg-[#EFF6FF] relative flex flex-col dark:bg-transparent border-2 border-border-default rounded-[12px] items-end w-70 h-100 duration-200 hover:border-opacity-100">
            <Link href={`/cv-builder/${data.id}`} className="relative w-full group flex-1 overflow-hidden rounded-t-[12px] cursor-pointer flex items-center justify-center">
                <ResumeSnapshot src={snapshotUrl} alt={data.title} />

                <div className="absolute bg-default-hover opacity-0 group-hover:opacity-50 duration-400 z-10 w-full h-full" />
            </Link>

            <div className="flex justify-between items-center relative bg-text-muted dark:bg-bg-main w-full p-4 rounded-b-[12px]">
                <ResumeInfobar resumeId={data.id} title={data.title} lastEdited={lastEdited} />
            </div>
        </article>
    )
}