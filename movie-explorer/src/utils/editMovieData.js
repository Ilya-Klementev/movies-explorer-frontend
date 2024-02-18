import { ADRESS_MOVIES_SERVER } from './constants';

function editingMoviesObjects(movies) {
  return movies.map((movie) => {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${ADRESS_MOVIES_SERVER}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${ADRESS_MOVIES_SERVER}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      _id: null,
    };
  });
}

export { editingMoviesObjects }