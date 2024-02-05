import React, { useEffect, useState, useRef } from 'react';

function Profile({ options }) {
  const [isEdited, setIsEdited] = useState(false);
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');
  const nameInputRef = useRef(null);

  useEffect(() => {
    options(true, false, true);
  }, [options]);

  function toggleIsEdited(e) {
    e.preventDefault();
    setIsEdited(!isEdited);
  }
  
  useEffect(() => {
    if (isEdited) {
      nameInputRef.current.focus();
    }
  }, [isEdited]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>  
      <form className="profile__form">
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
              maxLength="40">
            </input>
          </div>
          <div className="profile__input_container">
            <span className="profile__input_span">E-mail</span>
            <input 
              className="profile__input" 
              type="email" 
              name="email"
              value={ email } 
              onChange={ handleEmail }
              disabled={!isEdited}
              minLength="2"
              maxLength="50">
            </input>
          </div>
        </div>
        {!isEdited ? (
        <div className="profile__buttons_conteiner">
          <button 
            className="profile__form_edit" 
            onClick={ toggleIsEdited }
            >Редактировать
          </button>
          <button className="profile__logout">Выйти из аккаунта</button>
        </div>
        ) : (
         <div className="profile__buttons_conteiner">
          <span className="profile__error">При обновлении профиля произошла ошибка.</span>
          <button 
            className="profile__submit" // profile__submit_disabled
            type="submit"
            onClick= { toggleIsEdited }
            >Сохранить
          </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default Profile;
