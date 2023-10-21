import { gql } from '@apollo/client';

export const GET_DASHBOARD_COUNTS_QUERY = gql`
  query GetDashboardCounts {
    dashboardCounts {
      customerCount
      rewardCount
    }
  }
`;