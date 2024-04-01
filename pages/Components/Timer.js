import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert total seconds to HH:MM:SS format
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-200px bg-gray-100 border-gray-300 rounded">
      <h1 className="text-4xl font-bold mb-12 text-black items-center justify-center">Timer</h1>
      <div className="text-6xl font-bold text-black bg-white rounded-lg shadow-lg p-2 h-18">
        {formatTime(seconds)}
      </div>
    </div>
  );
};

export default Timer;
