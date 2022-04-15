export default interface Issue{
    state: "CLOSED" | "OPEN";
    createdAt: string;
    closedAt: string | null;
}