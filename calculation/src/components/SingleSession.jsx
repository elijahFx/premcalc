import React from 'react'

export default function SingleSession({ name, date, time, judge, courtRoom, court, liabelee }) {
  return (
    <div className='session'>
      <h5>{court}</h5>
      <h5><span className='blueText'>{name}</span> к {liabelee}</h5>
      <h5><span className="blueText">{date}</span></h5><h5><span className="blueText">{time}</span></h5>
      <h5>Кабинет номер: {courtRoom}</h5>
      <h5>Судья: {judge}</h5>
    </div>
  )
}
