import React from 'react';

const Focus = () => {
    return (
        <div>
            <div style={{ position: 'absolute', bottom: '10%', left: '3%' }}>
                {/* YouTube video embed */}
                <iframe
                    width="400"
                    height="300"
                    src="https://www.youtube.com/live/jfKfPfyJRdk?si=H5fdMUtJsqZZ4_Pv"
                    title="YouTube Video"
                    frameborder="1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
                {/* Stopwatch timer */}
                <h2>Stopwatch Timer</h2>
                {/*stopwatch timer component*/}
            </div>
            <div style={{ position: 'absolute', bottom: '10%', right: '3%' }}>
                {/* Spotify embed */}
                <iframe
                    src="https://open.spotify.com/playlist/6dAET38ipmNB3dIecfVfNj?si=2e4a3caf5e7e491d"
                    width="250"
                    height="300"
                    frameborder="1"
                    allowtransparency="true"
                    allow="encrypted-media"
                ></iframe>
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
    );
};

export default Focus;