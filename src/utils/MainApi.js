import './checkRes';
import checkRes from './checkRes';

class MainApi {
  constructor(options) {
    this._url = options.url
    this._headers = options.headers
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(checkRes)
      .then(data => { return data })
  }

  editProfile(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email })
    })
      .then(checkRes)
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailer,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
      .then(checkRes)
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(checkRes)
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers
    })
      .then(checkRes)
  }
}

export const api = new MainApi({
  url: 'https://api.legion3d.students.nomoredomainssbs.ru',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});
