import './Register.css';
import { Link } from 'react-router-dom';
import { useValidationForm } from '../../hooks/useValidationForm';

function Register({ error, handleRegister }) {

  const { values, handleErrors, errors, isValid } = useValidationForm();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password);
  }

  return (
    <main>
      <form className='register-form form' name='register-form' onSubmit={handleSubmit}>
        <Link className='header__logo btn__hover' to='/' />
        <h2 className='register-form__title'>Добро пожаловать</h2>
        <label className='register-form__name'>Имя</label>
        <input type='text' name='name' placeholder='Ваше имя' value={values.name || ''}
          className={`register-form__input ${errors.name && 'error'}`} minLength='2' maxLength='30'
          required autoComplete='off' onChange={handleErrors}
        />
        <span className='register-form__span'>{errors.name}</span>
        <label className='register-form__name'>E-mail</label>
        <input type='email' pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
          name='email' placeholder='Ваш e-mail' value={values.email || ''}
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
            disabled={!isValid}>Зарегстрироваться</button>
        </div>
        <div className='register-form__container'>
          <p className='register-form__text'>Уже зарегестрированы?</p>
          <Link className='register-form__link link__hover'
            to='/signin'>Войти</Link>
        </div>
      </form>
    </main>
  )
}

export default Register;