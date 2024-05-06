import React, { useState } from 'react';
import Nav from './Nav';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {

  const [userinput, setUserinput] = useState({ email: "", password: "" });
  const navigate = useNavigate()
  const [eye, setEye] = useState(false)


  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserinput((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("/api/login", userinput)
      .then((res) => {
        if (res.data.login == true) {
          toast("you are successfully logged in");
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        } else {
          if (!res.data.login) {
            toast("user not found")
            navigate('/login')
          } else if (res.data.login == 'null') {
            toast("passsword is in-correct")
            navigate('/login')
          }
        }
      }
      ).catch(err => console.log("Error in sign up ", err))
  }

  return (
    <div>
      <ToastContainer />
      <Nav />
      <div className='h-[90vh] flex justify-center items-center bg-gray-100'>
        <div className='w-96 bg-white shadow-lg rounded-lg p-8'>
          <h1 className='text-4xl font-extrabold text-gray-800 mb-6'>Login</h1>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <p className='mt-4 text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link to="/Signup" className='text-blue-500 hover:underline'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
