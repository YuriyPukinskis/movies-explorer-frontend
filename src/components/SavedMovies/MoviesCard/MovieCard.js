import React from 'react';
export default function Card(props){
 
  function handleLikeClick(props) {
    alert('тут будет удаление карточки')
  } 
  
  return(
    <div className="savedMovieCard">
      <img className="savedMovieCard__img" src={props.movie.link} alt='Неотрисовавшаяся картинка' />
      <div className="savedMovieCard__caption">
        <h2 className="savedMovieCard__text">{props.movie.name}</h2>
        <div className="savedMovieCard__section">
          <button className={ `savedMovieCard__button`} onClick={()=>handleLikeClick(props)} type="button" />
        </div>
      </div>
      <p className="savedMovieCard__duration">{props.movie.length}</p>
    </div>
  )
}