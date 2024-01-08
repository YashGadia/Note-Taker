import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import LandingPage from './Screens/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNotes from './Screens/MyNotes/MyNotes';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import CreateNote from './Screens/CreateNote/CreateNote';
import SingleNote from './Screens/SingleNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';

// YrgNoteTaker

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch = {setSearch} />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} exact />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/createnote' element={<CreateNote />} />
          <Route path='/note/:id' element={<SingleNote />} />
          <Route path='/mynotes' element={<MyNotes search = {search} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
