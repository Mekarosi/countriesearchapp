import React, { Component } from 'react';
import axios from 'axios';

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
  render() {
    return <div></div>;
  }
}

export default Countries;
