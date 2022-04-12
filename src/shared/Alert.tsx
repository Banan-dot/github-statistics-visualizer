import React, { ReactNode } from "react";

type Props = {
  type: "danger" | "warning" | "success" | "default";
  children: ReactNode;
};

const Alert = ({ type, children }: Props) => {
  return (
    <div className={`alert alert_${type}`}>
      <div className="alert__body">{children}</div>
    </div>
  );
};

export default Alert;
