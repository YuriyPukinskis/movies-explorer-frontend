import React from 'react';
import { useState } from 'react';

export default function Card(props){
 
  
  const [like,setLike]=useState(false);
  function handleLikeClick(props) {
    // props.onCardLike(props.card);
    setLike(!like);
  } 
  
  return(
    <div className="element">
      <img className="element__img" src={props.movie.link} alt='Неотрисовавшаяся картинка' />
      <div className="element__caption">
        <h2 className="element__text">{props.movie.name}</h2>
        <div className="element__section">
          <button className={ `element__button ${like?'element__button_liked':''}`} onClick={()=>handleLikeClick(props)} type="button" />
        </div>
      </div>
      <p className="element__duration">{props.movie.length}</p>
    </div>
  )
}