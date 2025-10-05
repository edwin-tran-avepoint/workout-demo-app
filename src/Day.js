import React, { useState } from 'react';
import Workout from './Workout';

function Day({ dayName, date, workouts, setCalendarData, calendarData }) {
  const isToday = date.toDateString() === new Date().toDateString();
  const [showAddInput, setShowAddInput] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("New Workout");

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    if (data.type === 'workout') {
      const newCalendarData = { ...calendarData };
      const workout = newCalendarData[data.fromDay].splice(data.workoutIndex, 1)[0]; // Extract the workout
      // Find insert position
      const target = e.target.closest('.workout');
      if (target) {
        const insertIndex = Array.from(target.parentElement.children).indexOf(target);
        newCalendarData[dayName].splice(insertIndex, 0, workout);
      } else {
        newCalendarData[dayName].push(workout);
      }
      setCalendarData(newCalendarData);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const addWorkout = () => {
    setShowAddInput(true);
  };

  const saveWorkout = () => {
    const newCalendarData = { ...calendarData };
    newCalendarData[dayName].push({
      name: newWorkoutName,
      exercises: []
    });
    setCalendarData(newCalendarData);
    setShowAddInput(false);
    setNewWorkoutName("New Workout");
  };

  const cancelAdd = () => {
    setShowAddInput(false);
    setNewWorkoutName("New Workout");
  };

  return (
    <div className="day">
      <div className="day-header">
        <span className={`day-date ${isToday ? 'today' : ''}`}>{date.getDate()}</span>
      {!showAddInput && <button className="add-workout-btn" onClick={addWorkout}>+</button>}
      </div>
      {showAddInput && (
        <div className="add-workout-input">
          <input
            type="text"
            value={newWorkoutName}
            onChange={(e) => setNewWorkoutName(e.target.value)}
            className="workout-name-input"
          />
          <button onClick={saveWorkout}>Save</button>
          <button onClick={cancelAdd}>Cancel</button>
        </div>
      )}
      <div className="workouts" onDrop={handleDrop} onDragOver={allowDrop}>
        {workouts.map((workout, index) => (
          <Workout
            key={index}
            workout={workout}
            dayName={dayName}
            workoutIndex={index}
            setCalendarData={setCalendarData}
            calendarData={calendarData}
          />
        ))}
      </div>
    </div>
  );
}

export default Day;