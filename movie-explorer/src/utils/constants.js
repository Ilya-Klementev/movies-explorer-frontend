const ADRESS_MOVIES_SERVER = 'https://api.nomoreparties.co';
const ADRESS_MAIN_SERVER = 'https://api.movieshub.nomoredomainsmonster.ru';

const SCREEN_SMALL = 320;
const SCREEN_MEDIUM = 768;
const SCREEN_LARGE = 1196;

const COUNT_MOVIES_LARGE_SCREEN = 12;
const COUNT_MOVIES_MEDIUN_SCREEN = 8;
const COUNT_MOVIES_SMALL_SCREEN = 5;

const ADD_MOVIE_LARGE_SCREEN = 3;
const ADD_MOVIE_MEDIUN_SCREEN = 2;
const ADD_MOVIE_SMALL_SCREEN = 2;

const DURATION_SHORT = 41;

const REGEX_SAERCH = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;  //регулярное выражение для поиска
const REGEX_NAME = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;  //регулярное выражение для имени пользователя
const REGEX_SAERCH_FORM = /\S/ //регулярное выражение для формы поиска

export { 
  ADRESS_MOVIES_SERVER, 
  ADRESS_MAIN_SERVER, 
  SCREEN_SMALL, 
  SCREEN_MEDIUM, 
  SCREEN_LARGE,
  COUNT_MOVIES_LARGE_SCREEN,
  COUNT_MOVIES_MEDIUN_SCREEN,
  COUNT_MOVIES_SMALL_SCREEN,
  ADD_MOVIE_LARGE_SCREEN,
  ADD_MOVIE_MEDIUN_SCREEN,
  ADD_MOVIE_SMALL_SCREEN,
  REGEX_SAERCH,
  DURATION_SHORT,
  REGEX_NAME,
  REGEX_SAERCH_FORM,
};