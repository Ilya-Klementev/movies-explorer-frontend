import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import validator from 'validator';

function AuthForm( props ) {
  const { title, isName, submitText, spanLink, linkTo, link, onSubmit, serverErrorMessage } = props;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isNameDirty, setIsNameDirty] = useState(true);
  const [isEmailDirty, setIsEmailDirty] = useState(true);
  const [isPasswordDirty, setIsPasswordDirty] = useState(true);
  const [isVisibledError, setIsVisibledError] = useState(false);

  useEffect(() => {
    setIsVisibledError(false);
  }, []);
  
  function handleName(e) {
    setName(e.target.value);
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    if (!nameRegex.test(e.target.value)) {
      setIsNameDirty(true);
      setErrorName('Имя может содержать только латиницу, кириллицу, пробел или дефис');
    } else if (e.target.value.length < 2 || e.target.value.length > 30) {
      setIsNameDirty(true);
      setErrorName('Длина имени должна быть от 2 до 30 символов');
    } else {
      setIsNameDirty(false);
      setErrorName('');
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    if (validator.isEmail(e.target.value)) {
      setIsEmailDirty(false);
      setErrorEmail ('');
    } else {
      setIsEmailDirty(true);
      setErrorEmail ('Введите корректный адрес e-mail');
    }
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    if (e.target.value.length < 4) {
      setIsPasswordDirty(true);
      setErrorPassword ('Длина пароля от 4-х символов');
    } else {
      setErrorPassword ('');
      setIsPasswordDirty(false);
    }
  }

  useEffect(()=>{
    if (!isName) {
      setIsNameDirty(false);
    }
  }, [isName]);

  useEffect(() =>{
    if(!isNameDirty && !isEmailDirty && !isPasswordDirty) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isNameDirty, isEmailDirty, isPasswordDirty]);


  function goToMainPage() {
    navigate('/');
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, email, password });
    setIsVisibledError(true);
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
        <h1 className="regisler__header_title">{ title }</h1>
      </div>
      <form className="auth__form" onSubmit={ handleSubmit } noValidate>
        <div className="auth__inputs_container">
          { isName && (
          <>
            <span className="auth__form_span">Имя</span>
            <input 
              name="name"
              onChange={handleName}
              className="auth__form_input" 
              type="text"
              required
            ></input>
            <span className="auth__form_error">{ errorName }</span> 
          </>)}
          <span className="auth__form_span">E-mail</span>
          <input 
            name="email"
            onChange={handleEmail}
            className="auth__form_input" 
            type="email" 
            required
          ></input>
          <span className="auth__form_error">{ errorEmail }</span>
          <span className="auth__form_span">Пароль</span>
          <input 
            name="password"
            onChange={handlePassword}
            className="auth__form_input" 
            type="password" 
            required
          ></input>
          <span className="auth__form_error">{ errorPassword }</span>
        </div>
        <div className="auth__buttons_container">
          {isVisibledError && <span className="auth__form_server-error">{serverErrorMessage}</span>}
          <button 
            className={`auth__form_submit ${isButtonDisabled && 'auth__form_submit-disabled'}`}
            type="submit"
            disabled={isButtonDisabled}
            >{ submitText }
          </button>
          <span className="auth__buttons_span">
            { spanLink }
            <NavLink 
              className="auth__buttons_link"
              to={ linkTo }
              >{ link }
            </NavLink>
          </span>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
