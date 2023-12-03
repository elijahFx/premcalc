import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {


    function handleSubmit(e) {
        e.preventDefault()
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


  return (
    <div className='inContainer'>
        <form onSubmit={(e) => handleSubmit(e)} className='inForm'>
            <h2>Войти</h2>
            <label htmlFor="email">Введите Ваш email:</label>
            <input type="text" type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' value={email} name='email'/>
            <label htmlFor="password">Введите Ваш пароль:</label>
            <input type="text" type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' value={password} name='password'/>
            <button>Войти</button>
        </form>
        <h5>Нет аккаунта? <Link to="/signup">Зарегистрируйся</Link></h5>
    </div>
  )
}
