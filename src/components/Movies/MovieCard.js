import React from 'react';
import { useState } from 'react';

export default function Card(props){
  // const [likeClick,setLikeClick]=useState(false);
  const like = props.savedMovies.some(i => i.movieId === props.movie.id);
  // setLike(isLiked)
  const cardLikeButtonClassName = (`element__button ${like ? 'element__button_liked' : ''}`); 
  
  function handleLikeClick(props) {
    if(!like){
      props.handleApploadCard(props.movie)
    } else{
      Array.prototype.map.call(props.savedMovies, function(item,index){
        if(item.movieId===props.movie.id){
          props.handleCardDelete(item)
        }
      })
    } 
    // setLikeClick(!likeClick);
  }
   
  return(
    <div className="element">
       <a className="element__link" href={props.movie.trailer} target='_blank'><img className="element__img" src={`https://api.nomoreparties.co${props.movie.image.url}`} alt='Неотрисовавшаяся картинка' /></a>
      <div className="element__caption">
        <h2 className="element__text">{props.movie.nameRU}</h2>
        <div className="element__section">
          <button className={cardLikeButtonClassName} onClick={()=>handleLikeClick(props)} type="button" />
        </div>
      </div>
      <p className="element__duration">{props.movie.duration}</p>
    </div>
  )
}