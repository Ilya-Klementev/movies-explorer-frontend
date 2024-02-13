import React, { useEffect, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { searchMovies, handleCheckedFilter } from '../../utils/searchUtil';

function SavedMovies({ options, onDeleteMovie, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [checkedMovies, setCheckedMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  
  useEffect(()=>{
    setFilteredMovies(savedMovies);
  },[savedMovies])
   
  useEffect(() => {
    options(true, true, true);
  }, [options]);

  function handleCheckboxChange(isChecked) {
    if (searchedMovies.length !== 0) {
      setCheckedMovies(handleCheckedFilter(isChecked, searchedMovies));
      setFilteredMovies(handleCheckedFilter(isChecked, searchedMovies));
    } else {
      setCheckedMovies(handleCheckedFilter(isChecked, savedMovies));
      setFilteredMovies(handleCheckedFilter(isChecked, savedMovies));
    }
  }
  
  function handleSaveMovieSearch(searchQuery, isChecked) {
    if (isChecked) {
      setSearchedMovies(searchMovies(searchQuery, checkedMovies));
      setFilteredMovies(searchMovies(searchQuery, checkedMovies));
    } else {
      setSearchedMovies(searchMovies(searchQuery, savedMovies));
      setFilteredMovies(searchMovies(searchQuery, savedMovies));
    }
  }

  const propsSavedMovies = {
    movies: filteredMovies,
    savedMovies: filteredMovies,
    onDeleteMovie: onDeleteMovie,
  }

  return (
    <div className="movies">
      <SearchForm onCheckboxSavedMovies={handleCheckboxChange} onSaveSubmit={handleSaveMovieSearch} />
      <MoviesCardList {...propsSavedMovies} />
    </div>
  );
}

export default SavedMovies;
