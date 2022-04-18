import React from "react";
import InputWithCopyButton from "./InputWithCopyButton";
import { Dropdown, MenuHeader, MenuSeparator } from "@skbkontur/react-ui";

type Props = {
  className?: string;
  gitUrl: string;
  sshUrl: string;
};

const CloneRepositoryButton = ({ className, gitUrl, sshUrl }: Props) => {
  return (
    <Dropdown
      className={`dropdown ${className}`}
      caption="Клонировать"
      menuAlign="right"
    >
      {gitUrl ? (
        <MenuHeader>
          <div className="dropdown__input-label">HTTPS</div>
          <InputWithCopyButton defaultValue={gitUrl} />
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
    </Dropdown>
  );
};

export default CloneRepositoryButton;
