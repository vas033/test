import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import Body from './Body/Body';
import { Header } from './Header';


const App = () => {
  const [lang, setLang] = React.useState(true); //default GR
  return (
    <>
      <Header />
      <Body lang={lang} />
      <button onClick={() => {
        setLang(!lang)
      }}
        style={{ position: 'fixed', right: '5%', bottom: '5%' }}
      >
        {
          !lang
            ? 'EN'
            : "GR"
        }
      </button>
    </>
  )
};

const container = document.getElementById('react-app');
if (container) {
  const root = createRoot(container);

  root.render(<App />);
}