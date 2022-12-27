import './Profile.css';
import Header from '../Header/Header';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useValidationForm } from '../../hooks/useValidationForm';
import { useEffect } from 'react';

function Profile({ loggedIn, error, handleUpdateUser, handleLogout }) {

  const [isEdit, setIsEdit] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const { values, handleErrors, errors, isValid } = useValidationForm();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setIsDisable(false)
    }
    else {
      setIsDisable(true)
    }
  }, [currentUser.name, currentUser.email, values.name, values.email, setIsDisable])

  function handleOnEdit() {
    setIsEdit(!isEdit);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser(values.name || currentUser.name, values.email || currentUser.email);
    handleOnEdit();
    setIsDisable(true);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <form className='profile form' name='profile-form' onSubmit={handleSubmit}>
          <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
          <div className='profile__container'>
            <label htmlFor="name" className='profile__input-label'>Имя</label>
            <input className='profile__input' type='text' name='name' minLength="3" required
              autoComplete="off" onChange={handleErrors} disabled={!isEdit}
              defaultValue={currentUser.name}
            />
            <span className='register-form__span'>{errors.name}</span>
            <label htmlFor="email" className='profile__input-label'>E-mail</label>
            <input className='profile__input' type='email' name='email' required
              autoComplete="off" onChange={handleErrors} disabled={!isEdit}
              defaultValue={currentUser.email}
            />
            <span className='register-form__span'>{errors.email}</span>
          </div>
          <div className='profile__control'>
            <span className='register-form__error'>{error}</span>
            {isEdit
              ? <button type='submit' className={`profile-form__btn btn__hover ${(!isValid || isDisable) && 'profile-form__btn_disabled'}`} disabled={(!isValid || isDisable)}>Сохранить</button>
              : <> <button className='profile__edit-btn link__hover' type='button' onClick={handleOnEdit}>Редактировать</button>
                <button className='profile__exit-btn link__hover' type='button' onClick={handleLogout}>Выйти из аккаунта</button> </>}
          </div>
        </form>
      </main>
    </>
  )
}

export default Profile;
