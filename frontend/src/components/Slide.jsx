import React, { useState } from 'react';

export const Slide = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3; // Total number of slides
    
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === totalSlides - 1 ? 0 : prevSlide + 1));
    };
    
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? totalSlides - 1 : prevSlide - 1));
    };
    
    return (
      <div className="relative">
        <div className="overflow-hidden">
          <div className="w-screen flex-none flex-shrink-0" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="w-screen flex-none flex-shrink-0 bg-gray-200 h-64 border-black">Slide 1</div>
            <div className="w-screen flex-none flex-shrink-0 bg-gray-200 h-64 border-black">Slide 2</div>
            <div className="w-screen flex-none flex-shrink-0 bg-gray-200 h-64 border-black">Slide 3</div>
          </div>
        </div>
        <button className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-gray-800 text-white px-4 py-2 rounded-full" onClick={prevSlide}>Prev</button>
        <button className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-gray-800 text-white px-4 py-2 rounded-full" onClick={nextSlide}>Next</button>
      </div>
    );
};
