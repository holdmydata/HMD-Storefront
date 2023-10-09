import { gql } from '@apollo/client';

export const CHECK_IN_CUSTOMER = gql`
  mutation CheckInCustomer($phoneNumber: String!) {
    checkInCustomer(phoneNumber: $phoneNumber) {
      id
      date
      customer {
        id
        phoneNumber
        loyaltyCoins
        checkInDate
      }
    }
  }
`;