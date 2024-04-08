import React, { useEffect } from 'react';
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link"; // Import the Link component from Next.js
import Spline from '@splinetool/react-spline';
import Anime from 'animejs';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  useEffect(() => {
    var numberOfEls = 1000;
    var duration = 3000; // Adjusted for a longer animation
    var midScreenX = window.innerWidth / 2;
    var midScreenY = window.innerHeight / 2;
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

    document.body.appendChild(fragment);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center fixed inset-0 p-0 overflow-hidden">
      <Spline scene="https://prod.spline.design/koq1AD6uviQDBnO7/scene.splinecode" />

      <div className="flex justify-end items-end fixed top-5 right-4 p-4">
        <button
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
            Log in
        </button>
      </div>
    </div>
  );

  
  /*const [showPopup, setShowPopup] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [uploadedTasks, setUploadedTasks] = useState([]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleUpload = () => {
    console.log("Uploading task description:", taskDescription);
    const shortenedTaskDescription = taskDescription.substring(0, 25); // Get the first 25 characters
    setUploadedTasks([...uploadedTasks, shortenedTaskDescription]);
    setTaskDescription("");
    closePopup();
  };

  const handleDelete = (index) => {
    const updatedTasks = [...uploadedTasks];
    updatedTasks.splice(index, 1);
    setUploadedTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col justify-start items-center fixed inset-0 p-4">
      <h1 className="text-4xl font-bold mb-8">FocusMe</h1> {}
      <div className="flex flex-col items-center">
        {uploadedTasks.map((task, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow mb-4 task-box"
            style={{ color: "black", width: "300px", display: "flex", justifyContent: "space-between" }}
          >
            <div>{task}</div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={() => handleDelete(index)}
            >
              Done
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-end fixed bottom-0 right-0 p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openPopup}
        >
          Upload Task
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
          <Link href="/calendar">Calendar</Link>
        </button>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow">
              <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded"
                value={taskDescription}
                onChange={handleTaskDescriptionChange}
                style={{ color: "black" }}
              ></textarea>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );*/


  /*return (
    <Spline scene="https://prod.spline.design/koq1AD6uviQDBnO7/scene.splinecode" />
  );*/
  

}
