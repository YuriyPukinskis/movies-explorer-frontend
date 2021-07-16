import React from 'react';
import MovieCard from './MovieCard';
import icon from '../../images/icon.png'
import { useState } from 'react';
import {VIS_1280,VIS_768} from '../../utils/consts';
import { useEffect } from 'react';

export default function MoviesCardList( props) {
  props.setIsMain(false);
  props.setIsProfile(false);
  props.setIsSavedMovie(false);
  props.setIsMovie(true);
  props.setIsLoggedMain(false)
  const[visible,setVisibe]=useState(3)
  const[hidden,setHidden]=useState(false)

  useEffect(() => {
    if (localStorage.getItem('searchMovieField')){
      document.getElementById('movie').value = localStorage.getItem('searchMovieField');
    }   
  }, [null])
  
  function handleSearch() {
    const text = document.getElementById('movie').value;
    
    // if (text === ''){
    //   props.reMakeMovies();
    // } else {
      props.searchMovie(text)
    // }
    localStorage.setItem('searchMovieField',text)
  }

  function handleCheck(e){ 
    if(document.getElementById("check").checked){
      props.showShortMeter();
    } else {
      props.reMakeMovies();
    }
    localStorage.setItem('ch1',document.getElementById("check").checked)
  }

  function clickHandle(){
    if(document.documentElement.clientWidth<=768){
      setVisibe(visible+VIS_768);
    } else {
      setVisibe(visible+VIS_1280);
    }
    if(visible>=props.movies.length){
      setHidden(true)
    }
  }

  return (
    <div className={`movies ${props.isMoviesVisible?'movies_visible':''}`}>
      <div className="movies__searchForm">
          <div className="searchForm__elem">
            <div className="searchForm__subElem">
              <img src={icon} className='movies__icon' alt='Поиск' />
              <input required id="movie"  className="searchForm__input" placeholder="Фильм" name="movie" type="text" />
            </div>
            <button className='searchForm__button' onClick={handleSearch} />
          </div>
          <div className="movies__short">
          {
            (JSON.parse(localStorage.getItem('ch1')))?
              <label className="searchForm__label"><input type="checkbox" id='check' onClick={handleCheck} value="1" name="slider"  className="searchForm__input2" checked /><span className="searchForm__span"></span></label>
              :<label className="searchForm__label"><input type="checkbox" id='check' onClick={handleCheck} value="1" name="slider"  className="searchForm__input2"  /><span className="searchForm__span"></span></label>
          }  
            <p className="searchForm__caption">Короткометражки</p>
          </div>
      </div>
      {(props.movies.length!==0)?
        <section className="elements">
          {Array.prototype.map.call(props.movies, function(item,index){
            return(
              <MovieCard setSavedMovies={props.setSavedMovies} savedMovies={props.savedMovies} key={item.movieId} movie={item} myId={props.myId} handleApploadCard={props.handleApploadCard} handleCardDelete={props.handleCardDelete} />
            )
          }).slice(0, visible)}
        </section>  
      :<p className='movies__none'>Ничего не найдено</p>}
      <button className={`movies__button ${((props.movies.length<=3)||hidden)?'movies__button_hidden':''}`} onClick={clickHandle}>Еще</button>
    </div>
  );
}
