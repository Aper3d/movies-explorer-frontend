import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__date'>©2022</p>
        <nav className='footer__nav'>
          <a href='https://practicum.yandex.ru' className='footer__link link__hover' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
          <a href='https://github.com' className='footer__link link__hover' target='_blank' rel='noreferrer'>Github</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
