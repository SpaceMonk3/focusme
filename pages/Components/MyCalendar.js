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

  const handleUpload = async () => {
    console.log("Uploading task description:", taskDescription);
    const shortenedTaskDescription = taskDescription.substring(0, 25); // Get the first 25 characters
  
    // Send the task description to the backend
    const response = await fetch('/generate_subtasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: taskDescription })
    });
  
    if (!response.ok) {
      console.error('Failed to upload task');
      return;
    }
  
    const data = await response.json();
    console.log(data);
  
    setUploadedTasks([...uploadedTasks, shortenedTaskDescription]);
    setTaskDescription(data);
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
    <div className="text-black flex justify-between">
      <h2>
        <b>FocusMe</b> Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-md overflow-hidden">
        <img src={session?.user?.image} alt="profile pic" className="w-8 h-8"/>  
        <span className="px-2" style={{ fontSize: "19px" }}>
          {session?.user?.name}
        </span>



        <div className="flex flex-col justify-start fixed inset-0 p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">FocusMe</h1> {}


          <div className="bg-green p-4 hover:bg-gray rounded-xl shadow flex flex-col items-end fixed top-20 left-10"
               style={{ width: "40vw", height: "70vh", position: "fixed"}}>
            <textarea
              className="w-full h-full p-2 border border-gray rounded-md resize-none"
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
              style={{ color: "black" }}
            ></textarea>
            
            <button
              className="bg-red hover:bg-purple text-white font-bold py-2 px-4 mt-3 rounded-full"
              onClick={handleUpload}
            >
              Upload
            </button>

          </div>



          <div className="flex flex-col items-end fixed top-20 right-20 overflow-auto" style={{ maxHeight: "calc(100vh - 160px)" }}>
            {uploadedTasks.map((task, index) => (
              <div
                key={index}
                className="bg-green p-4 rounded-xl shadow mb-4"
                style={{ color: "black", width: "300px", display: "flex", justifyContent: "space-between" }}
              >
                <div>{task}</div>
                <button
                  className="bg-red hover:bg-purple text-white font-bold py-2 px-4 rounded-full ml-4"
                  onClick={() => handleDelete(index)}
                >
                  Start
                </button>
              </div>
            ))}
          </div>

          
          <div className="flex justify-end items-end fixed bottom-0 right-0 p-4">
            <button
              className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded-full"
              onClick={openPopup}
            >
              Upload Task
            </button>
            <button className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded-full ml-4">
              Calendar
            </button>
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-green p-4 rounded-md shadow">
                  <textarea
                    className="w-full h-40 p-2 border border-gray rounded-md"
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                    style={{ color: "black" }}
                  ></textarea>
                  <button
                    className="bg-red hover:bg-red text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
            <button 
                onClick={() => signOut('google')} 
                className="bg-black rounded-md hover:bg-gray text-white font-bold py-2 px-4 rounded-full ml-4"
            >
                Sign Out
            </button> 
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyCalendar;
