import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from '../features/usersSlice';
import UserRow from './UserRow';
import { fetchAllCases } from '../features/casesSlice.mjs';

const date = new Date();
export const formattedDate = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
    }).format(date);


export default function AdminPanel() {

  const dispatch = useDispatch()
  const listOfUsers = useSelector(state => state.users.listOfUsers)
  const allCases = useSelector(state => state.cases.allCases)



  useEffect(() => {
    dispatch(getUsers())
    dispatch(fetchAllCases())
  }, [1])


    

  return (
    <div className='adminPnl'>

<div className='monthContainer'>
    <div className='month'><h5>{formattedDate}</h5>
    <Link to="/"><button>На главную</button></Link></div></div>
<div className="subPanel">
<table className="table">
	<thead>
		<tr>
			{listOfUsers.length > 1 ? <th>№ </th> : <th></th>}
			<th>Пользователь (email): </th>
      <th>Имя: </th>
      <th>Роль: </th>
			<th>id: </th>
      <th>Оклад:</th>
      <th>Настоящий заработок: </th>
      <th>Действия: </th>
		</tr>
	</thead>
	<tbody>
     {listOfUsers ? listOfUsers.map((el, number) => {
      return <UserRow userOklad={el.oklad} id={el._id} key={number} num={number} email={el.email} role={el.role} name={el.name}/>
    }) : <></>}
	</tbody>
</table>
</div>
    </div>
  )
}
