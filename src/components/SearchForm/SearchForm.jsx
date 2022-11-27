import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

function MovieSearch({ isSavedMovies, ...props }) {
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);

  function handleChange(e) {
    setSearchInput(e.target.value);
    setIsSearchFormValid(e.target.checkValidity());
  }

  function onSubmit(e) {
    e.preventDefault();
    props.handleSearchMovies(searchInput);
  }

  function onSubmitSavedMovies(e) {
    e.preventDefault();
    props.handleSearchSavedMovies(searchInput);
  }

  return (
    <form className='search' name='search-form' onSubmit={isSavedMovies ? onSubmitSavedMovies : onSubmit}>
      <div className='search__container'>
        <input className='search__input' name='search' type='text' required autoComplete='off'
          placeholder='Фильм' onChange={handleChange} />
        <button className='search__btn btn__hover' type='submit'>Найти</button>
        <span className={`register__form_span ${isSearchFormValid && 'register__form_span_hidden'} `}
        >Это поле обязательно</span>
      </div>
      <FilterCheckbox handleShortMovies={props.handleShortMovies} isShortMovies={props.isShortMovies} />
    </form>
  )
}

export default MovieSearch;
