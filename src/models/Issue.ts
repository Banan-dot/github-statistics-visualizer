export type IssueState = "OPEN" | "CLOSED"

export default interface Issue{
    state: IssueState;
    createdAt: string;
    closedAt: string | null;
}
