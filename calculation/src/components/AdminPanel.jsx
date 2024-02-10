import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from '../features/usersSlice';

export default function AdminPanel() {

  const dispatch = useDispatch()
  const listOfUsers = useSelector(state => state.users.listOfUsers)

  console.log(listOfUsers);


  useEffect(() => {
    dispatch(getAllUsers())
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
    <Link to="/"><button>На главную</button></Link></div></div>

    </div>
  )
}
