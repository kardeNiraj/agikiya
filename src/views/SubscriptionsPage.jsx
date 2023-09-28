/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../utils/authContext';
import SubscriptionCard from '../components/SubscriptionCard';

const SubscriptionsPage = () => {
  const userId = localStorage.getItem('user_id');
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    // Replace this with your code to fetch subscriptions
    const fetchSubscriptions = async () => {
      try {
        const response = await axios
          .get(`${import.meta.env.VITE_BASE_SERVER_URL}/user/subscriptions`)
          .then((res) => res.data);
        // console.log(`These are fetched subscriptions ${response}`);
        setSubscriptions(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  // useEffect(() => {
  //   setActiveSubscriptions
  // }, [subscriptions])

  // Rendering logic
  return (
    <div className="min-h-screen h-full bg-[#080c14] text-gray-100">
      <Navbar />
      <div className="w-4/5 mx-auto">
        {loading ? (
          <p>Loading subscriptions...</p>
        ) : subscriptions.length === 0 ? (
          <h1 className="text-3xl font-bold w-full mx-auto">
            No Subscriptions found
          </h1>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold pb-5">ACTIVE</h1>
              <hr className="w-full h-px bg-gray-600 border-0 my-5" />
              {subscriptions.active.map((subscription) => (
                <div key={subscription.id}>
                  <SubscriptionCard subscription={subscription} />
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-3xl font-bold py-5">CANCELED</h1>
              <hr className="w-full h-px bg-gray-600 border-0 my-5" />
              {subscriptions.canceled.map((subscription) => (
                <div key={subscription.id}>
                  <SubscriptionCard subscription={subscription} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
