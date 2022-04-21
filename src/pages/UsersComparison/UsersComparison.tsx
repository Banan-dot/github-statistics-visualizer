import React, { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "./Form";
import ComparisonInfo from "./ComparisonInfo";

export default function UserComparison() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [firstUser, setFirstUser] = useState<string>("");
  const [secondUser, setSecondUser] = useState<string>("");

  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  const queryLength = Array.from(query).length;
  useEffect(() => {
    document.title = "Сравнение пользователей";
  }, []);

  const onFormSubmit = (
    e: FormEvent<HTMLFormElement>,
    firstUser: string,
    secondUser: string
  ) => {
    e.preventDefault();
    navigate(`/compare?firstUser=${firstUser}&secondUser=${secondUser}`);
  };

  return (
    <div className="user-comparison">
      {queryLength === 0 ? (
        <Form onSubmit={onFormSubmit} />
      ) : (
        <ComparisonInfo
          className="user-comparison__info"
          firstUser={query.get("firstUser") ?? ""}
          secondUser={query.get("secondUser") ?? ""}
        />
      )}
    </div>
  );
}
