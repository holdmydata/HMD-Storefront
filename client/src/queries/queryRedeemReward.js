import { gql } from "apollo-server";

/* Deduct points and return reward node. */
export const REWARD_REDEMPTION = gql`
    mutation RewardRedemption($phoneNumber: String!, $rewardId: ID!) {
        rewardRedemption(phoneNumber: $phoneNumber, rewardId: $rewardId) {
            id
            firstName
            lastName
            phoneNumber
            loyaltyCoins
        }
    }
`;