import React from "react";
import InputWithCopyButton from "./InputWithCopyButton";
import {
  Button,
  DropdownMenu,
  MenuHeader,
  MenuSeparator,
} from "@skbkontur/react-ui";

type Props = {
  className?: string;
  url: string;
  sshUrl: string;
};

const CloneRepositoryButton = ({ className, url, sshUrl }: Props) => {
  return (
    <DropdownMenu
      className={`dropdown ${className ?? ""}`}
      caption={<Button use="default" width="100%">Клонировать</Button>}
    >
      {url ? (
        <MenuHeader>
          <div className="dropdown__input-label">HTTPS</div>
          <InputWithCopyButton defaultValue={`${url}.git`} />
        </MenuHeader>
      ) : (
        <MenuHeader>Ошибка получения HTTPS ссылки</MenuHeader>
      )}
      <MenuSeparator />
      {sshUrl ? (
        <MenuHeader>
          <div className="dropdown__input-label">SSH</div>
          <InputWithCopyButton defaultValue={sshUrl} />
        </MenuHeader>
      ) : (
        <MenuHeader>Ошибка получения SSH ссылки</MenuHeader>
      )}
    </DropdownMenu>
  );
};

export default CloneRepositoryButton;
