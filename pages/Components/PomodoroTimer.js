import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); // Initial time in seconds (25 minutes)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1); // Decrease time by 1 second every interval
    }, 1000); // Run every second (1000 milliseconds)

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []); 

  // Convert time in seconds to MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-200px bg-gray-100 border-gray-300 rounded">
      <h1 className="text-4xl font-bold mb-12 text-black items-center justify-center">Pomodoro Timer</h1>
      <div className="text-6xl font-bold text-black bg-white rounded-lg shadow-lg p-2 h-18">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default PomodoroTimer;
