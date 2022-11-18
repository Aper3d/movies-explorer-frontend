import { Link } from 'react-router-dom';

function Login() {
  return (
    <form className='register-form'>
      <Link className='header__logo btn__hover' to='/' />
      <h2 className='register-form__title'>Рады видеть</h2>
      <span className='register-form__name'>E-mail</span>
      <input type='email' className='register-form__input' placeholder='Введите e-mail' />
      <span className='register-form__name'>Пароль</span>
      <input type='new-password' className='register-form__input' placeholder='Введите пароль' />
      <button type='submit' className='register-form__btn btn__hover'>Войти</button>
      <div className='register-form__container'>
        <p className='register-form__text'>Еще не зарегестрированы?</p>
        <Link className='register-form__link link__hover'
          to='/sign-up'>Зарегстрироваться</Link>
      </div>
    </form>
  )
}

export default Login;