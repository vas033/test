import React, { useEffect, useState } from 'react';
import * as xlsx from 'xlsx';
import url from '../src/data/Frontend\ Exercise.xlsx';
import tableEn from '../src/data/data_en.xlsx';
import TableColumn from './TableColumn/TableColumn';
import styles from './body.css';
import Option from './Option/Option';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IMyBody {
  lang: boolean
  btnClass: string
}

interface IMyDataObject {
  [key: string]: any
}

const Body = ({ lang, btnClass }: IMyBody) => {
  const tableHeaderEn = ['A/A', '№ BUYER', 'CATEGORY', 'YEAR', 'TOTAL GAS CONSUMPTION (kWh)', 'GAS PRICE (€)', 'COORDINATES X', 'COORDINATES Y', 'TOTAL'];
  const emptyLabel: string[] = []
  const emptyVal: number[] = [];

  const [labelPie, setLabelPie] = useState(emptyLabel)
  const [valuesPie, setValuesPie] = useState(emptyVal)

  const data = {
    labels: labelPie,
    datasets: [
      {
        label: '# of Votes',
        data: valuesPie,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'red'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'red'
        ],
        borderWidth: 1,
      },
    ],
  };

  const arr: unknown[] | object[] = [];
  const val: any[] = [];
  let tableHeader: unknown;


  const [json, setJson] = useState(arr);
  const [keys, setKeys] = useState(val);
  const [workBookLocale, setWorkBookLocale] = useState({});
  const [tableHeaderGr, setTabelHeaderGr] = useState(tableHeader)

  async function getData(link: string) {
    const data = await fetch(link)
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

          if (jsonReader) {
            setJson(jsonReader)
          };
        }
        reader.readAsArrayBuffer(blob);
      })
  }

  const handler = (str: string, workbook: object = workBookLocale) => {
    const sheet = Object(workbook).Sheets[str]
    const table = xlsx.utils.sheet_to_html(sheet)

    const header = document.getElementById('analiticsTitle');
    const tableDiv = document.getElementById('analiticsTableDiv');

    if (tableDiv) {
      header ? header.style.display = 'flex' : '';
      tableDiv.innerHTML = table;
    }

  }

  useEffect(() => {
    if (lang) {
      getData(url)
    } else {
      getData(tableEn)
    }
  }, [lang])

  useEffect(() => {
    if (typeof json == 'object' && json != null) {
      const smth = json[0];
      if (typeof smth == 'object' && smth != null) {
        const keysJson = Object.keys(smth);
        setKeys(keysJson);
      }

      let arrLabels: any[] = [];
      let arrValues: any[] = [];

      json.forEach((el, i, array) => {
        const obj: IMyDataObject = new Object(el);
        if (i > 0 && i < array.length - 1) {
          if (lang) {
            Object.keys(obj).forEach((key, i) => {
              key === 'A1' && i > 0
                ? arrLabels.push(obj[key])
                : '';

              key === 'D1' && i > 0
                ? arrValues.push(obj[key])
                : '';
            })
          } else {
            Object.keys(obj).forEach((key, i) => {
              key === 'B1' && i > 0
                ? arrLabels.push(obj[key])
                : '';

              key === 'E1' && i > 0
                ? arrValues.push(obj[key])
                : '';
            })
          }
        }
      })

      setLabelPie(arrLabels);
      setValuesPie(arrValues);
    }
  }, [json])

  return (
    <main className={styles.table}>
      <section id='mainTable' className={styles.tableBody}>
        <div className={styles.buyer} onClick={e => {
          const event = e.target;
          const el = Object(event);
          const value = el.innerHTML.slice(2)

          handler(value)

        }} >
          <TableColumn text={json} keys={keys[1]} myClass={styles.buyerCol} />
        </div>
        <div className={styles.informationContainer}>
          {keys.map((key, i) => {
            if (i > 1) {
              return (
                <TableColumn text={json} keys={key} key={key} lang={lang} />
              )
            }
          })}
        </div>
      </section>
      <section id="analyticTable" >
        <div id='analiticsTitle' style={{ display: 'none' }}
          className={styles.analiticsHeader}>
          <h2>
            {
              lang
                ? 'ΑΝΑΛΥΤΙΚΟΣ ΠΙΝΑΚΑΣ'
                : 'Detail table'
            }
          </h2>
          <button id='hideBtn'
            className={btnClass + ' ' + styles.btn}
            onClick={() => {
              const table = document.getElementById('analiticsTableDiv');
              const header = document.getElementById('analiticsTitle');

              header
                ? header.style.display = 'none'
                : '';

              table
                ? table.innerHTML = ''
                : '';
            }}>
            {
              lang
                ? 'ΑΠΟΚΡΙΨΗ'
                : 'hide'
            }
          </button>
        </div>
        <div id='analiticsTableDiv' className={styles.analyticsCont}></div>
      </section>

      <section id='graphics' className={styles.graphics}>
        <div className={styles.pie}>
          <p>
            {lang
              ? 'ΣΥΝΟΛΟ ΚΑΤΑΝΑΛΩΣΗΣ ΑΕΡΙΟΥ'
              : 'TOTAL CONSUMPTION OF GAS'
            }
          </p>
          <Pie data={data} />
        </div>
        <div className={styles.line}>
          {
            keys[1] !== undefined
              ? <Option text={json} keyEl={keys[1]} data={workBookLocale} lang={lang} />
              : ''
          }
        </div>

      </section>
    </main>
  );
}

export default Body;
