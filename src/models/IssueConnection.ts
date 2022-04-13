import Issue from "./Issue";
import IssueEdge from "./IssueEdge";

interface IssueConnection {
  edges: IssueEdge[];
  nodes: Issue[];
  totalCount: number;
}

export default IssueConnection;
