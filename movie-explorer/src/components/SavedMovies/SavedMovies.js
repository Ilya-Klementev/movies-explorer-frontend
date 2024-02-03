import React, { useEffect } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies({ options }) {

  useEffect(() => {
    options(true, true, true);
  }, [options]);

  const propsMovies = {
    length: 4,
    savedPage: true,
  }

  return (
    <div className="movies">
      <SearchForm></SearchForm>
      <MoviesCardList {...propsMovies}></MoviesCardList>
    </div>
  );
}

export default SavedMovies;