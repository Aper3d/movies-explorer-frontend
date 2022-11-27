import './Techs.css';

function Techs() {
  return (
    <section className='techs' id='techs'>
      <h2 className='section__title'>Технологии</h2>
      <div className='section__line'></div>
      <div className='techs__container'>
        <h2 className='techs__title'>7 технологий</h2>
        <p className='techs__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs__list list-reset'>
          <li className='techs__item'>
            <a className='techs__link link__hover'
              href='https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/HTML_basics' target='_blank' rel='noreferrer'>
              HTML</a>
          </li>
          <li className='techs__item'>
            <a className='techs__link link__hover'
              href='https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/CSS_basics' target='_blank' rel='noreferrer'>
              CSS</a>
          </li>
          <li className='techs__item'>
            <a className='techs__link link__hover'
              href='https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/JavaScript_basics' target='_blank' rel='noreferrer'>
              JS</a>
          </li>
          <li className='techs__item'>
            <a className='techs__link link__hover'
              href='https://ru.reactjs.org/' target='_blank' rel='noreferrer'>
              React</a>
          </li>
          <li className='techs__item'>
            <a className='techs__link link__hover'
              href='https://git-scm.com/' target='_blank' rel='noreferrer'>
              Git</a>
          </li>
          <li className='techs__item'>
            <a className='techs__link link__hover'
              href='https://expressjs.com/' target='_blank' rel='noreferrer'>
              Express.js</a>
          </li>
          <li className='techs__item'>
            <a className='techs__link link__hover'
              href='https://www.mongodb.com/' target='_blank' rel='noreferrer'>
              mongoDB</a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;