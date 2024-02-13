import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { 
    movies, 
    isCountDisplayedMovies, 
    isInitialPage, 
    error, 
    onAddCards, 
    onSaveMovie, 
    savedMovies, 
    onDeleteMovie
  } = props;

  const location = useLocation();

  const renderMovies = useMemo(() => {
    if (error) {
      return <h2 className="movies__cardlist_nothing">{error}</h2>;
    }
  
    if (movies.length < 1 && isInitialPage === false) {
      return <h2 className="movies__cardlist_nothing">Ничего не найдено</h2>;
    }
    if (location.pathname === '/movies') {
      return movies.slice(0, isCountDisplayedMovies).map((movie) => {
      const isSaved = savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId);
  
        return (
          <MoviesCard 
            key={movie.movieId} 
            movie={movie} 
            onSaveMovie={onSaveMovie} 
            onDeleteMovie={onDeleteMovie} 
            isSaved={isSaved}
            savedMovies={savedMovies}
          />
        );
      });
    } else {
      return savedMovies.map((movie) => (
        <MoviesCard key={movie.movieId} movie={movie} onDeleteMovie={onDeleteMovie} />
      ));
    }
  
  }, [error, movies, isInitialPage, isCountDisplayedMovies, location.pathname, savedMovies]);
  

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
