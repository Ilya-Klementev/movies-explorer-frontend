import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard( props ) {
  const { movie, onDeleteMovie, onSaveMovie, isSaved, savedMovies } = props;

  const location = useLocation();

  function countingDuration () {
    const hours = Math.floor( movie.duration / 60);
    const minutes = movie.duration % 60;
    const resultDuration = `${hours}ч ${minutes}м`;
    return resultDuration;
  }

  function hundleSaveMovie () {
    if (!isSaved) {
      onSaveMovie(movie);
    } else {
      const savedMovie = savedMovies.find((m) => m.movieId === movie.movieId)
      onDeleteMovie(savedMovie);
    }
  }

  function hundleDeleteMovie() {
    onDeleteMovie(movie);
  }

  return (
    <div className="movies__card">
      <div className="movies__card_container">
        <h2 className="movies__card_title">{movie.nameRU}</h2>
        <span className="movies__card_time">{countingDuration()}</span>
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img 
          className="movies__card_image" 
          src={ movie.image } 
          alt="Изображение фильма"/>
      </a>
      {(location.pathname === '/saved-movies') ? (
        <button 
          className="movies__card_button-delete"
          onClick={ hundleDeleteMovie }
        ></button>
        ) : (
        <button 
          className={`movies__card_button ${isSaved ? 'movies__card_button-saved' : ''}`} 
          onClick={ hundleSaveMovie }
        >
          {isSaved ? '' : 'Сохранить'}
        </button>
      )}

    </div>
  );
}

export default MoviesCard;
