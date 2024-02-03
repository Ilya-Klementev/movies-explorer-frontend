import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register({ options }) {

  useEffect(() => {
    options(false, false, true);
  }, [options]);

  function onSubmit (e) {
    e.preventDefault();
    console.log('Зарегистрировались!')
  }

  const propsAuthForm = {
    title: "Добро пожаловать!",
    name: true,
    submit: "Зарегистрироваться",
    spanLink: "Уже зарегистрированы?",
    link: "Войти",
    linkTo: "/signin",
    onSubmit
  };

  return (
      <AuthForm {...propsAuthForm}></AuthForm>
  );
}

export default Register;
