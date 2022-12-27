import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { findShortMovies, filterMovies } from "../../utils/filters";
import { useState, useEffect } from "react";
import { api } from '../../utils/MainApi';

function SavedMovies({ isLoading, loggedIn, savedMovies, setSavedMovies, handleLogout }) {

  const [moviesForRender, setMoviesForRender] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => setMoviesForRender(savedMovies), [savedMovies]);

  const handleSearchSavedMovies = (isShortMovies, searchQuery) => {
    setNotFound(false);
    const filteredMovies = filterMovies(searchQuery, savedMovies);
    const filteredShortMovies = findShortMovies(filteredMovies);
    if (isShortMovies) {
      setMoviesForRender(filteredShortMovies);
      setNotFound(false);
      if (filteredShortMovies.length === 0) {
        setNotFound(true);
      }
    } else {
      setMoviesForRender(filteredMovies);
      setNotFound(false);
      if (filteredMovies.length === 0) {
        setNotFound(true);
      }
    }
  };

  const handleDeleteMovie = (movieId, setIsSaved) => {
    api
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== movieId));
        setMoviesForRender((state) => state.filter((m) => m._id !== movieId));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        setIsSaved(false);
      })
      .catch((err) => {
        (err === '401')
          ? handleLogout()
          : console.log(err)
      });
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='movies'>
        <SearchForm isSavedMovies={true}
          onSearchSubmit={handleSearchSavedMovies}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          lastReqest={''} />
        <MoviesCardList isLoading={isLoading}
          isSavedMovies={true}
          moviesForRender={moviesForRender}
          notFound={notFound}
          savedMovies={savedMovies}
          movies={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
          moviesError={false} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;
