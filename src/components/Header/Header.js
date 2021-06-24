import logo from '../../images/logo.png';
import logo2 from '../../images/logo2.png';
import React from 'react';

export default function Header( props) {

  function handleRegisterClick(){
    props.onRegisterClick();
  }

  function handleLoginClick(){
    props.onLoginClick();
  }

  function handleSavedMoviesClick(){
    props.onSavedMoviesClick();
  }

  function handleMoviesClick(){
    props.onMoviesClick();
  }

  function handleProfileClick(){
    props.onProfileClick();
  }

  return (
    <header className={`header ${props.isMain?'header_colored':''}`}>
      <img className="header__logo" src={props.isMain?logo:logo2} alt="Логотип" />
      <div className={`header__block ${props.isMain?'header__block_visible':''}`}>
        <button id="utton" type='button' onClick={handleRegisterClick} className="header__button"> Регистрация </button>
        <button id="utton" type='button' onClick={handleLoginClick} className="header__button header__button_green"> Вход </button>
      </div>
      <div className={`header__block ${props.isMovieOrProfile?'header__block_visible':''}`}>
        <div className="header__films">
          <button id="utton" type='button' onClick={handleMoviesClick} className="header__button header__button_black"> Фильмы </button>
          <button id="utton" type='button' onClick={handleSavedMoviesClick} className="header__button header__button_black"> Сохраненные фильмы</button>
        </div>
        <button id="utton" type='button' onClick={handleProfileClick} className="header__button header__button_black header__button_grey"> Аккаунт </button>
      </div>
    </header>
  );
}

