import React, { useState, useEffect } from 'react';
import { Producttemp } from './Producttemp';
import { useDispatch,useSelector } from 'react-redux';
import { getAllProducts } from '../features/postersDataSlice';

export const Productpagedisplay = (props) => {
    const dispatch = useDispatch();
    const [pageArr, setPageArr] = useState([]);
    const [pages, setPages] = useState(null);
    const { posterData } = useSelector((state) => state.postersData);

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {
        findPages();
        renderPages(1);
    }, [props.Arr]);

    function findPages() {
        const length = props.Arr.length;
        if (length % 6 === 0) {
            setPages(length / 6);
        } else {
            setPages(Math.floor(length / 6) + 1);
        }
    }

    function renderPages(n) {
        const startIndex = (n - 1) * 6;
        const endIndex = startIndex + 6;
        setPageArr(props.Arr.slice(startIndex, endIndex));
    }

    return (

        <>
        <div className=' w-[82%] h-full lg:flex flex-col hidden gap-2 justify-start  '>
            {pageArr.length > 0 ? (
                <h1 className='text-4xl font-extrabold font-serif text-slate-600'>Your Products</h1>
            ) : (
                <h1 className='text-4xl font-extrabold font-serif text-slate-600'>
                    {pageArr.length === posterData.length
                        ? 'No products available'
                        : 'No products available for your search'}
                </h1>
            )}


            <div className='mt-[2%] w-full flex-[90%] grid grid-cols-3 justify-center items-center gap-y-20 mb-11'>
                {pageArr.map((product, index) => (
                    <Producttemp
                        key={index}
                        product={product}
                    />
                ))}
            </div>
            <div className="flex-[10%] flex justify-center items-center ">
                {Array.from({ length: pages }).map((_, index) => (
                    <button
                        className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border-blue-700 rounded-full mx-1 focus:outline-none "
                        onClick={() => renderPages(index + 1)}
                        key={index}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
        {/* ............................................ */}
        <div className='sm:hidden w-[100%] h-full flex flex-col gap-2 justify-start  '>
            {pageArr.length > 0 ? (
                <h1 className='text-4xl font-extrabold font-serif text-slate-600'>Your Products</h1>
            ) : (
                <h1 className='ml-2 text-2xl font-extrabold font-serif text-slate-600'>
                    {pageArr.length === posterData.length
                        ? 'No products available'
                        : 'No products available for your search'}
                </h1>
            )}


            <div className='mt-[2%] w-full flex-[90%] grid grid-cols-3 grid-rows-2 justify-center items-center gap-y-5 '>
                {pageArr.map((product, index) => (
                    <Producttemp
                        key={index}
                        product={product}
                    />
                ))}
            </div>
            <div className="mt-6 flex-[10%] flex justify-center items-center ">
                {Array.from({ length: pages }).map((_, index) => (
                    <button
                        className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border-blue-700 rounded-full mx-1 focus:outline-none "
                        onClick={() => renderPages(index + 1)}
                        key={index}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
        </>
    );
};
