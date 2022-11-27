import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  SERVER_ERROR,
  UNAUTHORIZED_ERROR,
  CONFLICT_ERROR,
  VALIDATION_ERROR
} from '../../utils/constants';
import { api } from '../../utils/MainApi';
import { auth } from '../../utils/auth';
import * as moviesApi from '../../utils/MoviesApi'


function App() {

  const location = useLocation();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [apiMovies, setApiMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [moviesError, setMoviesError] = useState(false);
  const [error, setError] = useState(' ');
  const [isFail, setIsFail] = useState(false);


  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      if (location.pathname === "/signup" || location.pathname === "/signin") {
        navigate("/movies");
      } else {
        navigate(location.pathname);
      }
    }
  }, [token, isLoggedIn, navigate, location.pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then(res => setCurrentUser(res.data))
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const movies = localStorage.getItem('movies');
      const savedMovies = localStorage.getItem('savedMovies');
      if (movies) {
        setMovies(JSON.parse(movies));
      }
      if (savedMovies) {
        setSavedMovies(JSON.parse(savedMovies));
      } else {
        api.getSavedMovies()
          .then((res) => {
            setSavedMovies(res.data);
            localStorage.setItem('savedMovies', JSON.stringify(res.data));
          })
          .catch(err => console.log(err));
      }
    }
  }, [isLoggedIn]);

  function handleError(err) {
    console.log(err)
    if (err === '401') {
      setError(UNAUTHORIZED_ERROR)
    } else if (err === '409') {
      setError(CONFLICT_ERROR)
    } else if (err === '400') {
      setError(VALIDATION_ERROR)
    } else {
      setError(SERVER_ERROR)
    }
  }

  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch(err => handleError(err));
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        setIsLoading(false)
        setIsLoggedIn(true);
        setCurrentUser(res);
        localStorage.setItem('token', res.token);
        setError(' ');
        navigate('/movies');
      })
      .catch(err => handleError(err));
  };

  function handleUpdateUser(name, email) {
    api.editProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setError(' ');
        setIsFail(false);
      })
      .catch((err) => {
        handleError(err);
        setIsFail(true);
      });
  };

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    setError(' ');
    navigate('/');
  };

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  };

  function searchMovies(keyword) {
    setIsLoading(true);
    setMovies([]);
    setNotFound(false);
    setMoviesError(false);

    if (apiMovies.length === 0) {
      moviesApi.getMovies()
        .then(res => {
          setApiMovies(res);
          const searchResult = searchMoviesByKeyword(res, keyword);

          if (searchResult.length === 0) {
            setNotFound(true);
            setMovies([]);
          } else {
            localStorage.setItem('movies', JSON.stringify(searchResult));
            setMovies(JSON.parse(localStorage.getItem('movies')));
          }
        })
        .catch((err) => {
          console.log(err);
          setMoviesError(true);
          setMovies([]);
        })
        .finally(() => {
          setIsLoading(false);
        })
    } else {
      const searchResult = searchMoviesByKeyword(apiMovies, keyword);

      if (searchResult.length === 0) {
        setMovies([]);
        setIsLoading(false);
        setNotFound(true);
      } else if (searchResult.length !== 0) {
        localStorage.setItem('movies', JSON.stringify(searchResult));
        setMovies(JSON.parse(localStorage.getItem('movies')));
        setIsLoading(false);
      } else {
        setMovies([]);
        setMoviesError(true);
      }
    }
  };

  function searchMoviesByKeyword(movies, keyword) {
    let foundMovies = [];

    movies.forEach((movie) => {
      if (movie.nameRU.indexOf(keyword) > -1) {
        if (isShortMovies) {
          movie.duration <= 40 && foundMovies.push(movie);
        } else {
          foundMovies.push(movie);
        }
      }
    })
    return foundMovies;
  };

  function searchSavedMovies(keyword) {
    const movies = JSON.parse(localStorage.getItem('savedMovies'));
    const searchResult = searchMoviesByKeyword(movies, keyword);
    setSavedMovies(searchResult);
  };

  function saveMovie(movie) {
    api.saveMovie(movie)
      .then((res) => {
        const movies = [res.data, ...savedMovies];
        localStorage.setItem('savedMovies', JSON.stringify(movies))
        setSavedMovies(movies);
      })
      .catch(err => console.log(err));
  };

  function deleteMovie(movieId) {
    api.deleteMovie(movieId)
      .then(() => {
        const filteredSavedMovies = savedMovies.filter((item) => {
          return item._id !== movieId
        });
        setSavedMovies(filteredSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(filteredSavedMovies));
      })
      .catch(err => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path='/' element={<>
            <Header loggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </>} />
          <Route path='/signup' element={<Register error={error} handleRegister={handleRegister} />} />
          <Route path='/signin' element={<Login error={error} handleLogin={handleLogin} />} />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <Movies
                loggedIn={isLoggedIn}
                isLoading={isLoading}
                notFound={notFound}
                handleSearchMovies={searchMovies}
                movies={movies}
                savedMovies={savedMovies}
                moviesError={moviesError}
                handleShortMovies={handleShortMovies}
                isShortMovies={isShortMovies}
                handleSaveMovie={saveMovie}
                handleDeleteMovie={deleteMovie} />
            </ProtectedRoute>
          }
          />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <SavedMovies
                loggedIn={isLoggedIn}
                isLoading={isLoading}
                notFound={notFound}
                handleSearchMovies={searchMovies}
                movies={savedMovies}
                savedMovies={savedMovies}
                moviesError={moviesError}
                handleSearchSavedMovies={searchSavedMovies}
                handleShortMovies={handleShortMovies}
                isShortMovies={isShortMovies}
                handleSaveMovie={saveMovie}
                handleDeleteMovie={deleteMovie} />
            </ProtectedRoute>
          }
          />
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <Profile
                error={error}
                loggedIn={isLoggedIn}
                isFail={isFail}
                handleUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
              />
            </ProtectedRoute>
          }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
