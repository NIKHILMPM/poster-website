import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from './Nav';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, getCartItems } from '../features/cartSlice';
import { getUserStatus } from '../features/userStatusSlice';
import { Productzoom } from './Productzoom';
import { getAllProducts, getProduct, setZoomState } from '../features/postersDataSlice';
import { ProductViewCenter } from './ProductViewCenter';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InventoryIcon from '@mui/icons-material/Inventory';

export const Productview = () => {
    const [bgColor, setBgColor] = useState('bg-black')
    const [prod, setProd] = useState('prod1')

    const { id } = useParams();
    const pid = Number(id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userStatus, userId } = useSelector((state) => state.userStatus);
    const { cart } = useSelector((state) => state.cartItems)
    const { productDetails, zoomState } = useSelector((state) => state.postersData);



    useEffect(() => {
        dispatch(getUserStatus())
        dispatch(getCartItems())
        console.log("pid: " + pid + " ," + typeof (pid))
        dispatch(getProduct(pid))

    }, [dispatch, location.pathname]);



    const handleClick = async () => {
        if (userStatus) {
            try {
                const carti = cart.find(item => item.uid == userId && item.pid == pid);

                if (!carti) {
                    await dispatch(addCartItem(pid));
                    await dispatch(getCartItems());
                } else {
                    if (carti.state) {
                        alert("Sorry, but we only have it in our store");
                    } else {
                        await dispatch(addCartItem(pid));
                        await dispatch(getCartItems());
                    }
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("You have to sign in first");
            navigate('/login');
        }
    };

    return (
        <div>
            <Nav />
            <Productzoom src={productDetails.image_src} />
            <div className='w-full flex justify-center'>
                <div className="h-[90%] w-full max-w-screen-lg rounded-lg bg-gradient-to-b from-slate-100 to-white shadow-2xl flex justify-center items-center">

                    {/* Product Images */}
                    <div className="flex-[43%] h-full flex justify-center">
                        <div className="w-[98%] h-full">
                            <ProductViewCenter productDetails={productDetails} prod={prod} />
                            <div className="w-full h-[20%] flex items-center">
                                <div className="w-full h-[62%] flex justify-center items-center gap-7">
                                    <div onMouseOver={() => setProd('prod')} className='h-full w-20 flex justify-center items-center  bg-cover bg-center bg-gradient-to-b from-slate-300 to-white '>
                                        <div className='w-[60%] h-[80%] shadow-xl shadow-black/20 bg-gradient-to-b from-black to-gray-900 '>
                                            <img className='w-full h-full p-[2px]' src={`/images/${productDetails.image_src}`} alt="img" />
                                        </div>
                                    </div>
                                    <div onMouseOver={() => setProd('prod1')} className={`h-full w-20 flex justify-end items-start  bg-cover bg-center `} style={{ backgroundImage: `url('/images/11.png')` }}>
                                        <div className='w-[45%] h-[60%]  mt-3 mr-2 shadow-xl shadow-black/20 bg-gradient-to-b from-black to-gray-900 '>
                                            <img className='w-full h-full p-[2px]' src={`/images/${productDetails.image_src}`} alt="img" />
                                        </div>
                                    </div>
                                    <div onMouseOver={() => setProd('prod2')} className={`h-full w-20 flex justify-end items-start  bg-cover bg-center `} style={{ backgroundImage: `url('/images/22.png')` }}>
                                        <div className='w-[45%] h-[60%] mt-3 mr-2 shadow-xl shadow-black/20 bg-gradient-to-b from-black to-gray-900 '>
                                            <img className='w-full h-full p-[2px]' src={`/images/${productDetails.image_src}`} alt="img" />
                                        </div>
                                    </div>
                                    <div onMouseOver={() => setProd('prod3')} className={`h-full w-20 flex justify-start items-start  bg-cover bg-center `} style={{ backgroundImage: `url('/images/33.png')` }}>
                                        <div className='w-[45%] h-[60%]  mt-3 ml-2 shadow-xl shadow-black/20 bg-gradient-to-b from-black to-gray-900 '>
                                            <img onClick={() => dispatch(setZoomState(true))} className='w-full h-full p-[2px]' src={`/images/${productDetails.image_src}`} alt="img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-[57%] h-[90%] flex flex-col justify-between p-6 bg-white shadow-lg rounded-lg ml-4">
                        <div>
                            <h1 className="text-6xl font-bold text-gray-900">{productDetails.title}</h1>
                            <p className="mt-4 text-2xl text-gray-700">{productDetails.content}</p>
                        </div>
                        <div className="mt-6">
                            <h1 className='text-xl font-bold text-gray-500'>CATEGORY: {productDetails.category}</h1>
                            <span className='flex gap-4'>
                                <span className='border-2 border-gray-500 p-3 rounded-full mt-4'>
                                    <p className="flex items-center text-xl font-bold text-gray-500"><InventoryIcon /> {productDetails.quantity}</p>
                                </span>
                                <div className="flex items-center text-xl font-bold text-green-400">
                                    <CurrencyRupeeIcon />
                                    {productDetails.price}
                                </div>

                            </span>
                            <button onClick={handleClick} className="mt-3 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Add to Cart</button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};
