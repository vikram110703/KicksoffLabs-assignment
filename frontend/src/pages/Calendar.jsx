// import React, { useEffect, useState } from "react";

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [currentDateFix, setCurrentDateFix] = useState(new Date());

//   // Helper functions
//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

//   const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

//   const changeMonth = (direction) => {
//     const newDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + direction,
//       1
//     );
//     setCurrentDate(newDate);
//   };


//   // Calculate dates
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth(); // 0-based (0 = January)
//   const daysInMonth = getDaysInMonth(year, month);
//   const firstDay = getFirstDayOfMonth(year, month);

//   // Generate an array for calendar days
//   const days = [];
//   for (let i = 0; i < firstDay; i++) {
//     days.push(null); // Empty cells for days before the 1st
//   }
//   for (let day = 1; day <= daysInMonth; day++) {
//     days.push(day);
//   }

//   return (
//     <div className="mx-5">
//       {/* Month Navigation */}
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={() => changeMonth(-1)}>Previous</button>
//         <h2 className="text-xl font-bold">
//           {currentDate.toLocaleString("default", { month: "long" })} {year}
//         </h2>
//         <button onClick={() => changeMonth(1)}>Next</button>
//       </div>

//       {/* Calendar Grid */}
//       <div className="grid grid-cols-7 gap-2">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
//           <div key={index} className="text-center font-bold">
//             {day}
//           </div>
//         ))}
//         {days.map((day, index) => (
//           <div
//             key={index}
//             className={`text-center p-2 border ${
//               day &&
//               day === currentDateFix.getDate() &&
//               year === currentDateFix.getFullYear() &&
//               month === currentDateFix.getMonth()
//                 ? "bg-green-200"
//                 : day
//                 ? "bg-gray-100"
//                 : "bg-gray-200"
//             }`}
//           >
//             {day || ""}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Calendar;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchEventsforCurrentMonth } from '../services/api';
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";
// import {}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDateFix, setCurrentDateFix] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const navigate = useNavigate();

  // Helper functions
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const changeMonth = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
  };

  const fetchEvents = async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-based
    try {
      const { data } = await fetchEventsforCurrentMonth(year, month);
      console.log("current month events ", data);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const getEventsForDay = (day) => {
    console.log("events sel ", events);
    return events?.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const timeOnly = (eventDate) => eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Set to false if you want 24-hour format
  });

  return (
    <div className="mx-5 my-5">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)}>Previous</button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={index}
              className={`text-center p-2 border cursor-pointer ${day
                  ? day === new Date().getDate() &&
                    new Date().getFullYear() === currentDate.getFullYear() &&
                    new Date().getMonth() === currentDate.getMonth()
                    ? "bg-green-200"
                    : "bg-gray-100"
                  : "bg-gray-200"
                }`}
              onClick={() => setSelectedEvents(dayEvents)}
            >
              {day || ""}
              {dayEvents?.length > 0 && (
                <div className="overflow-hidden">
                  {dayEvents[dayEvents.length - 1].title}
                </div>
                // <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"></div>
              )}
            </div>
          );
        })}
      </div>

      {selectedEvents.length > 0 && (
        <div className="mt-5">
          <h3 className="font-bold text-lg">Events for {selectedEvents[0].date.split("T")[0]}</h3>
            <ul className="list-disc pl-5 mb-5 flex flex-col gap-5">
              {selectedEvents.map((event, index) => (
                <div key={index} className="flex flex-col flex-wrap">
                  <li>
                    {event.title + " | " + timeOnly(new Date(event.date))}
                  </li>
                  <div className="ml-5 text-sm">
                    {event.description}
                  </div>
                </div>

              ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default Calendar;

