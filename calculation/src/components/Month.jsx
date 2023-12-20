import { useEffect, useState, useCallback } from 'react'
import Row from "./Row.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { fetchCases, updateMoney } from '../features/casesSlice.mjs'
import { logout } from '../features/usersSlice.js'

export default function Month() {

    const CASES = useSelector((state) => state.cases)
    const cases = useSelector((state) => state.cases.cases)
	const {error, status} = useSelector((state) => state.cases)

    const myTake = useSelector(state => state.cases.myTake)
    const myPureMoney = useSelector(state => state.cases.myPureMoney)
    const rozpMoney = useSelector(state => state.cases.rozpMoney)

    const [month, setMonth] = useState("")
	const OKLAD = 476.44

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
        
        let myActualMoney = 0 + OKLAD
        let myBonus = 0
	  
		await cases.forEach((el) => {
			if(el.isPaid) {
          moneyOfROZP += el.expenses * 0.7
          let thoseMoney = ((el.expenses * 0.3) / el.takes) * el.myTakes
         // console.log(`${el.name} - ${thoseMoney}: elTakes: ${el.takes}, elMyTakes: ${el.myTakes}, 0.3: ${el.expenses * 0.3}`);
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
	}, [cases])

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

   

  return (
    <div className='monthContainer'>
    <div className='month'><h5>{month}</h5></div>
    {status === "loading" && <div className='containder-for-loader'><span className="loader"></span></div>}
    {error && <div className='containder-for-loader'><h1>На сервере ошибка, которая не позволяет использовать данный сервис: {error}</h1></div>}
    <table className="table">
	<thead>
		<tr>
			{cases.length > 1 && status !== "loading" ? <th>№</th> : <th></th>}
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
  )
}
