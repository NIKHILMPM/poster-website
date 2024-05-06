import React from 'react'
import { setZoomState } from '../features/postersDataSlice'
import { useSelector, useDispatch } from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';

export const Productzoom = (props) => {
    const dispatch = useDispatch()
    const { zoomState } = useSelector((state) => state.postersData)


    console.log("zoomstate: " + zoomState);


    if (zoomState) {
        return (
            <>
                <div className="lg:fixed hidden top-0 left-0 h-screen w-screen bg-black/40 z-20 flex justify-center items-center">
                    <div className=' w-[30%] h-[84%] bg-cover bg-center ' >
                        <img className='w-full h-full bg-yellow-50 p-5' src={`/images/${props.src}`} alt="" />
                    </div>
                    <span onClick={() => dispatch(setZoomState(false))} className='fixed right-0 top-0 m-6 px-3 py-3 rounded-full bg-white hover:bg-slate-200'><ClearIcon /></span>

                </div >
                <div className="sm:hidden fixed top-0 left-0 h-screen w-screen bg-black/40 z-20 flex justify-center items-center">
                    <div className=' w-[70%] h-[60%] bg-cover bg-center ' >
                        <img className='w-full h-full bg-yellow-50 p-5' src={`/images/${props.src}`} alt="" />
                    </div>
                    <span onClick={() => dispatch(setZoomState(false))} className='fixed right-0 top-0 m-6 px-3 py-3 rounded-full bg-white hover:bg-slate-200'><ClearIcon /></span>

                </div >
            </>
        )

    }
}
