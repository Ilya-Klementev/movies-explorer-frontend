import React, { useEffect, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { searchMovies, handleCheckedFilter } from '../../utils/searchUtil';

function SavedMovies( props ) {
  const { 
    options, 
    onDeleteMovie,
    searchQuery,
    setSearchQuery,
    stateSearchedMovies,
    getSavedMovies,
    setIsChecked,
    isChecked,
    allUpdatedMovies,
    isPreloader,
  } = props

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [checkedMovies, setCheckedMovies] = useState([]);
  const [lastQuery, setLastQuery] = useState('');

  //шапка, подвал, цвет шапки
  useEffect(() => {
    options(true, true, true);
  }, [options]);

  //получаем сохраненные фильмы
  useEffect(() => {
    if (stateSearchedMovies.isSavedMoviesFetched === false ) {
      getSavedMovies();
    }
    setIsChecked(false);
    setSearchQuery('');
  }, []);

  function filterMovies() {
    const filtredMovies = allUpdatedMovies.filter(movie => movie._id !== null);
    return filtredMovies;
  }

  useEffect(()=>{
      setCheckedMovies((prevCheckedMovies) => {
        const updatedMovies = searchMovies(lastQuery, handleCheckedFilter(isChecked, filterMovies()));
        setFilteredMovies(updatedMovies);
        return updatedMovies;
      });
  },[isChecked, stateSearchedMovies.allMovies]);

  function handleSubmit(searchQuery, isChecked) {
    setLastQuery(searchQuery);
    if (isChecked) {
        setFilteredMovies(searchMovies(searchQuery, checkedMovies));
    } else {
        setFilteredMovies(searchMovies(searchQuery, filterMovies()));
    }
  }
  
  const propsSearchForm = {
    onSubmit: handleSubmit,
    setSearchQuery: setSearchQuery,
    setIsChecked: setIsChecked,
    isChecked: isChecked,
    searchQuery: searchQuery,
    isPreloader: isPreloader,
  }

  const propsMoviesCardList = {
    stateSearchedMovies: stateSearchedMovies,
    onDeleteMovie: onDeleteMovie,
    movies: filteredMovies,
  }

  return (
    <div className="movies">
      <SearchForm { ...propsSearchForm } />
      <MoviesCardList { ...propsMoviesCardList } />
    </div>
  );
}

export default SavedMovies;
