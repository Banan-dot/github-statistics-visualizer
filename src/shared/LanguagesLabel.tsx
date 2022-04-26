import React from "react";

type Props = {
  children?: Array<JSX.Element>;
  className?: string;
  value: number | string | null | undefined;
  caption: string;
  title?: string;
};

const LanguagesLabel = ({
  className,
  value,
  caption,
  title,
  children,
}: Props) => {
  return (
    <div className={`languages-label ${className ?? ""}`} title={title}>
      <span className="languages-label__value">{value ?? 0}</span>
      <div className="languages-label__caption">{caption}</div>
      {children}
    </div>
  );
};

export default LanguagesLabel;
