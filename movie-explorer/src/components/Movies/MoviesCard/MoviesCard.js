import React, {useState} from 'react';

function MoviesCard( props ) {
  const [isSaved, setIsSaved] = useState(false);

  function toggleSaveMovie() {
    setIsSaved(!isSaved);
  }

  return (
    <div className="movies__card">
      <div className="movies__card_container">
        <h2 className="movies__card_title">В погоне за бэнкси</h2>
        <span className="movies__card_time">0ч 42м</span>
      </div>
      <img 
        className="movies__card_image" 
        src={ require('../../../images/card_pic.png') } 
        alt="Изображение фильма"/>
      {props.savedPage ? (
        <button 
          className="movies__card_button-delete"
          onClick={toggleSaveMovie}
        ></button>
        ) : (
        <button 
          className={`movies__card_button ${isSaved ? 'movies__card_button-saved' : ''}`} 
          onClick={toggleSaveMovie}
        >
          {isSaved ? '' : 'Сохранить'}
        </button>
      )}

    </div>
  );
}

export default MoviesCard;
