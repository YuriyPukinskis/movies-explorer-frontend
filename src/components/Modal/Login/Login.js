import React from 'react';
import { Link } from 'react-router-dom';


export default function Login (props) {
  props.setIsMain(false);
  props.setIsProfile(false);
  props.setIsSavedMovie(false);
  props.setIsMovie(false);
  props.setIsLoggedMain(false)
  function handleSubmit(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
   
    props.handleLogin(email, password);
  }
  function toSignUp(){
    props.onRegisterClick()
  }
  return(
    <div className="login">
      <p className="login__welcome">
        Рады видеть!
      </p>
      <form onSubmit={handleSubmit} className="form login__form">
        <input required id="email"  className="form__input login__input" placeholder="E-mail" name="email" type="email" />
        <span class="email-error form__input-error"></span>
        <input required id="password"  className="form__input login__input" placeholder="Пароль" name="password" type="password" />
        <span class="password-error form__input-error"></span>
        <div className="login__button-container">
          <button type="submit" className="form__submit login__button">Войти</button>
        </div>
      </form>
      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="login__link" onClick={toSignUp}>Регистрация</Link>
      </div>
    </div>
  )
}
