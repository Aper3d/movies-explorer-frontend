import './checkRes';
import checkRes from './checkRes';

class MainApi {
  constructor(options) {
    this._url = options.url
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      }
    })
      .then(checkRes)
  }

  editProfile(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
      .then(checkRes)
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
      .then(checkRes)
      .then(data => { return (data) })
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      }
    })
      .then(checkRes)
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      }
    })
      .then(checkRes)
      .then(data => { return (data) })
  }
}

export const api = new MainApi({
  url: 'https://api.legion3d.students.nomoredomainssbs.ru'
});
