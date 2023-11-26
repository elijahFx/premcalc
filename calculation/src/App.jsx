import { useEffect, useState } from 'react'
import Row from "./components/Row.jsx"
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCases } from './features/casesSlice.js'

function App() {

	const cases = useSelector((state) => state.cases.cases)
	const {error, status} = useSelector((state) => state.cases)
	const [sumOfExpenses, setSumOfExpenses] = useState(0)
	const [myTake, setMyTake] = useState(0)
	const [myPureMoney, setMyPureMoney] = useState(0)
	const [rozpMoney, setRozpMoney] = useState(0)
	const OKLAD = 473


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
	  
		console.log(sumOfExpenses);
	  }
	  

	  

	useEffect(() => {
		dispatch(fetchCases())
	}, [1])	

	useEffect(() => {
		count()
	}, [cases])

	console.log(cases);


	

  return (
    <div className='container'>
		<Navbar />
		
     <table class="table">
	<thead>
		<tr>
			{cases.length > 1 ? <th>№</th> : <th></th>}
			<th>Ответчик:</th>
			<th>Расходы РОЗП:</th>
			<th>Рабочая доля:</th>
			<th>Чистый доход:</th>
			<th>Доли:</th>
      		<th>Мои доли:</th>
			<th>Действия:</th>
		</tr>
	</thead>
	<tbody>
	 {status === "loading" && <div className='containder-for-loader'><span class="loader"></span></div>}
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


<Footer />
    </div>

  )
}

export default App
