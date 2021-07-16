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
import {CurrentUserContext} from'../../context/CurrentUserContext';

function App() {

  window.addEventListener('load', () => { 
    const preloader = document.querySelector('.prePreloader') 
    preloader.classList.add('prePreloader_hidden') 
  })

  const history=useHistory();
  const [currentUser, setCurrentUser] = useState({name:'',_id:'',email:''});
  const [movies,setMovies]=useState([]);
  const [savedMovies,setSavedMovies]=useState([]);
  const [isMain,setIsMain]=useState(false);
  const [isMovie,setIsMovie]=useState(false);
  const [isSavedMovie,setIsSavedMovie]=useState(false);
  const [isProfile,setIsProfile]=useState(false);
  const [isLoggedMain,setIsLoggedMain]=useState(false);
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
        localStorage.setItem('loggIn',true);
        history.push('/movies');
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

            if(localStorage.getItem('searchSavedMoviesArray')){
              JSON.parse(localStorage.getItem('searchSavedMoviesArray')).forEach(element => {
                movie.push(prepareSavedMovies(element))
              })
            }else{
              res.forEach(element => {
                movie.push(prepareSavedMovies(element))
              })
            }
            setSavedMovies(movie) 
            })
            // res.forEach(element => {
            //   movie.push(prepareSavedMovies(element))
            // })
            // setSavedMovies(movie) 
            // })
          .catch((err) => {
            console.log(err); 
          });
      }
      
      if (movies.length===0){
        moviesApi.getInitialCards()
          .then(function(res){
            const movie=[]
            
            if(localStorage.getItem('searchMoviesArray')){
              JSON.parse(localStorage.getItem('searchMoviesArray')).forEach(element => {
                movie.push(prepareMovies(element))
              })
            }else{
              res.forEach(element => {
                movie.push(prepareMovies(element))
              })
            }
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
    delete localStorage.loggIn;
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
          localStorage.setItem('loggIn',true);
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
        alert('Профиль успешно обновлен! Привет, '+ updatedUser.data.name);
        setCurrentUser({name:updatedUser.data.name,_id:updatedUser.data._id,email:updatedUser.data.email})
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
      .then((res) => {
        const a = savedMovies;
        a.push(res.data)
        setSavedMovies(a);
      }) 
      .catch((err) => {
        console.log(err); 
      });
      // reMakeSavedMovies()
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
    if (text === ''){
      delete localStorage.searchMoviesArray
      reMakeMovies();
    } else {
      const newCards = movies.filter((c) => c.nameRU.toLowerCase().includes(text.toLowerCase()));
      setMovies(newCards);
      localStorage.setItem('searchMoviesArray',JSON.stringify(newCards))
    }
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
    if (text === ''){
      delete localStorage.searchSavedMoviesArray
      reMakeSavedMovies();
    } else {
      const newCards = savedMovies.filter((c) => c.nameRU.toLowerCase().includes(text.toLowerCase()));
      setSavedMovies(newCards);
      localStorage.setItem('searchSavedMoviesArray',JSON.stringify(newCards))
    }
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



  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('form__submit_inactive');
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove('form__submit_inactive');
      buttonElement.disabled = false;
    }
  }; 

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  }; 
  
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }; 

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`.form__input`));
    const buttonElement = formElement.querySelector('.form__submit');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };

  enableValidation(); 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
          <div className='prePreloader'>
            <div className="preloader">
                <div className="preloader__container">
                    <span className="preloader__round"></span>
                </div>
            </div>
          </div>
          <Header isLoginOrRegister={isLoginOrRegister} isLoggedMain={isLoggedMain} isMain={isMain} isMovie={isMovie} isSavedMovie={isSavedMovie} isMovieOrProfile={isMovieOrProfile} onRegisterClick={onRegisterClick} onLoginClick={onLoginClick} onMoviesClick={onMoviesClick} onSavedMoviesClick={onSavedMoviesClick} onProfileClick={onProfileClick} setIsPopupOpen={setIsPopupOpen}/>
          <Switch>
            <Route path="/sign-up">
              <Register setEventListeners={setEventListeners} setIsLoggedMain={setIsLoggedMain} onLoginClick={onLoginClick} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              < Login onRegisterClick={onRegisterClick} setIsLoggedMain={setIsLoggedMain} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleLogin={handleLogin} />
            </Route>
            <ProtectedRoute path="/movies" loggedIn={loggedIn} 
              component={()=>(<MoviesCardList setSavedMovies={setSavedMovies} setIsLoggedMain={setIsLoggedMain} savedMovies={savedMovies} setMovies={setMovies} reMakeMovies={reMakeMovies} movies={movies} showShortMeter={showShortMeterMovies} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleApploadCard={handleApploadCard} handleCardDelete={handleCardDelete} searchMovie={searchMovie}/>)} />
            <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} 
              component={()=>(<SavedMoviesCardList setIsLoggedMain={setIsLoggedMain} reMakeSavedMovies={reMakeSavedMovies} showShortMeter={showShortMeterSavedMovies} searchSavedMovie={searchSavedMovie} movies={savedMovies}setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleCardDelete={handleCardDelete} />)} />
            <ProtectedRoute path="/profile" loggedIn={loggedIn} 
              component={()=>(<Profile onLogOutClick={onLogOutClick} setIsLoggedMain={setIsLoggedMain} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} handleUpdateUser={handleUpdateUser} />)} />
            <Route exact path="/">
              <Main setIsMain={setIsMain} setIsLoggedMain={setIsLoggedMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} />
            </Route>
            <Route path="*">
              <NotFound onNotFound={onNotFound} setIsLoggedMain={setIsLoggedMain} setIsMain={setIsMain} setIsSavedMovie={setIsSavedMovie} setIsMovie={setIsMovie} setIsProfile={setIsProfile} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
