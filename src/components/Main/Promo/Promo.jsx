import './Promo.css';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      </div>
      <nav className='nav-tab'>
        <NavTab to='/#aboutproject' name='О проекте' />
        <NavTab to='/#techs' name='Технологии' />
        <NavTab to='/#aboutme' name='Студент' />
      </nav>
    </section>
  )
}

export default Promo;