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
import { apiMovies } from '../../../src/utils/MoviesApi';
import { errorMessages, successMessages } from '../../utils/messages.js';
import { editingMoviesObjects } from '../../utils/editMovieData.js';
import './App.css';

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [darkBackground, setDarkBackground] = useState(true);
  const [isTokenTrue, setIsTokenTrue] = useState(localStorage.getItem("jwt"));
  const [loggedIn, setloggedIn] = useState(isTokenTrue);
  const [currentUser, setCurrentUser] = useState({});
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isPreloader, setIsPreloader] = useState(false);
  const [isTextError, setIsTextError] = useState('');
  const [allSearchedMovies, setAllSearchedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isRequestProgress, setIsRequestProgress] = useState(false);
  
  const stateSearchedMovies = JSON.parse(localStorage.getItem('stateSearchedMovies')) || { 
    allMovies: [], 
    isAllMoviesFetched: false,
    isSavedMoviesFetched: false,
    lastSearchedMovies: [], 
    isChecked: false, 
    lastQuery: '',
    isCountAddedMovies: 0,
  };
  const [allUpdatedMovies, setAllUpdatedMovies] = useState(stateSearchedMovies.allMovies);

  //шапка, подвал, цвет шапки
  const options = (setHeader, setFooter, setBackground) => {
    setShowHeader(setHeader);
    setShowFooter(setFooter);
    setDarkBackground(setBackground);
  };

  useEffect(() => {
    handleTokenCheck();
    console.log(loggedIn);
  }, [loggedIn]);

  function handleRegistration(data) {
    setIsRequestProgress(true);
    api
      .registration(data)
      .then(() => {
        handleAuthorization(data);
        setServerErrorMessage('');
      })
      .catch((err) => {
        console.log(`${ errorMessages.regError }${ err }`);
        setServerErrorMessage(err);
      })
      .finally(() => setIsRequestProgress(false));
  }
  
  function handleAuthorization (data) {
    setIsRequestProgress(true);
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
        console.log(`${ errorMessages.authError }${ err }`);
        setServerErrorMessage(err);
      })
      .finally(() => setIsRequestProgress(false));
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
          console.log(`${ errorMessages.tokenError }${ err }`);
          setServerErrorMessage(err);
          handleLogout();
        });
    }
  }

  function handlePatchProfile(newUserData) {
    setIsRequestProgress(true);
    api
      .patchUserProfile(newUserData)
      .then((userData) => {
        const { _id, ...dataWithoutId } = userData;
        setCurrentUser(dataWithoutId);
        setServerErrorMessage(successMessages.patchProfileSuccess);
      })
      .catch((err) => {
        console.log(`${ errorMessages.patchProfileError }${ err }`);
        setServerErrorMessage(err);
      })
      .finally(() => setIsRequestProgress(false));
  }

  function handleLogout(goToMainPage) {
    api
      .signOut()
      .then(() => {
        localStorage.clear();
        setloggedIn(false);
        goToMainPage();
        window.location.reload(true); // добавил на всякий случай. это по поводу кнопки "еще". 
                                      //просто у меня проблему воспроизвести не получилось. может это КЭШ, подумал я.
      })
      .catch((err) => {
        console.log(`${ errorMessages.signOutError }${ err }`);
        localStorage.clear();
        setloggedIn(false);
        goToMainPage();
        window.location.reload(true); 
      });
  }

  function getAllMovies() {
    setIsPreloader(true);
    setIsRequestProgress(true);
    apiMovies
      .getMovies()
      .then((movies) => {
        setIsTextError('');
        const updatedMovies = editingMoviesObjects(movies);
        setAllUpdatedMovies(prevMovies => {
          const uniqueMovies = updatedMovies.filter(newMovie => 
            !prevMovies.some(existingMovie => existingMovie.movieId === newMovie.movieId)
          );
          return [...prevMovies, ...uniqueMovies];
        });
      })
      .catch((err) => {
        console.log(`${ errorMessages.getMoviesError }${ err }`);
        setIsTextError( errorMessages.serverErrorForUser )
      })
      .finally(() => {
        setIsPreloader(false)
        setIsRequestProgress(false);
      })
  }

  function getSavedMovies() {
    api
      .getSavedMovies()
      .then((dataMovies) => {
        setAllUpdatedMovies(dataMovies);
        stateSearchedMovies.allMovies = dataMovies;
        stateSearchedMovies.isSavedMoviesFetched = true;
        localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
      })
      .catch((err) => {
        console.log(`${ errorMessages.getSavedMoviesError }${ err }`);
      });
  }

  function handleSaveMovie(mov) {
    delete mov._id;
    delete mov.owner;
    api
      .saveMovie(mov)
      .then((movie) => {
        stateSearchedMovies.allMovies = stateSearchedMovies.allMovies.map((m) => {
          if (m.movieId === movie.movieId) {
            m._id = movie._id;
          }
          return m;
        })
        localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
        setAllUpdatedMovies(stateSearchedMovies.allMovies);
      })
      .catch((err) => {
        console.log(`${ errorMessages.saveMovieError }${ err }`);
    });
  }

  function handleDeleteMovie(movie) {
    api
      .deleteMovie( movie )
      .then(()=> {
        stateSearchedMovies.allMovies = stateSearchedMovies.allMovies.map((m) => {
          if (m.movieId === movie.movieId) {
            return { ...m, _id: null };
          }
          return m;
        });
        localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
        setAllUpdatedMovies(stateSearchedMovies.allMovies);
      })
      .catch((err) => {
        console.log(`${errorMessages.deleteMovieError}${ err }`);
    });
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <BrowserRouter>
          {showHeader && <Header darkHeaderBackground={ darkBackground } loggedIn={ loggedIn } />}
          <Routes>
            <Route path="/" element={<Main options={ options } />} />
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Login
                    onSubmit={ handleAuthorization }
                    options={ options }
                    serverErrorMessage={ serverErrorMessage }
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
                    onSubmit={ handleRegistration }
                    options={ options }
                    serverErrorMessage={ serverErrorMessage }
                  />
                )
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute 
                  element={ Movies } 
                  options={ options } 
                  loggedIn={ loggedIn } 
                  onSaveMovie={ handleSaveMovie }
                  getSavedMovies={ getSavedMovies }
                  onDeleteMovie={ handleDeleteMovie }
                  handleGetAllMovies={ getAllMovies }
                  isPreloader={ isPreloader }
                  isTextError={ isTextError }
                  searchQuery={ searchQuery }
                  setSearchQuery={ setSearchQuery }
                  isChecked={ isChecked }
                  setIsChecked={ setIsChecked }
                  stateSearchedMovies={ stateSearchedMovies}
                  allSearchedMovies={ allSearchedMovies }
                  setAllSearchedMovies={ setAllSearchedMovies }
                  allUpdatedMovies={ allUpdatedMovies }
                />}
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute 
                  element={ SavedMovies } 
                  options={ options } 
                  loggedIn={ loggedIn } 
                  onDeleteMovie={ handleDeleteMovie }
                  allUpdatedMovies={ allUpdatedMovies }
                  searchQuery={ searchQuery }
                  setSearchQuery={ setSearchQuery }
                  isChecked={ isChecked }
                  setIsChecked={ setIsChecked }
                  stateSearchedMovies={ stateSearchedMovies }
                  getSavedMovies={ getSavedMovies }
                  isPreloader={ isPreloader }
                />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={ Profile }
                  options={ options }
                  loggedIn={ loggedIn }
                  onSubmit={ handlePatchProfile }
                  serverErrorMessage={ serverErrorMessage }
                  onLogout={ handleLogout }
                  isRequestProgress={ isRequestProgress }
                />
              }
            />
            <Route path="*" element={<PageNotFound options={ options } />} />
          </Routes>
          {showFooter && <Footer />}
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
