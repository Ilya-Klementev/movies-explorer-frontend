import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import { searchMovies, handleCheckedFilter } from '../../utils/searchUtil';
import { 
  SCREEN_SMALL, 
  SCREEN_MEDIUM, 
  SCREEN_LARGE, 
  COUNT_MOVIES_LARGE_SCREEN,
  COUNT_MOVIES_MEDIUN_SCREEN,
  COUNT_MOVIES_SMALL_SCREEN,
  ADD_MOVIE_LARGE_SCREEN,
  ADD_MOVIE_MEDIUN_SCREEN,
  ADD_MOVIE_SMALL_SCREEN,
} from '../../utils/constants';

function Movies({ 
    options, 
    onSaveMovie, 
    getSavedMovies, 
    onDeleteMovie, 
    handleGetAllMovies, 
    isPreloader, 
    isTextError, 
    searchQuery,
    setSearchQuery,
    isChecked,
    setIsChecked,
    stateSearchedMovies,
    setAllSearchedMovies,
    allSearchedMovies,
    allUpdatedMovies,
  }) 
{
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [isFirstRenderMovies , setIsFirstRenderMovies] = useState(0);
  const [isCountDisplayedMovies, setIsCountDisplayedMovies] = useState(0);
  const [isCountAddedMovies, setIsCountAddedMovies] = useState(stateSearchedMovies.isCountAddedMovies);
  const [isFirstSubmitProgress, setIsFirstSubmitProgress] = useState(false); 

  //шапка, подвал, цвет шапки
  useEffect(() => {
    options(true, true, true);
  }, [options]);

  //получаем сохраненные фильмы и состояние поиска и переключателя
  useEffect(() => {
    if (stateSearchedMovies.isSavedMoviesFetched === false ) {
      getSavedMovies();
      stateSearchedMovies.isSavedMoviesFetched = true;
    }
    setSearchQuery(stateSearchedMovies.lastQuery);
    setIsChecked(stateSearchedMovies.isChecked);
  }, []);

  function savedSearchInLocalStorage(isChecked, searchQuery) {
    stateSearchedMovies.lastSearchedMovies = 
    handleCheckedFilter(
      isChecked,
      searchMovies(searchQuery, stateSearchedMovies.allMovies)
    );
    setAllSearchedMovies(stateSearchedMovies.lastSearchedMovies);
    localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
  }

  function onCheckChange (isChecked) {
    if (stateSearchedMovies.isAllMoviesFetched === true) {
      savedSearchInLocalStorage(isChecked, stateSearchedMovies.lastQuery);
    }
  }

  //обновление локал сторадж, при изменении переменных
  useEffect(() => {
      stateSearchedMovies.isCountAddedMovies = isCountAddedMovies;
      setIsCountDisplayedMovies(isFirstRenderMovies + isCountAddedMovies);
      localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
  }, [isCountDisplayedMovies, stateSearchedMovies, isCountAddedMovies, isFirstRenderMovies]);

  //submit 
  function handleSubmitSearch(searchQuery, isChecked) {
    stateSearchedMovies.lastQuery = searchQuery;
    stateSearchedMovies.isChecked = isChecked;
    stateSearchedMovies.isCountAddedMovies = 0;
    localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
    setIsCountAddedMovies(0);
    if (stateSearchedMovies.isAllMoviesFetched === true) {
      savedSearchInLocalStorage(isChecked, searchQuery);
    } else {
      setIsFirstSubmitProgress(true);
      handleGetAllMovies();
    };
  }

  useEffect(()=>{
    stateSearchedMovies = JSON.parse(localStorage.getItem('stateSearchedMovies'));
    if (stateSearchedMovies.isAllMoviesFetched === false && isFirstSubmitProgress === true) {
      stateSearchedMovies.allMovies = allUpdatedMovies;
      stateSearchedMovies.isAllMoviesFetched = true; 
      searchingMovies(stateSearchedMovies.lastQuery, stateSearchedMovies.isChecked);
      localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
    } if (stateSearchedMovies.lastQuery !== '') {
      savedSearchInLocalStorage(stateSearchedMovies.isChecked, stateSearchedMovies.lastQuery)
    }
  },[allUpdatedMovies]);

  function searchingMovies(searchQuery, isChecked) {
    stateSearchedMovies.isChecked = isChecked;
    savedSearchInLocalStorage(isChecked, searchQuery)
    setIsFirstSubmitProgress(false);
  }

  //добавление новых карточек фильмов
  function addMoreCard() {
    if (windowWidth >= SCREEN_SMALL && windowWidth < SCREEN_MEDIUM) {
      setIsCountAddedMovies(prevCount => prevCount + ADD_MOVIE_SMALL_SCREEN);
    } else if (windowWidth >= SCREEN_MEDIUM && windowWidth < SCREEN_LARGE) {
      setIsCountAddedMovies(prevCount => prevCount + ADD_MOVIE_MEDIUN_SCREEN);
    } else if (windowWidth >= SCREEN_LARGE) {
      setIsCountAddedMovies(prevCount => prevCount + ADD_MOVIE_LARGE_SCREEN);
    }
  }

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
    
      if (windowWidth >= SCREEN_SMALL && windowWidth < SCREEN_MEDIUM) {
        setIsFirstRenderMovies(COUNT_MOVIES_SMALL_SCREEN);
      } else if (windowWidth >= SCREEN_MEDIUM && windowWidth < SCREEN_LARGE) {
        setIsFirstRenderMovies(COUNT_MOVIES_MEDIUN_SCREEN);
      } else if (windowWidth >= SCREEN_LARGE) {
        setIsFirstRenderMovies(COUNT_MOVIES_LARGE_SCREEN);
      }
      
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeoutId);
      };
    }
  }, [windowWidth, location.pathname]);

  const propsCardList = {
    movies: allSearchedMovies,
    error: isTextError,
    isCountDisplayedMovies: isCountDisplayedMovies,
    onAddCards: addMoreCard,
    onSaveMovie: onSaveMovie,
    onDeleteMovie: onDeleteMovie,
    stateSearchedMovies: stateSearchedMovies,
  };

  const propsSearchForm = {
    onSubmit: handleSubmitSearch,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    isChecked: isChecked,
    setIsChecked: setIsChecked,
    onCheckChange: onCheckChange,
    stateSearchedMovies: stateSearchedMovies,
    isPreloader: isPreloader,
  };

  return (
    <div className="movies">
      <SearchForm { ...propsSearchForm } ></SearchForm>
      {isPreloader ? <Preloader></Preloader> : ''}
      <MoviesCardList { ...propsCardList } ></MoviesCardList>
    </div>
  );
}

export default Movies;
