import React, { MouseEventHandler } from 'react';
import styles from './tablecolumn.css';

interface IMyTableRow {
  text: any[],
  keys: string,
}

export default function TableColumn({ text, keys }: IMyTableRow) {
  return (
    <div className={styles.column}>
      {text.map((el, i) => {
        if (i !== text.length - 1) {
          return (
            <div key={text.indexOf(el)} className={styles.columnItem}>
              {
                typeof el[keys] == 'number' && el[keys].toString().length > 4 && (keys == 'E1' || keys == 'D1')
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
