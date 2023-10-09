import { gql } from "@apollo/client";

export const REWARD_REDEMPTION = gql`
mutation RedeemReward($phoneNumber: String!, $rewardNumber: String!) {
    rewardRedemption(phoneNumber: $phoneNumber, rewardNumber: $rewardNumber) {
      reward {
        rewardNumber
        name
      }
      customer {
        id
        firstName
        loyaltyCoins
      }
    }
  }
`;