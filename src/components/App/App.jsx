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

function App() {

  const location = useLocation();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
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
      auth.getContent(token)
        .then(res => setCurrentUser(res.data))
        .catch((err) => {
          localStorage.clear();
          setIsLoggedIn(false);
          setError(' ');
          navigate('/');
          console.log(err);
        });
      api.getSavedMovies()
        .then((res) => {
          setSavedMovies(res.data);
          localStorage.setItem('savedMovies', JSON.stringify(res.data));
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn, token, navigate, setError]);

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
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies} />
            </ProtectedRoute>
          }
          />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <SavedMovies
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies} />
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
