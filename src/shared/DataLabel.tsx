import { Icon } from "@primer/octicons-react";
import React from "react";

type Props = {
  className?: string;
  icon?: Icon;
  value: number | string | null | undefined;
  caption: string;
};

const DataLabel = ({ className, icon: Icon, value, caption }: Props) => {
  return (
    <div className={`data-label ${className}`} title={caption}>
      <div className="data-label__value-container">
        {Icon && <Icon className="data-label__value-icon" size={20} />}
        <div className="data-label__value">{value ?? "-"}</div>
      </div>
      <div className="data-label__caption">{caption}</div>
    </div>
  );
};

export default DataLabel;
