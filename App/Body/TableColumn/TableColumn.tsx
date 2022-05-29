import React, { MouseEventHandler } from 'react';
import styles from './tablecolumn.css';

interface IMyTableRow {
  myClass?: string,
  text: any[],
  keys: string,
  lang?: boolean
}

export default function TableColumn({ text, keys, lang = true, myClass }: IMyTableRow) {
  return (
    <div className={styles.column}>
      {text.map((el, i) => {
        if (i !== text.length - 1) {
          const classes = myClass ? styles.columnItem + ' ' + myClass : styles.columnItem
          return (
            <div key={text.indexOf(el)} className={classes}>
              {
                lang
                  ? typeof el[keys] == 'number' && el[keys].toString().length > 4 && (keys == 'E1' || keys == 'D1')
                    ? Math.round(el[keys] * 100) / 100
                    : el[keys]
                  : typeof el[keys] == 'number' && el[keys].toString().length > 4 && (keys == 'E1' || keys == 'F1')
                    ? Math.round(el[keys] * 100) / 100
                    : el[keys]
              }
            </div>
          )
        } else {
          return (
            <div key={text.indexOf(el)} className={styles.tableFooter}>
              {typeof el[keys] == 'number' && el[keys].toString().length > 4 && (keys == 'E1' || keys == 'D1')
                ? Math.round(el[keys] * 100) / 100
                : el[keys]
              }
            </div>
          )
        }
      })}
    </div>
  );

}
