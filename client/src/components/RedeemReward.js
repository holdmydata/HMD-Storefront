/* Using this for holding redemption logic */
import React, { Component } from 'react';
import { useMutation } from '@apollo/client';
import { REWARD_REDEMPTION } from '../queries/queryRedeemReward';

function RedeemReward() {
  const [redeemReward] = useMutation(REWARD_REDEMPTION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await redeemReward();
      // Handle success, maybe clear the form or show a success message
    } catch (error) {
      // Handle error
      console.error("Error redeeming reward:", error);
    }
  };

  return (
    <div className="p-4 shadow-lg border rounded bg-white flex">
      <h2 className="text-xl mb-4 flex-grow">Redeem Reward</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
          Redeem
        </button>
      </form>
    </div>
  );
}

export default RedeemReward;