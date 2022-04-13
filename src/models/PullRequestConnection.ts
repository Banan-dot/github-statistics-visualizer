import PullRequestEdge from "./PullRequestEdge";

interface PullRequestConnection {
  edges: PullRequestEdge[];
  totalCount: number;
}

export default PullRequestConnection;
