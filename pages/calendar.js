import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const MyCalendar = () => {
    const [events, setEvents] = useState([]);

    const handleSelect = (info) => {
        const { start, end } = info;
        const eventNamePrompt = prompt("Enter event name");
        const startPrompt = prompt("Enter start time (YYYY-MM-DD HH:mm)");
        const endPrompt = prompt("Enter end time (YYYY-MM-DD HH:mm)");

        if (eventNamePrompt && startPrompt && endPrompt) {
            const parsedStart = new Date(startPrompt);
            const parsedEnd = new Date(endPrompt);

            if (!isNaN(parsedStart) && !isNaN(parsedEnd)) {
                setEvents([
                    ...events,
                    {
                        start: parsedStart,
                        end: parsedEnd,
                        title: eventNamePrompt,
                        id: uuid(),
                    },
                ]);
            } else {
                alert(
                    "Invalid date format. Please enter dates in the format YYYY-MM-DD HH:mm"
                );
            }
        }
    };

    const handleEventClick = (info) => {
        const { event } = info;
        const url = "/focus"; // desired webpage URL

        if (url) {
            window.location.href = url;
        }
    };

    return (
        <div>
            <FullCalendar
                editable={true}
                selectable={true}
                events={events}
                select={handleSelect}
                eventClick={handleEventClick} // Added eventClick callback
                headerToolbar={{
                    start: "today prev next",
                    end: "dayGridMonth dayGridWeek dayGridDay",
                }}
                plugins={[daygridPlugin, interactionPlugin]}
                views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
            />
        </div>
    );
};

export default MyCalendar;