import React from "react";
import { useQuery, gql } from "@apollo/client";

import RepositoryOwner from "../../../models/RepositoryOwner";

import LanguagesPieChart from "../../../shared/charts/LanguagesPieChart";
import PageCard from "../../../shared/PageCard";
import { getLanguagesInfo } from "../../../utils/languagesAnalysis";
import LanguagesStatistic from "../../../shared/LanguagesStatistic";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../../shared/Alert";

const GET_USER_LANGUAGES = gql`
  query ($login: String!) {
    repositoryOwner(login: $login) {
      repositories(first: 100, ownerAffiliations: OWNER) {
        nodes {
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            totalSize
            edges {
              size
              node {
                color
                id
                name
              }
            }
          }
        }
        totalDiskUsage
      }
    }
  }
`;

type Props = {
  className?: string;
  login: string;
};

type RepositoriesData = {
  repositoryOwner: RepositoryOwner;
};

type RepositoriesVars = {
  login: string;
};

const LangStat = ({ className, login }: Props) => {
  const { loading, data, error } = useQuery<RepositoriesData, RepositoriesVars>(
    GET_USER_LANGUAGES,
    {
      variables: {
        login,
      },
    }
  );

  if (loading) {
    return (
      <Spinner
        className="spinner spinner_centered"
        caption="Загрузка информации об языках пользователя"
      />
    );
  }

  if (error) {
    return <Alert type="danger">Ошибка загрузки языков</Alert>;
  }

  if (!data || data.repositoryOwner === null) {
    return <Alert type="danger">Нет данных</Alert>;
  }

  const { langEdges, totalSize } = getLanguagesInfo(
    data?.repositoryOwner.repositories.nodes
  );

  const isSizeMoreThanPercent = (size: number, percents: number) =>
    (size / totalSize) * 100 > percents;

  const languagesToViewChart = langEdges.filter((lang) =>
    isSizeMoreThanPercent(lang.size, 1)
  );

  return (
    <PageCard element="section" className={className}>
      <PageCard.Header>
        <PageCard.Title>Статистика языков</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body className="user-languages">
        <div className="user-languages__language-stat">
          <LanguagesStatistic
            classNamePrefix="user-languages"
            languageEdges={langEdges}
            totalLanguagesSize={totalSize}
            totalFilesSize={data.repositoryOwner.repositories.totalDiskUsage}
          />
          <LanguagesPieChart
            languageEdges={languagesToViewChart}
            className="user-languages__languages-pie-chart"
          />
        </div>
      </PageCard.Body>
    </PageCard>
  );
};

export default LangStat;
