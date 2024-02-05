import React from 'react';
import { Link } from 'react-router-dom';

function Portfolio () {

  return (
    <section className="main__portfolio">
      <div className="main__container">
        <h3 className="main__portfolio_title">Портфолио</h3>
        <div className="main__portfolio_links">
          <a 
            className="main__portfolio_link"
            href="https://github.com/Ilya-Klementev/firsrt-project" 
            target="_blank" 
            rel="noopener noreferrer"
            >Статичный сайт
          </a>
          <a 
            className="main__portfolio_link"
            href="https://github.com/Ilya-Klementev/russian-travel" 
            target="_blank" 
            rel="noopener noreferrer"
            >Адаптивный сайт
          </a>
          <a 
            className="main__portfolio_link"
            href="https://github.com/Ilya-Klementev/react-mesto-api-full-gha" 
            target="_blank" 
            rel="noopener noreferrer"
            >Одностраничное приложение
          </a>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;