import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCase, removeCase, toggleIsPaid, toggleStatus } from '../features/casesSlice';

export default function Row({ name, money, parts, isPaid, my_parts, num, id }) {

    const [PPARTS, setPPARTS] = useState(parts)
    const [myPPARTS, setMyPPARTS] = useState(my_parts)
    
    const dispatch = useDispatch()
    const cases = useSelector(state => state.cases.cases)




    let TAKE = money * 0.3
    let moneyBefore = (TAKE - (((TAKE / 100) * 14)))
    let PUREMONEY = Math.round(((moneyBefore / PPARTS) * myPPARTS) * 100) / 100

    const calculate = () => {
        if(parseInt(myPPARTS) > parseInt(PPARTS)) {
            console.log("wtf");
            setMyPPARTS(parseInt(PPARTS))
        }

        TAKE = money * 0.3
        moneyBefore = (TAKE - (((TAKE / 100) * 14)))
        PUREMONEY = Math.round(((moneyBefore / PPARTS) * myPPARTS) * 100) / 100

        console.log(TAKE, PPARTS, myPPARTS);

 
        

    }

    useEffect(() => {
        calculate()
    }, [my_parts, parts, money, PPARTS, myPPARTS])

    function deleteElement() {
        dispatch(deleteCase(id))
    }

    function toggleValue() {
        dispatch(toggleStatus(id))
    }


  return (
    <tr className={isPaid ? "green" : "red"}>
            <td>{num + 1}</td>
			<td>{name}</td>
			<td>{money.toFixed(2)} бел. руб.</td>
			<td>{TAKE.toFixed(2)} бел. руб.</td>
			<td>{PUREMONEY.toFixed(2)} бел. руб.</td>
			<td><input type="number" id="tentacles"  name="tentacles" min="1" value={PPARTS} onChange={(e) => setPPARTS(e.target.value)}/></td>
            <td><input type="number" id="tentacles"  name="tentacles" min="1" value={myPPARTS} onChange={(e) => setMyPPARTS(e.target.value)}/></td>
            <td>{isPaid ? <span onClick={() => toggleValue()} className="material-symbols-outlined">toggle_off</span> : <span onClick={() => toggleValue()} className="material-symbols-outlined">toggle_on</span>}<span onClick={() => deleteElement()} class="material-symbols-outlined">close</span></td>
	</tr>
  )
}
