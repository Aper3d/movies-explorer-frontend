import { Link } from 'react-router-dom';
import { useValidationForm } from '../../hooks/useValidationForm';

function Login({ error, handleLogin }) {

  const { values, handleErrors, errors, isValid } = useValidationForm();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.email, values.password);
  }
  return (
    <main>
      <form className='register-form form' onSubmit={handleSubmit}>
        <Link className='header__logo btn__hover' to='/' />
        <h2 className='register-form__title'>Рады видеть</h2>
        <span className='register-form__span'>{errors.name}</span>
        <label className='register-form__name'>E-mail</label>
        <input type='email' name='email' placeholder='Ваш e-mail' value={values.email || ''}
          className={`register-form__input ${errors.name && 'error'}`}
          required autoComplete='off' onChange={handleErrors} />
        <span className='register-form__span'>{errors.email}</span>
        <label className='register-form__name'>Пароль</label>
        <input type='password' name='password' placeholder='Придумайте пароль' value={values.password || ''}
          className={`register-form__input ${errors.name && 'error'}`}
          required autoComplete='off' onChange={handleErrors} />
        <span className='register-form__span'>{errors.password}</span>
        <div className='register-form__control'>
          <span className='register-form__error'>{error}</span>
          <button type='submit' className={`register-form__btn btn__hover ${!isValid && 'register-form__btn_disabled'}`}
            disabled={!isValid}>Войти</button>
        </div>
        <div className='register-form__container'>
          <p className='register-form__text'>Еще не зарегестрированы?</p>
          <Link className='register-form__link link__hover'
            to='/signup'>Зарегстрироваться</Link>
        </div>
      </form>
    </main>
  )
}

export default Login;