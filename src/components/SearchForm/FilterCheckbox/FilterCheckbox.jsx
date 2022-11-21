import './FilterCheckbox.css';

function FilterCheckbox({ checkbox, setCheckbox }) {

  const onClickCheckBox = () => setCheckbox(!checkbox);
  return (

    <label className='filter' htmlFor='short-film'>
      <input className='filter__input' type='checkbox' id='short-film'
        value='short-film' checked={checkbox} onChange={onClickCheckBox} />
      <div className="filter__pseudo-item btn__hover">
        <span className="filter__circle"></span>
      </div>
      <span className='filter__titile'> Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;
