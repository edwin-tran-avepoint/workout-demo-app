import React, { useState } from 'react';

function Exercise({ exercise, dayName, workoutIndex, exerciseIndex, setCalendarData, calendarData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(exercise.name);
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(exercise.reps);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: 'exercise',
      fromDay: dayName,
      workoutIndex,
      exerciseIndex
    }));
    e.stopPropagation();
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newCalendarData = { ...calendarData };
    newCalendarData[dayName][workoutIndex].exercises[exerciseIndex] = {
      name,
      sets,
      reps
    };
    setCalendarData(newCalendarData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(exercise.name);
    setSets(exercise.sets);
    setReps(exercise.reps);
    setIsEditing(false);
  };

  return (
    <div className="exercise" draggable={!isEditing} onDragStart={handleDragStart} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="exercise-name-input"
          />
          <input
            type="text"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="exercise-sets-input"
          />
          <input
            type="text"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="exercise-reps-input"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <div className="exercise-name">{exercise.name}</div>
          <div className="exercise-information">
            <div className="exercise-reps">{exercise.reps}x</div>
            <div className="exercise-sets">{exercise.sets}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Exercise;