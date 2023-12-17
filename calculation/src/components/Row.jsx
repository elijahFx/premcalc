import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { alterMyTakes, alterTakes, deleteCase, toggleStatus } from '../features/casesSlice.mjs';

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
            console.log("сработало");
        }, delay);
    };
}

export default function Row({ name, money, parts, isPaid, my_parts, num, id, updateMonth }) {

    const [PPARTS, setPPARTS] = useState(parts)
    const [myPPARTS, setMyPPARTS] = useState(my_parts)
    
    const dispatch = useDispatch()
    const cases = useSelector(state => state.cases.cases)




    let TAKE = money * 0.3
    let moneyBefore = (TAKE - (((TAKE / 100) * 14)))
    let PUREMONEY = Math.round(((moneyBefore / PPARTS) * myPPARTS) * 100) / 100

    const calculate = () => {
        if(parseInt(myPPARTS) > parseInt(PPARTS)) {
            setMyPPARTS(parseInt(PPARTS))
        }

        TAKE = money * 0.3
        moneyBefore = (TAKE - (((TAKE / 100) * 14)))
        PUREMONEY = Math.round(((moneyBefore / PPARTS) * myPPARTS) * 100) / 100
    }

    useEffect(() => {
        calculate()
    }, [PPARTS, myPPARTS])

    function deleteElement() {
        dispatch(deleteCase(id))
    }

    function toggleValue() {
        dispatch(toggleStatus(id))
    }

 
    
    const debouncedHandleChangeParts = debounce((value) => {
        dispatch(alterTakes({ id, takes: value }));
    }, 500);

    const debouncedHandleChangeMyParts = debounce((value) => {
        dispatch(alterMyTakes({id, myTakes: value}));
    }, 500);

    const handleChange = (e, value) => {
        if (value === 'takes') {
            setPPARTS(e.target.value);
            debouncedHandleChangeParts(e.target.value);
        } else {
            setMyPPARTS(e.target.value);
            debouncedHandleChangeMyParts(e.target.value);
        }
        updateMonth()
    };


  return (
    <tr className={isPaid ? "green" : "red"}>
            <td>{num + 1}</td>
			<td>{name}</td>
			<td>{money.toFixed(2)} бел. руб.</td>
			<td>{TAKE.toFixed(2)} бел. руб.</td>
			<td>{PUREMONEY.toFixed(2)} бел. руб.</td>
			<td><input type="number" min="1" name={`takes ${name}`} value={PPARTS} onChange={(e) => handleChange(e,"takes")}/></td>
            <td><input type="number" min="1" name={`myTakes ${name}`} value={myPPARTS} onChange={(e) => handleChange(e,"myTakes")}/></td>
            <td>{isPaid ? <span onClick={() => toggleValue()} className="material-symbols-outlined">toggle_off</span> : <span onClick={() => toggleValue()} className="material-symbols-outlined">toggle_on</span>}<span onClick={() => deleteElement()} className="material-symbols-outlined">close</span></td>
	</tr>
  )
}
