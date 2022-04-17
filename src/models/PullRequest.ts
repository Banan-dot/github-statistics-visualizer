export type PullRequestState = "CLOSED" | "OPEN" | "MERGED";

export default interface PullRequest{
    id: string;
    state: PullRequestState;
    createdAt: string;
    closedAt: string | null;
    title: string;
}
