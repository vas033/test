import React, { useEffect, useState } from 'react';
import styles from './option.css';
import * as xlsx from 'xlsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import arrow from '../../src/img/arrow.svg';
import styleSelect from './OptionCustom/optioncustom.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IMyOption {
  text: any[],
  keyEl: string,
  data: object,
  lang: boolean
}

interface IMyObj {
  [key: string]: number | string
}

function ExcelDateToJSDate(date: number) {
  return new Date(Math.round((date - 25569) * 86400 * 1000));
}

function DateToDateStr(date: number) {
  if (date < 10) {
    const dateStr = '0' + date.toString();
    return dateStr;
  } else {
    return date.toString();
  }

}


export default function Option({ text, keyEl, data, lang }: IMyOption) {
  const emptyLabel: string[] = [];
  const emptyValues: number[] = [];

  const [labels, setLabels] = useState(emptyLabel);
  const [values, setValues] = useState(emptyValues);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updatePosition = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const [valueCustom, setValueCustom] = useState('');

  useEffect(() => {
    const list = document.getElementById('choiceList');
    const arrow = document.getElementById('arrow');

    if (list && arrow) {
      if (isOpen) {
        list.style.display = 'block';
        arrow.classList.add(styleSelect.rotate);
      } else {
        list.style.display = 'none';
        arrow.classList.remove(styleSelect.rotate);
      }

    }
  }, [isOpen])


  useEffect(() => {
    const arrLabels: string[] = [];
    const arrValues: number[] = [];
    text.forEach((el) => {
      if (el['A1'] === valueCustom || el['B1'] === valueCustom) {
        const sheet = Object(data).Sheets[valueCustom.slice(2)];
        const currentData = xlsx.utils.sheet_to_json(sheet);
        currentData.forEach((el, i) => {
          if (i < currentData.length - 1) {
            if (typeof el === 'object' && el !== null) {
              const from: IMyObj = lang ? Object(el)['ΑΠO'] : Object(el)['From'];
              const to: IMyObj = lang ? Object(el)['ΕΩΣ'] : Object(el)['To'];

              if (typeof from === 'number' && typeof to === 'number') {
                const dateFrom = DateToDateStr(ExcelDateToJSDate(from).getDate()) + '/' + DateToDateStr(ExcelDateToJSDate(from).getMonth() + 1);
                const dateTo = DateToDateStr(ExcelDateToJSDate(to).getDate()) + '/' + DateToDateStr(ExcelDateToJSDate(to).getMonth() + 1);
                const label = dateFrom + ' - ' + dateTo
                arrLabels.push(label);
                setLabels(arrLabels);
              }

              const fuelConsumption: IMyObj = lang ? Object(el)['ΣΥΝΟΛΟ ΚΑΤΑΝΑΛΩΣΗΣ (kWh)'] : Object(el)['CONSULT CONSUMPTION (KWH)'];
              typeof fuelConsumption === 'number'
                ? arrValues.push(fuelConsumption)
                : '';

              setValues(arrValues);
            }
          }
        })
      }
    })
  }, [valueCustom])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: lang ? 'ΕΤΗΣΙΟ ΣΥΝΟΛΟ ΚΑΤΑΝΑΛΩΣΗΣ' : 'TOTAL CONSUMPTION OF GAS AT YEAR  ',
      },
    },
  };

  const dataGraphic = {
    labels,
    datasets: [
      {
        label: lang ? 'ΣΥΝΟΛΟ ΚΑΤΑΝΑΛΩΣΗΣ (kWh)' : 'TOTAL CONSUMPTION OF GAS (KWH)',
        data: values,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      {
        windowWidth < 880
          ? <select
            className={styles.select}
            name="buyer"
            id="buyerSelect"
            defaultValue='select buyer'
            onChange={(e) => {
              const value = e.currentTarget.value;
              const arrLabels: string[] = [];
              const arrValues: number[] = [];
              text.forEach((el) => {
                if (el['A1'] === value || el['B1'] === value) {
                  const sheet = Object(data).Sheets[value.slice(2)];
                  const currentData = xlsx.utils.sheet_to_json(sheet);
                  currentData.forEach((el, i) => {
                    if (i < currentData.length - 1) {
                      if (typeof el === 'object' && el !== null) {
                        const from: IMyObj = lang ? Object(el)['ΑΠO'] : Object(el)['From'];
                        const to: IMyObj = lang ? Object(el)['ΕΩΣ'] : Object(el)['To'];

                        if (typeof from === 'number' && typeof to === 'number') {
                          const dateFrom = DateToDateStr(ExcelDateToJSDate(from).getDate()) + '/' + DateToDateStr(ExcelDateToJSDate(from).getMonth() + 1);
                          const dateTo = DateToDateStr(ExcelDateToJSDate(to).getDate()) + '/' + DateToDateStr(ExcelDateToJSDate(to).getMonth() + 1);
                          const label = dateFrom + ' - ' + dateTo
                          arrLabels.push(label);
                          setLabels(arrLabels);
                        }

                        const fuelConsumption: IMyObj = lang ? Object(el)['ΣΥΝΟΛΟ ΚΑΤΑΝΑΛΩΣΗΣ (kWh)'] : Object(el)['CONSULT CONSUMPTION (KWH)'];
                        typeof fuelConsumption === 'number'
                          ? arrValues.push(fuelConsumption)
                          : '';

                        setValues(arrValues);

                      }
                    }
                  })
                }
              })
            }} >
            <option value="select buyer" disabled className={styles.option}>
              {
                lang
                  ? 'ΕΠΙΛΕΞΤΕ ΠΕΛΑΤΗ'
                  : 'Select buyer'
              }
            </option>
            {text.map((el, i) => {
              if (i > 0 && i < text.length - 1) {
                if (i == 1) {
                  return (
                    <option key={text.indexOf(el)} value={el[keyEl]} className={styles.option}>
                      {
                        el[keyEl]
                      }
                    </option>
                  );
                } else {
                  return (
                    <option key={text.indexOf(el)} value={el[keyEl]} className={styles.option} >
                      {
                        el[keyEl]
                      }
                    </option>
                  );
                }
              }
            })}
          </select>
          : <ul aria-label="select"
            className={styleSelect.select}
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            onChange={() => console.log('change')}
            
          >
            <div id='choice' className={styleSelect.selectTextContainer} onClick={() => { }}>
              <p id='choiceText'>
                {
                  lang
                    ? 'ΕΠΙΛΕΞΤΕ ΠΕΛΑΤΗ'
                    : 'Select buyer'
                }
              </p>
              <img id="arrow" src={arrow} alt="arrow button" />
            </div>
            <div id='choiceList' className={styleSelect.list}>
              {text.map((el, i) => {
                if (i > 0 && i < text.length - 1) {
                  if (i == 1) {
                    return (
                      <li key={text.indexOf(el)} className={styleSelect.item}
                        onClick={(e) => {
                          const value = e.currentTarget.innerText;
                          const select = document.getElementById('choiceText');
                          if (select) {
                            setValueCustom(value);
                            select.textContent = value;
                          }
                            

                          setIsOpen(!isOpen)

                        }}
                      >
                        {
                          el[keyEl]
                        }
                      </li>
                    );
                  } else {
                    return (
                      <li key={text.indexOf(el)} className={styleSelect.item}
                        onClick={(e) => {
                          const value = e.currentTarget.innerText;
                          const select = document.getElementById('choiceText');
                          if (select) {
                            setValueCustom(value);
                            select.textContent = value;
                          }

                          setIsOpen(!isOpen)

                        }}
                      >
                        {
                          el[keyEl]
                        }
                      </li>
                    );
                  }
                }
              })}
            </div>
          </ul>
      }
      <Line options={options} data={dataGraphic} />
    </div>
  )
}
