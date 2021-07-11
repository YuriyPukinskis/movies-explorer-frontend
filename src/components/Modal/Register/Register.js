import React from 'react';
import { Link } from 'react-router-dom';
export default function Register( props)  {
  
  function toSignIn(e){
    // alert(document.getElementById('name').value);
    e.preventDefault();
    props.onLoginClick(e)
  }
  props.setIsMain(false);
  props.setIsProfile(false);
  props.setIsSavedMovie(false);
  props.setIsMovie(false);

  function handleSubmit(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    props.handleRegister(name,password,email);
  }
  
  return(
    <div className="register">
      <p className="register__welcome">
        Добро пожаловать!
      </p>
      <form className="register__form" onSubmit={handleSubmit}>
        <input className="register__input" required id="name" name="name" placeholder="Имя" type="text" />
        <input className="register__input" required id="email" name="email" placeholder="Email" type="text" />
        <input className="register__input" required id="password" name="password" placeholder="Пароль" type="password" />
        <div className="register__button-container">
          <button type="submit" className="register__button">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signup">
        <p>Уже зарегистрированы? </p>
        <Link to="/sign-in" className="register__link" onClick={toSignIn}>Войти</Link>
      </div>
    </div>
    )
  }

