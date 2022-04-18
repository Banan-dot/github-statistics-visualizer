import React from "react";

type Props = {
  children?: Array<JSX.Element>;
  className?: string;
  value: number | string | null | undefined;
  caption: string;
};

const DataLabel = ({ className, value, caption, children }: Props) => {
  return (
    <div className={`data-label ${className}`}>
      <span className="data-label__value">{value ?? "-"}</span>
      <div className="data-label__caption">{caption}</div>
        {children}
    </div>
  );
};

export default DataLabel;
