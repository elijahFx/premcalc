import { useEffect, useState, useCallback } from 'react'
import Row from "./Row.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { changeDialog, fetchCases, setState, updateMoney } from '../features/casesSlice.mjs'
import { logout } from '../features/usersSlice.js'
import NoCases from './NoCases.jsx'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

export let OKLAD = 476.44


  const date = new Date();
  export const formattedDate = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
    }).format(date);

export default function Month() {

    const [isOKLAD, setIsOKLAD] = useState(false)

    const cases = useSelector((state) => state.cases.cases).filter(el => !el.isDeleted)
	const {error, status, showDialog} = useSelector((state) => state.cases)
    const role = useSelector((state) => state.users.role)
    const userId = useSelector((state) => state.users.user.id)

    console.log(userId);

    const myTake = useSelector(state => state.cases.myTake)
    const myPureMoney = useSelector(state => state.cases.myPureMoney)
    const rozpMoney = useSelector(state => state.cases.rozpMoney)

	const [isDown1, setIsDown1] = useState(false)
	const [isDown2, setIsDown2] = useState(false)
	const [isDown3, setIsDown3] = useState(false)
	const [isDown4, setIsDown4] = useState(false)
    const [isDown5, setIsDown5] = useState(false)
    const [isDown6, setIsDown6] = useState(false)
    const [isDown7, setIsDown7] = useState(false)
    const [finalCut, setFinalCut] = useState(0)
    const [isDialog, setIsDialog] = useState(false)

    function changeMZP() {
        if(OKLAD === 476.44) {
            OKLAD = 538.36
            setIsOKLAD(!isOKLAD)
        } else {
            OKLAD = 476.44
            setIsOKLAD(!isOKLAD)
        }
    }

  function sortTable(value) {
        switch (value) {
            case "expenses":
                setIsDown1(false)
                setIsDown3(false)
                setIsDown4(false)
                setIsDown5(false)
                setIsDown6(false)
                setIsDown7(false)

                const sortExpensesOrder = isDown2 ? 1 : -1;

                setIsDown2(!isDown2)
  
                const newCasesExpenses = JSON.parse(JSON.stringify(cases));
                
                newCasesExpenses.sort((a, b) => (a[value] - b[value]) * sortExpensesOrder);
                
                dispatch(setState(newCasesExpenses));
                break;
            case "name":
                setIsDown2(false)
                setIsDown3(false)
                setIsDown4(false)
                setIsDown5(false)
                setIsDown6(false)
                setIsDown7(false)

                const sortNameOrder = isDown1 ? 1 : -1;

                setIsDown1(!isDown1)

                const newCasesNames = JSON.parse(JSON.stringify(cases));

                newCasesNames.sort((a, b) => a[value].localeCompare(b[value]) * sortNameOrder);
                dispatch(setState(newCasesNames));
            break;
            case "thirty":
                setIsDown1(false)
                setIsDown2(false)
                setIsDown4(false)
                setIsDown5(false)
                setIsDown6(false)
                setIsDown7(false)

                const sortThirtyOrder = isDown3 ? 1 : -1;

                setIsDown3(!isDown3)

                const newCasesThirty = JSON.parse(JSON.stringify(cases));

                newCasesThirty.sort((a, b) => {
                    return ((((a.expenses * 0.3) / a.takes) * a.myTakes) - (((b.expenses * 0.3) / b.takes) * b.myTakes)) * sortThirtyOrder
                });
                dispatch(setState(newCasesThirty));
            break;
            case "bonus":
                setIsDown1(false)
                setIsDown2(false)
                setIsDown3(false)
                setIsDown5(false)
                setIsDown6(false)
                setIsDown7(false)

                const sortBonusOrder = isDown4 ? 1 : -1;

                setIsDown4(!isDown4)

                const newCasesBonus = JSON.parse(JSON.stringify(cases));

                newCasesBonus.sort((a, b) => {
                    let sumA = (((a.expenses * 0.3) / a.takes) * a.myTakes)
                    let sumB = (((b.expenses * 0.3) / b.takes) * b.myTakes)
                    return (sumA - sumB) * sortBonusOrder
                });
                dispatch(setState(newCasesBonus));
            break;
            case "isPaid":
                setIsDown1(false)
                setIsDown2(false)
                setIsDown3(false)
                setIsDown4(false)
                setIsDown6(false)
                setIsDown7(false)

                const sortIsPaidOrder = isDown5 ? 1 : -1;

                setIsDown5(!isDown5)

                const newCasesIsPaid = JSON.parse(JSON.stringify(cases));

                newCasesIsPaid.sort((a, b) => {
                   return (a.isPaid - b.isPaid) * sortIsPaidOrder
                });
                dispatch(setState(newCasesIsPaid));
            break;
            case "takes":
                setIsDown1(false)
                setIsDown2(false)
                setIsDown3(false)
                setIsDown4(false)
                setIsDown7(false)

                const sortIsTakesOrder = isDown6 ? 1 : -1;

                setIsDown6(!isDown6)

                const newCasesTakes = JSON.parse(JSON.stringify(cases));

                newCasesTakes.sort((a, b) => {
                   return (a.takes - b.takes) * sortIsTakesOrder
                });
                dispatch(setState(newCasesTakes));
            break;
            case "myTakes":
                setIsDown1(false)
                setIsDown2(false)
                setIsDown3(false)
                setIsDown4(false)
                setIsDown6(false)

                const sortIsMyTakesOrder = isDown7 ? 1 : -1;

                setIsDown7(!isDown7)

                const newCasesMyTakes = JSON.parse(JSON.stringify(cases));

                newCasesMyTakes.sort((a, b) => {
                   return (a.myTakes - b.myTakes) * sortIsMyTakesOrder
                });
                dispatch(setState(newCasesMyTakes));
            break;
            default:
                break;
        }
    }

	const dispatch = useDispatch()

 async function count() {
		let moneyOfROZP = 0
        let myActualMoney = 0 + OKLAD
        let myBonus = 0
        
        if(userId === "6634c2be3d9f0ebeba1ae3b2") {
            myActualMoney = 0 + 560.72
        }

        
	  
		await cases.forEach((el) => {
			if(el.isPaid && !el.isDeleted) {
          moneyOfROZP += el.expenses * 0.7
          let thoseMoney = ((el.expenses * 0.3) / el.takes) * el.myTakes
          myBonus += thoseMoney
          let thoseMoneyAfterTaxes = thoseMoney - (thoseMoney / 100) * 14;
          myActualMoney += thoseMoneyAfterTaxes
		}
		})
        if(myActualMoney < 538.36) {
            myActualMoney = 538.36
        }
        setFinalCut((myActualMoney - 150).toFixed(2))
		dispatch(updateMoney({rozpMoney: moneyOfROZP.toFixed(2), myTake: myBonus.toFixed(2), myPureMoney: myActualMoney.toFixed(2)}))
	  }

	useEffect(() => {
		dispatch(fetchCases())
        setTimeout(function() {
            localStorage.clear()
            dispatch(logout())
        }, (36 * 100000) * 5)
	}, [1])	

	useEffect(() => {
		count()
	}, [cases])

    
   

  return (
    <>
  
    {cases.length < 1 && status !== "loading" && <NoCases />}
    <div className='monthContainer'>
    <div className='month'><h5>{formattedDate}</h5>
    {cases.length >= 1 && <button className='greenBtn' onClick={() => dispatch(changeDialog("show"))}>Удалить все оплаченные дела</button>}
    {role === "admin" && <Link to="/admin"><button className="adminBtn">Панель администратора</button></Link>}
    <Link to="trashbin"><span className="material-symbols-outlined green-trash-bin">delete</span></Link>
    <Link to="reset-password/3123/31231"><span className="material-symbols-outlined">delete</span></Link>
    </div>
    
    {status === "loading" && <div className='containder-for-loader'><span className="loader"></span></div>}
    {error && <div className='containder-for-loader'><h1>На сервере ошибка, которая не позволяет использовать данный сервис: {error}</h1></div>}
    <table className="table">
	<thead>
		<tr>
			{cases.length > 1 && status !== "loading" ? <th>№ {isDown5 ? <span className="material-symbols-outlined" onClick={() => {sortTable("isPaid")}}>
arrow_upward
</span> : <span className="material-symbols-outlined" onClick={() => {sortTable("isPaid")}}>
arrow_downward
</span>}</th> : <th></th>}
			<th>Ответчик: {isDown1 ? <span className="material-symbols-outlined" onClick={() => {sortTable("name")}}>
arrow_upward
</span> : <span className="material-symbols-outlined" onClick={() => {sortTable("name")}}>
arrow_downward
</span>}</th>
			<th>Расходы РОЗП: {isDown2 ? <span className="material-symbols-outlined" onClick={() => {sortTable("expenses")}}>
arrow_upward
</span> : <span className="material-symbols-outlined" onClick={() => {sortTable("expenses")}}>
arrow_downward
</span>}</th>
			<th>Доход до налогов: {isDown3 ? <span className="material-symbols-outlined" onClick={() => {sortTable("thirty")}}>
arrow_upward
</span> : <span className="material-symbols-outlined" onClick={() => {sortTable("thirty")}}>
arrow_downward
</span>}</th>
			<th>Чистый доход: {isDown4 ? <span className="material-symbols-outlined" onClick={() => {sortTable("bonus")}}>
arrow_upward
</span> : <span className="material-symbols-outlined" onClick={() => {sortTable("bonus")}}>
arrow_downward
</span>}</th>
			<th>Доли: {isDown6 ? <span className="material-symbols-outlined" onClick={() => {sortTable("takes")}}>
arrow_upward
</span> : <span className="material-symbols-outlined" onClick={() => {sortTable("takes")}}>
arrow_downward
</span>}</th>
      		<th>Мои доли: {isDown7 ? <span className="material-symbols-outlined" onClick={() => {sortTable("myTakes")}}>
arrow_upward
</span> : <span className="material-symbols-outlined" onClick={() => {sortTable("myTakes")}}>
arrow_downward
</span>}</th>
			<th>Действия:</th>
		</tr>
	</thead>
	<tbody>
     {cases && status !== "loading" ? cases.map((el, number) => {
      return <Row id={el._id} key={number} num={number} name={el.name} money={el.expenses} parts={parseInt(el.takes)} isPaid={el.isPaid} my_parts={el.myTakes} count={count}/>
    }) : <></>}
	</tbody>
</table>
<div className="result">

<Tooltip anchorSelect=".money" clickable place="top">
  До выплаты аванса: {finalCut} бел. руб.
</Tooltip>

<Tooltip anchorSelect=".mzpToggle" clickable place="top">
  Оклад: {OKLAD} бел. руб.
</Tooltip>

<h1>Общая сумма расходов РОЗП за этот месяц: {rozpMoney} бел. руб.</h1>
<h1>Моя премия до налогов: {myTake} бел. руб.</h1>
<h1>Мои чистые деньги: <span className='money'>{myPureMoney}</span> бел. руб. </h1>
{isOKLAD ? <span onClick={() => changeMZP()} className="material-symbols-outlined mzpToggle">toggle_off</span> : <span onClick={() => changeMZP()} className="material-symbols-outlined mzpToggle">toggle_on</span>}
</div>
</div>
</>
  )
}