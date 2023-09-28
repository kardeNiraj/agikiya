/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [admin, setAdmin] = useState(
    localStorage.getItem('admin') === 'true' ? true : false
  );

  return (
    <div className="flex justify-between w-4/5 mx-auto py-10">
      <div className="text-xl font-semibold">LOGO</div>
      <div>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>{admin ? <Link to="/create-plan">Admin</Link> : null}</li>

          <li>
            {isLoggedIn ? <Link to="/subscriptions">Subscriptions</Link> : null}
          </li>

          <li>
            {isLoggedIn ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
