import Commit from "./Commit";

interface CommitHistoryConnection {
  nodes: Commit[];
  totalCount: number;
}

export default CommitHistoryConnection;
