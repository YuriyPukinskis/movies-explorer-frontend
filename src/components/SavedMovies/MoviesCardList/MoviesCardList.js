import React from 'react';
import MovieCard from '../MoviesCard/MovieCard';
import icon from '../../../images/icon.png'
import { useState } from 'react';

export default function MoviesCardList( props) {
  props.setIsMain(false);
  props.setIsProfile(false);
  props.setIsSavedMovie(true);
  props.setIsMovie(false);

  const[visible,setVisibe]=useState(3)
  const[hidden,setHidden]=useState(false)
  function handleSearch() {
    const text = document.getElementById('movie').value;
    props.searchSavedMovie(text)
  }


  function handleCheck(e){ 
    if(document.getElementById("check").checked){
      props.showShortMeter();
    } else {
      props.reMakeSavedMovies();
    }
    localStorage.setItem('ch1',document.getElementById("check").checked)
  }

  function clickHandle(){
    setVisibe(visible+3);
    if(visible>=100){
      setHidden(true)
    }
  }

  return (
    <div className={`savedMovies ${props.isMoviesVisible?'savedMovies_visible':''}`}>
      <div className="savedMovies__searchForm">
          <div className="searchFormSavedMovies__elem">
            <div className="searchFormSavedMovies__subElem">
              <img src={icon} className='savedMovies__icon' alt='Поиск' />
              <input required id="movie"  className="searchFormSavedMovies__input" placeholder="Фильм" name="movie" type="text" />
            </div>
            <button className='searchFormSavedMovies__button' onClick={handleSearch} />
          </div>
          <div className="savedMovies__short">
          {
            (JSON.parse(localStorage.getItem('ch1')))?
              <label className="searchFormSavedMovies__label"><input type="checkbox" id='check' onClick={handleCheck} value="1" name="slider"  className="searchFormSavedMovies__input2" checked /><span className="searchFormSavedMovies__span"></span></label>
              :<label className="searchFormSavedMovies__label"><input type="checkbox" id='check' onClick={handleCheck} value="1" name="slider"  className="searchFormSavedMovies__input2"  /><span className="searchFormSavedMovies__span"></span></label>
          }  
            <p className="searchFormSavedMovies__caption">Короткометражки</p>
          </div>
      </div>
      {(props.movies.length!==0)?
        <section className="savedMoviesElements">
          {Array.prototype.map.call(props.movies, function(item,index){
            return(
              <MovieCard key={item.movieId} movie={item} myId={props.myId} handleApploadCard={props.handleApploadCard} handleCardDelete={props.handleCardDelete} />
            )
          }).slice(0, visible)}
        </section>  
      :''}
      <button className={`savedMovies__button ${hidden?'savedMovies__button_hidden':''}`} onClick={clickHandle}>Еще</button>
    </div>
  );
}
