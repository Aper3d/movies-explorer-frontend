import './MoviesCard.css';

function MoviesCard({ ...props }) {
  const getCorrectDuration = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  return (
    <li className='card'>
      {!props.isLicked
        ? <button className='card__save-button card__btn  btn__hover' type="button" aria-label="Сохранить">Сохранить</button>
        : <button className='card__delite-button card__btn  btn__hover' type='button' aria-label='Удалить' />}
      <a className='card__link' href={props.trailerLink} target='_blank' rel='noreferrer'>
        <img src={`https://api.nomoreparties.co${props.image.url}`} alt={props.nameRU} className='card__image' />
      </a>
      <div className='card__container'>
        <h2 className='card__name'>{props.nameRU}</h2>
        <p className='card__duration'>{getCorrectDuration(props.duration)}</p>
      </div>

    </li>
  )
};

export default MoviesCard;
