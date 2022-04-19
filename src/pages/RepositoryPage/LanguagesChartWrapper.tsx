import { gql, useQuery } from "@apollo/client";
import { Spinner } from "@skbkontur/react-ui";
import React from "react";
import Alert from "../../shared/Alert";
import LanguagesPieChart from "../../shared/charts/LanguagesPieChart";
import { RepositoryData, RepositoryVars } from "../../types/QueryTypes";
import { RepositoryChartWrapperProps } from "./RepositoryCharts";

const GET_LANGUAGES = gql`
  query GetLanguages($login: String!, $repositoryName: String!) {
    repository(owner: $login, name: $repositoryName) {
      languages(first: 100) {
        edges {
          node {
            id
            name
            color
          }
          size
        }
      }
    }
  }
`;

const LanguagesChartWrapper = ({
  className,
  login,
  repositoryName,
}: RepositoryChartWrapperProps) => {
  const { loading, data, error } = useQuery<RepositoryData, RepositoryVars>(
    GET_LANGUAGES,
    {
      variables: {
        login,
        repositoryName,
      },
    }
  );

  return (
    <div className={className}>
      {loading && <Spinner className="spinner spinner_centered" />}

      {error && (
        <Alert type="danger">
          Ошибка загрузки иноформации о языках репозитория
        </Alert>
      )}

      {data && !loading && (
        <LanguagesPieChart
          className="charts-section__languages-pie-chart"
          languageEdges={data.repository.languages.edges}
        />
      )}
    </div>
  );
};

export default LanguagesChartWrapper;
