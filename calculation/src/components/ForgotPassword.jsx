import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading]= useState(false)

    function handleSubmit(e) {
        console.log("hello");
    }



  return (
    <>
    <div className='inContainer' style={{ display: !isLoading ? 'flex' : 'none' }}>
    <form onSubmit={(e) => handleSubmit(e)} className='inForm'>
        <h2>Восстановление пароля</h2>
        <label htmlFor="email">Введите Ваш email или никнейм:</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Email' value={email} name='email' id='email' autoComplete="on"/>
        <button>Далее</button>
    </form>
    <h5><Link to="/">Войти</Link></h5>
    <h5><Link to="/signup">Зарегистрироваться</Link></h5>
</div>
</>
)}
