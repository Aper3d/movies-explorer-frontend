import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useGetWidthBrowser } from '../../hooks/useGetWidthBrowser';
import {
  SERVER_ERROR,
  MOBILE_WIDTH,
  LAPTOP_WIDTH,
  LARGE_PAGE_CARDS_COUNT,
  LARGE_NEXT_PAGE_CARDS_COUNT,
  MEDIUM_PAGE_CARDS_COUNT,
  MEDIUM_NEXT_PAGE_CARDS_COUNT,
  SMALL_PAGE_CARDS_COUNT,
  SMALL_NEXT_PAGE_CARDS_COUNT,
} from "../../utils/constants";

function MoviesCardList({ isLoading, ...props }) {

  const [initialCardsAmount, setInitialCards] = useState(0);
  const [addCardsAmount, setAddMoreCards] = useState(0);
  const width = useGetWidthBrowser();

  useEffect(() => {
    if (width >= LAPTOP_WIDTH) {
      setInitialCards(LARGE_PAGE_CARDS_COUNT);
      setAddMoreCards(LARGE_NEXT_PAGE_CARDS_COUNT);
    } else if (width > MOBILE_WIDTH && width < LAPTOP_WIDTH) {
      setInitialCards(MEDIUM_PAGE_CARDS_COUNT);
      setAddMoreCards(MEDIUM_NEXT_PAGE_CARDS_COUNT);
    } else if (width <= MOBILE_WIDTH) {
      setInitialCards(SMALL_PAGE_CARDS_COUNT);
      setAddMoreCards(SMALL_NEXT_PAGE_CARDS_COUNT);
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener("beforeunload", removeAllMoviesData);
    return () => {
      window.removeEventListener("beforeunload", removeAllMoviesData);
    };
  }, []);

  function removeAllMoviesData() {
    localStorage.removeItem('movies');
  }

  function handleAddMovies() {
    setInitialCards(prev => prev + addCardsAmount);
  }

  const renderedMovies = props.movies.slice(0, initialCardsAmount);

  return (
    <>
      {isLoading && <Preloader />}
      <span className={`movies-card-list__span ${!props.moviesError && 'movies-card-list__span_hidden'}`}
      >{SERVER_ERROR}</span>
      <span
        className={`movies-card-list__span ${!props.notFound && 'movies-card-list__span_hidden'}`}
      >Ничего не найдено</span>
      <ul className='movies-card-list list-reset'>
        {renderedMovies.map((movie) => {
          return <MoviesCard
            key={movie._id || movie.id}
            {...movie}
            handleSaveMovie={props.handleSaveMovie}
            handleDeleteMovie={props.handleDeleteMovie}
            isSavedMovies={props.isSavedMovies}
            savedMovies={props.savedMovies}
          />
        })}
      </ul>
      <button className={`movies-card-list__btn btn__hover
      ${props.movies.length === renderedMovies.length ? 'movies-card-list__btn_hidden' : ''}`}
        onClick={handleAddMovies}
      >Ещё
      </button>
    </>
  )
}

export default MoviesCardList;
