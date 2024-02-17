import { REGEX_SAERCH, DURATION_SHORT } from "./constants";

function searchMovies(query, movies) {
  const clearedQuery = query.replace(REGEX_SAERCH, '').toLowerCase();
  const searchResults = movies.filter((movie) => {
    const clearedTitleRU = movie.nameRU.replace(REGEX_SAERCH, '').toLowerCase();
    const clearedTitleEN = movie.nameEN.replace(REGEX_SAERCH, '').toLowerCase();
    return clearedTitleRU.includes(clearedQuery) || clearedTitleEN.includes(clearedQuery);
  });
  return searchResults;
}

function handleCheckedFilter(isChecked, movies) {
  let moviesResults = [];

  if (isChecked === true) {
    moviesResults = movies.filter(movie => movie.duration < DURATION_SHORT);
  } else {
    moviesResults = [...movies];
  }
  return moviesResults;
}

export { searchMovies, handleCheckedFilter}