import { gql } from '@apollo/client';

export const SEARCH_CUSTOMER = gql`
  query SearchCustomer($phoneNumber: String!) {
    customers(where: {phoneNumber: $phoneNumber}) {
      id
      firstName
      lastName
      phoneNumber
      email
      birthday
      visits
      loyaltyCoins
    }
  }`;