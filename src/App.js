import React, { Component } from 'react';
import logo from './logo.svg.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Countries from './components/countries';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='world map' />
          {/* Photo by Kyle Glenn on Unsplash */}
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
}

export default App;
