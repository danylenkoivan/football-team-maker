export function generateTeamName (players) {
    return players
        .sort()
        .join(" - ")
        .toUpperCase()
        .trim();
}