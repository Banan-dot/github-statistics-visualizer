export default interface PullRequest{
    id: string;
    state: "CLOSED" | "OPEN" | "MERGED";
    createdAt: string;
    closedAt: string | null;
    title: string;
}