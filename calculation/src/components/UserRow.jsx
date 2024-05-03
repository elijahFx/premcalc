import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { OKLAD } from './Month';

export default function UserRow({ email, num, id, role, name }) {

const allCases = useSelector(state => state.cases.allCases)

const [roleData, setRoleData] = useState(role)
const roles = ["worker", "employer", "admin"]

useEffect(() => {
setRoleData(role)
}, [1])

function sortUsersMoney() {
    const sortedCases = allCases?.filter((el) => {
        return el.user_id === id
    })
    const paidCases = sortedCases?.filter((el) => {
        return el.isPaid === true && !el.isDeleted
    })
    let money = 0
    let finalCut = paidCases?.reduce((accumulator, currentValue) => {
        const amount = ((currentValue.expenses * 0.3) / currentValue.takes) * currentValue.myTakes;
        
        const finalAmount = (amount - (amount * 0.14))

        return accumulator + finalAmount;
      }, 0) + OKLAD
      if(finalCut < 538.36) {
        finalCut = 538.36
      }
      return finalCut
}

useEffect(() => {
    sortUsersMoney()
}, [])

function handleInputChange(event) {
  const { name, value } = event.target;
  if(name && value) {
    setRoleData(value)
  }
  
}

function handleBanUser() {

}

    
const [isPaid, setIsPaid] = useState(true)

  return (
    <tr className={role === "admin" ? "golden" : "gray"}>
            <td>{num + 1}</td>
			<td>{email}</td>
      <td>{name ? name : "Безымянный"}</td>
      <td>
      <select name="role" value={roleData} onChange={(e) => handleInputChange(e)}>
        <option value={role}>{role}</option>
        <option value={roles.filter(a => a !== role)[0]}>{roles.filter(a => a !== role)[0]}</option>
        <option value={roles.filter(a => a !== role)[1]}>{roles.filter(a => a !== role)[1]}</option>
      </select>
      </td>
			<td>{id}</td>
            <td>{sortUsersMoney().toFixed(2)} бел. руб.</td>
            <td><span class="material-symbols-outlined" onClick={handleBanUser}>cancel</span></td>
	</tr>
  )
}