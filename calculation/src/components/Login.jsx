import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../features/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import ForgotPassword from './ForgotPassword'


export default function Login() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.users)
  const errorFromServer = useSelector(state => state.users.error)
  const status = user.status
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


    function handleSubmit(e) {
        e.preventDefault()

        if(!email || !password)return

        dispatch(loginUser({email: email, password: password}))
        if(errorFromServer) {
          setError(errorFromServer)
          return
        }
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
        {error && <div className='error'><h4>{error}</h4></div>}
        <button>Войти</button>
    </form>
    <h5>Нет аккаунта? <Link to="/signup">Зарегистрируйся</Link></h5>
    <h5><Link to="forgot-password">Забыли пароль?</Link></h5>
</div>
</>
)}
