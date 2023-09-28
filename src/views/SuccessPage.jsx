/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Navbar from '../components/Navbar';
import axios from 'axios';

const SuccessPage = () => {
  const [countDown, setCountDown] = useState(6);
  const navigate = useNavigate();

  const userId = localStorage.getItem('user_id');

  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get('data');
  const plan = JSON.parse(decodeURIComponent(encodedData));
  // console.log(plan);

  const setData = async () => {
    const data = await axios.post(
      `${import.meta.env.VITE_BASE_SERVER_URL}/user/subscriptions`,
      {
        userId: userId,
        planId: plan.id,
      }
    );
    // console.log(data);
  };

  useEffect(() => {
    setData();
    setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      navigate('/');
    }, 6000);
  }, []);

  return (
    <div className="h-screen w-full bg-[#080c14] text-gray-100">
      <Navbar />
      <div className=" w-4/5 mx-auto flex flex-col gap-5 justify-center items-center">
        <img src="/icons8-transaction-approved-96.png" className="w-1/12" />
        <h2 className="text-3xl font-bold font-sans">
          Your Payment is Successfully.
        </h2>
        <p className="text-gray-400">
          Thank you for your payment, An automated payment receipt will be sent
          to your registered email
        </p>
        <p>You will be redirected to the home page in {countDown}</p>
      </div>
    </div>
  );
};

export default SuccessPage;
