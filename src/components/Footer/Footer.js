import React from 'react';

export default function Main() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div class="footer__dateAndLinks">
        <p className="footer__year">&copy; 2021</p>
        <div className="footer__links">
          <a className="footer__link" href="https://praktikum.yandex.ru/">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/YuriyPukinskis?tab=repositories">GitHub</a>
        </div>
      </div>
    </footer>
  );
}