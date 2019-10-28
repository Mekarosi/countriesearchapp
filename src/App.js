import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Countries from './components/Countries';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>
          Select a country from the dropdown list or make a search.{' '}
        </h1>
      </header>
      <div className='container'>
        <div>
          <Countries />
        </div>
      </div>
    </div>
  );
}

export default App;
