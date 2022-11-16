import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import * as moviesApi from '../../utils/MoviesApi';

function MoviesCardList() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    moviesApi.getMovies()
      .then(data => {
        const moviesSlise = data.slice(1, 17)
        setMovies(moviesSlise)
      })
  }, [])
  const newMovies = movies.map((movie) => <MoviesCard key={movie.id} {...movie} />)

  return (
    <ul className='movies-card-list list-reset'>
      {newMovies}
    </ul>
  )
}

export default MoviesCardList;
