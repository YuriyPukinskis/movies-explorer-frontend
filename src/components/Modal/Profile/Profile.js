export default function Profile( props)  {
  function onSignOut(){
    props.onLogOutClick();
  }
  function onChangeProfile(){
    
  }
  const userName='Виталий';
  props.setIsMain(false);
  props.setIsMovieOrProfile(false);
  return(
    <div className="profile">
      <p className="profile__greet">Привет, {userName}!</p>
      <div className="profile__line profile__line_first">
          <p className="profile__caption">Имя</p>
          <input className="profile__input" required id="name" name="name" type="text" />
      </div>
      <div className="profile__line">
          <p className="profile__caption">Email</p>
          <input className="profile__input" required id="email" name="email" type="text" />
      </div>  
      <div className="profile__buttonContainer">
        <button className="profile__change" onClick={onChangeProfile}>Редактировать</button>
        <button className="profile__exit" onClick={onSignOut}>Выйти из аккаунта</button>
      </div>
    </div>
  )
}