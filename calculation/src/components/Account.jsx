import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOneUser } from '../features/usersSlice';

export default function Account() {
  const dispatch = useDispatch();

  const useroklad = useSelector((state) => state.users.user.userOklad)

  const [userName, setUserName] = useState('');  
  const [productImg, setProductImg] = useState('');
  const [userOklad, setUserOklad] = useState('');

  const user = useSelector((state) => state.users.user);

  function handleSubmitUserEdit() {
    if (!userName && !productImg && !userOklad) return;

    const payload = { id: user.id };

    if (!userName && !productImg && userOklad) {
      payload.userOklad = Number(userOklad);
    }
  
    if (userName && !productImg) {
      payload.name = userName;
    }
  
    if (productImg && !userName) {
      payload.image = productImg;
    }
  
    dispatch(updateOneUser(payload));
    setUserName('');
    setUserOklad('');
  }

  async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    transformFile(file);
  }

  function transformFile(file) {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg('');
    }
  }

  function controlOklad(e) {
    const value = e.target.value.toString();
    if (value.length >= 7) return;
    setUserOklad(e.target.value);
  }

  return (
    <div className="accountPnl">
      <div className="account">
        <h2>Ваш Аккаунт, {user.email}!</h2>
        {user.image ? (
          <img className="profilePicture" src={user.image} alt="Ваш аватар" />
        ) : productImg ? (
          <img className="profilePicture" src={productImg} alt="Ваше превью" />
        ) : (
          <div className="imageUploader">
            <h6>Загрузить Вашу фотографию...</h6>
          </div>
        )}
        <div className="line-container">
          <input
            className="fileInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
          {productImg || userName || userOklad ? (
            <button onClick={handleSubmitUserEdit} className="avatarBtn">
              Обновить профиль
            </button>
          ) : null}
        </div>
        
        <div className="name">
          <h4>Ваше настоящее Имя: {user?.name ? user?.name : "---"}</h4>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Ваше имя"
            value={userName}
            className="textInput"
          />
        </div>

        <div className="name">
          <h4>
            Ваш Оклад (до вычета налогов):{' '}
            {user?.userOklad ? `${user.userOklad} бел. руб.` : `${userOklad ? userOklad : 626} бел. руб.`}
          </h4>
          <input
            type="number"
            id="userOklad"
            onChange={controlOklad}
            placeholder="Ваш оклад"
            value={userOklad}
            className="numberInput"
          />
        </div>
        <p>
          Сюда необходимо ввести Ваш оклад после всех налоговых вычетов и иных выплат (подоходный, ФСЗН, страховка и т.д.). Если Вы уже ввели неправильный размер оклада, то Вы можете в любой момент сменить его посредством ввода нужного Вам оклада и нажатия кнопки "Обновить профиль".
        </p>
      </div>
    </div>
  );
}
