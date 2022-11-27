function NavTab(props) {
  return <a href={props.to} target='_self' rel="noreferrer" className='nav-tab__link link__hover'>
    {props.name}
  </a>
}

export default NavTab;
