import CommitHistoryConnection from "./CommitHistoryConnection";

interface Commit {
  id: string;
  pushedDate: string;
  history: CommitHistoryConnection;
}

export default Commit;
