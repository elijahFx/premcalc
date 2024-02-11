import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { signupUser } from '../features/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Signup() {

    const checkBoxRef = useRef()
    const dispatch = useDispatch()
    const status = useSelector(state => state.users.status)
    const mainState = useSelector(state => state.users)
   

    function handleSubmit(e) {
        e.preventDefault()

        if(!email || !password || !password2)return
        if(password !== password2)return
        if(password.length < 7) {
          return
        }

        const role = checkBoxRef.current.checked ? "worker" : "employer"

        console.log("должно работать");
        dispatch(signupUser({password: password, email: email, role: role}))
        setName("")
        setEmail("")
        setPassword("")
        setPassword2("")
        console.log(mainState);
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      if(status === "loading") {
        setIsLoading(true)
      } else {
        setIsLoading(false)
      }
    }, [status])


  return (
    <>
    {isLoading && <div className='containder-for-loader'><span className="loader"></span></div>}
    <div className='inContainer' style={{display: !isLoading ? "flex" : "none"}}>
        <form onSubmit={(e) => handleSubmit(e)} className='inForm'>
            <h2>Зарегистрироваться</h2>
            <label htmlFor="name">Введите Ваше имя (необязательно):</label>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Имя' value={name} name='name' id='name' autoComplete="on"/>
            <label htmlFor="email">Введите Ваш email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' value={email} name='email' id='email' autoComplete="on"/>
            <label htmlFor="password">Введите Ваш пароль:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' value={password} name='password' id='password'/>
            <label htmlFor="password2">Повторите Ваш пароль:</label>
            <input type="password" onChange={(e) => setPassword2(e.target.value)} placeholder='Повторный пароль' value={password2} name='password2' id='password2'/>
            <div className="flex-container">
            <label htmlFor="checkbox">Наниматель</label>
            <input type="checkbox" id='checkbox' name='checkbox' ref={checkBoxRef} />
            <label htmlFor="checkbox">Работник</label>
            </div>
            
            <button>Зарегистрироваться</button>
        </form>
        <h5>Уже есть акааунт? <Link to="/">Войди</Link></h5>
    </div>
    </>
  )
}
