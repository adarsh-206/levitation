import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const ForgetPassword: React.FC = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        console.log("Request Sent");
        nav('/');
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    
  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white drop-shadow-md rounded px-8 pt-6 pb-8 max-w-lg mx-auto">
        <h1 className='text-2xl font-bold pb-5 text-gray-700'>Forget Password</h1>
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
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sent Request
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default ForgetPassword;