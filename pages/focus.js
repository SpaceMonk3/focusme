import React, { useEffect } from 'react';
import PomodoroTimer from './Components/PomodoroTimer';
import Link from "next/link"; // Import the Link component from Next.js
import Timer from './Components/Timer'; 

const Focus = () => {
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            new window.YT.Player('youtube-player', {
                width: 400,
                height: 300,
                videoId: 'jfKfPfyJRdk',
                playerVars: {
                    autoplay: 1,
                    controls: 1,
                    modestbranding: 1,
                    showinfo: 0,
                    rel: 0,
                    fs: 0,
                },
            });
        };
    }, []);

    const handleEndTask = () => {
        console.log('End Task button clicked');
    };

    return (
        <div>
            <div style={{ position: 'absolute', bottom: '10%', left: '3%' }}>
                {/* YouTube video embed */}
                <div id="youtube-player"></div>
            </div>
            <div style={{ position: 'absolute', bottom: '35%', right: '43%' }}>
                {/* Stopwatch timer */}
                
                {/* Stopwatch timer component */}
            </div>
            <div style={{ position: 'absolute', bottom: '10%', right: '3%' }}>
                {/* Spotify embed */}
                <iframe src="https://open.spotify.com/embed/playlist/6dAET38ipmNB3dIecfVfNj?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
            <div style={{ position: 'absolute', top: '20%', left: '14%', transform: 'translate(-50%, -50%)' }}>
                <PomodoroTimer />
                {/* Pomodoro timer component */}
            </div>
            <div style={{position: 'absolute', top: '20%', left: '40%', transform: 'translate(-50%, -50%)' }}>
                <textarea
                    className="w-full h-40 p-2 border border-gray-300 rounded"
                    style={{ color: "black" }}
              ></textarea>
            </div>
            <div style={{position: 'absolute', top: '20%', left: '40%', transform: 'translate(-50%, -50%)' }}>
                <textarea
                    className="w-full h-40 p-2 border border-gray-300 rounded"
                    style={{ color: "black" }}
              ></textarea>
            </div>
            <div style={{ position: 'absolute', bottom: '1%', right: '3%' }}>
                {/* End task button */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link href="/calendar">End Task</Link>
                </button>
            </div>
            <div style={{ position: 'absolute', top: '15%', right: '5%' }}>
                {/* Box with text */}
                <div style={{ backgroundColor: 'gray', padding: '10px', borderRadius: '5px' }}>
                    <p style={{ color: 'white', margin: '0' }}>Task Description: Complete connecting the backend to the frontend</p>
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: '10%', right: '37%' }}>
                <Timer />
            </div>
        </div>
    );
};

export default Focus;
