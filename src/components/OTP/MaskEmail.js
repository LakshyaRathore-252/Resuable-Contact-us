export const maskEmail = (email) => {
    const [name, domain] = email.split("@");

    if (name.length <= 3 || !domain) return email; // Return original if too short or invalid

    const visibleStart = name.slice(0, 3);
    const visibleEnd = name.slice(-5);
    return `${visibleStart}***${visibleEnd}`;
}