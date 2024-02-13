
function searchMovies(query, movies) {
  const clearedQuery = query.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
  const searchResults = movies.filter((movie) => {
    const clearedTitleRU = movie.nameRU.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
    const clearedTitleEN = movie.nameEN.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
  
    return clearedTitleRU.includes(clearedQuery) || clearedTitleEN.includes(clearedQuery);
  });

  return searchResults;
}

function handleCheckedFilter(isChecked, movies) {
  let moviesResults = [];

  if (isChecked === true) {
    moviesResults = movies.filter(movie => movie.duration < 41);
  } else {
    moviesResults = [...movies];
  }

  return moviesResults;
}

export { searchMovies, handleCheckedFilter}