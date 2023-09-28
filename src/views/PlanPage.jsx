/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../utils/authContext';

import Navbar from '../components/Navbar';

const Plan = () => {
  const { isLoggedIn } = useAuth();

  const [option, setOption] = useState('month');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/plan/${id}`
      );
      setData(response.data.data);
      // console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  const handlePayment = async () => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const plan = {
      name: data.name,
      id: data._id,
      price: data.price,
      option: option,
    };

    const res = await axios.post(
      `${
        import.meta.env.VITE_BASE_SERVER_URL
      }/subscribe/create-checkout-session`,
      plan
    );

    // console.log(res);
    const session = res.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) console.log(result.error);
  };

  return (
    <div className="bg-[#080c14] h-screen text-gray-100">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Navbar />
          <div className="w-4/5 py-5 mx-auto flex gap-10">
            <img src={`${data.img_url}`} className="w-1/3 " />
            <div className="">
              <h1 className="text-3xl font-bold pb-10">{data.name}</h1>
              <p className="text-lg ">{data.description}</p>
              <p>{data.price}</p>
              <div className="my-5 flex gap-3">
                <select
                  className="px-5 py-2 font-semibold rounded-xl border-none bg-slate-800 text-gray-400"
                  onChange={handleChange}
                  name="options"
                  value={option}
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
                <button
                  onClick={handlePayment}
                  className={`px-5 py-2 bg-[#6be160] font-semibold rounded-xl text-[#080c14] disabled:bg-gray-500`}
                  disabled={!isLoggedIn}
                >
                  Buy Now
                </button>
              </div>
              {!isLoggedIn ? (
                <p className="text-gray-500">
                  In order to buy the plan you must login !
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
