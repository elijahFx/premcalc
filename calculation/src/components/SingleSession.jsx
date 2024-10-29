import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSession } from "../features/sessionsSlice";
import { caseMapReversed } from "../misc/map";

export default function SingleSession({
  name,
  date,
  time,
  judge,
  courtRoom,
  court,
  liabelee,
  id,
  type,
  caseType,
  caseNum,
}) {
  const dispatch = useDispatch();

  // Function to handle session deletion
  const handleDeleteSession = () => {
    dispatch(deleteSession(id));
  };

  // Function to check if the session date is today's date
  const isToday = () => {
    const [day, month, year] = date.split(".").map(Number);
    const sessionDate = new Date(year, month - 1, day);
    const today = new Date();

    return (
      sessionDate.getDate() === today.getDate() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getFullYear() === today.getFullYear()
    );
  };

  

  const sessionClassName = isToday() ? "todaySession" : "session";

  return (
    <div className={sessionClassName}>
      <span
        onClick={handleDeleteSession}
        className="material-symbols-outlined redBtn"
      >
        close
      </span>
      <h5>{court} | {caseMapReversed[caseType] ? caseMapReversed[caseType] : "Гражданское дело"}</h5>
      <h5>
        <span className="blueText">{name}</span>
        {(caseType === "administrative" || caseType === "criminal") && (
          <>
            , обвиняемый по ст. <span className="blueText">{type}</span>
          </>
        )}
        {liabelee && (
          <>
            {" "}
            к <span className="blueText">{liabelee}</span>
          </>
        )}
      </h5>
      <h5>
        <span className="blueText">{date}</span>
      </h5>
      <h5>
        <span className="blueText">{time}</span>
      </h5>
      <h5>Кабинет номер: {courtRoom ? courtRoom : "Нет информации"}</h5>
      <h5>Судья: {judge}</h5>
      {caseNum && <h5>Номер дела: {caseNum}</h5>}
    </div>
  );
}
