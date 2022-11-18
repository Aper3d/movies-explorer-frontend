import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList />
      <button className='more-movies btn__hover'>Ещё</button>
    </main>
  )
}

export default Movies;
