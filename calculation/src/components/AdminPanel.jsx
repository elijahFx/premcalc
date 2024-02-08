import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminPanel() {

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
