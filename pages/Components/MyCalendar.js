import React from 'react';
import { Calendar } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MyCalendar = () => {
  return (
    <div>
      <h1>My Calendar</h1>
      <Calendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'Event 1', date: '2024-03-25' },
          { title: 'Event 2', date: '2024-03-28' },
          // Add more events as needed
        ]}
      />
    </div>
  );
};

export default MyCalendar;
