function Portfolio({ link, title }) {
  return (
    <li className='student__item'>
      <a href={link} className='student__link link__hover' target='_blank' rel='noreferrer'>
        <p>{title}</p><p className='student__icon'>↗</p></a>
    </li>
  )
}

export default Portfolio;