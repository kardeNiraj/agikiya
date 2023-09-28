/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const [countDown, setCountDown] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
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
      <img src="/icons8-transaction-declined-96.png" className="w-1/12" />
      <div className=" w-4/5 mx-auto flex flex-col gap-5 justify-center items-center">
        <h2 className="text-3xl font-bold font-sans text-red-500">
          Your Payment Failed.
        </h2>
        <p className="text-gray-400">
          Sorry, we were not able to get your payment through. Try again!
        </p>
        <p>You will be redirected to the home page in {countDown}</p>
      </div>
    </div>
  );
};

export default CancelPage;
