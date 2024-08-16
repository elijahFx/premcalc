import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSession } from '../features/sessionsSlice';

export default function SingleSession({ name, date, time, judge, courtRoom, court, liabelee, id }) {
  const dispatch = useDispatch();

  // Function to handle session deletion
  const handleDeleteSession = () => {
    dispatch(deleteSession(id));
  };

  // Function to check if the session date is today's date
  const isToday = () => {
    // Convert the date string (dd.mm.yyyy) into a Date object
    const [day, month, year] = date.split('.').map(Number);
    const sessionDate = new Date(year, month - 1, day);
    const today = new Date();

    return (
      sessionDate.getDate() === today.getDate() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getFullYear() === today.getFullYear()
    );
  };

  // Conditional class name based on whether the session is today
  const sessionClassName = isToday() ? 'todaySession' : 'session';

  return (
    <div className={sessionClassName}>
      <span onClick={handleDeleteSession} className="material-symbols-outlined redBtn">
        close
      </span>
      <h5>{court}</h5>
      <h5>
        <span className="blueText">{name}</span> к {liabelee}
      </h5>
      <h5>
        <span className="blueText">{date}</span>
      </h5>
      <h5>
        <span className="blueText">{time}</span>
      </h5>
      <h5>Кабинет номер: {courtRoom}</h5>
      <h5>Судья: {judge}</h5>
    </div>
  );
}
