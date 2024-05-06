import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Footer } from './Footer';
import Nav from './Nav';
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';

export const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [mycart, setMycart] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    axios.get('/api/auth')
      .then(res => {
        // console.log(res.data)
        if (res.data.valid) {
          console.log("Authenticted");
        }
        else {
          navigate('/login')
        }
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('/api/cartitems')
        .then((res) => {
          setMycart(res.data);
          console.log(mycart)
        })
        .catch((error) => console.log(error))
    }
    fetchData();

  }, [])

  useEffect(() => {
    setTotalAmount(mycart.reduce((acc, cart) => acc + cart.price, 0))
  }, [removeItem])

  const Checkout = async () => {
    if (totalAmount == 0) {
      toast('Your Cart is Empty! Please Add some items to proceed with the checkout');
    } else {
      await axios
        .post("/api/checkout", mycart)
        .then((res) => {
          console.log(res.data);
          navigate('/cart')
        })
        .catch(err => console.log(err));
    }
  }

  function removeItem(pid) {
    setMycart(mycart.filter(item => item.pid !== pid));
    console.log(mycart)

  }
  return (
    <div>
      <ToastContainer/>
      <Nav />
      <div className='flex flex-col items-center mt-8'>
        <div className="min-h-[65vh] w-full flex flex-col items-center overflow-y-scroll">

          {mycart.map((item, index) => (
            <div key={index} className="flex items-center justify-between w-[90%] border-b-2 py-4">
              <div className="flex items-center">
                <img src={"../public/images/" + item.image_src} alt={item.title} className="w-24 h-24 object-cover pr-2" />
                <div>
                  <h1 className='font-medium'>{item.title}</h1>
                  <h1 className='font-medium'>Quantity: {item.quantity}</h1>
                  <h1 className='font-medium'>Price: ₹{item.price}</h1>
                </div>
              </div>
              <button className="text-red-500" onClick={() => removeItem(item.pid)}><ClearIcon /></button>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <span className='flex gap-4'>
            <button onClick={() => navigate("/cart")} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"> Go Back</button>
            <button onClick={Checkout} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4">
              Pay Now
            </button>
          </span>
          <h1 className="mt-2">Total Amount: ₹{totalAmount}</h1>
        </div>
      </div>

      <Footer />

    </div>
  );


}
