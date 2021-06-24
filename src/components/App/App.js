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
export const history = createBrowserHistory()

function App() {
  const [movies,setMovies]=useState([]);
  const [savedMovies,setSavedMovies]=useState([]);
  const [isMain,setIsMain]=useState(false);
  const [isMovieOrProfile,setIsMovieOrProfile]=useState(false);

  if (movies.length === 0){
    setMovies([{name:'namen',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'111',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},])
  }
  if (savedMovies.length === 0){
    setSavedMovies([{name:'namen',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'111',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
      {name:'namen1',link:'https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk3xj3SNsykl6tc1aFKIVZ6aaKTM5SRkZCeTgDn6uOyic',numberOfLikes:0,cardId:'112',elementLikes:[],ownerID:'2222',likes:[],length:'1ч 42м'},
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
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Header isMain={isMain} isMovieOrProfile={isMovieOrProfile} onRegisterClick={onRegisterClick} onLoginClick={onLoginClick} onMoviesClick={onMoviesClick} onSavedMoviesClick={onSavedMoviesClick} onProfileClick={onProfileClick} />
        <Switch>
          <Route path="/sign-up">
            <Register onLoginClick={onLoginClick} setIsMain={setIsMain} setIsMovieOrProfile={setIsMovieOrProfile} />
          </Route>
          <Route path="/sign-in">
            < Login onMoviesClick={onMoviesClick} onRegisterClick={onRegisterClick} setIsMain={setIsMain} setIsMovieOrProfile={setIsMovieOrProfile} />
          </Route>
          <Route path="/movies">
            <MoviesCardList movies={movies} setIsMain={setIsMain} setIsMovieOrProfile={setIsMovieOrProfile} />
          </Route>
          <Route path="/saved-movies">
            <SavedMoviesCardList movies={savedMovies} setIsMain={setIsMain} setIsMovieOrProfile={setIsMovieOrProfile} />
          </Route>
          <Route path="/profile">
            <Profile onLogOutClick={onLogOutClick} setIsMain={setIsMain} setIsMovieOrProfile={setIsMovieOrProfile} />
          </Route>
          <Route exact path="/">
            <Main setIsMain={setIsMain} setIsMovieOrProfile={setIsMovieOrProfile} />
          </Route>
          <Route path="*">
            <NotFound onNotFound={onNotFound} setIsMain={setIsMain} setIsMovieOrProfile={setIsMovieOrProfile} />
          </Route>
      
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
