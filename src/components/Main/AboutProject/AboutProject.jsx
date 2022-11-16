import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about' id='aboutproject'>
      <h2 className='section__title'>О проекте</h2>
      <div className='section__line'></div>
      <div className='about__table'>
        <h3 className='about__table-title'>Дипломный проект включал 5 этапов</h3>
        <h3 className='about__table-title'>На выполнение диплома ушло 5 недель</h3>
        <p className='about__table-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className='about__table-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className='about__line'>
        <h3 className='about__line-title about__line-title_green'>1 неделя</h3>
        <h3 className='about__line-title'>4 недели</h3>
        <p className='about__line-description'>Back-end</p>
        <p className='about__line-description'>Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;