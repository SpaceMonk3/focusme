import React from 'react';
import { Calendar } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useSession, signOut } from "next-auth/react";

const MyCalendar = () => {
  const {data: session} = useSession();

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
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="profile pic" className="w-6 h-6"/>
        <div className="flex justify-end items-end fixed top-10 right-2 p-4">
          <button 
              onClick={() => signOut('google')} 
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
              Sign Out
          </button> 
        </div>  
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
    </div>
  );
};

export default MyCalendar;
