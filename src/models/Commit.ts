import CommitHistoryConnection from "./CommitHistoryConnection";
import Author from "./Author";

interface Commit {
  id: string;
  pushedDate: string;
  history: CommitHistoryConnection;
  author: Author;
}

export default Commit;
