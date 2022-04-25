import React from "react";
import CommonUserInfo from "./CommonUserInfo";
import LangStat from "../UserPage/LangStat/LangStat";
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
      <section className="user-comparison__info-item">
        <CommonUserInfo
          className="user-comparison__section"
          login={firstUser}
        />
        <CommonUserInfo
          className="user-comparison__section"
          login={secondUser}
        />
      </section>
      <section className="user-comparison__info-item">
        <LangStat className="user-comparison__section" login={firstUser} />
        <LangStat className="user-comparison__section" login={secondUser} />
      </section>
      <section className="user-comparison__info-item">
        <UserActivity className="user-comparison__section" login={firstUser} />
        <UserActivity className="user-comparison__section" login={secondUser} />
      </section>
    </div>
  );
};

export default ComparisonInfo;
