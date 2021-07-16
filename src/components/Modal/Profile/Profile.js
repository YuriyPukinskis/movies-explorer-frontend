import {CurrentUserContext} from'../../../context/CurrentUserContext';
import React from 'react';

export default function Profile( props)  {
  const currentUser = React.useContext(CurrentUserContext);
  function onSignOut(){
    props.onLogOutClick();
  }
  function onChangeProfile(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    props.handleUpdateUser(name, email)
  }
  props.setIsMain(false);
  props.setIsProfile(true);
  props.setIsSavedMovie(false);
  props.setIsMovie(false);
  props.setIsLoggedMain(false)

  function fieldChange(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const sub = document.getElementById('sub');

    if ((name === currentUser.name)&&(email === currentUser.email)){
      sub.classList.add('form__submit_inactive');
      sub.disabled = true;
    } else {
      sub.classList.remove('form__submit_inactive');
      sub.disabled = false;
    }
  }
  return(
    <div className="profile">
      <p className="profile__greet">Привет, {currentUser.name}!</p>
      <form className='form'onSubmit={onChangeProfile}>
        <div className="profile__line profile__line_first">
          <p className="profile__caption">Имя</p>
          <input className="form__input profile__input" required id="name" onChange={fieldChange} name="name" type="text" />
        </div>
        <span class="name-error form__input-error"></span>
        <div className="profile__line">
          <p className="profile__caption">Email</p>
          <input className="form__input profile__input" required id="email" name="email" type="email" />
        </div>  
        <span class="email-error form__input-error"></span>
        <div className="profile__buttonContainer">
          <button type="submit" className="form__submit profile__change" id='sub' >Редактировать</button>
          <button className="profile__exit" onClick={onSignOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </div>
  )
}