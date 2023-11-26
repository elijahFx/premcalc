import React, { useState } from 'react'
import { addCase, addNewCase } from '../features/casesSlice'
import { useDispatch } from 'react-redux'

export default function Navbar() {

  const [name, setName] = useState("")
  const [money, setMoney] = useState(0)
  const [takes, setTakes] = useState(1)
  const [myTakes, setMyTakes] = useState(1)

  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)

  const dispatch = useDispatch()



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

    if(name && money && takes > 0 && myTakes > 0) {
      setError1(false)
      setError2(false)
      dispatch(addNewCase({name: name,
                       expenses: Number(money),
                       takes: Number(takes),
                       myTakes: Number(myTakes),
                       isPaid: false}))

      setName("")
      setMoney(0)
      setTakes(1)
      setMyTakes(1)
    }

   
    console.log(name === true, money === true, error1, error2);


    setError1(false)
    setError2(false)
  }


  return (
<header>


<div className='logo'>
  
  <span className="material-symbols-outlined">
savings
</span>
<h2>Премкальк</h2>

</div>


    <form className='navbar' onSubmit={handleSubmit}>
      <input className={error1 ? "redInput" : ""} type="text" placeholder='Ответчик' value={name} onChange={(e) => setName(e.target.value)}/>
      <input className={error2 ? "redInput" : ""}type="number" placeholder='Расходы' value={money} onChange={(e) => setMoney(e.target.value)}/>
      <input type="number" placeholder='Доли' value={takes} onChange={(e) => setTakes(e.target.value)}/>
      <input type="number" placeholder='Мои доли' value={myTakes} onChange={(e) => setMyTakes(e.target.value)}/>
      <button >Добавить+</button>
    </form>


</header>
  )
}
