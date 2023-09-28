/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      `${import.meta.env.VITE_BASE_SERVER_URL}/user/`,
      { ...formData }
    );
    if (data.data.data._id) {
      navigate('/login');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#080c14]">
      <p className="text-3xl font-bold text-white pb-6">SIGNUP</p>
      <div className="h-auto w-96 bg-[#8b8c90] flex justify-center items-center rounded-xl">
        <form
          method="post"
          className="p-10 flex flex-col gap-10 justify-center items-center"
        >
          <input
            type="text"
            name="name"
            placeholder="NAME"
            onChange={handleChange}
            className="px-4 py-2 placeholder:text-gray-700 placeholder:font-semibold rounded-xl bg-[#f3f3f3]"
          />
          <input
            type="text"
            name="email"
            placeholder="EMAIL"
            onChange={handleChange}
            className="px-4 py-2 placeholder:text-gray-700 placeholder:font-semibold rounded-xl bg-[#f3f3f3]"
          />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            onChange={handleChange}
            className="px-4 py-2 placeholder:text-gray-700 placeholder:font-semibold rounded-xl bg-[#f3f3f3]"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="CONFIRM PASSWORD"
            onChange={handleChange}
            className="px-4 py-2 placeholder:text-gray-700 placeholder:font-semibold rounded-xl bg-[#f3f3f3]"
          />
          <button
            onClick={handleClick}
            className="bg-[#6be160] font-semibold px-10 py-2 rounded-xl"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
