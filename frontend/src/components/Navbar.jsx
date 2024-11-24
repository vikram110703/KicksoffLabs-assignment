import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      {isLoggedIn() ? (
        <nav className='flex gap-5'>
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
          <Link to="/calendar">Calendar</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;

