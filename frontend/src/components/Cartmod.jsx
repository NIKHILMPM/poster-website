import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, deleteCartItem, getCartItems } from '../features/cartSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const Cartmod = (props) => {
  const [posters, setPosters] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        setPosters(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteItem = () => {
    dispatch(deleteCartItem(props.arr.pid));
    dispatch(getCartItems());
    toast("item removed from your cart")
  };

  const getQuantity = (pid) => {
    const poster = posters.find((pos) => pos.id === pid);
    return poster ? poster.quantity : 0;
  };

  const handleChange = (event) => {
    const [quantity, productId] = event.target.value.split(',');
    dispatch(changeQuantity({ quantity: quantity, pid: productId }));
    dispatch(getCartItems());
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-4 w-[90%]">
      <div className="flex-shrink-0">
        <img className="w-24 h-24 object-cover" src={`../public/images/${props.arr.image_src}`} alt={props.arr.title} />
      </div>
      <div className="ml-4 flex-1">
        <div className="font-bold">{props.arr.title}</div>
        <select onChange={handleChange} defaultValue="">
          <option value="" disabled>
            {props.arr.quantity}
          </option>
          {Array.from({ length: getQuantity(props.arr.pid) }).map((_, index) => (
            <option key={index} value={`${index + 1},${props.arr.pid}`}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="ml-4 font-bold">₹{props.arr.price}</div>
      <button className="ml-4" onClick={deleteItem}>
        <DeleteForeverIcon />
      </button>
    </div>
  );
};
