import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isLoading, loggedIn, ...props }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='movies'>
        <SearchForm isSavedMovies={false}
          handleSearchMovies={props.handleSearchMovies}
          isShortMovies={props.isShortMovies}
          handleShortMovies={props.handleShortMovies} />
        <MoviesCardList isLoading={isLoading}
          movies={props.movies}
          moviesError={props.moviesError}
          isSavedMovies={false}
          notFound={props.notFound}
          savedMovies={props.savedMovies}
          handleSaveMovie={props.handleSaveMovie}
          handleDeleteMovie={props.handleDeleteMovie} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;
