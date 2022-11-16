import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<>
          <Header />
          <Main />
          <Footer />
        </>} />
        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/profile' element={<>
          <Header />
          <Profile />
        </>} />
        <Route path='/movies' element={<>
          <Header />
          <Movies />
          <Footer />
        </>} />
        <Route path='/saved-movies' element={<>
          <Header />
          <SavedMovies />
          <Footer />
        </>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
