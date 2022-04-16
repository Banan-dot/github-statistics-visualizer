import React from "react";
import { Group, Input, Button, Toast } from "@skbkontur/react-ui";
import { CopyIcon } from "@primer/octicons-react";

type Props = {
  defaultValue?: string;
};

const copyUrl = (url: string | undefined) => {
  if (url) {
    navigator.clipboard.writeText(url).then(() => {
      Toast.push("Ссылка скопирована");
    });
  }
};

const InputWithCopyButton = ({ defaultValue }: Props) => {
  return (
    <Group width="100%">
      <Input
        defaultValue={defaultValue}
        width="100%"
        readOnly
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
      />
      <Button use="primary" onClick={() => copyUrl(defaultValue)}>
        <CopyIcon />
      </Button>
    </Group>
  );
};

export default InputWithCopyButton;
