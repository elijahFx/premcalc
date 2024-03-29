import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOneUser } from '../features/usersSlice'

export default function Account() {

  const dispatch = useDispatch()
    
  const [userName, setUserName] = useState("")  
  const [productImg, setProductImg] = useState("")

  const user = useSelector(state => state.users.user)

  function handleSubmitUserEdit() {
    if (!userName && !productImg) return;

    const payload = { id: user.id };
  
    if (userName) {
      payload.name = userName;
    }
  
    if (productImg) {
      payload.image = productImg;
    }
  
    dispatch(updateOneUser(payload));
  }
  
  async function handleAvatarUpload(e) {
    const file = e.target.files[0]

    transformFile(file)
  }

  function transformFile(file) {
    const reader = new FileReader()

    if(file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setProductImg(reader.result)
      } 
    } else {
        setProductImg("")
    }
  }

  return (
    <div className='accountPnl'>
        <div className="account">
            <h2>Ваш Аккаунт, {user.email}!</h2>
            {user.image ? ( <img className='profilePicture' src={user.image} alt="Ваш аватар" />) : productImg ? <img className='profilePicture' src={productImg} alt="Ваше превью" /> : <div className='imageUploader'>
                <h6>Загрузить Вашу фотографию...</h6>
                </div>}
                <div className="line-container">
                <input
              className='fileInput'
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              />
              {productImg || userName ? <button onClick={handleSubmitUserEdit} className='avatarBtn'>Обновить профиль</button> : <></>}
                </div>
                
            <div className="name">
                <h4>Ваше настоящее Имя: {user?.name ? user?.name : "---"}</h4>
                <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder='Ваше имя' value={userName} />
            </div>
        </div>
      
    </div>
  )
}
