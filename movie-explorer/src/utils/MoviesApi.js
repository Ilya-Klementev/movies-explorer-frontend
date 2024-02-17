import  { ADRESS_MOVIES_SERVER }  from './constants';

class Api {
  constructor(adressServer) {
    this._adressServer = adressServer;
    this._headers = { 
      "Content-Type": "application/json",
    };
  }

  _handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }   return Promise.reject(`Ошибка: ${ res.status }`);
  }
 
  getMovies() {
    return fetch(`${ this._adressServer }/beatfilm-movies`, { headers: this._headers })
    .then(this._handleResponse);
  }
}   

const apiMovies = new Api( ADRESS_MOVIES_SERVER );
export { apiMovies }