import IssueEdge from "./IssueEdge";

interface IssueConnection {
  edges: IssueEdge[];
  totalCount: number;
}

export default IssueConnection;
