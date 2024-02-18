import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const {
    movies,
    isCountDisplayedMovies,
    error,
    onAddCards,
    onSaveMovie,
    onDeleteMovie,
    stateSearchedMovies,
  } = props;

  const location = useLocation();

  const renderMovies = useMemo(() => {
    if (error) {
      return <h2 className="movies__cardlist_nothing">{error}</h2>;
    }

    if (movies.length < 1 && stateSearchedMovies.isAllMoviesFetched === true) {
      return <h2 className="movies__cardlist_nothing">Ничего не найдено</h2>;
    }
 
    if (stateSearchedMovies.isAllMoviesFetched === true || location.pathname === '/saved-movies') {
      return movies
        .sort((a, b) => a.movieId - b.movieId)
        .slice(0, location.pathname === '/saved-movies' ? Infinity : isCountDisplayedMovies)
        .map((movie) => {
          return (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
            />
          );
        });
    }
  }, [movies, isCountDisplayedMovies, location.pathname, stateSearchedMovies.allMovies]);
  

  function handleAddCard() {
    onAddCards();
  }

  return (
    <>
      <div className="movies__cardlist">
        {renderMovies}
      </div>
      { (location.pathname !== '/movies') || (movies.length <= (isCountDisplayedMovies)) ? "" :
        <button
          className="movies__cardlist_more"
          onClick={ handleAddCard }
        >
          Еще
        </button>}
    </>
  );
}

export default MoviesCardList;
