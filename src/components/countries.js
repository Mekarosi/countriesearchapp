import React, { Component } from 'react';
import axios from 'axios';
import { DropBox } from './dropBox';

const END_POINTS = {
  ALL_COUNTRIES_API: 'https://restcountries.eu/rest/v2/all',
  SEARCH_BY_NAME_API: 'https://restcountries.eu/rest/v2/name/'
};

class Countries extends Component {
  state = {
    countries: [],
    searchString: '',
    names: []
  };

  async getData(END_POINT) {
    this.setState((prevState, props) => ({
      countries: []
    }));
    try {
      const response = await axios.get(END_POINT, {
        header: { 'Content-Type': 'application/json' }
      });
      return response;
    } catch (err) {
      // i catch the return server error
      console.log('Server error:', err);
      return [];
    }
  }
  // Event for dropBox
  handleChange = ev => {
    const selectedCountry = ev.target.value;

    const response = this.getData(
      `${END_POINTS.SEARCH_BY_NAME_API}${selectedCountry}`
    );

    response.then(countries =>
      this.setState((prevState, props) => ({
        countries: countries.data
      }))
    );
  };

  // Event for search input change
  handleKeyUp = event => {
    const searchString = event.target.value;
  };

  searchCountryArray = () => {
    const countriesArray = this.state.searchString.split(',');
    let promises = [];
    const that = this;
    for (let i = 0; i < countriesArray.length; i++) {
      promises[i] = this.getData(
        `${END_POINTS.SEARCH_BY_NAME_API}${countriesArray[i]}`
      );
    }

    Promise.all([...promises])
      .then(res => {
        console.log('search results: , res');
        const countries = res.map(countriesData => countriesData.data);
        that.setState({
          countries
        });
      })
      .catch(err => console.log('error: ', err));
  };

  render() {
    return (
      <div>
        <h3>Select a country.</h3>
        <DropBox handleChange={this.handleChange} names={this.state.names} />
      </div>
    );
  }
}

export default Countries;
