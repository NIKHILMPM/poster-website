import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Cartmod } from './Cartmod';
import Nav from './Nav';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../features/cartSlice';
import { Footer } from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const Cart = () => {
  const [mycart, setMycart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartItems)


  useEffect(() => {
    axios.get('/api/auth')
      .then(res => {
        console.log(res.data)
        if (res.data.valid) {
          console.log(res.data.username);
        }
        else {
          navigate('/login')
        }
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    dispatch(getCartItems())
    console.log(cart)
  }, []);

  const handleClick = () => {
    if (cart.length === 0) {
      toast("Your cart is empty")
    } else {
      navigate("/checkout")
    }
  }


  return (
    <div>
      <ToastContainer />
      <Nav />
      {
        cart.length > 0 ?
          (<div className="flex flex-col items-center mt-8">
            <div className="w-full flex justify-center">
              <h1 className="font-bold text-5xl">Your Cart</h1>
            </div>
            <div className="min-h-[65vh] w-full flex flex-col items-center overflow-y-scroll">
              {cart.map((item) => (
                <Cartmod key={item.id} arr={item} />
              ))}
            </div>
            <div className="w-full flex flex-col items-center mt-4 gap-2">
              <h1>Total Amount: ₹{cart.reduce((acc, cart) => acc + cart.price, 0)}</h1>
              <button onClick={handleClick} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Checkout
              </button>
            </div>
          </div>)
          :
          (<div className="min-h-[74vh] w-full flex justify-center ">
            <h1 className='mt-8 font-bold font-sans text-5xl text-slate-600'>No Items in The Cart</h1>
          </div>)
            
      }

      <Footer />
    </div>
  );
}
