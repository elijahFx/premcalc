import React, { useEffect, useState } from 'react'
import Dialog from './Dialog'
import { addCase, addNewCase, fetchCases } from '../features/casesSlice.mjs'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../features/usersSlice'
import { Link } from 'react-router-dom'

export default function Navbar() {

  const [name, setName] = useState("")
  const [money, setMoney] = useState(0)
  const [takes, setTakes] = useState(1)
  const [myTakes, setMyTakes] = useState(1)
  const [email, setEmail] = useState("")
  const user = useSelector(state => state.users.user)
  const { showDialog } = useSelector(state => state.cases)

  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)

  const dispatch = useDispatch()


  useEffect(() => {
    setEmail(user?.email)
  }, [user])

  useEffect(() => {
    const autoLogin = JSON.parse(localStorage.getItem("token"));
    if(autoLogin) {
      dispatch(login(autoLogin))
    }
  }, [])


  function handleClick() {
    dispatch(logout())
    localStorage.clear()
  }


  function handleSubmit(e) {
    e.preventDefault()

    
    if(!name || !money) {
      if(!name) {
        setError1(true)
      }
      if(!money){
        setError2(true)
      }
    return
    }

    if(name && money && takes > 0 && myTakes > 0 && user) {
      setError1(false)
      setError2(false)
      dispatch(addNewCase({name: name,
                       expenses: Number(money),
                       takes: Number(takes),
                       myTakes: Number(myTakes),
                       isPaid: false,
                    }))
      setName("")
      setMoney(0)
      setTakes(1)
      setMyTakes(1)
    }
    setError1(false)
    setError2(false)
  }

  return (
<header>

{showDialog ? <Dialog /> : null} 
<div className='logo'>
<Link to="/">
<div className="subLogo">
  {user?.image ? <img className='microProfilePicture' src={user.image} alt="Ваш аватар" /> : <span className="material-symbols-outlined">savings</span>}
<h2>Премкальк</h2>
</div>
</Link>
{email && !user?.error ? <Link to="account"><h5>{user?.name ? user?.name : email}</h5></Link> : <></>}
{email && !user?.error ? <button onClick={() => handleClick()} className='exitBtn'>Выйти</button> : <></>}
</div>


    <form className='navbar' onSubmit={handleSubmit}>
      <div className="navbarContainer">
      <label htmlFor="name">Ответчик:</label>
      <input className={error1 ? "redInput" : ""} type="text" placeholder='Ответчик' value={name} onChange={(e) => setName(e.target.value)} name='name' autoComplete='on'/>
      </div>
      <div className="navbarContainer">
      <label htmlFor="expenses">Расходы РОЗП:</label>
      <input className={error2 ? "redInput" : ""}type="number" placeholder='Расходы' value={money} onChange={(e) => setMoney(e.target.value)} name='expenses'/>
      </div>
      <div className="navbarContainer">
      <label htmlFor="takes">Доли:</label>
      <input type="number" placeholder='Доли' value={takes} onChange={(e) => setTakes(e.target.value)} name='takes'/>
      </div>
      <div className="navbarContainer">
      <label htmlFor="myTakes">Мои доли:</label>
      <input type="number" placeholder='Мои доли' value={myTakes} onChange={(e) => setMyTakes(e.target.value)} name='myTakes'/>
      </div>
      <button >Добавить+</button>
    </form>


</header>
  )
}
