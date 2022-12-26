import checkRes from "./checkRes";

class Auth {
  constructor(options) {
    this._url = options.url;
  }
  register = (name, email, password) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(checkRes)
  }

  authorize = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then(checkRes)
  }

  getContent = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
      .then(checkRes)
  }
}

export const auth = new Auth({
  url: 'https://api.legion3d.students.nomoredomainssbs.ru',
})

// export const auth = new Auth({
//   url: 'http://localhost:3000',
// })