import React from 'react';

function Promo ({ scrollFunction }) {

  return (
    <section className="main__promo">
      <div className="main__promo_container">
        <div className="main__promo_titles">
          <h1 className="main__promo_title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="main__promo_subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button className="main__promo_button" onClick={ scrollFunction }>Узнать больше</button>
        </div>
        <img 
          className="main__promo_image" 
          src={ require('../../../images/globe.svg').default } 
          alt="Абстрактный глобус"/>
      </div>
    </section>
  );
}

export default Promo;
