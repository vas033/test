import React from 'react';
import styles from './tablerow.css';

interface IMyTableRow {
  header?: boolean,
  text: any[],
  length?: number
}

export default function TableRow({ header = false, text, length = 1 }: IMyTableRow) {
  if (header) {
    return (
      <tr>
        {
          text.map{}
        }
      </tr>
    );
  } else {
    return (
      <td colSpan={length}>
        {text}
      </td>
    );
  }
}
