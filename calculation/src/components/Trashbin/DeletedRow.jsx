import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteCase } from '../../features/casesSlice.mjs';

export default function DeletedRow({ name, num, deleteAt, id }) {
  const [timeLeft, setTimeLeft] = useState(transformDate(deleteAt));
  const dispatch = useDispatch()

  useEffect(() => {
    const timerID = setInterval(() => {
      setTimeLeft(transformDate(deleteAt));
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  function transformDate(date) {
    const newDate = Date.parse(date)
    const currentDate = new Date()
    const remainingTime = newDate - currentDate
    
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  function deleteElement() {
    dispatch(deleteCase(id))
  }
  

  return (
  <tr className="gray">
            <td>{num + 1}</td>
			      <td>{name}</td>
            <td>{timeLeft.hours} часа (-ов) {timeLeft.minutes} минут (-ты) {timeLeft.seconds} секунд (-ы)</td>
            <td><span className="material-symbols-outlined">history</span><span onClick={() => deleteElement()} className="material-symbols-outlined">close</span></td>
	</tr>
  )
}