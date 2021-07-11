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
import { useEffect } from 'react';
import { Route, Switch, useHistory} from 'react-router';
import * as auth from '../../utils/auth';
import close from '../../images/close.png';
import account from '../../images/account.png';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {mainApi} from '../../utils/MainApi';
import {moviesApi} from '../../utils/MoviesApi';

function App() {

  window.addEventListener('load', () => { 
    const preloader = document.querySelector('.prePreloader') 
    preloader.classList.add('prePreloader_hidden') 
  })

  const history=useHistory();
  const [currentUser, setCurrentUser] = useState({name:'',_id:''});
  const [movies,setMovies]=useState([]);
  const [savedMovies,setSavedMovies]=useState([]);
  const [isMain,setIsMain]=useState(false);
  const [isMovie,setIsMovie]=useState(false);
  const [isSavedMovie,setIsSavedMovie]=useState(false);
  const [isProfile,setIsProfile]=useState(false);
  const isMovieOrProfile = isMovie || isSavedMovie || isProfile;
  const isLoginOrRegister = !isMain && !isMovie && !isSavedMovie && !isProfile;
  const [isPopupOpen,setIsPopupOpen]=useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  

  function handleFailedLogin(){
    alert('Что-то пошло не так! Попробуйте еще раз.')
  }

  function handleLogin (email, password){
    auth.authorize(email, password, handleFailedLogin)
    .then((data) => {
      console.log(data)
      if (data.token){
        setLoggedIn(true)
        // alert('log' + loggedIn)
        history.push('/movies');
        // history.go();
      }
    })  
    .catch(err => console.log(err));
  }

  useEffect(() => {
    checkToken();
    mainApi.initProfileFomServer()
      .then(function(res){
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err); 
      });
      if (savedMovies.length===0){
        mainApi.getInitialCards()
          .then(function(res){
            const movie=[]
            res.forEach(element => {
              // alert(JSON.stringify(element))
              // if(element.owner === currentUser._id)
              movie.push(prepareSavedMovies(element))
            })
            setSavedMovies(movie) 
            })
          .catch((err) => {
            console.log(err); 
          });
      }
      
      if (movies.length===0){
        moviesApi.getInitialCards()
          .then(function(res){
            const movie=[]
            res.forEach(element => {
              movie.push(prepareMovies(element))
            })
            setMovies(movie) 
            })
          .catch((err) => {
            console.log(err); 
          });
      }      
  }, [null])



  
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
    // history.go();
  }
  function onSavedMoviesClick(){
    history.push('/saved-movies');
    // history.go();
  }
  function onProfileClick(){
    history.push('/profile');
    // history.go();
  }
  function onLogOutClick(){
    delete localStorage.token;
    history.push('/');
    history.go();
  }
  function onNotFound(){
    history.go(-1);
  }
  function closePopup(){
    setIsPopupOpen(false);
  }

  function handleRegister(name,password,email){
    auth.register(name,  password, email).then((res) => {
      if(res){
          alert('Вы успешно зарегистрировались, ' + name)
          history.push('/sign-in');
      } else {
        alert('Something gone wrong')
      }
    })
    .catch(err => console.log(err));
  }

  function checkToken () {
    const token = localStorage.getItem('token');
    if (token){
      auth.getContent(token).then((res) => {
        if (res){
          setLoggedIn(true)
          
        };
      })
      .catch((err) => {
        console.log(err); 
      });
    }    
  }

  function handleUpdateUser(name, email) {
    mainApi.postLoginToServer(name, email)
      .then((updatedUser)=>{
        alert('Профиль успешно обновлен! Привет, '+ updatedUser.data);
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function prepareMovies(newCard){
    const country = newCard.country;
    const director = newCard.director;
    const duration = newCard.duration;
    const year = newCard.year;
    const description = newCard.description;
    const image = newCard.image;
    const trailer = newCard.trailerLink;
    const thumbnail = newCard.image.formats.thumbnail;
    const id = newCard.id;
    const nameRU = newCard.nameRU;
    const nameEN = newCard.nameEN;
    const ownerID = newCard.owner;
    return {country, director, duration, year, description, image, trailer,thumbnail, id, nameRU, nameEN,ownerID}
  }

  function prepareSavedMovies(newCard){
    const country = newCard.country;
    const director = newCard.director;
    const duration = newCard.duration;
    const year = newCard.year;
    const description = newCard.description;
    const image = newCard.image;
    const trailer = newCard.trailer;
    const thumbnail = newCard.thumbnail;
    const _id = newCard._id;
    const movieId = newCard.movieId;
    const nameRU = newCard.nameRU;
    const nameEN = newCard.nameEN;
    const ownerID = newCard.owner;
    return {country, director, duration, year, description, image, trailer,thumbnail, _id, movieId, nameRU, nameEN,ownerID}
  }

  function handleApploadCard(data) {

    mainApi.postCardToServer(data)  
      .catch((err) => {
        console.log(err); 
      });
      reMakeSavedMovies()
  }

  function handleCardDelete(card) {
    mainApi.deleteCardFromServer(card._id)
    .then(() => {
      const newCards = savedMovies.filter((c) => c._id !== card._id);
      setSavedMovies(newCards);
    })
    .catch((err) => {
      console.log(err); 
    });
  } 

  function searchMovie(text) {
    const newCards = movies.filter((c) => c.nameRU === text);
    setMovies(newCards);
  }


  function showShortMeterMovies(){
    const newCards = movies.filter((c) => c.duration <= 40);
    setMovies(newCards);
  }

  function reMakeMovies(){
    moviesApi.getInitialCards()
      .then(function(res){
        const movie=[]
        res.forEach(element => {
          movie.push(prepareMovies(element))
        })
        setMovies(movie) 
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function searchSavedMovie(text) {
    const newCards = savedMovies.filter((c) => c.nameRU === text);
    setSavedMovies(newCards);
  }

  function showShortMeterSavedMovies(){
    const newCards = savedMovies.filter((c) => c.duration <= 40);
    setSavedMovies(newCards);
  }

  function reMakeSavedMovies(){
    mainApi.getInitialCards()
      .then(function(res){
        const movie=[]
        res.forEach(element => {
          movie.push(prepareSavedMovies(element))
        })
        setSavedMovies(movie) 
      })
      .catch((err) => {
        console.log(err); 
      });
  }
  return (
    <div className="App">
        <div className='prePreloader'>
          <div className="preloader">
              <div className="preloader__container">
                  <span className="preloader__round"></span>
              </div>
          </div>
        </div>
        <Header isLoginOrRegister={isLoginOrRegister} isMain={isMain} isMovie={isMovie} isSavedMovie={isSavedMovie} isMovieOrProfile={isMovieOrProfile} onRegisterClick={onRegisterClick} onLoginClick={onLoginClick} onMoviesClick={onMoviesClick} onSavedMoviesClick={onSavedMoviesClick} onProfileClick={onProfileClick} setIsPopupOpen={setIsPopupOpen}/>
        <Switch>
          <Route path="/sign-up">
            <Register onLoginClick={onLoginClick} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            < Login onRegisterClick={onRegisterClick} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn} 
            component={()=>(<MoviesCardList savedMovies={savedMovies} setMovies={setMovies} reMakeMovies={reMakeMovies} movies={movies} showShortMeter={showShortMeterMovies} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleApploadCard={handleApploadCard} handleCardDelete={handleCardDelete} searchMovie={searchMovie}/>)} />
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} 
            component={()=>(<SavedMoviesCardList reMakeSavedMovies={reMakeSavedMovies} showShortMeter={showShortMeterSavedMovies} searchSavedMovie={searchSavedMovie} movies={savedMovies}setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleCardDelete={handleCardDelete} />)} />
          {/* <Route path="/saved-movies">
            <SavedMoviesCardList movies={savedMovies}setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleCardDelete={handleCardDelete} />
          </Route> */}
          <ProtectedRoute path="/profile" loggedIn={loggedIn} 
            component={()=>(<Profile onLogOutClick={onLogOutClick} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleUpdateUser={handleUpdateUser} />)} />
          {/* <Route path="/profile">
            <Profile onLogOutClick={onLogOutClick} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleUpdateUser={handleUpdateUser} />
          </Route> */}
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
    </div>
  );
}

export default App;
