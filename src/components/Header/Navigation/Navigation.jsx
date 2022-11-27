import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navigation({ loggedIn }) {

  const [isNavOpened, setIsNavOpened] = useState(false);

  function handleNavClick() {
    setIsNavOpened(!isNavOpened);
  };
  function handleOffNavClick() {
    setIsNavOpened(false);
  };

  return (
    !loggedIn ?
      <nav className='nav'>
        <ul className='list-reset nav__list ' >
          <li><NavLink className='nav__link link__hover' to='/signup'>Регистрация</NavLink></li>
          <li><NavLink className='nav__link nav__link_green link__hover' to='/signin'> Войти</NavLink></li>
        </ul>
      </nav>
      : isNavOpened
        ? <>
          <button type='button' className={`nav__btn ${isNavOpened && 'nav__btn_close'}`} onClick={handleNavClick} />
          <nav className='nav nav__mobile'>
            <ul className='list-reset nav__list-mobile'>
              <li><NavLink onClick={handleOffNavClick} className='nav__link-mobile' to='/' end>Главная</NavLink></li>
              <li><NavLink onClick={handleOffNavClick} className='nav__link-mobile' to='/movies'>Фильмы</NavLink></li>
              <li><NavLink onClick={handleOffNavClick} className='nav__link-mobile' to='/saved-movies'>Сохраненные фильмы</NavLink></li>
              <li><NavLink onClick={handleOffNavClick} className='nav__link-mobile' to='/profile'>
                Аккаунт<div className='nav__icon' div /></NavLink></li>
            </ul>
          </nav>
        </>
        : <>
          <button type='button' className={`nav__btn ${isNavOpened && 'nav__btn_close'}`} onClick={handleNavClick} />
          <nav className='nav'>
            <ul className='list-reset nav__list nav__list-deck ' >
              <li><NavLink className='nav__link link__hover' to='/movies'>Фильмы</NavLink></li>
              <li><NavLink className='nav__link link__hover' to='/saved-movies'>Сохраненные фильмы</NavLink></li>
              <li><NavLink className='nav__link link__hover' to='/profile'>
                Аккаунт<div className='nav__icon' div /></NavLink></li>
            </ul>
          </nav>
        </>
  )
}

export default Navigation;
