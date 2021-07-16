import React from 'react';
import { useState } from 'react';

export default function Card(props){
  // const [likeClick,setLikeClick]=useState(false);
  let like = props.savedMovies.some(i => i.movieId === props.movie.id);
  // setLike(isLiked)
  let cardLikeButtonClassName = (`element__button ${like ? 'element__button_liked' : ''}`); 
  
  function handleLikeClick(props) {
    if(!like){
      props.handleApploadCard(props.movie)
      document.getElementById(props.movie.id).classList.add('element__button_liked')
      like = true
    } else{
      Array.prototype.map.call(props.savedMovies, function(item,index){
        if(item.movieId===props.movie.id){
          props.handleCardDelete(item)
        }
      })
      document.getElementById(props.movie.id).classList.remove('element__button_liked')
    } 
  }
  let duration=''
  if (props.movie.duration>=60){
    duration=parseInt(props.movie.duration/60)+'ч'+props.movie.duration%60+'м';
  }else{
    duration=props.movie.duration+'м';
  }
  return(
    <div className="element">
       <a className="element__link" href={props.movie.trailer} target='_blank'><img className="element__img" src={`https://api.nomoreparties.co${props.movie.image.url}`} alt='Неотрисовавшаяся картинка' /></a>
      <div className="element__caption">
        <h2 className="element__text">{props.movie.nameRU}</h2>
        <div className="element__section">
          <button className={cardLikeButtonClassName} onClick={()=>handleLikeClick(props)} id={props.movie.id} type="button" />
        </div>
      </div>
      <p className="element__duration">{duration}</p>
    </div>
  )
}