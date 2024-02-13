import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import validator from 'validator';

function Profile({ options, onSubmit, serverErrorMessage, onLogout }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const [isEdited, setIsEdited] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isVisibledError, setIsVisibledError] = useState(true);

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

  //состояние шапки, подвала и фона шапки
  useEffect(() => {
    options(true, false, true);
  }, [options, currentUser]);

  //если currentUser имеется, то присваеваем его значение стейт переменным имя и емэйл
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  // активация/деактивация кнопки сабмита
  useEffect(() => {
  if (
    (currentUser &&
    currentUser.name === name &&
    currentUser.email === email) ||
    isNameDirty ||
    isEmailDirty
  ) {
    setIsSubmitDisabled(true);
  } else {
    setIsSubmitDisabled(false);
  }
  }, [currentUser, name, email, isNameDirty, isEmailDirty, isSubmitDisabled]);

  //переключение из кнопки редактировать в сохранить
  function toggleIsEdited(e) {
    e.preventDefault();
    setIsEdited(true);
  }
  
  useEffect(() => {
    if (isEdited) {
      nameInputRef.current.focus();
    }
  }, [isEdited]);

  function handleSubmit (e) {
    e.preventDefault();
    onSubmit({ name, email })
    setName(currentUser.name);
    setEmail(currentUser.email);
    setIsEdited(false);
    setIsVisibledError(true);
  }

  function goToSignIn() {
    navigate('/signin');
  }

  function handleLogout() {
    onLogout(goToSignIn);
  }
  
  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>  
      <form className="profile__form" onSubmit={ handleSubmit } noValidate>
        <div className="profile__form_container">
          <div className="profile__input_container">
            <span className="profile__input_span">Имя</span>
            <input 
              className="profile__input" 
              type="text" 
              name="name"
              value={ name } 
              onChange={ handleName }
              disabled={!isEdited}
              ref={ nameInputRef }
              minLength="2"
              maxLength="30">
            </input>
          </div>
          <span className="profile__error_input">{ errorName }</span>
          <div className="profile__input_container">
            <span className="profile__input_span">E-mail</span>
            <input 
              className="profile__input" 
              type="email" 
              name="email"
              value={ email } 
              ref={ emailInputRef }
              onChange={ handleEmail }
              disabled={!isEdited}>
            </input>
          </div>
          <span className="profile__error_input">{ errorEmail }</span>
        </div>
        {!isEdited ? (
        <div className="profile__buttons_conteiner">
          {isVisibledError && <span className="profile__error_server">{serverErrorMessage}</span>}
          <button 
            className="profile__form_edit" 
            onClick={ toggleIsEdited }
            >Редактировать
          </button>
          <button className="profile__logout" onClick={ handleLogout }>Выйти из аккаунта</button>
        </div>
        ) : (
         <div className="profile__buttons_conteiner">
          {isVisibledError && <span className="profile__error_server">{serverErrorMessage}</span>}
          <button 
            className={`profile__submit ${isSubmitDisabled && "profile__submit_disabled"}`}
            type="submit"
            disabled = {isSubmitDisabled}
            >Сохранить
          </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default Profile;
