import { Link } from "@skbkontur/react-ui";
import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Страница не найдена";
  }, []);

  return (
    <div>
      <h2>Страница не найдена</h2>
      <Link href="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
