import React from 'react';
import Exercise from './Exercise';

function Workout({ workout, dayName, workoutIndex, setCalendarData, calendarData }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: 'workout',
      fromDay: dayName,
      workoutIndex
    }));
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    if (data.type === 'exercise') {
      const newCalendarData = { ...calendarData };
      const exercise = newCalendarData[data.fromDay][data.workoutIndex].exercises.splice(data.exerciseIndex, 1)[0]; // Extract the exercise
      const target = e.target.closest('.exercise');
      if (target) {
        const insertIndex = Array.from(target.parentElement.children).indexOf(target);
        newCalendarData[dayName][workoutIndex].exercises.splice(insertIndex, 0, exercise);
      } else {
        newCalendarData[dayName][workoutIndex].exercises.push(exercise);
      }
      setCalendarData(newCalendarData);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const addExercise = () => {
    const newCalendarData = { ...calendarData };
    newCalendarData[dayName][workoutIndex].exercises.push({
      name: "New Exercise",
      sets: "",
      reps: ""
    });
    setCalendarData(newCalendarData);
  };

  return (
    <div className="workout" draggable onDragStart={handleDragStart}>
      <div className="workout-name">
        <span className="workout-name-label">{workout.name}</span>
        <button
          className="menu-button"
          onClick={() => console.log('Menu clicked for workout:', workout)}
        >
          ...
        </button>
      </div>
      <div className="exercises" onDrop={handleDrop} onDragOver={allowDrop}>
        {workout.exercises.map((exercise, index) => (
          <Exercise
            key={index}
            exercise={exercise}
            dayName={dayName}
            workoutIndex={workoutIndex}
            exerciseIndex={index}
            setCalendarData={setCalendarData}
            calendarData={calendarData}
          />
        ))}
      </div>
      <div className="add-exercise-container">
        <button className="add-exercise-btn" onClick={addExercise}>+</button>
      </div>
    </div>
  );
}

export default Workout;