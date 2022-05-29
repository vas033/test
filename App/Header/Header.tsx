import React from 'react';
import styles from './header.css';
import logo from '../src/img/rhoe.png';
import { Nav } from './Nav';

interface IMyHeader {
  lang: boolean
}

export function Header({lang}:IMyHeader) {
  return (
    <header id='appHeader' className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <h1 className={styles.title}>
        {
          lang 
          ? 'ΠΙΝΑΚΑΣ ΔΙΑΧΕΙΡΙΣΗΣ'
          : 'Administration panel'
        }
      </h1>
      <Nav />
    </header>
  );
}
