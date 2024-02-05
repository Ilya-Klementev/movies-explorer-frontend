import React from 'react';

function Techs () {

  return (
    <section className="main__techs">
      <div className="main__container">
        <h2 className="main__title main__techs_title">Технологии</h2>
        <h3 className="main__techs_bigtitle">7 технологий</h3>
        <p className="main__techs_subtitle">
          На курсе веб-разработки мы освоили технологии, 
          которые применили в дипломном проекте.
        </p>
        <div className="main__techs_container">
          <article className="main__techs_element">HTML</article>
          <article className="main__techs_element">CSS</article>
          <article className="main__techs_element">JS</article>
          <article className="main__techs_element">React</article>
          <article className="main__techs_element">Git</article>
          <article className="main__techs_element">Express.js</article>
          <article className="main__techs_element">mongoDB</article>
        </div>
      </div>
    </section>
  );
}

export default Techs;