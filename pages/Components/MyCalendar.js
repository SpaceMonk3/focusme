import { Calendar } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useSession, signOut } from "next-auth/react";
import React, { useState, useEffect } from 'react';

const MyCalendar = () => {
  const {data: session} = useSession();

  const [showPopup, setShowPopup] = useState(false);
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
    // <div>
    //   <h1>My Calendar</h1>
    //   <Calendar
    //     plugins={[dayGridPlugin]}
    //     initialView="dayGridMonth"
    //     events={[
    //       { title: 'Event 1', date: '2024-03-25' },
    //       { title: 'Event 2', date: '2024-03-28' },
    //       // Add more events as needed
    //     ]}
    //   />
    // </div>
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-md overflow-hidden">
        <img src={session?.user?.image} alt="profile pic" className="w-6 h-6"/>  
        <span className="px-2">
          {session?.user?.name}
        </span>

        <div className="flex flex-col justify-start items-center fixed inset-0 p-4">
          <h1 className="text-4xl font-bold mb-8">FocusMe</h1> {}
          <div className="flex flex-col items-center">
            {uploadedTasks.map((task, index) => (
              <div
                key={index}
                className="bg-green-400 p-4 rounded shadow mb-4 task-box"
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
          <div className="flex justify-end items-end fixed top-10 right-2 p-4">
            <button 
                onClick={() => signOut('google')} 
                className="bg-gray-900 rounded-md hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign Out
            </button> 
          </div>
          <div className="flex justify-end items-end fixed bottom-0 right-0 p-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={openPopup}
            >
              Upload Task
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
              Calendar
            </button>
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-green-400 p-4 rounded-md shadow">
                  <textarea
                    className="w-full h-40 p-2 border border-gray-300 rounded-md"
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                    style={{ color: "black" }}
                  ></textarea>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyCalendar;
