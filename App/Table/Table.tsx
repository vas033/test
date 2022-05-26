import React, { lazy, MouseEventHandler, useEffect, useState } from 'react';
import * as xlsx from 'xlsx';
import url from '../src/data/Frontend\ Exercise.xlsx';
import TableColumn from './TableColumn/TableColumn';
import styles from './table.css';
import { Doughnut } from 'react-chartjs-2';


const Table = () => {
  const arr: unknown[] | object[] = [];
  const val: any[] = [];

  const [json, setJson] = useState(arr);
  const [keys, setKeys] = useState(val);
  const [workBookLocale, setWorkBookLocale] = useState({});



  async function getData() {
    const data = await fetch(url)
      .then((resp: any) => resp.blob())
      .then(blob => {

        const reader = new FileReader();
        reader.onload = (e) => {
          const dataReader = e.target?.result;
          const workbook = xlsx.read(dataReader, { type: "array" });

          setWorkBookLocale(workbook)
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonReader: unknown[] | object[] = xlsx.utils.sheet_to_json(worksheet, { header: Object.keys(worksheet) });

          jsonReader ? setJson(jsonReader) : '';
        }
        reader.readAsArrayBuffer(blob);
      })
  }

  const handler = async (str: string, workbook: object = workBookLocale) => {
    const reader = new FileReader();
    const sheet = Object(workbook).Sheets[str]
    const table = xlsx.utils.sheet_to_html(sheet)

    const analyticsCont = document.getElementById('analyticTable');
    analyticsCont
      ? analyticsCont.innerHTML = table
      : '';
  }

  console.log(json)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const graphic = [];
    if (typeof json == 'object' && json != null) {
      const smth = json[0];
      if (typeof smth == 'object' && smth != null) {
        const keysJson = Object.keys(smth);
        setKeys(keysJson);
      }

      json.forEach((el) => {
        const obj = new Object(el);
        console.log(obj)
      })
      
    }
  }, [json])
  console.log(keys)

  return (
    <div className={styles.table}>
      <div className={styles.tableBody}>
        <div className='buyer' onClick={e => {
          const event = e.target;
          const el = Object(event);
          const value = el.innerHTML.slice(2)

          handler(value)

        }} >
          <TableColumn text={json} keys={keys[1]} />
        </div>
        <div className={styles.informationContainer}>
          {keys.map((key, i) => {
            if (i > 1) {
              return (
                <TableColumn text={json} keys={key} key={key} />
              )
            }
          })}
        </div>
      </div>
      <div id='tableFooter' className={styles.footer}></div>
      <div id="analyticTable" className={styles.analyticsCont}></div>
      {/* <LineChart
        width={400}
        height={400}
        // data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
      </LineChart> */}
    </div>
  );
}

export default Table;
