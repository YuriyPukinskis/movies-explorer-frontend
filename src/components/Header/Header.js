import logo from '../../images/logo.png';
import account from '../../images/account.png';
import menu from '../../images/menu.png';
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

  function handleMenuClick(){
    props.setIsPopupOpen(true);
  }

  return (
    <header className={`header ${props.isMain?'header_colored':''}`}>
      <div className ='header__section'>
        <img className="header__logo" src={logo} alt="Логотип" />
        <div className={`header__block ${props.isMovieOrProfile?'header__block_visible':''} header__block_invisible`}>
          <div className="header__films header__hiding">
            <button id="utton" type='button' onClick={handleMoviesClick} className={`header__button header__button_movie ${props.isMovie?'header__button_highlighted':''}`}> Фильмы </button>
            <button id="utton" type='button' onClick={handleSavedMoviesClick} className={`header__button header__button_movie header__block_right ${props.isSavedMovie?'header__button_highlighted':''}`}> Сохраненные фильмы</button>
          </div>
        </div>
      </div>
      <div className={`header__block ${props.isMain?'header__block_visible':''} `}>
        <button id="utton" type='button' onClick={handleRegisterClick} className="header__button header__button_register"> Регистрация </button>
        <button id="utton" type='button' onClick={handleLoginClick} className="header__button header__button_login"> Войти </button>
      </div>
      <div className={`header__block ${props.isMovieOrProfile?'header__block_visible':''} header__block_invisible`}>
        <button id="utton" type='button' onClick={handleProfileClick} className="header__button header__button_account header__hiding"> Аккаунт <img className="header__accountArt" src={account} alt="Аккаунт"/></button>
      </div>
      <button id="utton" type='button' onClick={handleMenuClick} className={`header__button header__button_menu ${props.isMovieOrProfile?'header__button_menu_visible':''} `}> <img className="header__menuImg" src={menu} alt="Меню"/></button>
    </header>
  );
}

