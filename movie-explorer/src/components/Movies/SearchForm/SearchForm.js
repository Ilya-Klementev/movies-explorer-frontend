import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { REGEX_SAERCH_FORM } from '../../../utils/constants';

function SearchForm( props ) {
  const {
    onSubmit, 
    onCheckChange,
    searchQuery,
    setSearchQuery,
    isChecked,
    setIsChecked,
    stateSearchedMovies,
    isPreloader,
  } = props;
  
  const location = useLocation();
  const [errorQuery, setErrorQuery] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function handleInputChange (e) {
    setSearchQuery(e.target.value);
    const nameRegex = REGEX_SAERCH_FORM;
    if (!nameRegex.test(e.target.value)) {
      setIsButtonDisabled (true);
      setErrorQuery('Поле ввода не может быть пустым');
    } else {
      setIsButtonDisabled(false)
      setErrorQuery('');
    }
  };

  function handleCheckboxChange() {
    if(location.pathname === '/movies') {
      setIsChecked((prevIsChecked) => {
        const newIsChecked = !prevIsChecked;
        stateSearchedMovies.isChecked = newIsChecked;
        handleCheckbox(newIsChecked);
        return newIsChecked;
      });
      localStorage.setItem('stateSearchedMovies', JSON.stringify(stateSearchedMovies));
    } else {
      setIsChecked(!isChecked);
    }
  };

  function handleCheckbox(isChecked) {
    onCheckChange(isChecked);
  }

  function handleSubmit (e) {

    e.preventDefault();
    if (searchQuery==='') {
      setErrorQuery('Поле ввода не может быть пустым');
    } else {
    onSubmit(searchQuery, isChecked);
    }

  }; 

  return (
    <div className="movies__search">
      <form className="movies__search_form" type="form" name="searchForm"onSubmit={ handleSubmit } noValidate>
        <input 
          className="movies__search_input"
          type="text"
          onChange={handleInputChange}
          value={searchQuery}
          placeholder="Фильм" 
          disabled = {isPreloader}
          required>
        </input>
        <button 
          className="movies__search_button" 
          type="submit"
          disabled={isButtonDisabled || isPreloader}
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
