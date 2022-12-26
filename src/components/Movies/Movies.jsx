import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { findShortMovies, filterMovies } from "../../utils/filters";
import { useState } from "react";
import { api } from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi'
import { getOneIdByAnother } from '../../utils/getOneIdByAnother';

function Movies({ loggedIn, savedMovies, setSavedMovies }) {

  const [isLoading, setIsLoading] = useState(false);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [moviesError, setMoviesError] = useState(false);

  const handleSearchMovies = (isShortMovies, searchQuery) => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        const apiMovies = res;
        const filteredMovies = filterMovies(searchQuery, apiMovies);
        const filteredShortMovies = findShortMovies(filteredMovies);
        if (isShortMovies) {
          setMoviesForRender(filteredShortMovies);
          if (filteredShortMovies.length === 0) {
            setNotFound(true);
          }
        } else {
          setMoviesForRender(filteredMovies);
          if (filteredMovies.length === 0) {
            setNotFound(true);
          }
        };
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMoviesError(true);
      })
  };

  const handleDeleteMovie = (movieId, setIsSaved) => {
    const idInSavedMovies = getOneIdByAnother(movieId, savedMovies);
    api
      .deleteMovie(idInSavedMovies)
      .then(() => {
        setIsSaved(false);
        setSavedMovies((state) => state.filter((m) => m._id !== idInSavedMovies));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((e) => console.log(e));
  };

  const handleSaveMovie = (movie, setIsSaved) => {
    api.saveMovie(movie)
      .then((res) => {
        const movies = [res.data, ...savedMovies];
        localStorage.setItem('savedMovies', JSON.stringify(movies))
        setSavedMovies(movies);
        setIsSaved(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='movies'>
        <SearchForm isSavedMovies={false}
          onSearchSubmit={handleSearchMovies}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies} />
        <MoviesCardList isLoading={isLoading}
          isSavedMovies={false}
          moviesForRender={moviesForRender}
          notFound={notFound}
          savedMovies={savedMovies}
          movies={moviesForRender}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          moviesError={moviesError} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;
