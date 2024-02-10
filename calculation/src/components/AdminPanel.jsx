import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from '../features/usersSlice';
import UserRow from './UserRow';

export default function AdminPanel() {

  const dispatch = useDispatch()
  const listOfUsers = useSelector(state => state.users.listOfUsers)

  console.log(listOfUsers);


  useEffect(() => {
    dispatch(getUsers())
    console.log(listOfUsers);
  }, [1])

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
    }).format(date);

  return (
    <div className='adminPnl'>

<div className='monthContainer'>
    <div className='month'><h5>{formattedDate}</h5>
    <button onClick={() => dispatch(getUsers())}>Получить юзеров</button>
    <Link to="/"><button>На главную</button></Link></div></div>
<div className="subPanel">
<table className="table">
	<thead>
		<tr>
			{listOfUsers.length > 1 ? <th>№ </th> : <th></th>}
			<th>Пользователь (email) </th>
			<th>Пароль: </th>
			<th>id: </th>
      <th>Действия: </th>
		</tr>
	</thead>
	<tbody>
     {listOfUsers ? listOfUsers.map((el, number) => {
      return <UserRow id={el._id} key={number} num={number} email={el.email} password={el.password}/>
    }) : <></>}
	</tbody>
</table>
</div>
    </div>
  )
}
