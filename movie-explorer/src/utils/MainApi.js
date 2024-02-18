import  { ADRESS_MAIN_SERVER }  from './constants';

class MainApi {
  constructor(adressServer) {
    this._adressServer = adressServer;
    this._headers = { 
      "Content-Type": "application/json",
    };
  }

  _handleResponse = (response) => {
    return response.ok ?
      response.json() :
      response.json().then(error => Promise.reject(`${error.message}`));
  };

  registration({ email, password, name }) {
    return fetch(`${this._adressServer}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password
      }),
    }).then(this._handleResponse);
  }

  authorization( { email, password } ) {
    return fetch(`${this._adressServer}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ password, email }),
    }).then(this._handleResponse);
  }

  getUser(jwt) {
    return fetch(`${this._adressServer}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: { ...this._headers, Authorization : `Bearer ${jwt}` },
    }).then(this._handleResponse);
  } 

  patchUserProfile({ name, email }) {
    return fetch(`${this._adressServer}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then(this._handleResponse);
  }

  setHeadersAuth(tokenAuth) {
    return this._headers = { ...this._headers, Authorization: `Bearer ${tokenAuth}` };
  }

  signOut() {
    return fetch(`${this._adressServer}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
    }).then(this._handleResponse);
  }

  saveMovie( movie ) {
    return fetch(`${this._adressServer}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify( movie ),
    }).then(this._handleResponse);
  }

  getSavedMovies() {
    return fetch(`${this._adressServer}/movies`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  deleteMovie( movie ) {
    return fetch(`${this._adressServer}/movies/${movie._id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}   

const api = new MainApi( ADRESS_MAIN_SERVER );
export { api }