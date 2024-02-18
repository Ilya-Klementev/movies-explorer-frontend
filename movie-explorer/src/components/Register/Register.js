import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register(props) {
  const {
    options, 
    onSubmit, 
    serverErrorMessage, 
    isRequestProgress,
  } = props;

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
    isRequestProgress,
  };

  return (
      <AuthForm {...propsAuthForm}></AuthForm>
  );
}

export default Register;
