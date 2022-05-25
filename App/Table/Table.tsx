import React, { lazy, useEffect, useState } from 'react';
import * as xlsx from 'xlsx';
import url from '../src/data/Frontend\ Exercise.xlsx';

const Table = () => {
  const arr: unknown[] | object[] = [];
  const val: any[] = [];

  const [json, setJson] = useState(arr);
  const [colsLength, setColsLength] = useState(0);
  const [values, setValues] = useState(val)

  async function getData() {
    const data = await fetch(url)
      .then((resp: any) => resp.blob())
      .then(blob => {

        const reader = new FileReader();
        reader.onload = (e) => {
          const dataReader = e.target?.result;
          const workbook = xlsx.read(dataReader, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonReader: unknown[] | object[] = xlsx.utils.sheet_to_json(worksheet, { header: Object.keys(worksheet) });

          jsonReader ? setJson(jsonReader) : '';
        }
        reader.readAsArrayBuffer(blob);
      })
  }

  console.log(json)
  
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const obj: unknown | object = json[0];
    const valuesArr: any[] = [];

    if (typeof obj == 'object' && obj != null) {
      setColsLength(Object.keys(obj).length - 1);
    }

    json.forEach((el, i) => {
      if (typeof el == 'object' && el != null) {
        i !== json.length - 1
          ? valuesArr.push(Object.values(el).slice(1))
          : valuesArr.push(Object.values(el));
      }
    });

    setValues(valuesArr)
  }, [json])
  
  console.log(values)

  return (
    <table>
      <thead >
        <tr>
          <th colSpan={colsLength}>table</th>
        </tr>
      </thead>
    </table>
  );
}

export default Table;
