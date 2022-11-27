import React from 'react';
import { useState, useEffect } from 'react';
import './MoviesCard.css';
import {
  SERVER_URL,
  UNKNOWN_IMAGE_URL,
  UNKNOWN_TRAILER_URL,
  UNKNOWN_CARD_TEXT,
} from "../../utils/constants";

function MoviesCard({ savedMovies, isSavedMovies, ...props }) {

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (savedMovies.some((movie) => movie.movieId === props.id)) {
      setIsSaved(true);
    }
  }, [savedMovies, props.id]);

  const getCorrectDuration = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  const handleSaveMovie = () => {
    const movieData = {
      country: props.country || UNKNOWN_CARD_TEXT,
      director: props.director || UNKNOWN_CARD_TEXT,
      duration: props.duration,
      year: props.year || UNKNOWN_CARD_TEXT,
      description: props.description || UNKNOWN_CARD_TEXT,
      image: SERVER_URL + props.image.url || UNKNOWN_IMAGE_URL,
      trailerLink: props.trailerLink || UNKNOWN_TRAILER_URL,
      nameRU: props.nameRU || props.nameEN || UNKNOWN_CARD_TEXT,
      nameEN: props.nameEN || props.nameRU || UNKNOWN_CARD_TEXT,
      thumbnail: SERVER_URL + props.image.formats.thumbnail.url || UNKNOWN_IMAGE_URL,
      movieId: props.id,
    };
    props.handleSaveMovie(movieData);
    setIsSaved(true);
  };

  function handleDeleteMovie() {
    setIsSaved(false);
    console.log(props)
    props.handleDeleteMovie(props._id);
  }

  function handleDislikeMovie() {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const card = savedMovies.find((movie) => movie.movieId === props.id);
    props.handleDeleteMovie(card._id);
    setIsSaved(false);
  }

  return (
    <li className='card'>
      {isSavedMovies ?
        <button className='card__delite-button card__btn  btn__hover' type='button' aria-label='Удалить' onClick={handleDeleteMovie} />
        : !isSaved
          ? <button className='card__save-button card__btn  btn__hover' type="button" aria-label="Сохранить" onClick={handleSaveMovie}>Сохранить</button>
          : <button className='card__delite-button card__btn  btn__hover' type='button' aria-label='Удалить' onClick={handleDislikeMovie} />}
      <a className='card__link' href={props.trailerLink} target='_blank' rel='noreferrer'>
        <img src={isSavedMovies ? props.image : SERVER_URL + props.image.url} alt={props.nameRU} className='card__image' />
      </a>
      <div className='card__container'>
        <h2 className='card__name'>{props.nameRU}</h2>
        <p className='card__duration'>{getCorrectDuration(props.duration)}</p>
      </div>

    </li>
  )
};

export default MoviesCard;
