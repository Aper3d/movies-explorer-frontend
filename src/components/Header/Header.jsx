import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

function Header({ loggedIn }) {
  const path = useLocation().pathname;
  return (
    <header className={`header ${path === '/' ? 'header_main' : ''}`}>
      <Link className='header__logo btn__hover' to='/' />
      <Navigation loggedIn={loggedIn} />
    </header>
  )
}

export default Header;
