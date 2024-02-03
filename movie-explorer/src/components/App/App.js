import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [darkBackground, setDarkBackground] = useState(true);
  const [loggedIn, setloggedIn] = useState(true);

  const options = (setHeader, setFooter, setBackground) => {
    setShowHeader(setHeader);
    setShowFooter(setFooter);
    setDarkBackground(setBackground);
  };

  return (
    <div className="page">
      <BrowserRouter>
        {showHeader && <Header darkHeaderBackground={ darkBackground } loggedIn={loggedIn}/>}
        <Routes>
          <Route path="/" element={<Main options={ options }/>} />
          <Route path="/signin" element={<Login options={ options }/>} />
          <Route path="/signup" element={<Register options={ options }/>} />
          <Route path="/movies" element={<Movies options={ options }/>} />
          <Route path="/saved-movies" element={<SavedMovies options={ options }/>} />
          <Route path="/profile" element={<Profile options={ options }/>} />
          <Route path="*" element={<PageNotFound options={ options }/>} />
        </Routes>
        {showFooter && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
