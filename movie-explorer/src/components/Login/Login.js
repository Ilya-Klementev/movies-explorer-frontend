import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login({ options, onSubmit, serverErrorMessage }) {

  useEffect(() => {
    options(false, false, true);
  }, [options]);

  function handleSubmit (data) {
    onSubmit(data);
  }

  const propsAuthForm = {
    title: "Рады видеть!",
    isName: false,
    submitText: "Войти",
    spanLink: "Еще не зарегистрированы?",
    link: "Регистрация",
    linkTo: "/signup",
    onSubmit: handleSubmit,
    serverErrorMessage: serverErrorMessage,
  };

  return (
      <AuthForm {...propsAuthForm}></AuthForm>
  );
}

export default Login;
