import './FilterCheckbox.css';

function FilterCheckbox({ isShortMovies, handleShortMovies }) {

  return (
    <label htmlFor='short-film' className='filter' >
      <input className='filter__input' id='short-film' type='checkbox' onChange={handleShortMovies} checked={isShortMovies} />
      <div className="filter__pseudo-item btn__hover">
        <span className="filter__circle"></span>
      </div>
      <span className='filter__titile'> Короткометражки</span>
    </label >
  )
}

export default FilterCheckbox;
