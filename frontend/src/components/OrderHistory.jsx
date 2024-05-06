import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory, removeUserOrderHistory } from '../features/ordersSlice';
import axios from 'axios';
import Nav from './Nav';
import { Footer } from './Footer';

export const OrderHistory = () => {
    const dispatch = useDispatch();
    const { orderHistory } = useSelector(state => state.orders);
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
            await axios.get('/api/auth')
                .then((res) => {
                    if (res.data.valid) {
                        console.log("authenticated")
                    } else {
                        navigate('/login')
                    }
                })
        }
        check();
    }, [])

    useEffect(() => {
        dispatch(getUserOrderHistory());
        console.log(orderHistory)
    }, [dispatch]);

    const remove = (id) => {
        console.log("1 :" + id);
        dispatch(removeUserOrderHistory(id))
        dispatch(getUserOrderHistory());
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className='flex flex-col'>
            <Nav />
            <div className='w-screen min-h-screen flex flex-col'>
                <div className='h-[15vh] flex justify-center items-start'>
                    <h1 className='text-black font-extrabold text-5xl my-9'>Order History</h1>
                </div>
                <div className='h-[90vh] w-full flex justify-center items-center'>
                    {orderHistory.length > 0 ? (
                        <>
                            <div className='w-[85%] h-[80%] lg:flex flex-col hidden items-center gap-5 overflow-y-scroll'>
                                {orderHistory.map((order, index) => (
                                    <div key={order.id} className={`w-[80%] h-auto p-4 border-[2px] rounded-md ${order.orderstatus === "sent" ? "border-green-500 bg-green-50" : order.orderstatus === "cancel" ? "border-orange-500 bg-orange-100" : order.orderstatus === "deny" ? "border-red-500 bg-red-100" : ""}`}>
                                        <div className='flex items-center gap-3'>
                                            <img src={`../public/images/${order.image_src}`} alt={order.title} className='w-12 h-12 rounded-full' />
                                            <div className='flex flex-col'>
                                                <span className='font-bold'>#{order.id}</span>
                                                <span>{order.title}</span>
                                            </div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className=' py-1 my-1 font-semibold'>
                                                {order.orderstatus === "sent"
                                                    ? "Your order has been delivered successfully."
                                                    : order.orderstatus === "deny"
                                                        ? "Unfortunately, your order was denied for some reason."
                                                        : order.orderstatus === "cancel"
                                                            ? "You have cancelled the order."
                                                            : ""}
                                            </span>


                                            <span>Date: {formatDate(order.date)}</span>
                                        </div>
                                        <div className='flex justify-between gap-4'>
                                            <span>Price: ₹{order.price}</span>
                                            <span className='flex gap-2'>
                                                <button className='bg-zinc-200 hover:bg-zinc-300 p-1' onClick={() => remove(order.id)}>Remove</button>
                                                <button className='bg-zinc-200 hover:bg-zinc-300 p-1' onClick={() => navigate(`/productview/${order.pid}`)}>Buy Again</button>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* ..........................mobile navigation........................................ */}
                            <div className='w-[98%] h-[80%] sm:hidden flex flex-col items-center gap-5 overflow-y-scroll'>
                                {orderHistory.map((order, index) => (
                                    <div key={order.id} className={`w-[80%] h-auto p-4 border-[2px] rounded-md ${order.orderstatus === "sent" ? "border-green-500 bg-green-50" : order.orderstatus === "cancel" ? "border-orange-500 bg-orange-100" : order.orderstatus === "deny" ? "border-red-500 bg-red-100" : ""}`}>
                                        <div className='flex items-center gap-3'>
                                            <img src={`../public/images/${order.image_src}`} alt={order.title} className='w-12 h-12 rounded-full' />
                                            <div className='flex flex-col'>
                                                <span className='font-bold'>#{order.id}</span>
                                                <span>{order.title}</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-between p-2'>
                                            <span className=' py-1 my-1 font-thin text-[13px]'>
                                                {order.orderstatus === "sent"
                                                    ? "Your order has been delivered successfully."
                                                    : order.orderstatus === "deny"
                                                        ? "Unfortunately, your order was denied for some reason."
                                                        : order.orderstatus === "cancel"
                                                            ? "You have cancelled the order."
                                                            : ""}
                                            </span>


                                            <span className='text-[13px]'>Date: {formatDate(order.date)}</span>
                                        </div>
                                        <div className='flex justify-between gap-4'>
                                            <span>Price: ₹{order.price}</span>
                                            <span className='flex gap-2'>
                                                <button className='bg-zinc-200 hover:bg-zinc-500 p-1 text-[13px] rounded-md hover:text-white' onClick={() => remove(order.id)}>Remove</button>
                                                <button className='bg-zinc-200 hover:bg-zinc-500 p-1 text-[13px] rounded-md hover:text-white' onClick={() => navigate(`/productview/${order.pid}`)}>Buy Again</button>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>

                    ) : (

                        <div className='w-[85%] h-[80%] flex flex-col items-center gap-5 overflow-y-scroll justify-center'>

                            <p className='text-3xl text-slate-400 font-bold font-mono'>No order history to show </p>
                        </div>
                    )}
                </div>
                <div className='h-[5vh] flex justify-center items-center'>
                    <button className='rounded-3xl bg-lime-500 hover:bg-lime-600' onClick={() => navigate("/orders")}>
                        <span className='p-3'>Go Back</span>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};
