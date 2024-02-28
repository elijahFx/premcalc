import { useEffect, useState, useCallback } from 'react'
import Row from "./Row.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { fetchCases, setState, updateMoney } from '../features/casesSlice.mjs'
import { logout } from '../features/usersSlice.js'
import NoCases from './NoCases.jsx'
import { Link } from 'react-router-dom'
export const OKLAD = 538.36

export default function Month() {

    const cases = useSelector((state) => state.cases.cases)
	const {error, status} = useSelector((state) => state.cases)
    const role = useSelector((state) => state.users.role)

    const myTake = useSelector(state => state.cases.myTake)
    const myPureMoney = useSelector(state => state.cases.myPureMoney)
    const rozpMoney = useSelector(state => state.cases.rozpMoney)

    const [month, setMonth] = useState("")


	const [isDown1, setIsDown1] = useState(false)
	const [isDown2, setIsDown2] = useState(false)
	const [isDown3, setIsDown3] = useState(false)
	const [isDown4, setIsDown4] = useState(false)
    const [isDown5, setIsDown5] = useState(false)
    const [isVisible, setIsVisible] = useState("none")




  function sortTable(value) {
        switch (value) {
            case "expenses":
                setIsDown1(false)
                setIsDown3(false)
                setIsDown4(false)
                setIsDown5(false)
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
                const sortThirtyOrder = isDown3 ? 1 : -1;

                setIsDown3(!isDown3)

                const newCasesThirty = JSON.parse(JSON.stringify(cases));

                newCasesThirty.sort((a, b) => {
                    return ((a.expenses * 0.3) - (b.expenses * 0.3)) * sortThirtyOrder
                });
                dispatch(setState(newCasesThirty));
            break;
            case "bonus":
                setIsDown1(false)
                setIsDown2(false)
                setIsDown3(false)
                setIsDown5(false)

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

                const sortIsPaidOrder = isDown5 ? 1 : -1;

                setIsDown5(!isDown5)

                const newCasesIsPaid = JSON.parse(JSON.stringify(cases));

                newCasesIsPaid.sort((a, b) => {
                   return (a.isPaid - b.isPaid) * sortIsPaidOrder
                });
                dispatch(setState(newCasesIsPaid));
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
	  
		await cases.forEach((el) => {
			if(el.isPaid) {
          moneyOfROZP += el.expenses * 0.7
          let thoseMoney = ((el.expenses * 0.3) / el.takes) * el.myTakes
          myBonus += thoseMoney
          let thoseMoneyAfterTaxes = thoseMoney - (thoseMoney / 100) * 14;
          myActualMoney += thoseMoneyAfterTaxes
		}
		});
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
        getMonth()
        if(cases.length <= 0 && status !== "loading") {
            setIsVisible("none")
        } else if(status === "loading") {
            setIsVisible("block")
        }
	}, [cases])

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
    }).format(date);

   async function getMonth() {
        let firstCase = await cases[0]?.createdAt
        let date = new Date(firstCase)
        let finalDate = ""
        let year = date.getFullYear()
        switch (date.getMonth() + 1) {
            case 1:
                finalDate = `Январь месяц ${year} года`
                break;
            case 2:
                finalDate = `Февраль месяц ${year} года`
                break;
            case 3:
                finalDate = `Март месяц ${year} года`
                break;
            case 4:
                finalDate = `Апрель месяц ${year} года`
                break;
            case 5:
                finalDate = `Май месяц ${year} года`
                break;
            case 6:
                finalDate = `Июнь месяц ${year} года`
                break;
            case 7:
                finalDate = `Июль месяц ${year} года`
                break;
            case 8:
                finalDate = `Август месяц ${year} года`
                break;
            case 9:
                finalDate = `Сентябрь месяц ${year} года`
                break;
            case 10:
                finalDate = `Октябрь месяц ${year} года`
                break;
            case 11:
                finalDate = `Ноябрь месяц ${year} года`
                break;
            case 12:
                finalDate = `Декабрь месяц ${year} года`
                break;
            default:
                finalDate = "Неизвестная дата..."
                break;
        }
        setMonth(finalDate)
    }

    const [isAdmin, setIsAdmin] = useState(true)
   

  return (
    <>
    {cases.length < 1 && status !== "loading" && <NoCases />}
    <div className='monthContainer'>
    <div className='month'><h5>{formattedDate}</h5>
    {cases.length >= 1 && <button className='greenBtn'>Удалить все оплаченные дела</button>}
    {role === "admin" && <Link to="/admin"><button className="adminBtn">Панель администратора</button></Link>}</div>
    
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
			<th>Рабочая доля: {isDown3 ? <span className="material-symbols-outlined" onClick={() => {sortTable("thirty")}}>
arrow_upward
</span> : <span className="material-symbols-outlined" onClick={() => {sortTable("thirty")}}>
arrow_downward
</span>}</th>
			<th>Чистый доход: {isDown4 ? <span className="material-symbols-outlined" onClick={() => {sortTable("bonus")}}>
arrow_upward
</span> : <span className="material-symbols-outlined" onClick={() => {sortTable("bonus")}}>
arrow_downward
</span>}</th>
			<th>Доли:</th>
      		<th>Мои доли:</th>
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

<h1>Общая сумма расходов РОЗП за этот месяц: {rozpMoney} бел. руб.</h1>
<h1>Моя премия до налогов: {myTake} бел. руб.</h1>
<h1>Мои чистые деньги: <span className='money'>{myPureMoney}</span> бел. руб.</h1>

</div>
</div>
</>
  )
}