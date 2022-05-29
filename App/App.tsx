import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './app.css';
import { createRoot } from 'react-dom/client'
import Body from './Body/Body';
import { Header } from './Header';
import { OptionCustom } from './Body/Option/OptionCustom';
import { Footer } from './Footer';


const App = () => {
  const [lang, setLang] = React.useState(true); //default GR
  return (
    <>
      <Header lang={lang} />
      <Body lang={lang} btnClass={styles.btn} />
      <button 
      id='langBtn'
      className={styles.btn}
      onClick={() => {
        setLang(!lang)
      }}
        style={{ position: 'fixed', right: '5%', bottom: '4%' }}
      >
        {
          !lang
            ? 'EN'
            : "GR"
        }
      </button>
      <Footer lang={lang} />
    </>
  )
};

const container = document.getElementById('react-app');
if (container) {
  const root = createRoot(container);

  root.render(<App />);
}