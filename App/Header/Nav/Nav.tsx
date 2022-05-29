import React, { useEffect, useState } from 'react';
import styles from './nav.css';
import nav from '../../src/arrays/navHeader';
import logo from '../../src/img/logo-min.png';

export function Nav() {

  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPos(window.pageYOffset);
    };
    window.addEventListener('scroll', updatePosition);
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  useEffect(() => {
    const header = document.getElementById('appHeader');
    const logo = document.getElementById('navLogo');
    const pos = header?.offsetHeight;

    pos && scrollPos > pos
      ? logo?.classList.add(styles.navLogoShow)
      : logo?.classList.remove(styles.navLogoShow);
  }, [scrollPos])

  return (
    <nav id='nav' className={styles.nav}>
      <button id='navLogo' className={styles.navLogo}
        onClick={() => {
          document.getElementById('appHeader')?.scrollIntoView({ behavior: 'smooth' });
        }} >
        <img src={logo} alt="logo nav block" />
      </button>
      {nav.map(el => {
        return (
          <button
            key={el.name}
            className={styles.navBtn}
            onClick={() => {
              document.getElementById(el.id)?.scrollIntoView({ behavior: 'smooth' });
            }} >
            <img src={el.imgLink} alt={el.name} />
          </button>
        )
      })}
    </nav>
  );
}
