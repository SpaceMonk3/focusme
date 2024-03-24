import React, { useEffect } from 'react';
//import React from 'react';

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

    return (
        <div>
            <div style={{ position: 'absolute', bottom: '10%', left: '3%' }}>
                {/* YouTube video embed */}
                <div id="youtube-player"></div>
            </div>
            <div>
            <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
                {/* Stopwatch timer */}
                <h2>Stopwatch Timer</h2>
                {/*stopwatch timer component*/}
            </div>
            <div style={{ position: 'absolute', bottom: '10%', right: '3%' }}>
                {/* Spotify embed */}
                <iframe src="https://open.spotify.com/embed/playlist/6dAET38ipmNB3dIecfVfNj?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
            <div style={{ position: 'absolute', top: '0', left: '0' }}>
                {/* Pomodoro timer */}
                <h2>Mini Pomodoro Timer</h2>
                {/* Pomodoro timer component */}
            </div>
            <div style={{position: 'absolute', top: '20%', left: '30%', transform: 'translate(-50%, -50%)' }}>
                <textarea
                    className="w-full h-40 p-2 border border-gray-300 rounded"
                    style={{ color: "black" }}
              ></textarea>
            </div>
        </div>

        </div>
    );
};

export default Focus;