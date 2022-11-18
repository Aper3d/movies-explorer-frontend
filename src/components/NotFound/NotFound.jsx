import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {

  const navigate = useNavigate();
  function handleClickGoBack() {
    navigate(-1);
  };

  return (
    <section className='not-found'>
      <>
        <h1 className='not-found__code'>404</h1>
        <h3 className='not-found__text'>Страница не найдена</h3>
      </>
      <button className='not-found__btn link__hover' type='button' onClick={handleClickGoBack}>Назад</button>
    </section>
  )
}

export default NotFound;