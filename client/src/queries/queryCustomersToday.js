import { gql } from "@apollo/client";

const GET_CUSTOMERS_QUERY = gql`
query CustomersCheckedInToday($startOfDay: DateTime!, $endOfDay: DateTime!) {
  customers(where: { visits_SOME: { date_GTE: $startOfDay, date_LTE: $endOfDay } }) {
    id
    firstName
    lastName
    phoneNumber
    email
    birthday
    visits(where: { date_GTE: $startOfDay, date_LTE: $endOfDay }) {
      date
    }
    loyaltyCoins
  }
}`;