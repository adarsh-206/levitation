import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function showErrorToast(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleForgetPassword = () => {
    nav('/forgot-password')
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if( !email && !emailRegex.test(email)) {
       showErrorToast("⚠️ Email is incorrect");
    } else if(!password && !passRegex.test(password)) {
       showErrorToast("⚠️ Password must contain a capital letter and a number");
    } else {
    axios.post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login', {
      email: email,
      password: password
    })
    .then(response => {
      localStorage.setItem('authToken', response.data.authToken);
      if(localStorage.getItem("authToken")) {
        nav('/multiform')
      }
      console.log(response.status);
      
    })
    .catch(error => {
      showErrorToast("⚠️ Incorrect Login Credentials");
      console.log(error);
      
    });


    // Clear form fields
    setEmail('');
    setPassword('');
  }
  };

  return (
    <>
    
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white drop-shadow-lg rounded px-8 pt-6 pb-8 max-w-lg mx-auto">
        <h1 className='text-2xl font-bold pb-5 text-gray-700'>Login</h1>
        <div className="flex gap-4 mb-4">
          <label htmlFor="email" className="block w-20 text-gray-700 text-sm font-bold mt-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex gap-4 mb-6">
          <label htmlFor="password" className="block w-14 text-gray-700 text-sm font-bold mt-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
        <a href="" className='text-blue-500' onClick={handleForgetPassword}>Forgot Password ?</a>
      </form>
      <ToastContainer />
    </div>
    </>
  );
};

export default Login;