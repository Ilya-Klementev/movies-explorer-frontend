import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

function PageNotFound({ options }) {

  useEffect(() => {
    options(false);
  }, [options]);

  const navigate = useNavigate(); 

  function goBack() {
    navigate(-1, { replace: true });
    options(true);
  }

  return (
    <div className="page-not-found">
      <h1 className="page-not-found__code">404</h1>
      <p className="page-not-found__message">Страница не найдена</p>
      <Link className="page-not-found__link" to='#' onClick={goBack}>Назад</Link>
    </div>
  );
}

export default PageNotFound;
