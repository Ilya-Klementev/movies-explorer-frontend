const errorMessages = {
  serverError: 'Ошибка сервера: ',
  regError: 'Ошибка регистрации пользователя: ',
  authError: 'Ошибка авторизации пользователя: ',
  tokenError: 'Ошибка при проверке токена: ',
  patchProfileError: 'Ошибка при обновлении данных пользователя: ',
  signOutError: 'Ошибка выхода из системы',
  getMoviesError: 'Ошибка получения фильмов: ',
  serverErrorForUser: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  getSavedMoviesError: 'Ошибка при получения сохраненных фильмов: ',
  saveMovieError: 'Ошибка при сохранении фильма: ',
  deleteMovieError: 'Ошибка при удалении фильма: ',
  invalidRegError: 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
  invalidLengthError: 'Длина имени должна быть от 2 до 30 символов',
  invalidEmailError: 'Введите корректный адрес e-mail',
}

const successMessages = {
  patchProfileSuccess: 'Данные успешно обновлены',
}

export { errorMessages, successMessages };
