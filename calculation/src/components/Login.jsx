import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../features/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.users)
  const status = user.status
  const [isLoading, setIsLoading] = useState(false)


    function handleSubmit(e) {
        e.preventDefault()

        if(!email || !password)return

        dispatch(loginUser({email: email, password: password}))
        setEmail("")
        setPassword("")
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
      if(status === "loading") {
        setIsLoading(true)
      } else {
        setIsLoading(false)
      }
    }, [user])

  return (
    <>
    {isLoading && <div className='containder-for-loader'><span className="loader"></span></div>}
    <div className='inContainer' style={{ display: !isLoading ? 'flex' : 'none' }}>
    <form onSubmit={(e) => handleSubmit(e)} className='inForm'>
        <h2>Войти</h2>
        <label htmlFor="email">Введите Ваш email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' value={email} name='email' id='email' autoComplete="on"/>
        <label htmlFor="password">Введите Ваш пароль:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' value={password} name='password' id='password'/>
        <button>Войти</button>
    </form>
    <h5>Нет аккаунта? <Link to="/signup">Зарегистрируйся</Link></h5>
</div>
</>
)}