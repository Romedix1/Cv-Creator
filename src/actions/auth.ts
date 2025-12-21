"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as createClientAdmin } from "@supabase/supabase-js"
import { getTranslations } from "next-intl/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import z from "zod"

export async function signUp(formData: FormData) {
    const t = await getTranslations("Validation")

    const registerSchema = z.object({
        name: z.string().min(2, { message: t("nameMin") }),
        email: z.string().regex(/^[^@]+@[^@]+\.[^@]+$/, { message: t("emailInvalid") }),
        password: z.string().min(6, { message: t("passwordMin") }).regex(/[a-z]/, { message: t("passwordMin") }).regex(/[A-Z]/, { message: t("passwordMin") }).regex(/[!@#$%^&*(),.?":{}|<>]/, { message: t("passwordMin") })
    })

    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name")
    }

    const validatedData = registerSchema.safeParse(rawData)

    if(!validatedData.success) {
        const formattedErrors: Record<string, string[]> = {};

        validatedData.error.issues.forEach((issue) => {
            const fieldName = issue.path[0] as string

            if(!formattedErrors[fieldName]) {
                formattedErrors[fieldName] = [];
            }

            formattedErrors[fieldName].push(issue.message);
        });

        return {
            success: false,
            errors: formattedErrors,
        };
    }

    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { name, email, password } = validatedData.data

    const response = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                name: name
            }
        },
    });

    if(response.error) {
        return {
            error: response.error.message,
            apiError: response.error.message
        }
    }

    return { success: true }
}

export async function signIn(formData: FormData) {
    const t = await getTranslations("Validation")

    const loginSchema = z.object({
        email: z.string().regex(/^[^@]+@[^@]+\.[^@]+$/, { message: t("emailInvalid") }),
        password: z.string().min(1, { message: t("required") })
    })

    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const validatedData = loginSchema.safeParse(rawData)

    if(!validatedData.success) {
        const formattedErrors: Record<string, string[]> = {}

        validatedData.error.issues.forEach((issue) => {
            const fieldName = issue.path[0] as string

            if(!formattedErrors[fieldName]) {
                formattedErrors[fieldName] = []
            }

            formattedErrors[fieldName].push(issue.message)
        })

        return {
            success: false,
            errors: formattedErrors
        }
    }

    const supabase = await createClient()

    const { email, password } = validatedData.data

    const response = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if(response.error) {
        return {
            error: response.error.message,
            apiError: t("invalidLoginData")
        }
    }

    return { success: true };
}

export async function deleteAccountAction() {
    const t = await getTranslations("Validation")

    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        throw new Error(t("sessionExpired"))
    }

    const supabaseAdmin = createClientAdmin(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    )

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
        user.id
    )

    if (deleteError) {
        throw new Error(t("deleteAccount"))
    }

    await supabase.auth.signOut()

    redirect("/")
}