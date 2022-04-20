import React from "react";
import CommonUserInfo from "./CommonUserInfo";
import LangStat from "../UserPage/LangStat/LangStat";
import UserRepositories from "../UserPage/UserRepositories/UserRepositories";
import UserActivity from "../UserPage/UserActivity/UserActivity";

type ComparisonInfoProps = {
  firstUser: string;
  secondUser: string;
  className?: string;
};

const ComparisonInfo = ({
  className,
  firstUser,
  secondUser,
}: ComparisonInfoProps) => {
  return (
    <div className={className || ""}>
      <CommonUserInfo login={firstUser} />
      <CommonUserInfo login={secondUser} />
      <LangStat login={firstUser} />
      <LangStat login={secondUser} />
      <UserActivity login={firstUser} />
      <UserActivity login={secondUser} />
    </div>
  );
};

export default ComparisonInfo;
