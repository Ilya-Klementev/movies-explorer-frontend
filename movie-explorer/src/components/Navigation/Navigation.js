import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

function Navigation({ darkHeaderBackground, loggedIn } ) {
  const navigate = useNavigate();
  const location = useLocation();
  const profileName = 'Аккаунт';
  const [navActive, setNavActive] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);

  const toggleNavMenu = () => {
    setNavActive(!navActive);
  };

  const closeNavMenu = () => {
    setNavActive(false);
  }

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeNavMenu();
      }
    };

    if (navActive) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [navActive]);

  function goToProfilePage() {
    setNavActive(false);
    navigate('/profile');
  }

  function goToSignInPage() {
    navigate('/signin');
  }

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/profile') {
      setIsProfileActive(true);
    } else {
      setIsProfileActive(false);
    }
  }, [location.pathname]);

   return (
    loggedIn ? (
    <>
      <div 
        className={ `${ navActive && "navigation__background_active" }` } 
        onClick={ toggleNavMenu }
      ></div>
      <div className={ `header__container navigation__container_logged ${ navActive && "navigation__container_nav-menu_active" }` }>
        <button className="navigation__nav-menu_close" onClick={ closeNavMenu }></button>
        <nav className={ `navigation__nav-links-container ${ navActive && "navigation__nav-links-container_active" }` }>
          { navActive && <NavLink 
            to="/" 
            className={ ({ isActive }) => 
              `navigation__nav-links navigation__nav-links_main 
              ${ isActive ? "navigation__nav-link_active" : "" }`
            }
            onClick={closeNavMenu}
            >Главная</NavLink> }
          <NavLink 
            to="/movies" 
            className={ ({ isActive }) => 
              `navigation__nav-links ${ isActive ? "navigation__nav-link_active" : ""}`
            }
            onClick={closeNavMenu}
            >Фильмы</NavLink>            
          <NavLink 
            to="/saved-movies" 
            className={({ isActive }) => 
              `navigation__nav-links ${isActive ? "navigation__nav-link_active" : ""}`
            }
            onClick={closeNavMenu}
            >Сохраненные фильмы</NavLink>
        </nav>
        <button className={
          `header__container navigation__container_profile ${isProfileActive ? "navigation__nav-link_active" : ""}`
        }
          onClick={goToProfilePage}>{ profileName }
          <img className={`navigation__profile_icon ${darkHeaderBackground && "navigation__profile_icon-darkmode"}`}
            src={require('../../images/profile-icon.svg').default}
            alt="Иконка профиля">
          </img>
        </button>
      </div>
      <button 
        className={`navigation__nav-menu ${darkHeaderBackground && "navigation__nav-menu_darkmode"}`} onClick={toggleNavMenu}>
      </button>
    </>
    ) : ( 
    <div className="header__container navigation__unlogged">
      <NavLink 
        to="/signup" 
        className="navigation__unlogged_signup"
        >Регистация
      </NavLink>   
      <button className="navigation__unlogged_signin" onClick={goToSignInPage}>Войти</button>
    </div>
    )
  );
}

export default Navigation;
