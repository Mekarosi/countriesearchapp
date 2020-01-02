import React from 'react';
import propTypes from 'prop-types';

export const Search = ({ handleKepUp }) => {
  return (
    <input
      id='search'
      className='search'
      onKeyUp={handleKepUp}
      placeholder='Input country name'
      type='text'
    />
  );
};

Search.propTypes = {
  handleKepUp: propTypes.func.isRequired
};
