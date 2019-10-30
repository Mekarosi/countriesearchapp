import React, { Component } from 'react';
import axios from 'axios';
import { DropBox } from './dropBox';
import { Search } from './search';
import { CustomButton } from './customButton';
import { DetailsDisplay } from './detailsDisplay';

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
  // Event handling for dropBox
  handleChange = event => {
    const selectedCountry = event.target.value;

    const response = this.getData(
      `${END_POINTS.SEARCH_BY_NAME_API}${selectedCountry}`
    );

    response.then(countries =>
      this.setState((prevState, props) => ({
        countries: countries.data
      }))
    );
  };

  // Event handling for search input
  handleKeyUp = event => {
    const searchString = event.target.value;
  };

  searchCountriesArray = () => {
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

  // Event handle for button click
  handleClick = event => {
    // Get value from input
    const searchInput = document.getElementById('search').value;

    this.setState((prevState, props) => ({
      searchString: searchInput
    }));

    // Loop through the search String array and request server for countries
    setTimeout(() => {
      this.SearchCountriesArray.apply(this);
    }, 0);

    this.getData();
  };

  //Get name from country and update state
  getName() {
    const names = this.state.countries.map(country => country.name);
    this.setState((prevState, props) => ({ names }));
  }

  //Return n countries
  getCountriesByNumber(n) {
    return this.state.countries.slice(0, 10);
  }

  componentDidMount() {
    let initPromise = this.getData(END_POINTS.ALL_COUNTRIES_API);

    let names;
    initPromise.then(
      countries => (
        (names = countries.data.map(country => country.name)),
        this.setState((prevState, props) => ({
          countries: countries.data,
          names
        }))
      )
    );
  }

  render() {
    return (
      <div>
        <div>
          <h3>Select a country.</h3>
          <DropBox handleChange={this.handleChange} names={this.state.names} />
        </div>

        <div className='search-block'>
          <h3>Or search country1,country2,country3.</h3>

          <Search handleKeyUp={this.handleKeyUp} />

          <CustomButton handleClick={this.handleClick} />
        </div>
        <h3>Get countries here.</h3>
        <DetailsDisplay countries={this.getCountriesByNumber(10)} />
      </div>
    );
  }
}

export default Countries;
