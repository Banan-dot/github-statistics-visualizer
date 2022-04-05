import React from "react";
import { Icon } from "@primer/octicons-react";
import { Hint } from "@skbkontur/react-ui";

type Props = {
  icon: Icon;
  value: string | number | undefined;
  hintText?: string;
};

const IconDataLabel = ({ value, hintText, icon: Icon }: Props) => {
  return (
    <Hint text={hintText}>
      <div className="label_icon-label">
        <Icon className="label__icon" />
        <div className="label__text">{value}</div>
      </div>
    </Hint>
  );
};

export default IconDataLabel;
