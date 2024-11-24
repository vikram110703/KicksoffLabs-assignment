import React, { useEffect, useState } from 'react';
import { login } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';//it is a function

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn());
    if (isLoggedIn()) {
      navigate('/dashboard');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        <div className='flex gap-8 mt-5'>
          <h3>New here ?</h3>
        <Link className='underline' to='/register'>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
