import Repository from "./Repository";
import PageInfo from "./PageInfo";

interface Repositories {
  nodes: Repository[];
  pageInfo: PageInfo;
  totalCount: number;
  totalDiskUsage: number;
}

export default Repositories;
