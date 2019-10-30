import React from 'react';
import propTypes from 'prop-types';

export const Search = ({ handleKepUp }) => {
  return (
    <input
      id='search'
      className='search'
      onKeyUp={handleKepUp}
      placeholder='add country names with commas'
      type='text'
    />
  );
};

Search.propTypes = {
  handleKepUp: propTypes.func.isRequired
};
