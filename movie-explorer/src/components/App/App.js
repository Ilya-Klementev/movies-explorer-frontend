import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { api } from '../../utils/MainApi.js';
import './App.css';

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [darkBackground, setDarkBackground] = useState(true);
  const [loggedIn, setloggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);

  //шапка, подвал, цвет шапки
  const options = (setHeader, setFooter, setBackground) => {
    setShowHeader(setHeader);
    setShowFooter(setFooter);
    setDarkBackground(setBackground);
  };

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  function handleRegistration(data) {
    api
      .registration(data)
      .then(() => {
        handleAuthorization(data);
        setServerErrorMessage('');
      })
      .catch((err) => {
        console.log(`Ошибка регистрации пользователя: ${err}`);
        setServerErrorMessage(err);
      });
  }
  
  function handleAuthorization (data) {
    const { name, ...dataWithoutName } = data;
    api
      .authorization({ ...dataWithoutName })
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        api.setHeadersAuth(token);
        handleTokenCheck();
        setServerErrorMessage('');
      })
      .catch((err) => {
        console.log(`Ошибка авторизации пользователя: ${err}`);
        setServerErrorMessage(err);
      });
  }

  function handleTokenCheck() { 
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getUser(jwt)
        .then((userData) => {
          setloggedIn(true);
          setCurrentUser(userData);
          setServerErrorMessage('');
        })
        .catch((err) => {
          console.log(`Ошибка при проверке токена: ${err}`);
          setServerErrorMessage(err);
          handleLogout();
        });
    }
  }

  function handlePatchProfile(newUserData) {
    api
      .patchUserProfile(newUserData)
      .then((userData) => {
        const { _id, ...dataWithoutId } = userData;
        setCurrentUser(dataWithoutId);
        setServerErrorMessage('Данные успешно обновлены!');
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных пользователя: ${err}`);
        setServerErrorMessage(err);
      });
  }

  function handleLogout(goToSignIn) {
    api
      .signOut()
      .then(() => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('stateSearchedMovies');
        setloggedIn(false);
        goToSignIn();
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('jwt');
        localStorage.removeItem('stateSearchedMovies');
        setloggedIn(false);
        goToSignIn();
      });
  }

  function handleSaveMovie(movie) {
    api
      .saveMovie(movie)
      .then((data) => setSavedMovies([data, ...savedMovies]))
      .catch((err) => {
        console.log(`Ошибка при сохранении фильма: ${err}`);
      });
  }

  function getSavedMovies() {
    api
      .getSavedMovies()
      .then((dataMovies) => {
        setSavedMovies(dataMovies);
      })
      .catch((err) => {
        console.log(`Ошибка при получении сохраненных фильмов: ${err}`);
      });
  }

  function handleDeleteMovie(movie) {
    api
      .deleteMovie( movie )
      .then(
        setSavedMovies((state) => state.filter((m) => m._id !== movie._id))
      )
      .catch((err) => {
        console.log(`Ошибка при удалении фильма: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <BrowserRouter>
          {showHeader && <Header darkHeaderBackground={darkBackground} loggedIn={loggedIn} />}
          <Routes>
            <Route path="/" element={<Main options={options} />} />
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Login
                    onSubmit={handleAuthorization}
                    options={options}
                    serverErrorMessage={serverErrorMessage}
                  />
                )
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Register
                    onSubmit={handleRegistration}
                    options={options}
                    serverErrorMessage={serverErrorMessage}
                  />
                )
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute 
                  Component={ Movies } 
                  options={ options } 
                  loggedIn={ loggedIn } 
                  onSaveMovie={ handleSaveMovie }
                  getSavedMovies={getSavedMovies}
                  savedMovies={ savedMovies }
                  onDeleteMovie={handleDeleteMovie}
                  />}
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute 
                  Component={ SavedMovies } 
                  options={ options } 
                  loggedIn={ loggedIn } 
                  onDeleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  Component={Profile}
                  options={options}
                  loggedIn={loggedIn}
                  onSubmit={handlePatchProfile}
                  serverErrorMessage={serverErrorMessage}
                  onLogout={handleLogout}
                />
              }
            />
            <Route path="*" element={<PageNotFound options={options} />} />
          </Routes>
          {showFooter && <Footer />}
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
