import { useMutation } from '@apollo/client';
import { REWARD_REDEMPTION } from '../queries/queryRedeemReward';



export const useRedeemReward = () => {
  const [redeemReward, { data, loading, error }] = useMutation(REWARD_REDEMPTION);

  const redeem = async (phoneNumber, rewardNumber) => {
    console.log('Variables:', phoneNumber, rewardNumber);
    try {
      const response = await redeemReward({ variables: {phoneNumber, rewardNumber} });
      console.log('Reward redeemed response:', response);
      return response.data.rewardRedemption
    } catch (error) {
      console.error("Error in redeeming reward:", error);
    }
  };

  return { redeem, data, loading, error };
};