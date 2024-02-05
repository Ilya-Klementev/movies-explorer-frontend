import React from 'react';

function SearchForm() {

  return (
    <div className="movies__search">
      <form className="movies__search_form" type="form">
        <input 
          className="movies__search_input" 
          type="text" 
          placeholder="Фильм" 
          required>
        </input>
        <button className="movies__search_button" type="submit">Поиск</button>
      </form>
      <label className="movies__search_switch">
        <input className="movies__search_checkbox" type="checkbox"/>
        <span className="movies__search_slider movies__search_round"></span>
        <span className="movies__search_span">Короткометражки</span>
      </label>
    </div>
  );
}

export default SearchForm;