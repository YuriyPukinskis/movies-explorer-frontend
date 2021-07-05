import React from 'react';
import arrow from '../../images/arrow.png';
import avatar from '../../images/avatar.jpg';

export default function Main( props) {
  props.setIsMain(true);
  props.setIsProfile(false);
  props.setIsSavedMovie(false);
  props.setIsMovie(false);
  return (
    <div className={`main`}>
      <div className="main__promo">
        <p className="main__title">Учебный проект студента факультета Веб-разработки.</p>
      </div>

      <div className="main__navTab">
        <div className="navTab__container">
          <a className="main__link" href="#about">О проекте</a>
          <a className="main__link" href="#tech">Технологии</a>
          <a className="main__link" href="#student">Студент</a>
        </div>
      </div>

      <div className="main__aboutProject" id="about">
        <h2 className="main__block"><p className='main__caption'>О проекте</p></h2>
        <div className="aboutProject__block">
          <div className="aboutProject__statement aboutProject__statement_first">
            <h3 className="aboutProject__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки</p>
          </div>
          <div className="aboutProject__statement aboutProject__statement_second">
            <h3 className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="aboutProject__text">У каждого этапа был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="aboutProject__line">
          <div className="aboutProject__first">
            <p className="aboutProject__greenBlock">1 неделя</p>
            <p className="aboutProject__greenCaption">Back-end</p>
          </div>
          <div className="aboutProject__second">
            <p className="aboutProject__greyBlock">4 недели</p>
            <p className="aboutProject__greyCaption">Front-end</p>
          </div>
        </div>
      </div>

      <div className="main__techs" id="tech">
        <h2 className="techs__block"><p className='techs__blockTitle'>Технологии</p></h2>
        <p className="techs__title">7 технологий</p>
        <div className="techs__caption"><p className='techs__text'>На курсе веб-разраболтки мы освоили технологии, которые применили в дипломном проекте.</p></div>
        <div className="techs__container">
          <p className="techs__elem">HTML</p>
          <p className="techs__elem">CSS</p>
          <p className="techs__elem">JS</p>
          <p className="techs__elem">React</p>
          <p className="techs__elem">Git</p>
          <p className="techs__elem">Express.js</p>
          <p className="techs__elem">MongoDB</p>
        </div>
      </div>

      <div className="main__aboutMe" id="student">
        <h2 className="main__block"><p className='main__caption'>Студент</p></h2>
        <div className="aboutMe__container">
          <div className="aboutMe__text">
            <h3 className="aboutMe__name">Юрий</h3>
            <h4 className="aboutMe__occupation">Фронтенд-разработчик(?) 26 лет</h4>
            <p className="aboutMe__caption">Немного слов обо мне, чтоб проверить, верно ли работает перенос, ширина и прочие параметры</p>
            <div className="aboutMe__links">
              <a className="aboutMe__link" href="https://github.com/YuriyPukinskis?tab=repositories">GitHub</a>
            </div>
          </div>
          <img className="aboutMe__picture" src={avatar} alt='avatar'/>
        </div>
      </div>

      <div className="main__portfolio">
        <h2 className="portfolio__block"><p className='portfolio__blockCaption'>Портфолио</p></h2>
        <div className="portfolio__container">
          <a className="portfolio__elem" href="https://github.com/YuriyPukinskis?tab=repositories">
            <p className="portfolio__caption">Статичный сайт</p>
            <img className="portfolio__img" alt='arrow' src={arrow} />
          </a>
          <a className="portfolio__elem" href="https://github.com/YuriyPukinskis?tab=repositories">
            <p className="portfolio__caption">Адаптивный сайт</p>
            <img className="portfolio__img" alt='arrow' src={arrow} />
          </a>
          <a className="portfolio__elem" href="https://github.com/YuriyPukinskis?tab=repositories">
            <p className="portfolio__caption">Одностраничное приложение</p>
            <img className="portfolio__img" alt='arrow' src={arrow} />
          </a>
        </div>
      </div>
    </div>
  );
}
