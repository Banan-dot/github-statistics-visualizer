import React from "react";
import { gql, useQuery } from "@apollo/client";
import User from "../../models/User";
import UsersComparisonPieChart from "../../shared/charts/UsersComparisonPieChart";
import PageCard from "../../shared/PageCard";
import { Spinner } from "@skbkontur/react-ui";
import Alert from "../../shared/Alert";

const GET_USER_DATA = gql`
  query GetUserData($login: String!) {
    user(login: $login) {
      login
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
      }
      repositories {
        totalCount
      }
    }
  }
`;

type UserVars = {
  login: string;
};

type UserData = {
  user: User;
};

type Props = {
  firstUser: string;
  secondUser: string;
};

const generateChartData = (
  firstUser: User,
  secondUser: User,
  getUserData: (user: User) => number
) => {
  return [
    {
      x: firstUser.login,
      y: getUserData(firstUser),
    },
    {
      x: secondUser.login,
      y: getUserData(secondUser),
    },
  ];
};

const ComparisonCharts = ({ firstUser, secondUser }: Props) => {
  const firstUserQuery = useQuery<UserData, UserVars>(GET_USER_DATA, {
    variables: {
      login: firstUser,
    },
  });
  const secondUserQuery = useQuery<UserData, UserVars>(GET_USER_DATA, {
    variables: {
      login: secondUser,
    },
  });

  const firstUserData = firstUserQuery.data?.user;
  const secondUserData = secondUserQuery.data?.user;
  const loading = firstUserQuery.loading || secondUserQuery.loading;
  const error = firstUserQuery.error || secondUserQuery.error;

  return (
    <PageCard className="comparison-charts-card">
      <PageCard.Header>
        <PageCard.Title>Сравнение пользователей</PageCard.Title>
      </PageCard.Header>
      <PageCard.Body>
        {loading && (
          <Spinner
            className="spinner spinner_centered"
            caption="Загрзука данных о пользователях"
          />
        )}

        {error && (
          <Alert type="danger">Ошибка загрузки данных о пользователях</Alert>
        )}

        {firstUserData && secondUserData && (
          <div className="comparison-charts">
            <UsersComparisonPieChart
              data={generateChartData(
                firstUserData,
                secondUserData,
                (user) => user.repositories.totalCount
              )}
              title="Репозитории"
              legendX={60}
            />
            <UsersComparisonPieChart
              data={generateChartData(
                firstUserData,
                secondUserData,
                (user) => user.contributionsCollection.totalCommitContributions
              )}
              title="Коммиты"
              legendX={60}
            />
            <UsersComparisonPieChart
              data={generateChartData(
                firstUserData,
                secondUserData,
                (user) => user.contributionsCollection.totalIssueContributions
              )}
              title="Ишьюс"
              legendX={60}
            />
            <UsersComparisonPieChart
              data={generateChartData(
                firstUserData,
                secondUserData,
                (user) =>
                  user.contributionsCollection.totalPullRequestContributions
              )}
              title="Пулл реквесты"
              legendX={60}
            />
          </div>
        )}
      </PageCard.Body>
    </PageCard>
  );
};

export default ComparisonCharts;
