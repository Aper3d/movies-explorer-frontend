import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import { useValidationForm } from '../../hooks/useValidationForm';

function MovieSearch({ onSearchSubmit, isShortMovies, setIsShortMovies }) {

  const { values, handleErrors, errors, isValid } = useValidationForm();

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies)
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSearchSubmit(isShortMovies, values.search);
  }

  return (
    <form className='search' name='search-form' onSubmit={handleSubmit}>
      <div className='search__container'>
        <input className='search__input' name='search' type='text' required autoComplete='off'
          placeholder='Фильм' onChange={handleErrors} />
        <button className={`search__btn btn__hover ${!isValid && 'search__btn_disabled'}`} type='submit' disabled={!isValid}>Найти</button>
      </div>
      <span className={`search__form_span ${errors.search && 'error'}`}>{errors.search}</span>
      <FilterCheckbox handleShortMovies={handleShortMovies} isShortMovies={isShortMovies} />
    </form>
  )
}

export default MovieSearch;
