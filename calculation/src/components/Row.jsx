import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { alterMyTakes, alterTakes, deleteCase, toggleStatus } from '../features/casesSlice.mjs';

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export default function Row({ name, money, parts, isPaid, my_parts, num, id }) {

    const [PPARTS, setPPARTS] = useState(parseInt(parts))
    const [myPPARTS, setMyPPARTS] = useState(parseInt(my_parts))
    
    const dispatch = useDispatch()

    let TAKE = money * 0.3
    let moneyBefore = (TAKE - (((TAKE / 100) * 14)))
    let PUREMONEY = Math.round(((moneyBefore / PPARTS) * myPPARTS) * 100) / 100

    const calculate = () => {
        if(myPPARTS > PPARTS) {
            setMyPPARTS(parseInt(PPARTS))
            debouncedHandleChangeMyParts(PPARTS);
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
        dispatch(alterTakes({id, takes: parseInt(value) }));
    }, 500);

    const debouncedHandleChangeMyParts = debounce((value) => {
        console.log(value);
        dispatch(alterMyTakes({id, myTakes: value}));
    }, 500);

    const handleChange = (e, value) => {
        const inputNumber = e.target.value

        if(!e.target.value || e.target.value <= 0) {
            console.log(`null`);
             return
        }

        if (value === 'takes') {
            setPPARTS(inputNumber)
            setPPARTS(parseInt(e.target.value));
            debouncedHandleChangeParts(parseInt(e.target.value));
        } else if(value === "myTakes") {
            setMyPPARTS(inputNumber)
            if(parseInt(myPPARTS) > parseInt(PPARTS)) {
                setMyPPARTS(PPARTS)
                debouncedHandleChangeMyParts(PPARTS);
                return
            } else if(parseInt(myPPARTS) <= parseInt(PPARTS)) {
            setMyPPARTS(parseInt(e.target.value));
            debouncedHandleChangeMyParts(parseInt(e.target.value));  
        }
            
        }
    };


  return (
    <tr className={isPaid ? "green" : "red"}>
            <td>{num + 1}</td>
			<td>{name}</td>
			<td>{money.toFixed(2)} бел. руб.</td>
			<td>{TAKE.toFixed(2)} бел. руб.</td>
			<td>{PUREMONEY.toFixed(2)} бел. руб.</td>
			<td><input type="number" min="1" name={`takes ${name}`} value={PPARTS} onInput={(e) => handleChange(e, "takes")} onClick={(e) => handleChange(e, "takes")}/></td>
            <td><input type="number" min="1" name={`myTakes ${name}`} value={myPPARTS} onInput={(e) => handleChange(e, "myTakes")} onClick={(e) => handleChange(e, "myTakes")}/></td>
            <td>{isPaid ? <span onClick={() => toggleValue()} className="material-symbols-outlined">toggle_off</span> : <span onClick={() => toggleValue()} className="material-symbols-outlined">toggle_on</span>}<span onClick={() => deleteElement()} className="material-symbols-outlined">close</span></td>
	</tr>
  )
}
