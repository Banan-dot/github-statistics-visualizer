import React from "react";

type Props = {
  src: string;
  className?: string;
  size?: number | string;
};

const UserAvatar = ({ className, src, size = 32 }: Props) => {
  return (
    <img
      className={`user-avatar ${className}`}
      src={src}
      width={size}
      height={size}
      alt="Аватар пользователя"
    />
  );
};

export default UserAvatar;
