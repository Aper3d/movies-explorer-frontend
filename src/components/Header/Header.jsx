import './Header.css';
import logo_authorized from '../../images/header-logo_authorized.svg';
import logo_unauthorized from '../../images/header-logo_unauthorized.svg';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

function Header({ loggedIn }) {
  const path = useLocation().pathname;
  return (
    <header className={`header ${path === '/' ? 'header_main' : ''}`}>
      <Link className='header__logo btn__hover' to='/'>
        <img src={loggedIn ? logo_authorized : logo_unauthorized} alt='Logo' />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  )
}

export default Header;
