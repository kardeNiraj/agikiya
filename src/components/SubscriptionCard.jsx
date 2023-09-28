/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import axios from 'axios';
import { useState } from 'react';

const SubscriptionCard = ({ subscription }) => {
  // console.log(subscription);
  const [status, setstatus] = useState(subscription.status);

  const date = new Date(subscription.created * 1000);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  // const stripeId = localStorage.getItem('user_id');
  const handleCancelSubscription = async (subscriptionId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/cancel-subscription`,
        {
          subscriptionId,
        }
      );
      // console.log(response);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEXT09OdeqMBAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
            className="w-14 h-14 rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold ">Name of the Plan</h2>
            <p className="text-gray-500">Purchased at - {formattedDate}</p>
          </div>
        </div>
        <div className="">
          <p>Type - {subscription.plan?.interval}ly</p>
          <p>Quantity - {subscription.quantity}</p>
          <p>Price - {subscription.plan?.amount / 100}</p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        {subscription.status === 'active' ? (
          <button
            className="py-2 px-3 bg-red-500 rounded-xl"
            onClick={() => handleCancelSubscription(subscription.id)}
          >
            Cancel Subscription
          </button>
        ) : null}
      </div>
      <hr className="w-full h-px bg-gray-600 border-0 my-5" />
    </div>
  );
};

export default SubscriptionCard;
