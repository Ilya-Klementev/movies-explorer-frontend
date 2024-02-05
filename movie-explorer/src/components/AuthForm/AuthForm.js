import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function AuthForm( props ) {
  const navigate = useNavigate();

  function goToMainPage() {
    navigate('/');
  }

  return (
    <section className="auth">
      <div className="auth__header">
        <img 
          className="auth__header_logo" 
          onClick={ goToMainPage }
          src={ require('../../images/logo.svg').default } 
          alt="Логотип Фильмы"
        />
        <h1 className="regisler__header_title">{ props.title }</h1>
      </div>
      <form className="auth__form" onSubmit={ props.onSubmit }>
        <div className="auth__inputs_container">
          { props.name && (
          <>
            <span className="auth__form_span">Имя</span>
            <input 
              className="auth__form_input" 
              type="text" 
              required
            ></input>
            <span className="auth__form_error">Ошибка</span> 
          </>)}
          <span className="auth__form_span">E-mail</span>
          <input 
            className="auth__form_input" 
            type="email" 
            required
          ></input>
          <span className="auth__form_error">Ошибка</span>
          <span className="auth__form_span">Пароль</span>
          <input 
            className="auth__form_input" 
            type="password" 
            required
          ></input>
          <span className="auth__form_error">Ошибка</span>
        </div>
        <div className="auth__buttons_container">
          <span className="auth__form_server-error">Ошибка сервера</span>
          <button 
            className="auth__form_submit" 
            type="submit"
            >{ props.submit }
          </button>
          <span className="auth__buttons_span">
            { props.spanLink }
            <NavLink 
              className="auth__buttons_link"
              to={ props.linkTo }
              >{ props.link }
            </NavLink>
          </span>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
