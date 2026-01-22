type UserWithRoles = {
    [key: string]: unknown;
};

export function getUserRoles(user: UserWithRoles | null | undefined): string[] {
    const roles = user?.["https://x2xcreative.com.au/roles"];

    if (!roles) return [];

    return Array.isArray(roles)
        ? roles.filter((r): r is string => typeof r === "string")
        : typeof roles === "string"
            ? [roles]
            : [];
}
