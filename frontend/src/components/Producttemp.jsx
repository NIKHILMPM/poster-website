import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, getCartItems } from '../features/cartSlice';
import { getUserStatus } from '../features/userStatusSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const Producttemp = (props) => {
    const { userStatus, userId } = useSelector((state) => state.userStatus);
    const { cart } = useSelector((state) => state.cartItems)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getUserStatus())
        dispatch(getCartItems())
    }, [])



    const handleClick = async () => {
        if (userStatus) {
            try {
                const carti = cart.find(item => item.uid === userId && item.pid === props.product.id);
                if (!carti) {
                    await dispatch(addCartItem(props.product.id));
                    await dispatch(getCartItems());
                    toast("Added to cart");
                } else {
                    if (carti.state) {
                        toast("Sorry, but we only have it in our store");
                    } else {

                        await dispatch(addCartItem(props.product.id));
                        await dispatch(getCartItems());
                        toast("Added to cart");
                    }
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            toast("You have to sign in first");
            navigate('/login');
        }
    };


    const src = "../public/images/" + props.product.image_src;

    return (
        <div>

            <div className='h-[70vh] w-[22vw] lg:flex flex-col hidden shadow-lg shadow-black/40 overflow-hidden border-slate-400 border-2 '>
                <div className='relative top-0 left-0 w-full h-[70%]'>
                    {/* Content of the upper div */}
                    <span className='absolute top-2 right-2 bg-white rounded-full  border-black border-2'><span className='py-1 px-2 font-extrabold text-slate-600'>{props.product.quantity}</span></span>
                    <Link to={`/productview/${props.product.id}`}>
                        <img src={`/images/${src}`} alt={props.product.title} className='w-full h-full object-cover ease-in-out transition-transform duration-500 hover:scale-110 transform-gpu' />
                    </Link>
                </div>
                <div className=' h-[30%] flex flex-col justify-center items-center bg-white'>
                    <div className='h-[40%] w-full flex justify-center items-end'>
                        <span className='font-serif font-bold text-2xl text-slate-600 text-center'>"{props.product.title}"</span>
                    </div>
                    <div className='h-[60%] w-full flex justify-center items-center gap-8'>
                        <span className='font-bold text-slate-600'>₹{props.product.price}</span>
                        {/* <button className='ml-2 border-slate-600 border-2 hover:bg-slate-600 hover-span:text-white'> <span className='p-1 text-slate-600'>Add to Cart</span></button> */}
                        <button onClick={handleClick} className='ml-2 border-slate-600 border-2 hover:bg-slate-600 p-2 text-slate-600 hover:text-white font-serif font-bold ease-in-out transition-transform duration-1000ms  transform-gpu'>Add to Cart
                        </button>

                    </div>
                </div>

            </div>
            <div className='ml-2 h-[25vh] w-[30vw] sm:hidden flex flex-col shadow-lg shadow-black/40 overflow-hidden border-slate-400 border-2 '>
                <div className='relative top-0 left-0 w-full h-[70%]'>
                    {/* Content of the upper div */}
                    <span className='absolute top-2 right-2 bg-white rounded-full  border-black border-2'><span className='py-1 px-2 font-extrabold text-slate-600'>{props.product.quantity}</span></span>
                    <Link to={`/productview/${props.product.id}`}>
                        <img src={`/images/${src}`} alt={props.product.title} className='w-full h-full object-cover ease-in-out transition-transform duration-500 hover:scale-110 transform-gpu' />
                    </Link>
                </div>
                <div className=' h-[30%] flex flex-col justify-center items-center bg-white'>
                    <div className='h-[40%] w-full flex justify-center items-end'>
                        <span className='font-serif font-bold text-[10px] text-slate-600 text-center'>"{props.product.title}"</span>
                    </div>
                    <div className='h-[60%] w-full flex justify-center items-center gap-1'>
                        <span className='font-bold text-slate-600 text-[10px]'>₹{props.product.price}</span>
                        {/* <button className='ml-2 border-slate-600 border-2 hover:bg-slate-600 hover-span:text-white'> <span className='p-1 text-slate-600'>Add to Cart</span></button> */}
                        {/* <button onClick={handleClick} className='h-2 w-3 ml-2 border-slate-600 border-2 hover:bg-slate-600 p-2 text-slate-600 hover:text-white font-serif font-bold ease-in-out transition-transform duration-1000ms  transform-gpu flex justify-center items-center'><span className='text-[5px] h-[2px] w-[3px]'><AddShoppingCartIcon className='h-2 w-3' /></span></button> */}
                        <button onClick={handleClick} className=' ml-2 hover:bg-slate-600 p-2 text-slate-600 hover:text-white font-serif font-bold rounded-lg ease-in-out transition-transform duration-1000ms transform-gpu flex justify-center items-center'>
                            <span className='text-[8px]'> {/* Adjust text size as needed */}
                                Add to cart
                            </span>
                        </button>

                    </div>
                </div>

            </div>
        </div>



    )
};


