import React, { useEffect } from "react";

export default function UserComparison() {
  useEffect(() => {
    document.title = "Сравнение пользователей";
  }, []);

  return <div>Hello world</div>;
}
