/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const CreatePlan = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    img_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewPlan = async () => {
    console.log('button clicked');
    try {
      const newPlan = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/plan/`,
        { form }
      );
      console.log('execution completed');
      console.log(newPlan);
      setForm({
        name: '',
        description: '',
        price: 0,
        img_url: '',
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-screen bg-[#080c14] text-gray-100">
      <Navbar />
      <div className="w-4/5 mx-auto">
        <h1 className="uppercase text-3xl font-bold">create a new plan</h1>
        <div className="flex gap-5 flex-col w-2/5 mt-10">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="px-3 py-2 text-black placeholder:text-gray-500 placeholder:font-semibold rounded-xl"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="px-3 py-2 text-black placeholder:text-gray-500 placeholder:font-semibold rounded-xl"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="px-3 py-2 text-black placeholder:text-gray-500 placeholder:font-semibold rounded-xl"
            value={form.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="img_url"
            placeholder="Image URL"
            className="px-3 py-2 text-black placeholder:text-gray-500 placeholder:font-semibold rounded-xl"
            value={form.img_url}
            onChange={handleChange}
          />
          <button
            className="bg-green-500 px-3 py-2 rounded-xl"
            onClick={handleNewPlan}
          >
            Create a Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlan;
