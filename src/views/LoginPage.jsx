/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/login`,
        {
          email: form.email,
          password: form.password,
        }
      );
      let role;
      if (data.status == 200) {
        if (data.data.data.role === 'admin') {
          role = 'admin';
        } else {
          role = 'user';
        }
        login(data.data.data._id, role);
        navigate('/');
      } else [navigate('/login')];
    } catch (err) {
      console.log(err);
      setMessage('WRONG CREDENTIALS');
      setForm({
        email: '',
        password: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#080c14]">
      <p className="text-3xl font-bold text-white pb-6">LOGIN</p>
      <div className="h-auto w-96 bg-[#8b8c90] flex justify-center items-center rounded-xl">
        <form
          method="post"
          className="p-10 flex flex-col gap-10 justify-center items-center"
        >
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="EMAIL"
            onChange={handleChange}
            className="px-4 py-2 placeholder:text-gray-700 placeholder:font-semibold rounded-xl bg-[#f3f3f3]"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="PASSWORD"
            onChange={handleChange}
            className="px-4 py-2 placeholder:text-gray-700 placeholder:font-semibold rounded-xl bg-[#f3f3f3]"
          />
          <button
            onClick={handleClick}
            className="bg-[#6be160] font-semibold px-10 py-2 rounded-xl"
          >
            Login
          </button>
          {message ? (
            <div className="text-[#d73838] font-semibold">{message}</div>
          ) : null}
          <Link to="/signup">Do not have an account? SignUp</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
