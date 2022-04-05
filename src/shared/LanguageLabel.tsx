import React from "react";
import { DotFillIcon } from "@primer/octicons-react";

type Props = {
  name: string | undefined;
  color?: string;
};

const LanguageLabel = ({ name, color }: Props) => {
  return (
    <div className="label label_language-label">
      <DotFillIcon className="label__icon" size={24} fill={color} />
      <div className="label__text">{name}</div>
    </div>
  );
};

export default LanguageLabel;
