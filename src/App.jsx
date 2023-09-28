/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const baseUrl = 'http://localhost:5001';

  const getData = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_SERVER_URL}/plan/all`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-screen bg-[#080c14] text-gray-100">
      {/* navbar */}
      <div>
        <Navbar />
      </div>

      {/* all plans */}
      <div className="w-4/5 mx-auto py-5">
        <h1 className="text-3xl font-bold py-5 text-gray-100">All Plans</h1>
        <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {loading
            ? 'Loading...'
            : data.map((item) => (
                <Link
                  to={`/plan/${item._id}`}
                  className="p-10 w-full h-auto shadow-xl rounded-xl bg-gray-400"
                  key={item._id}
                >
                  <img
                    className="h-3/4 w-full overflow-hidden items-center rounded-xl mb-5"
                    src={item.img_url}
                  />
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold capitalize">
                      {item.name}
                    </h1>
                    <p className="text-lg font-medium">&#8377; {item.price}</p>
                  </div>
                  <p className="line-clamp-1">{item.description}</p>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
