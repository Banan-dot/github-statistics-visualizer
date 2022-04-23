import { Icon } from "@primer/octicons-react";
import React from "react";
import { formatToLocaleString } from "../utils/number.helper";

type Props = {
  children?: Array<JSX.Element>;
  className?: string;
  icon?: Icon;
  value: number | string | null | undefined;
  caption: string;
};

const formatValue = (value: string | number | null | undefined) => {
  if (value) {
    return typeof value === "number" ? formatToLocaleString(value, 0) : value;
  }
  return "-";
};

const DataLabel = ({
  className,
  icon: Icon,
  value,
  caption,
  children,
}: Props) => {
  return (
    <div className={`data-label ${className ?? ""}`} title={caption}>
      <div className="data-label__value-container">
        {Icon && <Icon className="data-label__value-icon" size={20} />}
        <div className="data-label__value">{formatValue(value)}</div>
      </div>
      <div className="data-label__caption">{caption}</div>
      {children}
    </div>
  );
};

export default DataLabel;
