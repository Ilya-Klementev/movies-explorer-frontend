import React from 'react';

function Footer() {

  return (
    <header className="footer">
      <div className="footer__container">
        <div className="footer__container_upperblock">
          <h3 className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        </div>
        <div className="footer__container_lowerblock">
          <p className="footer__copyrait">© 2024</p>
          <div className="footer__links">
            <a 
              className="footer__link"
              href="https://practicum.yandex.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              >Яндекс.Практикум
            </a>
            <a 
              className="footer__link"
              href="https://github.com/Ilya-Klementev/" 
              target="_blank" 
              rel="noopener noreferrer"
              >Github
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Footer;
