import Nav from "@/components/layout/Nav";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Nav authPage={true} />
            <main className="flex justify-center px-5 py-8">
                {children}
            </main>
        </>
    )
}