import React, { useState, useEffect } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';


export const Footer = () => {
    const [year, setYear] = useState('');

    useEffect(() => {
        const d = new Date();
        const yr = d.getFullYear();
        setYear(yr);
    }, []);

    return (
        <div className='flex h-[15vh] w-[100vw] justify-center items-end'>
            <div className='h-[70%] w-[85%] border-t border-zinc-400 flex justify-between items-start'>
                <div className='mt-4 text-zinc-600'>© {year} Company, Inc</div>
                <div className='mt-4 flex gap-3 text-zinc-600 font-[800]'>
                    <InstagramIcon />
                    <FacebookIcon />
                    <XIcon />
                </div>
            </div>
        </div>
    );
};

