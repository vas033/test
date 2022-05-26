import React, { MouseEventHandler } from 'react';
import styles from './tablecolumn.css';

interface IMyTableRow {
  text: any[],
  keys: string,
  handler?:() => void
}

export default function TableColumn({ text, keys, handler }: IMyTableRow) {

  return (
    <div className={styles.column}>
      {text.map((el, i) => {
        if (i !== text.length - 1) {
          return (
            <div key={text.indexOf(el)} data-index={keys} className='a' >
              {
                typeof el[keys] == 'number' && el[keys].toString().length > 4 && (keys == 'E1' || keys == 'D1')
                  ? Math.round(el[keys] * 100) / 100
                  : el[keys]
              }
            </div>
          )
        } else {
          const footer = document.getElementById('tableFooter');

          if (typeof el[keys] != 'undefined' && footer) {

            footer.innerHTML = footer.innerHTML + `<div key=${text.indexOf(el)} >
                ${typeof el[keys] == 'number' && el[keys].toString().length > 4 && (keys == 'E1' || keys == 'D1')
                ? Math.round(el[keys] * 100) / 100
                : el[keys]
              }
              </div>`
          }
        }
      })}
    </div>
  );

}
