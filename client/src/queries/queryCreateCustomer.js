import { gql } from '@apollo/client';

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($phoneNumber: String!, $firstName: String!, $lastName: String!, $email: String, $birthday: DateTime!) {
    createCustomer(phoneNumber: $phoneNumber, firstName: $firstName, lastName: $lastName, email: $email, birthday: $birthday) {
      id
      firstName
      lastName
      phoneNumber
      email
      loyaltyCoins
      birthday
    }
  }
`;