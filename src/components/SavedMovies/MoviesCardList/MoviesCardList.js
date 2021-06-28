import React from 'react';
import MovieCard from '../MoviesCard/MovieCard';
import icon from '../../../images/icon.png'

export default function MoviesCardList( props) {
  props.setIsMain(false);
  props.setIsProfile(false);
  props.setIsSavedMovie(true);
  props.setIsMovie(false);
  return (
    <div className={`movies ${props.isMoviesVisible?'movies_visible':''}`}>
      <div className="movies__searchForm">
          <div className="searchForm__elem">
          <img src={icon} className='movies__icon' alt='Поиск' />
            <input required id="movie"  className="searchForm__input" placeholder="Фильм" name="movie" type="text" />
            <button className='searchForm__button' />
          </div>
          <div className="movies__short">
            <label className="searchForm__label"><input type="checkbox" value="1" name="slider"  className="searchForm__input2" /><span  className="searchForm__span"></span></label>
            <p className="searchForm__caption">Короткометражки</p>
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
