import React from 'react';

function AboutProject ( { refProps }) {

  return (
    <section className="main__project" ref={ refProps }>
      <div className="main__container">
        <h2 className="main__title">О проекте</h2>
        <div className="main__project_about">
          <div className="main__project_descriptions">
            <h3 className="main__project_subtitle">
              Дипломный проект включал 5 этапов
            </h3> 
            <p className="main__project_explanation">
              Составление плана, работу над бэкендом, вёрстку, 
              добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="main__project_descriptions">
            <h3 className="main__project_subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="main__project_explanation">
              У каждого этапа был мягкий и жёсткий дедлайн, которые 
              нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="main__project_table">
          <div className="main__project_week">1 неделя</div>
          <div className="main__project_mouth">4 недели</div>
          <div className="main__project_work">Back-end</div>
          <div className="main__project_work">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
