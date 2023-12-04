import { useEffect, useState } from 'react'
import Row from "./Row.jsx"
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCases } from '../features/casesSlice.mjs'

export default function Month() {

    const cases = useSelector((state) => state.cases.cases)
	const {error, status} = useSelector((state) => state.cases)
	const [sumOfExpenses, setSumOfExpenses] = useState(0)
	const [myTake, setMyTake] = useState(0)
	const [myPureMoney, setMyPureMoney] = useState(0)
	const [rozpMoney, setRozpMoney] = useState(0)
    const [month, setMonth] = useState("")
	const OKLAD = 473

	const [isDown1, setIsDown1] = useState(false)
	const [isDown2, setIsDown2] = useState(false)
	const [isDown3, setIsDown3] = useState(false)
	const [isDown4, setIsDown4] = useState(false)


	const [sortConfig, setSortConfig] = useState({
		key: "name",
		direction: 'ascending',
	  });


	const dispatch = useDispatch()

	async function count() {
		let moneyOfROZP = 0
		let sum = 0;
		let myMoney = 0;
		let myMoneyAfterTaxes = 0;
	  
		await cases.forEach((el) => {
			if(el.isPaid) {
		  sum += el.expenses;
		  moneyOfROZP = sum * 0.7
		  myMoney = sum * 0.3;
		  myMoneyAfterTaxes = myMoney - (myMoney / 100) * 14;
		}
		});
	  
		setSumOfExpenses(sum.toFixed(2));
		setRozpMoney(moneyOfROZP.toFixed(2))
		setMyTake(myMoney.toFixed(2));
		setMyPureMoney((myMoneyAfterTaxes + OKLAD).toFixed(2));
	  
	  }

	useEffect(() => {
		dispatch(fetchCases())
        
	}, [1])	

	useEffect(() => {
		count()
        getMonth()
	}, [cases])

   async function getMonth() {
        let firstCase = await cases[0].createdAt
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

   

  return (
    <div className='monthContainer'>
    <div className='month'><h5>{month}</h5></div>
    <table className="table">
	<thead>
		<tr>
			{cases.length > 1 ? <th>№</th> : <th></th>}
			<th onClick={() => onSort("name")}>Ответчик: {isDown1 ? <span className="material-symbols-outlined">
arrow_upward
</span> : <span className="material-symbols-outlined">
arrow_downward
</span>}</th>
			<th>Расходы РОЗП: {isDown2 ? <span className="material-symbols-outlined">
arrow_upward
</span> : <span className="material-symbols-outlined">
arrow_downward
</span>}</th>
			<th>Рабочая доля: {isDown3 ? <span className="material-symbols-outlined">
arrow_upward
</span> : <span className="material-symbols-outlined">
arrow_downward
</span>}</th>
			<th>Чистый доход: {isDown4 ? <span className="material-symbols-outlined">
arrow_upward
</span> : <span className="material-symbols-outlined">
arrow_downward
</span>}</th>
			<th>Доли:</th>
      		<th>Мои доли:</th>
			<th>Действия:</th>
		</tr>
	</thead>
	<tbody>
	 {status === "loading" && <div className='containder-for-loader'><span className="loader"></span></div>}
	 {error && <div className='containder-for-loader'><h1>На сервере ошибка, которая не позволяет использовать данный сервис: {error}</h1></div>}
     {cases ? cases.map((el, number) => {
      return <Row id={el._id} num={number} name={el.name} money={el.expenses} parts={el.takes} isPaid={el.isPaid} my_parts={el.myTakes}/>
    }) : <></>}
	</tbody>
</table>
<div className="result">

<h1>Общая сумма расходов РОЗП за этот месяц: {rozpMoney} бел. руб.</h1>
<h1>Моя премия до налогов: {myTake} бел. руб.</h1>
<h1>Мои чистые деньги: <span className='money'>{myPureMoney}</span> бел. руб.</h1>

</div>
</div>
  )
}
