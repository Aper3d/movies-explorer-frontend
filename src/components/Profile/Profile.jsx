import './Profile.css';

function Profile() {
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Великий!</h1>
      <div className='profile__container profile__container_name'>
        <p className='profile__text'>Имя</p>
        <p className='profile__text'>Великий Владыка</p>
      </div>
      <div className='profile__container'>
        <p className='profile__text'>E-mail</p>
        <p className='profile__text'>power@god.ru</p>
      </div>
      <div className='profile__control'>
        <button className='profile__edit-btn link__hover' type='button'>Редактировать</button>
        <button className='profile__exit-btn link__hover' type='button'>Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;
