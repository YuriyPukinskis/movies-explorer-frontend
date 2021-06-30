import React from 'react';
import MovieCard from '../MoviesCard/MovieCard';
import icon from '../../../images/icon.png'

export default function MoviesCardList( props) {
  props.setIsMain(false);
  props.setIsProfile(false);
  props.setIsSavedMovie(true);
  props.setIsMovie(false);
  return (
    <div className={`savedMovies ${props.isMoviesVisible?'savedMovies_visible':''}`}>
      <div className="savedMovies__searchForm">
          <div className="searchFormSavedMovies__elem">
          <img src={icon} className='savedMovies__icon' alt='Поиск' />
            <input required id="movie"  className="searchFormSavedMovies__input" placeholder="Фильм" name="movie" type="text" />
            <button className='searchFormSavedMovies__button' />
          </div>
          <div className="savedMovies__short">
            <label className="searchFormSavedMovies__label"><input type="checkbox" value="1" name="slider"  className="searchFormSavedMovies__input2" /><span  className="searchFormSavedMovies__span"></span></label>
            <p className="searchFormSavedMovies__caption">Короткометражки</p>
          </div>
      </div>
      <div className="preloader">
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
      {(props.movies.length!==0)?
        <section className="elements">
          {Array.prototype.map.call(props.movies, function(item,index){
            return(
              <MovieCard key={item.movieId} movie={item} myId={props.myId} onMovieLike={props.onMovieLike}/>
            )
          })}
        </section>
      :''}
    </div>
  );
}
