import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login({ options }) {

  useEffect(() => {
    options(false, false, true);
  }, [options]);

  function onSubmit (e) {
    e.preventDefault();
    console.log('Вошли!')
  }

  const propsAuthForm = {
    title: "Рады видеть!",
    name: false,
    submit: "Войти",
    spanLink: "Еще не зарегистрированы?",
    link: "Регистрация",
    linkTo: "/signup",
    onSubmit
  };

  return (
      <AuthForm {...propsAuthForm}></AuthForm>
  );
}

export default Login;
