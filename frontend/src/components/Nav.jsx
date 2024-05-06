import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import LogoutIcon from '@mui/icons-material/Logout';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

import { getUserStatus } from '../features/userStatusSlice';
import { getCartItems } from '../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/postersDataSlice';
import { setfilteredPoster, revertPoster, revertfilteredPoster } from '../features/postersDataSlice';



const Nav = () => {
  const [condition, setCondition] = useState(true)
  const [searchData, setSearchData] = useState('')
  const [filteredArray, setFilteredArray] = useState([])
  const [tray, setTray] = useState(false);

  const { cart } = useSelector((state) => state.cartItems)
  const { posterData } = useSelector((state) => state.postersData);
  const { userStatus, userName } = useSelector((state) => state.userStatus)

  const dispatch = useDispatch()
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getUserStatus())
    dispatch(getCartItems())
    dispatch(getAllProducts())
  }, [])

  const Logout = () => {
    axios
      .get('/api/logout')
      .then((res) => {
        console.log(res.data);
      }
      )
      .catch((err) => console.error(err));
    window.location.reload();
  };

  function carter() {
    if (!cart) {
      return 0;
    } else {
      let total = 0;
      for (const carti of cart) {
        total = total + carti.quantity;
      }
      return total;
    }
  }

  const handleChange = (e) => {
    if (e.target.value == "") {
      setTray(false)
      setFilteredArray([])
    } else {
      setTray(true)
      setSearchData(e.target.value)
      setFilteredArray(posterData.filter((poster) =>
        poster.title.toLowerCase().includes(searchData.toLowerCase())
      ))

    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTray(false)
    if (filteredArray.length == 0) {
      dispatch(revertPoster())
    } else {
      dispatch(setfilteredPoster(filteredArray))
      dispatch(revertfilteredPoster())
    }
    navigate('/products')
  }

  const productNavigate = () => {
    dispatch(revertPoster())
    navigate(`/products`)
  }

  const handleLink = (id) => {
    dispatch(setfilteredPoster(filteredArray.filter(fil => fil.id == id)))
    dispatch(revertfilteredPoster())
    navigate("/products")
  }

  return (
    <div>

      <nav className='sm:flex hidden z-50  justify-between p-2 border-b-2  bg-gradient-to-b from-slate-100 to-white '>
        <div className='flex gap-3'>
          <Link to='/home'><img className='w-[150px]' src="/images/logo.png" alt="logo" /></Link>
        </div>

        <div className='relative pt-2'>
          <form onSubmit={handleSubmit} className='flex w-[40vw] rounded-2xl overflow-hidden border-slate-600 border-2'>
            <input onChange={handleChange} className='p-1 w-[94%] border-none border-transparent' type="text" />
            <button type='submit' className='w-[6%] border-none' ><SearchIcon /></button>
          </form>
          <div style={tray ? null : { display: 'none' }} className=' z-40 ml-1 absolute w-[40vw]  bg-white flex flex-col max-h-[50vh] overflow-y-auto scrollbar-hide'>
            {filteredArray.map((array, index) => (
              <div id='srctray' key={index} onClick={() => handleLink(array.id)} className='  hover:bg-slate-300 w-[100%] z-50 ' >
                {array.title}
              </div>
            )
            )}
            <div id='srctrayback' className='z-20 fixed top-0 left-0 w-screen h-screen bg-black/20 ' onClick={() => setTray(false)}>
            </div>
          </div>
        </div>

        <div className='pt-3 flex gap-3 mr-2'>
          <div className='font-bold' onClick={productNavigate}>
            Products
          </div>
          
          {userStatus ? (
            <div className='flex justify-between mr-7'>

              <Link className='font-bold relative mr-5' to='/cart'>
                <ShoppingCartIcon />
                <span className='absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-1'>{carter()}</span>
              </Link>
              <div onMouseEnter={() => setCondition(false)} onMouseLeave={() => setCondition(true)}>
                <div className='relative font-extrabold z-10'>
                  <div className='cursor-pointer'>
                    {condition ? <span className='rounded-full py-1 px-2 bg-gradient-to-b from-green-600 to-green-500 text-white -z-1'>{userName}</span> : <span className='  rounded-full py-1 px-2 bg-gradient-to-b from-green-600 to-green-500 text-white -z-1'>{userName}</span>}
                  </div>
                  <div className={`absolute mt-2 ${condition ? 'hidden' : 'flex flex-col bg-white border-b-2'}`}>
                    <Link className='font-bold hover:bg-slate-200' to="/orders">Orders</Link>
                    <span className='font-bold hover:bg-slate-200' onClick={Logout}>
                      <LogoutIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex gap-3 mr-7'>
              <Link className='font-bold' to='/login'>Login</Link>
            </div>
          )}
        </div>

      </nav>
      {/* ........................ */}
      <nav className='sm:hidden z-50 flex justify-between items-center gap-6 py-2 border-b-2  bg-gradient-to-b from-slate-100 to-white '>
        {/* <div className='flex-[10%] flex gap-3'>
        </div> */}
        <Link className='w-[25%] p-1' to='/home'><img className='w-full ' src="/images/logo.png" alt="logo" /></Link>

        <div className='w-[55%] h-6 relative '>
          <form onSubmit={handleSubmit} className='top-0 flex w-full h-full rounded-2xl overflow-hidden border-slate-600 border-2'>
            <input onChange={handleChange} className='p-1 w-[80%] border-white' type="text" />
            <button type='submit ' className='w-[20%] border-none pb-2 text-slate-700' ><SearchIcon /></button>
          </form>
          <div style={tray ? null : { display: 'none' }} className=' z-40 ml-1 absolute w-[100%]  bg-white flex flex-col max-h-[50vh] overflow-y-auto scrollbar-hide'>
            {filteredArray.map((array, index) => (
              <div id='srctray' key={index} onClick={() => handleLink(array.id)} className='  hover:bg-slate-300 w-[100%] z-50 text-sm' >
                {array.title}
              </div>
            )
            )}
            <div id='srctrayback' className='z-20 fixed top-0 left-0 w-screen h-screen bg-black/20 ' onClick={() => setTray(false)}>
            </div>
          </div>
        </div>

        <div className='w-[20%] flex justify-end gap-4 p-1 '>


          {userStatus &&
            <Link className='font-bold relative text-xs' to='/cart'>
              <ShoppingCartIcon />
              <span className='absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-1'>{carter()}</span>
            </Link>}


          <div className='relative' onClick={()=>setCondition((prev)=>!prev)}>
            {userStatus ? <span className='rounded-full py-1 px-2 bg-gradient-to-b from-green-600 to-green-500 text-white -z-1'>{userName}</span> : <span className='  rounded-full py-1 px-2 bg-gradient-to-b from-green-600 to-gray-500 text-white -z-1'>U</span>}
            <div className={`absolute mt-2 -right-2 z-10 ${condition ? 'hidden' : 'flex flex-col bg-white border-b-2'}`}>

              {!userStatus &&
                <Link className='font-bold hover:bg-slate-200' to='/login'>Login</Link>
              }
              <div className='font-bold hover:bg-slate-200' onClick={productNavigate}>
                Products
              </div>

              {userStatus &&
                <Link className='font-bold hover:bg-slate-200' to="/orders">Orders</Link>
              }

              {userStatus &&
                <span className='font-bold hover:bg-slate-200' onClick={Logout}>
                  <LogoutIcon />
                </span>

              }

            </div>

          </div>


        </div>
      </nav>
    </div>
  );
};

export default Nav;
