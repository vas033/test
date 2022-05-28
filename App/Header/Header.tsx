import React from 'react';
import styles from './header.css';
import logo from '../src/img/rhoe.png';

export function Header() {
  return (
    <header>
      <img src={logo} alt="logo" onClick={() => {
        scrollTo( 0, 0)
      }} />
    </header>
  );
}
