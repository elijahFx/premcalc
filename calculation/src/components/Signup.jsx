import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../features/usersSlice'
import { useDispatch } from 'react-redux'

export default function Signup() {

    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()

        if(!email || !password || !password2)return
        if(password !== password2)return

        
        dispatch(loginUser({password: password, email: email}))
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")


  return (
    <div className='inContainer'>
        <form onSubmit={(e) => handleSubmit(e)} className='inForm'>
            <h2>Зарегистрироваться</h2>
            <label htmlFor="email">Введите Ваш email:</label>
            <input type="text" type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' value={email} name='email'/>
            <label htmlFor="password">Введите Ваш пароль:</label>
            <input type="text" type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' value={password} name='password'/>
            <label htmlFor="password2">Повторите Ваш пароль:</label>
            <input type="text" type="password" onChange={(e) => setPassword2(e.target.value)} placeholder='Повторный пароль' value={password2} name='password2'/>
            <button>Зарегистрироваться</button>
        </form>
        <h5>Уже есть акааунт? <Link to="/">Войди</Link></h5>
    </div>
  )
}
