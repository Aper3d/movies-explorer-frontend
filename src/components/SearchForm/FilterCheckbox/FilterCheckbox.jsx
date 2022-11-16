import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className='filter'>
      Короткометражки
      <input className='filter__input' type='checkbox' />
      <span className='filter__input_visible filter__input_visible_checked btn__hover' />
    </label>
  )
}

export default FilterCheckbox;
