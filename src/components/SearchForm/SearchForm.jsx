import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function MovieSearch() {

  return (
    <form className='search'>
      <div className='search__container'>
        <input className='search__input' name='search' type='text' required autoComplete='off'
          placeholder='Фильм' />
        <button className='search__btn btn__hover' type='submit' />
      </div>
      <FilterCheckbox />
    </form>
  )
}

export default MovieSearch;
