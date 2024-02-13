import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Register({ options, onSubmit, serverErrorMessage }) {

  useEffect(() => {
    options(false, false, true);
  }, [options]);

  function handleSubmit (data) {
    onSubmit(data);
  }

  const propsAuthForm = {
    title: "Добро пожаловать!",
    isName: true,
    submitText: "Зарегистрироваться",
    spanLink: "Уже зарегистрированы?",
    link: "Войти",
    linkTo: "/signin",
    onSubmit: handleSubmit,
    serverErrorMessage: serverErrorMessage,
  };

  return (
      <AuthForm {...propsAuthForm}></AuthForm>
  );
}

export default Register;
