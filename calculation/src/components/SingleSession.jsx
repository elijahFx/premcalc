import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteSession } from '../features/sessionsSlice'

export default function SingleSession({ name, date, time, judge, courtRoom, court, liabelee, id }) {

  const dispatch = useDispatch()

  function handleDeleteSession() {
    dispatch(deleteSession(id))
    console.log("сработало!");
  }


  return (
    <div className='session'>
      <span onClick={handleDeleteSession} className="material-symbols-outlined red">close</span>
      <h5>{court}</h5>
      <h5><span className='blueText'>{name}</span> к {liabelee}</h5>
      <h5><span className="blueText">{date}</span></h5><h5><span className="blueText">{time}</span></h5>
      <h5>Кабинет номер: {courtRoom}</h5>
      <h5>Судья: {judge}</h5>
    </div>
  )
}
