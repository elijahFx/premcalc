import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../features/usersSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) return;

    dispatch(forgotPassword({ email: email }));
    setEmail("");
    setIsLoading(true);
  }

  return (
    <>
      {" "}
      {isLoading ? (
        <div className="noCases">
          <h2>Ссылка на восстановление пароля направлена Вам на email!</h2>
          <h5>
            <Link to="/">Обратно на главную страницу</Link>
          </h5>
        </div>
      ) : (
        <div className="inContainer">
          <form onSubmit={(e) => handleSubmit(e)} className="inForm">
            <h2>Восстановление пароля</h2>
            <label htmlFor="email">Введите Ваш email:</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              value={email}
              name="email"
              id="email"
              autoComplete="on"
            />
            <button>Далее</button>
          </form>
          <h5>
            <Link to="/">Войти</Link>
          </h5>
          <h5>
            <Link to="/signup">Зарегистрироваться</Link>
          </h5>
        </div>
      )}
    </>
  );
}
