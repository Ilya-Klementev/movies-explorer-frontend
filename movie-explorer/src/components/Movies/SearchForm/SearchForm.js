import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSubmit, onSaveSubmit, stateChecked, onCheckboxMovies, onCheckboxSavedMovies }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [errorQuery, setErrorQuery] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(stateChecked);

  useEffect(() => {
    if (localStorage.getItem('stateSearchedMovies') && location.pathname === '/movies')  {
      const stateSearchedMovies = JSON.parse(localStorage.getItem('stateSearchedMovies'));
      setSearchQuery(stateSearchedMovies.lastQuery);
    }
  }, []);
   
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    const nameRegex = /\S/;
    if (!nameRegex.test(e.target.value)) {
      setIsButtonDisabled (true);
      setErrorQuery('Поле ввода не может быть пустым');
    } else {
      setIsButtonDisabled(false)
      setErrorQuery('');
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if(location.pathname === '/movies') {
      onCheckboxMovies(isChecked);
    } else {
      onCheckboxSavedMovies(isChecked, searchQuery);
    }
  }, [isChecked]);
   

  function handleSubmit (e) {
    e.preventDefault();
    if (searchQuery==='') {
      setErrorQuery('Поле ввода не может быть пустым');
    } else {
      if (location.pathname === '/movies') {
        onSubmit(searchQuery, isChecked)
      } else {
        onSaveSubmit(searchQuery, isChecked)
      }
    }
  };

  return (
    <div className="movies__search">
      <form className="movies__search_form" type="form" onSubmit={ handleSubmit } noValidate>
        <input 
          className="movies__search_input"
          type="text"
          onChange={handleInputChange}
          value={searchQuery}
          placeholder="Фильм" 
          required>
        </input>
        <button 
          className="movies__search_button" 
          type="submit"
          disabled={isButtonDisabled}
          >Поиск
        </button>
      </form>
      <span className="movies__error">{errorQuery}</span>
      <label className="movies__search_switch">
        <input 
          className="movies__search_checkbox" 
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="movies__search_slider movies__search_round"></span>
        <span className="movies__search_span">Короткометражки</span>
      </label>
    </div>
  );
}

export default SearchForm;
