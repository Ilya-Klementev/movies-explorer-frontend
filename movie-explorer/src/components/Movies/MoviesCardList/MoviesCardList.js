import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList( props ) {
  const [isPreloader, setIsPreloader] = useState(false);
  const [moviesCards, setMoviesCards] = useState(Array.from({ length: props.length }));

  //Проверка работы прелоадера:
  async function addMoreCard() {
    setIsPreloader(true);
    try {
      const newMovies = await fetchNewMovies(); 
      await new Promise(resolve => setTimeout(resolve, 500));
      setMoviesCards(prevMovies => [...prevMovies, ...newMovies]);
    } catch (error) {
      console.error('Ошибка добавления новых карточек:', error);
    } finally {
      setIsPreloader(false);
    }
  }

  async function fetchNewMovies() {
    return Array.from({ length: 6 });
  }


  return (
    <>
      <div className="movies__cardlist">
        {moviesCards.map(() => (
          <MoviesCard {...props}/>
        ))}
      </div>
      {isPreloader && <Preloader />}
      {props.savedPage ? "" :
      <button
        className="movies__cardlist_more"
        onClick={addMoreCard}
      >
        Еще
      </button>}
    </>
  );
}

export default MoviesCardList;
