import PullRequest from "./PullRequest";
import PullRequestEdge from "./PullRequestEdge";

interface PullRequestConnection {
  edges: PullRequestEdge[];
  nodes: PullRequest[];
  totalCount: number;
}

export default PullRequestConnection;
