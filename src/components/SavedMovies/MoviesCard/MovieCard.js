import React from 'react';
export default function Card(props){
 
  function handleDelClick(props) {
    props.handleCardDelete(props.movie)
  } 
  
  return(
    <div className="savedMovieCard">
      <a className="element__link" href={props.movie.trailer} target='_blank'><img className="savedMovieCard__img" src={props.movie.image} alt='Неотрисовавшаяся картинка' /></a>
      <div className="savedMovieCard__caption">
        <h2 className="savedMovieCard__text">{props.movie.nameRU}</h2>
        <div className="savedMovieCard__section">
          <button className={ `savedMovieCard__button`} onClick={()=>handleDelClick(props)} type="button" />
        </div>
      </div>
      <p className="savedMovieCard__duration">{props.movie.duration}</p>
    </div>
  )
}