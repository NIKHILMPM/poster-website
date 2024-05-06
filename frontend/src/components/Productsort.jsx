import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { revertPoster, setSortPageState } from '../features/postersDataSlice';
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenTwoToneIcon from '@mui/icons-material/MenuOpenTwoTone';

export const Productsort = (props) => {
  const [amount, setAmount] = useState({ Budget: null, category: null });
  const{sortPageState}=useSelector((state)=> state.postersData);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmount((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReset = () => {
    setAmount({ Budget: null, category: null });
  };

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  return (
    <>
      <div className=' h-screen  w-[18%] pl-3 lg:flex hidden items-start ' >
        <div className='mt-[2%] mr-3'>
          <label htmlFor="budget" className="block  font-serif font-extrabold text-2xl text-slate-600">Your Budget:</label>
          <span className='flex gap-4 justify-center items-center '>
            <span>
              <input onChange={handleChange} type="range" id="budget" name="Budget" min="1000" max="5000" step="1000" className="block w-full mt-1" />
            </span>
            <span >
              <output htmlFor="budget" id="budgetValue" className="block mt-2 font-serif font-extrabold ">{amount.Budget}</output>
            </span>
          </span>

          <label className="block mt-4 font-serif font-extrabold text-2xl text-slate-600">Category:</label>
          <div className="mt-2">
            <label htmlFor="autograph" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'autograph' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'autograph' }))}>Autograph</label>
          </div>
          <div className="mt-2">
            <label htmlFor="vintage" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'vintage' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'vintage' }))}>Vintage Paintings</label>
          </div>
          <div className="mt-2">
            <label htmlFor="christmas" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'christmas' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'christmas' }))}>Christmas Card</label>
          </div>
          <div className="mt-2">
            <label htmlFor="movie" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'movie' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'movie' }))}>Movie Posters</label>
          </div>
          <div className="mt-2">
            <label htmlFor="travel" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'travel' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'travel' }))}>Travel Posters</label>
          </div>
          <div className="mt-2">
            <label htmlFor="theatre" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'theatre' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'theatre' }))}>Theatre Posters</label>
          </div>
          <div className="mt-2">
            <label htmlFor="music" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'music' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'music' }))}>Music Posters</label>
          </div>
          <div className="mt-2">
            <label htmlFor="circus" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'circus' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'circus' }))}>Circus Posters</label>
          </div>
          <span className='flex gap-3'>
            <button onClick={handleReset} className="mt-4 font-serif font-bold text-slate-600 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Reset</button>
            <button onClick={() => dispatch(revertPoster())} className="mt-4 font-serif font-bold text-slate-600 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Get All Posters</button>
          </span>

          <br />
          <button onClick={() => props.sort(amount.Budget, amount.category)} className="mt-2 font-serif font-bold bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Apply Filters</button>
        </div>
      </div>


      {/* ................... */}
      {sortPageState?(

      <div className='absolute sm:hidden h-screen  flex items-start p-1' >
        <div onClick={()=>dispatch(setSortPageState(false))} className='h-screen w-screen bg-black/30 fixed top-0 left-0'></div>
        <span className='absolute top-0 right-0 mr-1 mt-1 px-4 py-3 z-50' onClick={()=>dispatch(setSortPageState(false))}><CloseIcon /></span>
        <div className='mt-[2%] mr-3 bg-white z-30 border-2 border-slate-700'>
          <label htmlFor="budget" className="block  font-serif font-extrabold text-2xl text-slate-600">Your Budget:</label>
          <span className='flex gap-4 justify-center items-center '>
            <span>
              <input onChange={handleChange} type="range" id="budget" name="Budget" min="1000" max="5000" step="1000" className="block w-full mt-1" />
            </span>
            <span >
              <output htmlFor="budget" id="budgetValue" className="block mt-2 font-serif font-extrabold ">{amount.Budget}</output>
            </span>
          </span>

          <label className="block mt-4 font-serif font-extrabold text-2xl text-slate-600">Category:</label>
          <div className="mt-2">
            <label htmlFor="autograph" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'autograph' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'autograph' }))}>Autograph</label>
          </div>
          <div className="mt-2">
            <label htmlFor="vintage" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'vintage' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'vintage' }))}>Vintage Paintings</label>
          </div>
          <div className="mt-2">
            <label htmlFor="christmas" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'christmas' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'christmas' }))}>Christmas Card</label>
          </div>
          <div className="mt-2">
            <label htmlFor="movie" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'movie' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'movie' }))}>Movie Posters</label>
          </div>
          <div className="mt-2">
            <label htmlFor="travel" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'travel' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'travel' }))}>Travel Posters</label>
          </div>
          <div className="mt-2">
            <label htmlFor="theatre" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'theatre' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'theatre' }))}>Theatre Posters</label>
          </div>
          <div className="mt-2">
            <label htmlFor="music" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'music' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'music' }))}>Music Posters</label>
          </div>
          <div className="mt-2">
            <label htmlFor="circus" className={`ml-2 cursor-pointer font-serif font-bold text-slate-600 hover:bg-slate-300 p-1 hover:text-white ${amount.category === 'circus' ? 'bg-slate-500 p-1 text-white' : ''}`} onClick={() => setAmount(prevState => ({ ...prevState, category: 'circus' }))}>Circus Posters</label>
          </div>
          <span className='flex gap-3'>
            <button onClick={handleReset} className="mt-4 font-serif font-bold text-slate-600 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Reset</button>
            <button onClick={() => dispatch(revertPoster())} className="mt-4 font-serif font-bold text-slate-600 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Get All Posters</button>
          </span>

          <br />
          <button  onClick={() => props.sort(amount.Budget, amount.category)} className="mt-2 font-serif font-bold bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Apply Filters</button>
        </div>
      </div>
      ):(
      <div onClick={()=>dispatch(setSortPageState(true))} className='z-50 absolute top-5 top-20 sm:hidden h-10  flex items-start  bg-white rounded-r-full p-1 border-2 border-slate-400 text-slate-400' > <MenuOpenTwoToneIcon/></div>
      )
      }
    </>
  );
};
