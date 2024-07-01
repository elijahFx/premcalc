import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../features/usersSlice';


export default function ResetPassword() {


    
    const dispatch = useDispatch()

    const [isLoading, setIsLoading]= useState(false)


    useEffect(() => {
        dispatch(resetPassword())
    }, [2])


   


  return (
    <>
    <div className='inContainer' style={{ display: !isLoading ? 'flex' : 'none' }}>
    <form className='inForm'>
       
        <label htmlFor="email">Негр</label>
        
    </form>
    <h5><Link to="/">Войти</Link></h5>
    <h5><Link to="/signup">Зарегистрироваться</Link></h5>
</div>
</>
)}
