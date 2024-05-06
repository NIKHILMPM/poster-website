import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Marquee from 'react-fast-marquee';
import { Footer } from './Footer';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Carousel from 'react-material-ui-carousel'
import VanillaTilt from 'vanilla-tilt';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/postersDataSlice';

const Home = () => {
  const { posterData, loading } = useSelector((state) => state.postersData);
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    setProduct(posterData);
  }, [posterData])

  function vanillaEffect() {
    VanillaTilt.init(document.querySelectorAll('.card'), {
      max: 7,
      speed: 5,
      glare: true,
      'max-glare': 0.5
    });
  }

  return (
    <div>

      <div className='lg:flex flex-col hidden'>
        <Parallax pages={1.79} style={{ top: '0', left: '0' }} className='z-[50]'>
          <ParallaxLayer className="z-[40]" offset={0} speed={0.3}>
            <Nav /> {/* Always visible nav bar */}
          </ParallaxLayer>
          <div id='homeContainer' className='relative flex justify-center items-center h-screen w-screen overflow-hidden'>
            <ParallaxLayer className="z-[10]" offset={0.1} speed={1.4}>
              <div className='absolute w-full h-full bg-gradient-to-b  from-slate-300 to-slate-100'></div>
            </ParallaxLayer>

            <ParallaxLayer className="z-[10]" offset={0.1} speed={1}>
              <div className='absolute w-full h-full  bg-cover bg-center' style={{ backgroundImage: "url('/images/homebck_1.png')" }}></div>
            </ParallaxLayer>

            <ParallaxLayer className="z-[10]" offset={0.1} speed={1.2}>
              <div className='absolute w-full h-full  bg-cover bg-center' style={{ backgroundImage: "url('/images/homebck_2.png')" }}></div>
            </ParallaxLayer>

            <ParallaxLayer className="z-[10]" offset={0.1} speed={1.4}>
              <div className='absolute w-full h-full  bg-cover bg-center' style={{ backgroundImage: "url('/images/homebck_3.png')" }}></div>
            </ParallaxLayer>

            <ParallaxLayer className="z-[10]" offset={0.0999} speed={1.4}>
              <div className='absolute w-full h-full bg-black/30 '></div>
              <div className='absolute h-full w-full flex flex-col justify-center items-center z-20' >
                <h1 className='font-serif font-extrabold text-white text-[100px]' >GET. YOUR. POSTERS.</h1>
                <h1 className='font-serif font-extrabold text-white text-[90px]' >NOW.</h1>
              </div>
            </ParallaxLayer>

          </div>

          <ParallaxLayer className="z-[9]" offset={0.9} speed={1}>
            <div className="marquee-container bg-white">
              <Marquee >
                <p className='pt-[50px] text-[70px] font-serif font-[800] text-zinc-700'>"Discover vintage posters for your favorite movies, TV shows, and events, autographs and more"</p>
                <p className='text-white/0'>----------</p>
              </Marquee>
            </div>

            <ParallaxLayer className="z-[40]" offset={0.9} speed={2}>
              <ParallaxLayer className="z-[40]" offset={0.9} speed={2}>

                <div className='h-[110vh] z-[40] my-10  bg-gradient-to-b from-black via-black to-black/95'>
                  <div onMouseOver={vanillaEffect} id='abtdiv' className='py-3'>
                    <div id='abt' className='  mt-11 h-[100vh] flex items-center'>
                      <div className='ml-8 gridbox flex-[50%] h-[90vh] flex'>

                        <div className=' flex-[50]  flex flex-col items-center justify-between '>
                          <div onMouseOver={vanillaEffect} className=' card mt-4  h-[70%] w-[90%] border-[#3fff4f] border-2 flex flex-col items-center justify-center '>
                            <div className=' w-[90%] h-[90%] border-[#3fff4f] border-2 flex justify-center items-center'>
                              <div className=' w-[99%] h-[99%] bg-cover bg-center' style={{ backgroundImage: "url('/images/Thyssen-Berthe-Morisot01G.jpg')" }}> </div>
                            </div>
                          </div>
                          <Link to="/products">
                            <button className=' h-12 w-32 mb-12 border-2 border-[#3fff4f] text-[#3fff4f] rounded-full  hover:bg-[#3fff4f] hover:text-black transition-colors duration-300' >view more <ArrowOutwardIcon /></button>
                          </Link>
                        </div>

                        <div className='flex-[50]  flex items-end justify-center '>
                          <div onMouseOver={vanillaEffect} className='card mb-4  h-[70%] w-[90%] border-[#3fff4f] border-2 flex flex-col items-center justify-center '>
                            <div className=' w-[90%] h-[90%] border-[#3fff4f] border-2 flex justify-center items-center'>
                              <div className=' w-[99%] h-[99%] bg-cover bg-center ' style={{ backgroundImage: "url('/images/Leonardo-da-Vinci-Head-of-a-Man.jpg')" }}></div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className='flex-[50%] flex flex-col items-start justify-center'>

                        <h1 className='pl-12  font-sans text-[#3fff4f] text-[60px] font-[800] flex  items-center justify-center'>About us</h1>

                        <p className='pl-12 mt-[2%] mb-[7%] font-sans text-[#3fff4f] text-[30px] text-left w-[80%] flex items-center justify-center'>we specialize in offering a curated collection of vintage posters spanning various styles and themes. Our mission is to inspire creativity and promote artistic expression through the timeless appeal of vintage art. </p></div>
                    </div>
                  </div>
                </div>
              </ParallaxLayer>
              <ParallaxLayer className='z-[2]' offset={0.999} speed={0.1}>

                <div className=' h-[20vh] w-screen flex justify-center items-center'>
                  <h1 className='relative text-6xl font-serif font-extrabold'>Scroll Down for more <span className='absolute' id="loading-dots"></span></h1>
                </div>
              </ParallaxLayer>

              <ParallaxLayer className="z-[40]" offset={1} speed={0.5}>

                <Carousel className='flex flex-col justify-center items-center'>
                  {product.map(product => {
                    return (
                      <div key={product.id} className=' h-screen w-screen flex justify-center items-center bg-gradient-to-b from-black to-black/90'>
                        <div className='py-8 h-[90vh] w-[80vw] flex justify-center items-center border-white border-2 bg-gradient-to-b from-amber-100 to-white'>
                          <div key={product.id} className='h-[104%] w-[99%] relative  flex gap-2 '>
                            <div className='w-[40%] h-[100%] p-5 flex justify-center items-center border-white border-2 bg-black'>
                              <img className='w-[90%] h-[90%]' src={`../public/images/${product.image_src}`} alt="img" />
                            </div>
                            <div className='w-[60%] h-[100%] p-5 flex flex-col justify-between items-center border-white border-2 bg-black'>
                              <div className='flex-1 flex flex-col justify-center items-center'>
                                <h1 className="text-[70px] font-bold flex justify-center text-white">{product.title}</h1>
                                <p className="text-[20px] font-normal overflow-hidden flex justify-center text-white">{product.content}</p>

                              </div>
                              <Link to={`/productview/${product.id}`}><button className=' h-12  mb-12 border-2 border-white text-white rounded-full  hover:bg-white hover:text-black transition-colors duration-300' ><span className='p-2 font-sans' >Purchase  <ArrowOutwardIcon /></span></button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                </Carousel>


                <Footer />
              </ParallaxLayer>
            </ParallaxLayer>
          </ParallaxLayer>

        </Parallax>
      </div>


      {/* ............................................mobile screen......................................... */}
      <div className='sm:hidden xl:hidden flex flex-col'>
        <Parallax pages={1.79} style={{ top: '0', left: '0' }} className='z-[50]'>
          <ParallaxLayer className="z-[40]" offset={0} speed={0.3}>
            <Nav /> {/* Always visible nav bar */}
          </ParallaxLayer>
          <div id='homeContainer' className='relative flex justify-center items-center h-screen w-screen overflow-hidden'>
            <ParallaxLayer className="z-[10]" offset={0.1} speed={1.4}>
              <div className='absolute w-full h-full bg-gradient-to-b  from-slate-300 to-slate-100'></div>
            </ParallaxLayer>

            <ParallaxLayer className="z-[10]" offset={0.1} speed={1}>
              <div className='absolute w-full h-full  bg-cover bg-center' style={{ backgroundImage: "url('/images/homebck_1.png')" }}></div>
            </ParallaxLayer>

            <ParallaxLayer className="z-[10]" offset={0.1} speed={1.2}>
              <div className='absolute w-full h-full  bg-cover bg-center' style={{ backgroundImage: "url('/images/homebck_2.png')" }}></div>
            </ParallaxLayer>

            <ParallaxLayer className="z-[10]" offset={0.1} speed={1.4}>
              <div className='absolute w-full h-full  bg-cover bg-center' style={{ backgroundImage: "url('/images/homebck_3.png')" }}></div>
            </ParallaxLayer>

            <ParallaxLayer className="z-[10]" offset={0.0999} speed={1.4}>
              <div className='absolute w-full h-full bg-black/30 '></div>
              <div className='absolute h-full w-full flex flex-col justify-center items-center z-20 gap-6' >
                <h1 className='font-serif font-extrabold text-white text-5xl' >GET. YOUR. POSTERS.</h1>
                <h1 className='font-serif font-extrabold text-white text-4xl w-full text-right' >RIGHT NOW</h1>
              </div>
            </ParallaxLayer>

          </div>

          <ParallaxLayer className="z-[9]" offset={0.9} speed={0.8}>
            <div className="marquee-container bg-white">
              <Marquee >
                <p className='pt-1 text-4xl font-serif font-[800] text-zinc-700'>"Discover vintage posters for your favorite movies, TV shows, and events, autographs and more"</p>
                <p className='text-white/0'>----------</p>
              </Marquee>
            </div>

            <ParallaxLayer className="z-[40]" offset={0.9} speed={2}>
              <ParallaxLayer className="z-[40]" offset={0.9} speed={2}>

                <div className='h-[90%] w-screen z-[40] my-10  bg-gradient-to-b from-black via-black to-black/95'>
                  <div onMouseOver={vanillaEffect} id='abtdiv' className='py-3'>
                    <div id='abt' className='  mt-11 h-full flex flex-col items-center'>
                      <div className='w-full h-[50%] flex flex-col items-center justify-center pb-4' >

                        <h1 className=' text-4xl font-sans text-[#3fff4f]  font-[800] flex  items-center justify-center'>About us</h1>

                        <p className='mt-[2%] mb-[7%] font-sans text-[#3fff4f] text-sm w-[80%] flex items-center justify-center text-center'>we specialize in offering a curated collection of vintage posters spanning various styles and themes. Our mission is to inspire creativity and promote artistic expression through the timeless appeal of vintage art. </p>
                      </div>
                      {/* ... */}
                      <div className='w-full h-[50%] p-1 flex'>

                        <div className=' w-[50%] h-full flex flex-col items-center justify-between '>
                          <div onMouseOver={vanillaEffect} className=' card mt-4  h-52 w-[90%] border-[#3fff4f] border-2 flex flex-col items-center justify-center '>
                            <div className=' w-[90%] h-[90%] border-[#3fff4f] border-2 flex justify-center items-center'>
                              <div className=' w-[99%] h-[99%] bg-cover bg-center' style={{ backgroundImage: "url('/images/Thyssen-Berthe-Morisot01G.jpg')" }}> </div>
                            </div>
                          </div>
                          <Link to="/products">
                            <button className=' h-12 w-32 mt-4 border-2 border-[#3fff4f] text-[#3fff4f] rounded-full  hover:bg-[#3fff4f] hover:text-black transition-colors duration-300' >view more <ArrowOutwardIcon /></button>
                          </Link>
                        </div>

                        <div className='w-[50%]  flex items-end justify-center '>
                          <div onMouseOver={vanillaEffect} className='card mb-4  h-52 w-[90%] border-[#3fff4f] border-2 flex flex-col items-center justify-center '>
                            <div className=' w-[90%] h-[90%] border-[#3fff4f] border-2 flex justify-center items-center'>
                              <div className=' w-[99%] h-[99%] bg-cover bg-center ' style={{ backgroundImage: "url('/images/Leonardo-da-Vinci-Head-of-a-Man.jpg')" }}></div>
                            </div>
                          </div>
                        </div>

                      </div>
                      {/* .... */}
                    </div>
                  </div>
                </div>
              </ParallaxLayer>
              <ParallaxLayer className='z-[2]' offset={0.999} speed={0.2}>

                <div className=' h-[20%] w-screen flex justify-center items-center'>
                  <h1 className='relative text-3xl font-serif font-extrabold'>Scroll Down for more <span className='absolute' id="loading-dots"></span></h1>
                </div>
              </ParallaxLayer>

              <ParallaxLayer className="z-[40]" offset={1} speed={0.5}>

                <Carousel className='flex flex-col justify-center items-center'>
                  {product.map(product => {
                    return (
                      <div key={product.id} className='  h-[80vh] w-screen flex justify-center items-center bg-gradient-to-b from-black to-black/90'>
                        <div className='py-8 h-[30vh] w-[90vw] flex justify-center items-center border-white border-2 bg-gradient-to-b from-amber-100 to-white'>
                          <div key={product.id} className='h-[104%] w-[99%] relative  flex gap-2 '>
                            <div className='w-[40%] h-[100%] p-5 flex justify-center items-center border-white border-2 bg-black'>
                              <img className='w-[90%] h-[90%]' src={`../public/images/${product.image_src}`} alt="img" />
                            </div>
                            <div className='w-[60%] h-[100%] p-5 flex flex-col justify-between items-center border-white border-2 bg-black'>
                              <div className='h-[80%] flex flex-col justify-center items-center'>
                                <h1 className="text-sm font-bold flex justify-center text-white">{product.title}</h1>
                                <p className="text-[6px] font-normal overflow-hidden flex justify-center text-white">{product.content}</p>

                              </div>
                              <Link className='h-[20%]' to={`/productview/${product.id}`}><button className=' h-5 border-2 border-white text-white rounded-full  hover:bg-white hover:text-black transition-colors duration-300 flex justify-center items-center' ><span className='p-1 font-sans text-[6px]' >Purchase </span></button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                </Carousel>


                <Footer />
              </ParallaxLayer>
            </ParallaxLayer>
          </ParallaxLayer>

        </Parallax>
      </div>
    </div>
  );
};

export default Home;
