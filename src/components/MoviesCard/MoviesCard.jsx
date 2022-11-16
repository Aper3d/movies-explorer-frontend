import './MoviesCard.css';

function MoviesCard({ ...props }) {
  const getCorrectDuration = (number) => {
    if (number > 10 && number < 20) {
      return `${number} минут`;
    } else if (number % 10 === 1) {
      return `${number} минута`;
    } else if (number % 10 > 1 && number % 10 < 5) {
      return `${number} минуты`;
    } else {
      return `${number} минут`;
    }
  };

  return (
    <li className='card'>
      <a className='card__link link__hover' href={props.trailerLink} target='_blank' rel='noreferrer'>
        <img src={`https://api.nomoreparties.co${props.image.url}`} alt={props.nameRU} className='card__image' />
      </a>
      <div className='card__container'>
        <h2 className='card__name'>{props.nameRU}</h2>
        <button className='card__like-button' type="button" aria-label="Лайк" />
      </div>
      <p className='card__duration'>{getCorrectDuration(props.duration)}</p>
    </li>
  )
};

export default MoviesCard;
