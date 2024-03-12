import React, { useEffect, useState } from 'react'

export default function DeletedRow({ name, num, deleteAt }) {
  const [timeLeft, setTimeLeft] = useState(transformDate(deleteAt));

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
  

  return (
  <tr className="gray">
            <td>{num + 1}</td>
			      <td>{name}</td>
            <td>{timeLeft.hours} часа (-ов) {timeLeft.minutes} минут (-ты) {timeLeft.seconds} секунд (-ы)</td>
            <td><span className="material-symbols-outlined">history</span></td>
	</tr>
  )
}