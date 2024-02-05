import React from 'react';

function AboutMe () {

  return (
    <section className="main__aboutme">
      <div className="main__container">
        <h2 className="main__title main__aboutme_title">Студент</h2>
        <div className="main__aboutme_container">
          <div className="main__aboutme_information">
            <h3 className="main__aboutme_name">Виталий</h3>
            <h4 className="main__aboutme_profession">Фронтенд-разработчик, 30 лет</h4>
            <p className="main__aboutme_history">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня 
              есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
              начал кодить. С&nbsp;2015 года работал в компании «СКБ Контур». После того, 
              как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и 
              ушёл с постоянной работы.
            </p>
            <a 
              className="main__aboutme_gitlink" 
              href="https://github.com/Ilya-Klementev" 
              target="_blank" 
              rel="noopener noreferrer"
              >Github
            </a>
          </div>
          <img 
            className="main__aboutme_photo" 
            src={ require('../../../images/photo.svg').default } 
            alt="Фотография студента"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;