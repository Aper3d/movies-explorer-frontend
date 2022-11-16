import './Navigation.css';
import { NavLink, useLocation } from 'react-router-dom';
import icon from '../../../images/profile-icon.svg';
import { useState } from 'react';

function Navigation() {
  const path = useLocation().pathname;
  const [isNavOpened, setIsNavOpened] = useState(false);
  function handleNavClick() {
    setIsNavOpened(!isNavOpened);
  };
  function handleOffNavClick() {
    setIsNavOpened(false);
  };

  return (
    path === '/' ?
      <nav className='nav'>
        <ul className='list-reset nav__list ' >
          <li><NavLink className='nav__link link__hover' to='/movies'>Фильмы</NavLink></li>
          <li><NavLink className='nav__link link__hover' to='/sign-up'>Регистрация</NavLink></li>
          <li><NavLink className='nav__link nav__link_green link__hover' to='/sign-in'> Войти</NavLink></li>
        </ul>
      </nav>
      : isNavOpened
        ? <>
          <button type='button' className={`nav__btn ${isNavOpened && 'nav__btn_close'}`} onClick={handleNavClick} />
          <nav className='nav nav__mobile'>
            <ul className='list-reset nav__list-mobile'>
              <li><NavLink onClick={handleOffNavClick} className='nav__link-mobile' to='/'>Главная</NavLink></li>
              <li><NavLink onClick={handleOffNavClick} className='nav__link-mobile' to='/movies'>Фильмы</NavLink></li>
              <li><NavLink onClick={handleOffNavClick} className='nav__link-mobile' to='/saved-movies'>Сохраненные фильмы</NavLink></li>
              <li><NavLink onClick={handleOffNavClick} className='nav__link-mobile' to='/profile'>
                <img className='nav__icon' src={icon} alt='Профиль' /></NavLink></li>
            </ul>
          </nav>
        </>
        : <>
          <button type='button' className={`nav__btn ${isNavOpened && 'nav__btn_close'}`} onClick={handleNavClick} />
          <nav className='nav'>
            <ul className='list-reset nav__list ' >
              <li><NavLink className='nav__link link__hover' to='/movies'>Фильмы</NavLink></li>
              <li><NavLink className='nav__link link__hover' to='/saved-movies'>Сохраненные фильмы</NavLink></li>
              <li><NavLink className='nav__link link__hover' to='/profile'>
                <img className='nav__icon' src={icon} alt='Профиль' /></NavLink></li>
            </ul>
          </nav>
        </>
  )
}

export default Navigation;
