import './Register.css';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <form className='register-form'>
      <div className='register-form__icon'></div>
      <h2 className='register-form__title'>Добро пожаловать</h2>
      <span className='register-form__name'>Имя</span>
      <input type='text' className='register-form__input' placeholder='Ваше имя' />
      <span className='register-form__name'>E-mail</span>
      <input type='email' className='register-form__input' placeholder='Ваш e-mail' />
      <span className='register-form__name'>Пароль</span>
      <input type='new-password' className='register-form__input' placeholder='Придумайте пароль' />
      <button type='submit' className='register-form__btn btn__hover'>Зарегстрироваться</button>
      <div className='register-form__container'>
        <p className='register-form__text'>Уже зарегестрированы?</p>
        <Link className='register-form__link link__hover'
          to='/sign-in'>Войти</Link>
      </div>
    </form>
  )
}

export default Register;