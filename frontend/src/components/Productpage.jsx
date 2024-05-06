import React, { useState, useEffect } from 'react';
import { Productsort } from './Productsort';
import Nav from './Nav';
import { Footer } from './Footer';
import { Productpagedisplay } from './Productpagedisplay';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllProducts } from '../features/postersDataSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const Productpage = () => {
    const [pageArr, setPageArr] = useState([]);
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();
    const { temp, posterData, isLoading } = useSelector((state) => state.postersData);
    const location = useLocation();


    useEffect(() => {
        dispatch(getAllProducts());
        setProduct(posterData);
    }, [dispatch, location.pathname])

    useEffect(() => {
        if (isLoading) {
            setPageArr(temp);
            setProduct(temp);
        } else {
            setPageArr(posterData);
        }
    }, [temp, posterData, isLoading, location.pathname]);

    function Sorter(budget, category) {
        console.log(category + " " + budget);
        console.log(pageArr);
        if (budget != null && category != null) {
            setPageArr(product.filter((pr) => pr.category == category && pr.price <= budget))
        } else if (budget == null && category != null) {
            setPageArr(product.filter((pr) => pr.category == category))
        } else if (budget != null && category == null) {
            setPageArr(product.filter((pr) => pr.price <= budget))
        } else {
            setPageArr(product)
        }
    }

    return (
    <>
        <div className='lg:flex flex-col hidden' >
            <Nav />
            <ToastContainer />
            <div className='relative w-[100vw] h-min-screen flex gap-10 mt-4 mb-7 '>
                <Productsort sort={Sorter} />
                <Productpagedisplay Arr={pageArr} />
            </div>

            <Footer />
        </div>
        <div className='sm:hidden flex flex-col ' >
            <Nav />
            <ToastContainer />
            <div className='relative w-screen h-[70vh]  flex gap-10 mt-4 mb-7 '>
                <Productsort sort={Sorter} />
                <Productpagedisplay Arr={pageArr} />
            </div>

            <Footer />
        </div>
    </>
    );
};
