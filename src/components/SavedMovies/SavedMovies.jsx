import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ isLoading, loggedIn, ...props }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='movies'>
        <SearchForm isSavedMovies={true}
          handleSearchSavedMovies={props.handleSearchSavedMovies}
          isShortMovies={props.isShortMovies}
          handleShortMovies={props.handleShortMovies} />
        <MoviesCardList isLoading={isLoading}
          isSavedMovies={true}
          movies={props.movies}
          notFound={props.notFound}
          savedMovies={props.savedMovies}
          handleDeleteMovie={props.handleDeleteMovie} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;
