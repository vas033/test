import React, { useEffect, useState } from 'react';
import styles from './footer.css';
import logo from '../src/img/rhoe.png';
import nav from '../src/arrays/navHeader';

interface IMyFooter {
  lang: boolean
}

export function Footer({lang}:IMyFooter) {
  const [scrollPos, setScrollPos] = useState(0);
  const footer = document.getElementById('footer');
  const pos = footer?.getBoundingClientRect().top;

  useEffect(() => {
    const updatePosition = () => {
      setScrollPos(window.pageYOffset);
    };
    window.addEventListener('scroll', updatePosition);
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  useEffect(() => {
    const nav = document.getElementById('nav');
    const langBtn = document.getElementById('langBtn');
    if (pos && nav && langBtn) {
      if (scrollPos > pos ) {
        nav.style.bottom = '-10%'
        langBtn.style.bottom = '-10%'
      } else {
        nav.style.bottom = '2%';
        langBtn.style.bottom = '4%';
      }
    }
  
  }, [scrollPos])

  return (
    <footer id='footer' className={styles.footer}>
      <img src={logo} alt="logo" 
      className={styles.logo}
      onClick={() => {
         document.getElementById('appHeader')?.scrollIntoView({behavior:'smooth'})
      }}/>
      <nav className={styles.nav}>
        {
          nav.map(el => {
            return (
              <a href={`#${el.id}`} key={el.name} className={styles.link} onClick={(e) => {
                e.preventDefault();
                document.getElementById(el.id)?.scrollIntoView({behavior:'smooth'})
              }}>
                {
                  lang
                  ? el.nameGr
                  : el.name
                }
              </a>
            )
          })
        }
      </nav>
      <div className={styles.nav}>
        <a className={styles.link} href="https://www.facebook.com/" target='_blank'>Facebook</a>
        <a className={styles.link} href="https://www.linkedin.com/" target='_blank'>LinkedIn</a>
      </div>
    </footer>
  );
}
