import React from 'react';
import Day from './Day';

function Calendar({ calendarData, setCalendarData }) {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="calendar">
        {days.map((day, index) =>{
           const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          return (
      <div className="week" key={day}>
          <div >{day.slice(0, 3).toUpperCase()}
          <Day
              key={day}
              dayName={day}
              date={date}
              workouts={calendarData[day]}
              setCalendarData={setCalendarData}
              calendarData={calendarData}
              />
          </div>
      </div>
        )})}
      
    </div>
  );
}

export default Calendar;