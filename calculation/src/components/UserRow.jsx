import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { OKLAD } from './Month';

export default function UserRow({ email, num, id, password, role }) {

const allCases = useSelector(state => state.cases.allCases)

function sortUsersMoney() {
    const sortedCases = allCases?.filter((el) => {
        return el.user_id === id
    })
    const paidCases = sortedCases?.filter((el) => {
        return el.isPaid === true
    })
    let money = 0
    return paidCases?.reduce((accumulator, currentValue) => {
        const amount = ((currentValue.expenses * 0.3) / currentValue.takes) * currentValue.myTakes;
        
        const finalAmount = (amount - (amount * 0.14))

        return accumulator + finalAmount;
      }, 0) + OKLAD
}

useEffect(() => {
    sortUsersMoney()
}, [])

    
const [isPaid, setIsPaid] = useState(true)

  return (
    <tr className={role === "admin" ? "golden" : "gray"}>
            <td>{num + 1}</td>
			<td>{email}</td>
            <td>{role}</td>
			<td>{password}</td>
			<td>{id}</td>
            <td>{sortUsersMoney().toFixed(2)} бел. руб.</td>
            <td>{isPaid ? <span onClick={() => console.log(`Работаем...`)} className="material-symbols-outlined">toggle_off</span> : <span onClick={() => console.log(`Работаем...`)} className="material-symbols-outlined">toggle_on</span>}<span onClick={() => console.log(`Удаляем...`)} className="material-symbols-outlined">close</span></td>
	</tr>
  )
}