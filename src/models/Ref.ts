import Commit from "./Commit";

export default interface Ref {
  name: string;
  target: Commit;
}
