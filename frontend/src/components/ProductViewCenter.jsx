import React from 'react'
import { useDispatch } from 'react-redux'
import { setZoomState } from '../features/postersDataSlice'
import { Productzoom } from './Productzoom'

export const ProductViewCenter = (props) => {
    const dispatch = useDispatch()


    if (props.prod == "prod1") {
        return (
            <>
                <div className={`w-full h-[80%] lg:flex hidden justify-end items-start  bg-cover bg-center `} style={{ backgroundImage: `url('/images/11.png')` }}>
                    <Productzoom src={props.productDetails.image_src} />
                    <div className='w-[45%] h-[60%]  mt-14 mr-14 shadow-xl shadow-black/20 bg-gradient-to-b from-gray-900 to-gray-800 '>
                        <img onClick={() => dispatch(setZoomState(true))} className='w-full h-full p-2' src={`/images/${props.productDetails.image_src}`} alt="img" />
                    </div>
                </div>
                {/* ..........................mobile navigation............................... */}
                <div className={`w-full h-[80%] sm:hidden flex justify-end items-start  bg-cover bg-center `} style={{ backgroundImage: `url('/images/11.png')` }}>
                    <Productzoom src={props.productDetails.image_src} />
                    <div className='w-[45%] h-[60%]  mt-14 mr-14 shadow-xl shadow-black/20 bg-gradient-to-b from-gray-900 to-gray-800 '>
                        <img onClick={() => dispatch(setZoomState(true))} className='w-full h-full p-2' src={`/images/${props.productDetails.image_src}`} alt="img" />
                    </div>
                </div>
            </>
        )
    }


    if (props.prod == "prod2") {
        return (
            <>
                <div className={`w-full h-[80%] lg:flex hidden justify-end items-start  bg-cover bg-center `} style={{ backgroundImage: `url('/images/22.png')` }}>
                    <Productzoom src={props.productDetails.image_src} />
                    <div className='w-[45%] h-[60%] mt-10 mr-28 shadow-xl shadow-black/20 bg-gradient-to-b from-gray-900 to-gray-800 '>
                        <img onClick={() => dispatch(setZoomState(true))} className='w-full h-full p-2' src={`/images/${props.productDetails.image_src}`} alt="img" />
                    </div>
                </div>
                {/* ..........................mobile navigation............................... */}
                <div className={`w-full h-[80%] sm:hidden flex justify-end items-start  bg-cover bg-center `} style={{ backgroundImage: `url('/images/22.png')` }}>
                    <Productzoom src={props.productDetails.image_src} />
                    <div className='w-[45%] h-[60%] mt-10 mr-16 shadow-xl shadow-black/20 bg-gradient-to-b from-gray-900 to-gray-800 '>
                        <img onClick={() => dispatch(setZoomState(true))} className='w-full h-full p-2' src={`/images/${props.productDetails.image_src}`} alt="img" />
                    </div>
                </div>
            </>
        )
    }

    if (props.prod == "prod3") {
        return (
            <>
                <div className={`w-full h-[80%] lg:flex hidden justify-start items-start  bg-cover bg-center `} style={{ backgroundImage: `url('/images/33.png')` }}>
                    <Productzoom src={props.productDetails.image_src} />
                    <div className='w-[45%] h-[60%]  mt-14 ml-14 shadow-xl shadow-black/20 bg-gradient-to-b from-gray-900 to-gray-800 '>
                        <img onClick={() => dispatch(setZoomState(true))} className='w-full h-full p-2' src={`/images/${props.productDetails.image_src}`} alt="img" />
                    </div>
                </div>
                {/* ..........................mobile navigation............................... */}
                <div className={`w-full h-[80%] sm:hidden flex justify-start items-start  bg-cover bg-center `} style={{ backgroundImage: `url('/images/33.png')` }}>
                    <Productzoom src={props.productDetails.image_src} />
                    <div className='w-[45%] h-[60%]  mt-14 ml-14 shadow-xl shadow-black/20 bg-gradient-to-b from-gray-900 to-gray-800 '>
                        <img onClick={() => dispatch(setZoomState(true))} className='w-full h-full p-2' src={`/images/${props.productDetails.image_src}`} alt="img" />
                    </div>
                </div>
            </>
        )
    }

    if (props.prod == "prod") {
        return (
            <>
                <div className='w-full h-[80%] lg:flex hidden justify-center items-center  bg-cover bg-center bg-gradient-to-b from-slate-300 to-white '>
                    <Productzoom src={props.productDetails.image_src} />
                    <div className='w-[60%] h-[80%]   shadow-xl shadow-black/20 bg-gradient-to-b from-gray-900 to-gray-800 '>
                        <img onClick={() => dispatch(setZoomState(true))} className='w-full h-full p-2' src={`/images/${props.productDetails.image_src}`} alt="img" />
                    </div>
                </div>
                {/* ..........................mobile navigation............................... */}
                <div className='w-full h-[80%] sm:hidden flex justify-center items-center  bg-cover bg-center bg-gradient-to-b from-slate-300 to-white '>
                    <Productzoom src={props.productDetails.image_src} />
                    <div className='w-[60%] h-[80%]   shadow-xl shadow-black/20 bg-gradient-to-b from-gray-900 to-gray-800 '>
                        <img onClick={() => dispatch(setZoomState(true))} className='w-full h-full p-2' src={`/images/${props.productDetails.image_src}`} alt="img" />
                    </div>
                </div>
            </>
        )
    }

}
