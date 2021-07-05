import React from 'react';
import { Link } from 'react-router-dom';


export default function Login (props) {
  props.setIsMain(false);
  props.setIsProfile(false);
  props.setIsSavedMovie(false);
  props.setIsMovie(false);
  function handleSubmit(e){
    e.preventDefault();
    props.onMoviesClick();
  }
  function toSignUp(){
    props.onRegisterClick()
  }
  return(
    <div className="login">
      <p className="login__welcome">
        Рады видеть!
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        <input required id="email"  className="login__input" placeholder="E-mail" name="email" type="text" />
        <input required id="password"  className="login__input" placeholder="Пароль" name="password" type="password" />
        <div className="login__button-container">
          <button type="submit" className="login__button">Войти</button>
        </div>
      </form>
      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="login__link" onClick={toSignUp}>Регистрация</Link>
      </div>
    </div>
  )
}
