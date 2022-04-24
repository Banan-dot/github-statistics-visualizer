import { Spinner } from "@skbkontur/react-ui";
import React, { useEffect, useState } from "react";
import { RepositoryItemProps } from "..";
import { getRepositoryContributors } from "../../../api/githubService";
import Alert from "../../../shared/Alert";
import PageCard from "../../../shared/PageCard";
import RepositoryContributorsList from "./RepositoryContributorsList";

export type RepositoryContributor = {
  id: number;
  avatar_url: string;
  contributions: number;
  login: string;
};

const RepositoryContributors = ({
  className,
  login,
  repositoryName,
}: RepositoryItemProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [repositoryContributors, setRepositoryContributors] = useState<
    RepositoryContributor[]
  >([]);

  useEffect(() => {
    setLoading(true);
    getRepositoryContributors(login, repositoryName)
      .then((data) => setRepositoryContributors(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [login, repositoryName]);

  return (
    <PageCard className={className}>
      <PageCard.Header>
        <PageCard.Title>Контрибьюторы</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        {loading && (
          <Spinner
            className="spinner spinner_centered"
            caption="Загрузка контрибьюторов"
          />
        )}

        {error && <Alert type="danger">Ошибка загрузки контрибьюторов</Alert>}

        {repositoryContributors && !loading && (
          <RepositoryContributorsList contributors={repositoryContributors} />
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default RepositoryContributors;
