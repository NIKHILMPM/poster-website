// Signup.jsx
import React, { useState } from 'react';
import Nav from './Nav';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const [userinput, setUserinput] = useState({ username: "", email: "", password: "" });
  const [eye, setEye] = useState(false)
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserinput((prevState) => ({ ...prevState, [name]: value }));
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("/api/signup", userinput)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          console.log("Sign up successful")
          navigate('/login')

        } else {
          alert("Username or Email is already taken")
          navigate('/Signup')

        }
      }
      ).catch(err => console.log("Error in sign up ", err))
  }

  return (
    <div>
      <Nav />
      <div className='h-[90vh] flex justify-center items-center bg-gray-100'>
        <div className='w-96 bg-white shadow-lg rounded-lg p-8'>
          <h1 className='text-4xl font-extrabold text-gray-800 mb-6'>Sign-Up</h1>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <input
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              required
            />

            <span className="relative">
              <input
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                onChange={handleChange}
                type={eye ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              <span className='absolute inset-y-0 right-0 flex items-center pr-3'>
                <span onClick={() => setEye((prevState) => !prevState)} className='text-slate-400'>{eye ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
              </span>
            </span>


            <button className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
              Register
            </button>
          </form>
          <p className='mt-4 text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Signup;
