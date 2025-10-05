import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Calendar from './Calendar';

function App() {
  const [calendarData, setCalendarData] = useState({
    monday: [],
    tuesday: [
      {
        name: "Back Day",
        exercises: [
          { name: "Deadlifts", "sets": "8 lb x 3", reps: "3" },
          { name: "Pull-ups", "sets": "10 lb x 3", reps: "3" }
        ]
      }
    ],
    wednesday: [
      {
        name: "Leg Day",
        exercises: [
          { name: "Squats", "sets": "10 lb x 3", reps: "10" },
          { name: "Leg Press", "sets": "12 lb x 4", reps: "12" }
        ]
      }
    ],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });

  const fetchData = useCallback(async () => {
    try {
      // First, check localStorage for saved data
      const savedData = localStorage.getItem('calendarData');
      if (savedData) {
        setCalendarData(JSON.parse(savedData));
        return;
      }
      // If no saved data, fetch from JSON file
      const response = await fetch('/data.json');
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to default data
    }
  }, []);

  const saveData = (data) => {
    try {
      localStorage.setItem('calendarData', JSON.stringify(data));
      console.log('Data saved to localStorage');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSetCalendarData = (newData) => {
    setCalendarData(newData);
    saveData(newData);
  };

  return (
    <div className="App">
      <Calendar calendarData={calendarData} setCalendarData={handleSetCalendarData} />
    </div>
  );
}

export default App;
