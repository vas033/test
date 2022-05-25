import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Table from './Table/Table';


const App = () => {
  return (
    <>
      <h1>it works</h1>
      <Table />
    </>
  )
};

const container = document.getElementById('react-app');
if (container) {
  const root = createRoot(container);

  root.render(<App />);
}