import React, { FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "./Form";
import ComparisonInfo from "./ComparisonInfo";

export default function UserComparison() {
  const navigate = useNavigate();
  const { search } = useLocation();

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

  const firstUser = query.get("firstUser") ?? ""
  const secondUser = query.get("secondUser") ?? ""

  return (
    <div className="user-comparison">
      {queryLength < 2 ? (
        <Form firstUser={firstUser} secondUser={secondUser} onSubmit={onFormSubmit} />
      ) : (
        <ComparisonInfo
          className="user-comparison__info"
          firstUser={firstUser}
          secondUser={secondUser}
        />
      )}
    </div>
  );
}
