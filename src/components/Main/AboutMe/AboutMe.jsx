import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className='student' id='aboutme'>
      <h2 className='section__title'>Студент</h2>
      <div className='section__line'></div>
      <div className='student__container'>
        <div className='student__profile'>
          <h2 className='student__name'>Олег</h2>
          <h3 className='student__description'>Фронтенд-разработчик, 32 года</h3>
          <p className='student__about'>
            Всем привет, меня зовут Олег, я родом из города Челябинск. В данный момент проживаю в городе Сургут и работаю на железной дороге.
            В свободное время прохожу обучение на веб разработчика. Так же в планах обучение UX дизайну и углубленное изучение баз данных.
            Очень много катаюсь на велосепеде и читаю произведения российских писателей-фантастов.
          </p>
          <a href='https://github.com/Aper3d' className='student__github btn__hover' target='_blank' rel='noreferrer'>GitHub</a>
        </div>
        <img
          src='https://sun9-53.userapi.com/impg/f2Kpg8yZ3x8UyvjsERxW3lqGyZcqp2zUMtDi8Q/Fc7G7scao6g.jpg?size=718x1080&quality=96&sign=492e768f20719cdf3334b4c09cc7cacc&type=album'
          className='student__photo' alt='Фото' />
      </div>
      <p className='student__portfolio'>Портфолио</p>
      <ul className='student__list list-reset'>
        <Portfolio link='https://github.com/Aper3d/how-to-learn' title='Статичный сайт' />
        <Portfolio link='https://github.com/Aper3d/russian-travel' title='Адаптивный сайт' />
        <Portfolio link='https://github.com/Aper3d/mesto-react' title='Одностраничное приложение' />
      </ul>
    </section>
  )
}

export default AboutMe;
