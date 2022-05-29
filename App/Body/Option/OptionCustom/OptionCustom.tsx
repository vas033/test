import React, { useEffect, useState } from 'react';
import styles from './optioncustom.css';
import arrow from '../../../src/img/arrow.svg';



export function OptionCustom() {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const list = document.getElementById('choiceList');
    const arrow = document.getElementById('arrow');

    if (list && arrow) {
      if (isOpen) {
        list.style.display = 'block';
        arrow.classList.add(styles.rotate);
      } else {
        list.style.display = 'none';
        arrow.classList.remove(styles.rotate);
      }

    }
  }, [isOpen])


  return (
    <ul aria-label="select"
      className={styles.select}
      onClick={() => {
        setIsOpen(!isOpen)

      }
      }
    >
      <div id='choice' className={styles.selectTextContainer} onClick={() => { }}>
        <p>select buyer</p>
        <img id="arrow" src={arrow} alt="arrow button" />
      </div>
      <div id='choiceList' className={styles.list}>
        <li className={styles.item}
          onClick={(e) => {
            const value = e.currentTarget.innerText;
            const select = document.getElementById('choice');
            select
              ? select.textContent = value
              : ''

            setIsOpen(!isOpen)

          }}
        >item 1</li>
        <li className={styles.item}
          onClick={(e) => {
            const event = e.currentTarget.innerText;

            const select = document.getElementById('choice');
            select
              ? select.textContent = event
              : ''

            setIsOpen(!isOpen)
          }}
        >item 2</li>
      </div>
    </ul>
  );
}
