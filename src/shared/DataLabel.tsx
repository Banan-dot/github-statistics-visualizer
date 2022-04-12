import React from "react";

type Props = {
  className?: string;
  value: number | string;
  caption: string;
};

const DataLabel = ({ className, value, caption }: Props) => {
  return (
    <div className={`data-label ${className}`}>
      <span className="data-label__value">{value}</span>
      <div className="data-label__caption">{caption}</div>
    </div>
  );
};

export default DataLabel;
