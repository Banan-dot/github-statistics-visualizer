import React from "react";
import InputWithCopyButton from "./InputWithCopyButton";
import { Dropdown, MenuHeader, MenuSeparator } from "@skbkontur/react-ui";

type Props = {
  className?: string;
  url: string;
  sshUrl: string;
};

const CloneRepositoryButton = ({ className, url, sshUrl }: Props) => {
  return (
    <Dropdown
      className={`dropdown ${className}`}
      caption="Клонировать"
      menuAlign="right"
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
    </Dropdown>
  );
};

export default CloneRepositoryButton;
