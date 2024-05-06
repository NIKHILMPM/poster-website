import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import { useSelector, useDispatch } from 'react-redux';
import { cancelUserOrder, getUserOrders, setViewOrder } from '../features/ordersSlice';
import { Footer } from './Footer';

export const Userorders = () => {
    const navigate = useNavigate();
    const { orders, viewOrder, viewState } = useSelector((state) => state.orders);
    const dispatch = useDispatch();

    console.log(viewOrder)

    useEffect(() => {
        dispatch(getUserOrders());
        console.log(orders)
    }, [dispatch]);

    useEffect(() => {
        const check = async () => {
            await axios.get('/api/auth')
                .then((res) => {
                    if (!res.data.valid) {
                        navigate('/login');
                    }
                }); s
        };
        check();
    }, [navigate]);

    const cancelOrder = (id) => {
        console.log(id + " " + typeof (id));
        dispatch(cancelUserOrder(id));
        dispatch(getUserOrders());
    };

    return (
        <div>
            <Nav />
            <div className='w-screen min-h-screen flex flex-col '>
                <div className='h-[10vh] flex justify-center items-start'>
                    <h1 className='text-5xl font-extrabold text-black my-3'>Your Orders</h1>
                </div>
                <div className='h-[80vh] w-full flex justify-center items-center'>
                    <div className='w-[85%] h-[90%] flex flex-col items-center gap-5 overflow-y-scroll'>

                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <>
                                    <div key={index} className={`w-full lg:flex hidden gap-4 p-4 border-2 border-gray-200 rounded-md items-center justify-between mb-4 ${order.status ? "bg-red-100" : ""}`}>

                                        <div className='flex items-center gap-4'>
                                            <img src={`../public/images/${order.image_src}`} alt={order.title} className='w-16 h-16 object-cover rounded-md' />
                                            <div>
                                                <h1 className='font-bold'>{order.title}</h1>
                                                <p>ID: {order.id}</p>
                                                <p>Quantity: {order.quantity}</p>
                                                <p>Price: ₹{order.price}</p>
                                                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        {order.status ? (
                                            <span className='text-red-600'>Cancellation pending</span>
                                        ) : (
                                            <button onClick={() => cancelOrder(order.id)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'>Cancel Order</button>
                                        )}
                                    </div>
                                    {/* .........................mobile navigation............................... */}

                                    <div key={index} className={`w-full sm:hidden flex gap-4 p-4 border-2 border-gray-200 rounded-md items-center justify-between mb-4 ${order.status ? "bg-red-100" : ""}`}>
                                        {viewState &&
                                            <div className='fixed top-0 left-0 h-screen w-screen bg-black/40 z-40 flex justify-center items-center'>
                                                <span className='fixed bg-white top-2 right-1 px-3 py-1 rounded-full' onClick={() => dispatch(setViewOrder({ status: false, order: null }))}>x</span>
                                                <div className='w-[90%] h-[60%] bg-white rounded-lg flex'>
                                                    <div className='w-[100%] h-[100%] p-2 flex justify-center items-center flex-col'>
                                                        <img
                                                            src={`../public/images/${viewOrder.image_src}`}
                                                            alt={viewOrder.title}
                                                            className='w-[50%] h-[60%] object-cover rounded-md border-2 border-slate-600'
                                                        />
                                                        <div className="mt-4">
                                                            <p className="text-lg font-bold">Title: {viewOrder.title}</p>
                                                            <p>ID: {viewOrder.id}</p>
                                                            <p>Price: ₹{viewOrder.price}</p>
                                                            <p>Quantity: {viewOrder.quantity}</p>
                                                            <p>Date: {new Date(viewOrder.date).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        }
                                        <div className='flex flex-col '>
                                            <div className='w-full h-[80%] flex justify-between p-1 gap-3'>
                                                <img src={`../public/images/${order.image_src}`} alt={order.title} className='w-16 h-16 object-cover rounded-md' />
                                                <h1 className='font-bold'>{order.title}</h1>
                                            </div>
                                            <div className='w-full h-[20%] p-1 '>
                                                <h1 className='font-thin text-blue-500 underline' onClick={() => dispatch(setViewOrder({ status: true, order: order }))}>view details</h1>
                                            </div>
                                        </div>
                                        {order.status ? (
                                            <span className='text-red-600'>Cancellation pending</span>
                                        ) : (
                                            <button onClick={() => cancelOrder(order.id)} className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-md text-sm'>Cancel Order</button>
                                        )}
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className='w-4/5 h-full flex flex-col items-center justify-center'>
                                <p className='text-3xl text-slate-400 font-bold font-mono'>No orders yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='h-[5vh] flex justify-center items-center gap-5'>
                <div>
                    <Link to="/orderHistory" className='text-blue-500'>View order history</Link>
                </div>
                <button className='rounded-lg bg-lime-500 hover:bg-lime-600 p-3' onClick={() => navigate("/home")}>
                    <span>Go back</span>
                </button>
            </div>
            <Footer />
        </div>
    );
}
