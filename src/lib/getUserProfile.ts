import { cache } from "react";
import { getInitials } from "./getInitials";
import { createClient } from "./supabase/server";

export const getUserProfile = cache(async (userId?: string) => {
    const supabase = await createClient();

    let targetUserId = userId;
    let userMetadata = null;

    if (!targetUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        targetUserId = user.id;
        userMetadata = user.user_metadata;
    }

    const { data: profile } = await supabase.from("profiles").select("first_name, last_name, avatar_url").eq("id", targetUserId).single();

    const firstName = profile?.first_name || "";
    const lastName = profile?.last_name || "";

    let fullName = `${firstName} ${lastName}`.trim();

    if (!fullName && userMetadata) {
        fullName = userMetadata.full_name || userMetadata.name || "";
    }

    const avatarUrl = profile?.avatar_url || userMetadata?.avatar_url || userMetadata?.picture;

    return { firstName: firstName, lastName: lastName, fullName: fullName, avatarUrl: avatarUrl, initials: getInitials(fullName) };
})