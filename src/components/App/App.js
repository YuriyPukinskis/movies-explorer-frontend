import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import MoviesCardList from '../Movies/MoviesCardList';
import SavedMoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import Login from '../Modal/Login/Login';
import Register from '../Modal/Register/Register';
import Profile from '../Modal/Profile/Profile';
import NotFound from '../404/NotFound';
import { useState } from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import close from '../../images/close.png';
import account from '../../images/account.png';
export const history = createBrowserHistory()


function App() {
  const [movies,setMovies]=useState([]);
  const [savedMovies,setSavedMovies]=useState([]);
  const [isMain,setIsMain]=useState(false);
  const [isMovie,setIsMovie]=useState(false);
  const [isSavedMovie,setIsSavedMovie]=useState(false);
  const [isProfile,setIsProfile]=useState(false);
  const isMovieOrProfile = isMovie || isSavedMovie || isProfile;
  const [isPopupOpen,setIsPopupOpen]=useState(false);

  if (movies.length === 0){
    setMovies([{name:'namen',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'111',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://sun6-22.userapi.com/impf/zlJwszlG77CnUNz8gAw-1WqJpVU3tnQiBwOo_Q/HbJXFyynflI.jpg?size=1280x800&quality=96&sign=55da32cf936194b1fd6a61f45788c0bb&c_uniq_tag=6r89xpKgaNM1LgQER524ZhLDZevDD0GVGrrDIGkje-s&type=album',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://sun9-26.userapi.com/impg/xUMdNvbr5Cq6AVwMjODCxHfZqd3p7BZ4y5HIDA/5V3oYbt5GGw.jpg?size=270x151&quality=96&sign=38d12eaa1f513a4b22c5cebadee29bbd&type=album',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},])
  }
  if (savedMovies.length === 0){
    setSavedMovies([{name:'namen',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'111',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://sun6-22.userapi.com/impf/zlJwszlG77CnUNz8gAw-1WqJpVU3tnQiBwOo_Q/HbJXFyynflI.jpg?size=1280x800&quality=96&sign=55da32cf936194b1fd6a61f45788c0bb&c_uniq_tag=6r89xpKgaNM1LgQER524ZhLDZevDD0GVGrrDIGkje-s&type=album',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://sun9-26.userapi.com/impg/xUMdNvbr5Cq6AVwMjODCxHfZqd3p7BZ4y5HIDA/5V3oYbt5GGw.jpg?size=270x151&quality=96&sign=38d12eaa1f513a4b22c5cebadee29bbd&type=album',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},])
  }


  
  function onRegisterClick(){
    history.push('/sign-up');
    history.go();
  }
  function onLoginClick(){
    history.push('/sign-in');
    history.go();
  }
  function onMoviesClick(){
    history.push('/movies');
    history.go();
  }
  function onSavedMoviesClick(){
    history.push('/saved-movies');
    history.go();
  }
  function onProfileClick(){
    history.push('/profile');
    history.go();
  }
  function onLogOutClick(){
    history.push('/');
    history.go();
  }
  function onNotFound(){
    history.go(-1);
  }
  function closePopup(){
    setIsPopupOpen(false);
  }

  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Header isMain={isMain} isMovie={isMovie} isSavedMovie={isSavedMovie} isMovieOrProfile={isMovieOrProfile} onRegisterClick={onRegisterClick} onLoginClick={onLoginClick} onMoviesClick={onMoviesClick} onSavedMoviesClick={onSavedMoviesClick} onProfileClick={onProfileClick} setIsPopupOpen={setIsPopupOpen}/>
        <Switch>
          <Route path="/sign-up">
            <Register onLoginClick={onLoginClick} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} />
          </Route>
          <Route path="/sign-in">
            < Login onMoviesClick={onMoviesClick} onRegisterClick={onRegisterClick} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} />
          </Route>
          <Route path="/movies">
            <MoviesCardList movies={movies} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile}/>
          </Route>
          <Route path="/saved-movies">
            <SavedMoviesCardList movies={savedMovies} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} />
          </Route>
          <Route path="/profile">
            <Profile onLogOutClick={onLogOutClick} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} />
          </Route>
          <Route exact path="/">
            <Main setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} />
          </Route>
          <Route path="*">
            <NotFound onNotFound={onNotFound} setIsMain={setIsMain}  />
          </Route>
      
        </Switch>
        <Footer />
        <div className={`popup ${isPopupOpen?'popup_visible':''} `}>
          <div className='popup__field'>
            <div className="popup__buttonField">
              <button className='popup__buttonClose' onClick={closePopup}><img className='popup__closeImg' src={close} alt='Закрыть' /></button> 
            </div>
            <div className='popup__container'>
              <button id="utton" type='button' onClick={onLogOutClick} className={`popup__button ${isMain?'popup__button_highlighted':''}`}> Главная </button>
              <button id="utton" type='button' onClick={onMoviesClick} className={`popup__button ${isMovie?'popup__button_highlighted':''}`}> Фильмы </button>
              <button id="utton" type='button' onClick={onSavedMoviesClick} className={`popup__button ${isSavedMovie?'popup__button_highlighted':''}`}> Сохраненные фильмы</button>
            </div>
            <button id="utton" type='button' onClick={onProfileClick} className="popup__button popup__button_account"> Аккаунт <img className="header__accountArt" src={account} alt="Аккаунт"/></button>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
