import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetPassword } from '../features/usersSlice';


export default function ResetPassword() {

    const { id, token } = useParams()
    
    const dispatch = useDispatch()

    const [isLoading, setIsLoading]= useState(false)
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")



    function handleSubmit(e) {
        e.preventDefault()
        if(!password1 || !password2)return
        if(password1 !== password2)return
        dispatch(resetPassword({password: password1}))
        setPassword1("")
        setPassword2("")
    }
   

    useEffect(() => {
        console.log(id, token);
    }, [0])
   


  return (
    <>
    <div className='inContainer' style={{ display: !isLoading ? 'flex' : 'none' }}>
    <form onSubmit={(e) => handleSubmit(e)} className='inForm'>
        <h2>Новый пароль</h2>
        <label htmlFor="password1">Введите Ваш новый пароль:</label>
        <input type="text" onChange={(e) => setPassword1(e.target.value)} placeholder='Пароль' value={password1} name='password1' id='password1' autoComplete="on"/>
        <label htmlFor="password2">Повторно введите Ваш новый пароль:</label>
        <input type="text" onChange={(e) => setPassword2(e.target.value)} placeholder='Повторный пароль' value={password2} name='password2' id='password2' autoComplete="on"/>
        <button>Далее</button>
    </form>
</div>
</>
)}
