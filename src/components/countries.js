import React, { Component } from 'react';

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
  render() {
    return <div></div>;
  }
}

export default Countries;
