import { useEffect, useState } from 'react'
import Row from "./components/Row"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

function App() {

	const cases = useSelector((state) => state.cases.value)
	const [sumOfExpenses, setSumOfExpenses] = useState(0)
	const [myTake, setMyTake] = useState(0)
	const [myPureMoney, setMyPureMoney] = useState(0)
	let sum = 0
	let myMoney = 0
	let myMoneyAfterTaxes = 0
	const OKLAD = 473

	console.log(cases);

	function count() {
		let casesMap = cases.map(el => {
			sum = sum + el.expenses
			setSumOfExpenses(sum.toFixed(2))
			myMoney = sum * 0.3
			setMyTake(myMoney.toFixed(2))
			myMoneyAfterTaxes = myMoney - ((myMoney / 100) * 14)
			setMyPureMoney((myMoneyAfterTaxes + OKLAD).toFixed(2))
			console.log(sumOfExpenses);
		})
	}

	useEffect(() => {
		count()
		console.log("run ONCE");
	}, [cases])	



	

  return (
    <div className='container'>
		<Navbar />
     <table class="table">
	<thead>
		<tr>
			<th>№</th>
			<th>Ответчик:</th>
			<th>Расходы РОЗП:</th>
			<th>Рабочая доля:</th>
			<th>Чистый доход</th>
			<th>Доли</th>
      		<th>Мои доли</th>
			<th>Действия</th>
		</tr>
	</thead>
	<tbody>
    {cases.map((el, number) => {
      return <Row num={number} name={el.name} money={el.expenses} parts={el.parts} isPaid={el.isPaid} my_parts={el.my_parts}/>
    })}
	</tbody>
</table>
<div className="result">

<h1>Общая сумма расходов РОЗП за этот месяц: {sumOfExpenses} бел. руб.</h1>
<h1>Моя премия до налогов: {myTake} бел. руб.</h1>
<h1>Мои чистые деньги: <span className='money'>{myPureMoney}</span> бел. руб.</h1>

</div>


<Footer />
    </div>

  )
}

export default App
