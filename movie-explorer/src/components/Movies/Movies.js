import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { apiMovies } from '../../../src/utils/MoviesApi';
import Preloader from './Preloader/Preloader';
import { SCREEN_SMALL, SCREEN_MEDIUM, SCREEN_LARGE } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import { adressMoviesServer } from '../../utils/constants';
import { searchMovies, handleCheckedFilter } from '../../utils/searchUtil';


function Movies({ options, onSaveMovie, getSavedMovies, savedMovies, onDeleteMovie }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [allSearchedMovies, setAllSearchedMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isTextError, setIsTextError] = useState('');
  const [isResetValuesTrigger, setIsResetValuesTrigger] = useState(false);
  const [isInitialPage, setIsInitialPage] = useState(true);
  const [isFirstRenderMovies , setIsFirstRenderMovies] = useState(0);
  const [isCountAddedMovies, setIsCountAddedMovies] = useState(0);
  const [isCountDisplayedMovies, setIsCountDisplayedMovies] = useState(0);
  
  const stateSearchedMovies = JSON.parse(localStorage.getItem('stateSearchedMovies')) || { 
    allMovies: [], 
    LastSearchedMovies: [], 
    isChecked: false, 
    lastQuery: '',
    isCountAddedMovies: 0,
    isFirstRenderMovies: 0,
  };

  //получаем сохраненные фильмы
  useEffect(() => {
    getSavedMovies();
  }, []);


  //рендеринг карточек в зависимости от ширины страницы
  useEffect(() => {
    if (location.pathname === '/movies') {
      let timeoutId;
      const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const newWidth = window.innerWidth;
          setWindowWidth(newWidth);
        }, 100);
      };
    
      if (stateSearchedMovies.isFirstRenderMovies === 0) {
        if (windowWidth >= SCREEN_SMALL && windowWidth < SCREEN_MEDIUM) {
          setIsFirstRenderMovies(5);
        } else if (windowWidth >= SCREEN_MEDIUM && windowWidth < SCREEN_LARGE) {
          setIsFirstRenderMovies(8);
        } else if (windowWidth >= SCREEN_LARGE) {
          setIsFirstRenderMovies(12);
        }
      } 
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeoutId);
      };
    }
  }, [windowWidth, location.pathname, stateSearchedMovies.isFirstRenderMovies]);
  
  //шапка, подвал, цвет шапки
  useEffect(() => {
    options(true, true, true);
  }, [options]);

  //обновление локал сторадж, при изменении переменных
  useEffect(() => {
    stateSearchedMovies.isCountAddedMovies = isCountAddedMovies;
    stateSearchedMovies.isFirstRenderMovies = isFirstRenderMovies;
    setIsCountDisplayedMovies(isFirstRenderMovies + isCountAddedMovies);
    localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
  }, [isCountDisplayedMovies, stateSearchedMovies, isCountAddedMovies, isFirstRenderMovies]);

  //checkbox
  function handleCheckboxChange(isChecked) {
    if (allSearchedMovies) {
      setAllSearchedMovies(handleCheckedFilter(isChecked, stateSearchedMovies.LastSearchedMovies));
      stateSearchedMovies.isChecked = isChecked;
      localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
    }
  }

  //переназначение объектам массива movies свойств
  function editingMoviesObjects(movies) {
    return movies.map((movie) => {
      return {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${adressMoviesServer}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${adressMoviesServer}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id
      };
    });
  }
 
  // сабмит поиска
  function handleSubmitSearch(query, isChecked) {
    setIsResetValuesTrigger(!isResetValuesTrigger);
    setIsInitialPage(false);
    if (stateSearchedMovies.allMovies.length > 0) {
      const searchedMovies = searchMovies(query, stateSearchedMovies.allMovies);
      stateSearchedMovies.isChecked = isChecked;
      stateSearchedMovies.lastQuery = query;
      stateSearchedMovies.isFirstRenderMovies = 0;
      stateSearchedMovies.LastSearchedMovies = searchMovies(query, searchedMovies);
      localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
      setAllSearchedMovies(handleCheckedFilter(isChecked, searchedMovies));
    } else {
      setIsPreloader(true);
      apiMovies.getMovies()
        .then((movies) => {
          const updatedMovies = [...stateSearchedMovies.allMovies, ...editingMoviesObjects(movies)];
          stateSearchedMovies.allMovies = updatedMovies;
          stateSearchedMovies.isChecked = isChecked;
          stateSearchedMovies.lastQuery = query;
          stateSearchedMovies.isFirstRenderMovies = 0;
          stateSearchedMovies.LastSearchedMovies = searchMovies(query, updatedMovies);
          localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
          setAllSearchedMovies(handleCheckedFilter(isChecked, stateSearchedMovies.LastSearchedMovies));
          setIsTextError('');
        })
        .catch((err) => {
          console.log(`Ошибка получения фильмов ${err}`);
          setIsTextError(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          )
        })
        .finally(() => setIsPreloader(false))
    };
  }

  //добавление новых карточек фильмов
  function addMoreCard() {
    if (windowWidth >= SCREEN_SMALL && windowWidth < SCREEN_MEDIUM) {
      setIsCountAddedMovies(prevCount => prevCount + 5);
    } else if (windowWidth >= SCREEN_MEDIUM && windowWidth < SCREEN_LARGE) {
      setIsCountAddedMovies(prevCount => prevCount + 2);
    } else if (windowWidth >= SCREEN_LARGE) {
      setIsCountAddedMovies(prevCount => prevCount + 3);
    }
  }

  const propsCardList = {
    movies: allSearchedMovies,
    error: isTextError,
    isCountDisplayedMovies: isCountDisplayedMovies,
    isResetValuesTrigger: isResetValuesTrigger,
    isInitialPage: isInitialPage,
    onAddCards: addMoreCard,
    onSaveMovie: onSaveMovie,
    savedMovies: savedMovies,
    onDeleteMovie: onDeleteMovie,
  };

  const propsSearchForm = {
    onSubmit: handleSubmitSearch,
    stateChecked: stateSearchedMovies.isChecked,
    onCheckboxMovies: handleCheckboxChange,
  };

  return (
    <div className="movies">
      <SearchForm {...propsSearchForm} ></SearchForm>
      {isPreloader ? <Preloader></Preloader> : ''}
      <MoviesCardList {...propsCardList} ></MoviesCardList>
    </div>
  );
}

export default Movies;
