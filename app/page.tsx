"use client"
import ParticlesBackground from './_Components/Particles';
import Navbar from './_Components/Navbar';
import Cards from './_Components/Cards'
import Faq from './_Components/Faq'
import { GrMoney } from "react-icons/gr";
import { MdLeaderboard } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { Canvas } from '@react-three/fiber'
import gsap from "gsap";
import React, { useRef, useEffect, useState } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Scene from './_Components/Scene';
import CupScene from './_Components/CupScene';
import Image from 'next/image';
import Link from 'next/link';
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef(null);
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size on initial load and resize
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Skip animation setup if on mobile or if sceneRef is not available
    if (isMobile || !sceneRef.current) return;
    
    let bounceAnimation = gsap.to(sceneRef.current, {
      y: "-10px", // Infinite bounce
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        pin: false,
        anticipatePin: 1,
      },
    });

    // First animation (Stop bouncing)
    tl.to(sceneRef.current, {
      ease: "power3.out",
      x: "5vw",
      y: "20vh",
      scale: 0.5,
      duration: 1,
      onStart: () => {
        bounceAnimation.kill(); // Stop bouncing animation
      }
    });

    // Second animation (Resume infinite bouncing)
    tl.to(sceneRef.current, {
      ease: "power3.out",
      x: "-50vw",
      y: "12vh",
      scale: 1.0,
      duration: 1,
      onStart: () => {
        bounceAnimation = gsap.to(sceneRef.current, { // Restart bouncing
          y: "-5px",
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    // Third animation (Keep bouncing)
    tl.to(sceneRef.current, {
      ease: "power3.out",
      x: "0vw",
      y: "10vh",
      scale: 0.5,
      duration: 1,
      onStart: () => {
        bounceAnimation.kill(); // Stop bouncing animation
      }
    });

    return () => {
      // Clean up animations when component unmounts
      if (bounceAnimation) bounceAnimation.kill();
      if (tl) tl.kill();
    };
  }, [isMobile]);
  
  return (
    <div className="relative min-h-screen w-full" ref={mainRef}> 
      <div className="absolute inset-0 -z-10"> 
        <ParticlesBackground />
      </div>
      <div className='relative z-50'>
        <Navbar/>
      </div>
      <div className='relative z-10 min-h-screen'> 
        <section className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 gap-3" id='home'>
          <div className="w-full md:w-[60%] mx-auto flex flex-col items-center md:items-start px-4 md:ml-[2rem] lg:ml-[4rem]">
            <h1 className="text-3xl md:text-5xl mb-6 md:mb-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] to-[#0088FF] text-center md:text-left">
              Play, Win, and <span className='text-[#ffff]'> EARN</span> Airdrop Rewards!
            </h1>
            <p className="text-[#d2cbcbb4] text-md mb-6 md:mb-10 text-center md:text-left w-full md:w-[100%]">
              Join META PONG, the ultimate blockchain-powered airdrop game! Toss Pong Balls into the bucket, rack up points, and boost your rewards in the CrossFi (XFI) ecosystem. Are you ready to aim, throw, and claim your airdrop?
            </p>
            <div className='flex flex-col md:flex-row w-full gap-4 md:gap-5 items-center md:items-start'>
              <Link href={"https://meta-pong-iota.vercel.app/"}>
                <button className="mt-4 md:mt-10 text-xl w-[12rem] h-[4rem] py-2 bg-gradient-to-r from-[#00FFFF] to-[#0088FF] rounded-lg text-[#0A0F1F] font-bold transition-all duration-300 ease-in-out
                  hover:bg-none hover:text-white hover:border-4 hover:border-[#00FFFF]" >
                  Play Now
                </button>
              </Link>
              <Link href="/Leaderboard">
                <button className="mt-4 md:mt-10 text-white text-xl w-[12rem] h-[4rem] py-2 bg-transparent font-bold relative overflow-hidden group transition duration-300 hover:text-black border-4 border-[#00FFFF] rounded-xl">
                  <span className="absolute inset-0 border-4 border-[#00FFFF] rounded-xl transition-all duration-300 group-hover:bg-gradient-to-r from-[#00FFFF] to-[#0088FF] pointer-events-none"></span>
                  <span className="relative z-10">LeaderBoard</span>
                </button>
              </Link>
            </div>
          </div>
          {!isMobile && (
            <div
              ref={sceneRef}
              className="fixed flex items-center justify-center top-50 right-20 w-[30vw] h-[40vw] z-40"
            >
              <Canvas>
                <Scene/>
              </Canvas>
            </div>
          )}
        </section>
        <section className="flex justify-center items-center min-h-screen px-4" id='mechanics'>
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl text-[#19bdbd] font-bold mt-5 mb-10 md:mb-20"> GAME <span className='text-[#ffff]'> MECHANICS</span> </h1>
            <div className='flex flex-col md:flex-row gap-8 md:gap-10'>
              <Cards name="CONNECT WALLET" content="Play & earn rewards in a futuristic blockchain-powered Pong game!">
                <Image src="./metamask.svg" alt="Metamask" width={100} height={150}/>
              </Cards>
              <Cards name="TARGET THE CUP" content="Play & earn rewards in a futuristic blockchain-powered Pong game!">
                {/* Render the CupScene Canvas for both mobile and desktop */}
                <div className="h-36 md:h-auto">
                  <Canvas camera={{ position: [0, 20, 5], fov: 50 }}>
                    <CupScene />
                  </Canvas>
                </div>
              </Cards>
              <Cards name="THROW THE BALL" content="Play & earn rewards in a futuristic blockchain-powered Pong game!">
                {/* Only show the ball Canvas for mobile screens (less than 768px) */}
                {isMobile && (
                  <div className="h-36">
                    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                      <Scene />
                    </Canvas>
                  </div>
                )}
          </Cards>
            </div>
          </div>
        </section>
        <section className="flex justify-center items-center min-h-screen px-4" id="how-it-works">
          <div className="w-full md:w-[80%] mx-auto text-center">
            <h1 className="text-3xl md:text-4xl text-[#19bdbd] font-bold mt-5 mb-12 md:mb-24">
              HOW <span className='text-[#ffff]'>IT WORKS?</span>
            </h1>
            <div className='flex flex-col md:flex-row-reverse md:gap-[1rem] lg:gap-[1rem] gap-[2rem] w-full'>
              <div></div>
              <div className='justify-self-end'>
                <div className='flex flex-col md:max-w-[50vw] lg:max-w-[40vw] max-w-full gap-[2rem] md:gap-[2.5rem] px-4'>
                  <div className='relative flex flex-col md:flex-row gap-4 md:gap-5'>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[200px] md:h-[350px]">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#0088FF] rounded-full opacity-10 blur-[50px]" />
                    </div>
                    <div className="flex justify-center"><GiReceiveMoney size={80} /></div>
                    <div className='flex flex-col gap-2'>
                      <h2 className='font-bold text-xl md:text-2xl relative z-10'>Buy Pong Balls</h2>
                      <p className='text-xs md:text-sm font-extralight text-[#cdcdcd] relative z-10'>get 100 balls for 10XFI and start the game</p>
                    </div>
                  </div>
                  <div className='relative flex flex-col md:flex-row gap-4 md:gap-5'>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[200px] md:h-[350px]">
                      <div className="absolute inset-0 bg-[#19bdbd] rounded-full opacity-10 blur-[50px]" />
                    </div>
                    <div className="flex justify-center"><GrMoney size={80} /></div>
                    <div className='flex flex-col gap-2'>
                      <h2 className='font-bold text-xl md:text-2xl relative z-10'>Earn Your Points</h2>
                      <p className='text-xs md:text-sm font-extralight text-[#cdcdcd] relative z-10'>Use Booster Balls for an instant +50 points</p>
                    </div>
                  </div>
                  <div className='relative flex flex-col md:flex-row gap-4 md:gap-5'>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[150px] md:h-[200px]">
                      <div className="absolute inset-0 bg-[#19bdbd] rounded-full opacity-10 blur-[50px]" />
                    </div>
                    <div className="flex justify-center"><MdLeaderboard size={80} /></div>
                    <div className='flex flex-col gap-2'>
                      <h2 className='font-bold text-xl md:text-2xl relative z-10'>Earn Airdrops</h2>
                      <p className='text-xs md:text-sm font-extralight text-[#cdcdcd] relative z-10'>Your portion of the airdrop depends on your score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center min-h-screen px-4" id='faq'>
          <div className="w-full mx-auto text-center">
            <h1 className="text-3xl md:text-4xl text-[#19bdbd] font-bold mb-4">
              Frequently Asked <span className="text-white">Questions</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-[1rem] xl:gap-[2rem]"> 
              <div className="w-full"> 
                <Faq />
              </div>
              {!isMobile && (
                <div className="md:w-[50%] lg:w-[57%] xl:w-[60%] w-[70%] self-center flex h-[70vh] items-center justify-center z-50">
                  <Canvas camera={{ 
                    position: [0, 40, 5], 
                    fov: 35,
                  }}>
                    <CupScene />
                  </Canvas>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}