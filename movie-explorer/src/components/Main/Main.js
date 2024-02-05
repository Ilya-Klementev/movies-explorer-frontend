import React, { useEffect, useRef } from 'react';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Main({ options }) {
  const aboutProjectRef = useRef(null);

  const scrollFunction = () => {
    aboutProjectRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    options(true, true, false);
  }, [options]);

  return (
    <main className="main">
      <Promo scrollFunction={scrollFunction}></Promo>
      <AboutProject refProps={ aboutProjectRef }></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </main>
  );
}

export default Main;
