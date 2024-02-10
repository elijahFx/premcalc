import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function UserRow({ email, num, id, password, status }) {

    
const [isPaid, setIsPaid] = useState(true)

  return (
    <tr className="gray">
            <td>{num + 1}</td>
			<td>{email}</td>
			<td>{password}</td>
			<td>{id}</td>
            <td>{isPaid ? <span onClick={() => console.log(`Работаем...`)} className="material-symbols-outlined">toggle_off</span> : <span onClick={() => console.log(`Работаем...`)} className="material-symbols-outlined">toggle_on</span>}<span onClick={() => console.log(`Удаляем...`)} className="material-symbols-outlined">close</span></td>
	</tr>
  )
}