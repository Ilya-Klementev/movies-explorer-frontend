import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation'

function Header({ darkHeaderBackground, loggedIn } ) {
  const navigate = useNavigate();

  function goToMainPage() {
    navigate('/');
  }

   return (
    <header className={`header ${ darkHeaderBackground && "header__darkmode"}`}>
      <div className={`header__container`}>
        <img 
          className="header__logo" 
          onClick={goToMainPage}
          src={ require('../../images/logo.svg').default } 
          alt="Логотип Фильмы"
        />
        <Navigation 
          darkHeaderBackground={darkHeaderBackground}
          loggedIn={loggedIn}>
        </Navigation>
      </div>
    </header>
  );
}

export default Header;
