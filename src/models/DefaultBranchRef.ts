import Commit from "./Commit";

interface DefaultBranchRef {
  id: string;
  name: string;
  target: Commit;
}

export default DefaultBranchRef;
