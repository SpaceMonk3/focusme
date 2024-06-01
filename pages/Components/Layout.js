import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'
import Link from "next/link"; // Import the Link component from Next.js
import Spline from '@splinetool/react-spline';
import Anime from 'animejs';
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useEffect, useRef } from 'react';

//const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
    const { data: session, status } = useSession();
    const particleContainerRef = useRef(null);

    useEffect(() => {
        if(!session && status !== 'loading' && particleContainerRef.current !== null){
            var numberOfEls = 100;
            var duration = 5000; // Adjusted for a longer animation
            var midScreenX = window.innerWidth / 2;
            //var midScreenX = Math.random() * window.innerWidth;
            var midScreenY = window.innerHeight / 2;
            //var midScreenY = Math.random() * window.innerHeight;
            var radius = Math.sqrt(midScreenX**2 + midScreenY**2);
            var fragment = document.createDocumentFragment();

            for (var i = 0; i < numberOfEls; i++) {
                var hue = Math.round(360 / numberOfEls * i);
                var angle = Math.random() * Math.PI * 2;
                var el = document.createElement('div');
                el.classList.add('particule');
                el.style.backgroundColor = `hsl(${hue}, 40%, 60%)`;
                el.style.position = 'absolute';
                el.style.width = '1px';
                el.style.height = '1px';
                Anime({
                targets: el,
                width: ['1px', '10px'],
                height: ['1px', '10px'],
                left: [midScreenX + 'px', Math.cos(angle) * radius + midScreenX + 'px'],
                top: [midScreenY + 'px', Math.sin(angle) * radius + midScreenY + 'px'],
                delay: (duration / numberOfEls) * i,
                duration: duration,
                easing: 'easeInExpo',
                loop: true
                });
                fragment.appendChild(el);
            }

            particleContainerRef.current.appendChild(fragment);

            // Cleanup on unmount or session change
            return () => {
                if (particleContainerRef.current) {
                    particleContainerRef.current.innerHTML = '';
                }
            };
        }
    }, [session, status]);


    if (status === 'loading') {
    return <div>Loading...</div>; // Optional: Show a loading state while session is being determined
    }

    if(!session) {
        return (
            <div className="flex flex-col justify-start items-center fixed inset-0 p-0 overflow-hidden">
                <Spline scene="https://prod.spline.design/koq1AD6uviQDBnO7/scene.splinecode" />

                <div className="flex justify-end items-end fixed top-5 right-4 p-4">
                <button 
                    onClick={() => signIn('google')} 
                    className="bg-black shadow hover:bg-gray text-white font-bold py-2 px-4 rounded-full"
                >
                    Log in
                </button>
                </div>

                <div className="flex justify-end items-end fixed top-5 left-4 p-4">
                <button
                    className="bg-black shadow hover:bg-gray text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => window.location.href = "https://github.com/SpaceMonk3/focusme"}
                >
                    Github Repo
                </button>
                </div>

                <div className="flex justify-end items-end fixed bottom-1 left-1 p-4 text-black text-sm">
                HooHacks 2024
                </div>
                <div className="flex justify-end items-end fixed bottom-1 right-1 p-4 text-black text-sm">
                Made by&nbsp;<a href="https://www.linkedin.com/in/dheer-tammina/"><u>Dheer</u></a>,&nbsp;<a href="https://www.linkedin.com/in/aadyakamath"><u>Aadya</u></a>,&nbsp;<a href="https://www.linkedin.com/in/michael-vinh-nguyen/"><u>Michael</u></a>, and&nbsp;<a href="https://www.linkedin.com/in/samueloessandoh/"><u>Samuel</u></a>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-green min-h-screen flex">
            <div className="bg-white flex-grow mt-2 mr-2 mb-2 ml-2 rounded-xl p-4"> 
            {children}
            </div>
        </div>
    )
}