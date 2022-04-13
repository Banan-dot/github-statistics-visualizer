import PullRequestEdge from "./PullRequestEdge";

interface PullRequests {
    totalCount: number;
    edges: PullRequestEdge[];
}

export default PullRequests;
