import React, { useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ options }) {

  useEffect(() => {
    options(true, true, true);
  }, [options]);

  const propsMovies = {
    length: 11,
    savedPage: false,
  }

  return (
    <div className="movies">
      <SearchForm></SearchForm>
      <MoviesCardList {...propsMovies}></MoviesCardList>
    </div>
  );
}

export default Movies;
