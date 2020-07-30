import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countries from '../countryList';
import './SearchBar.scss';

function SearchBar({ setParentState }) {
  const handleSelectChange = value => {
    // const { setParentState } = this.props;
    if (countries.map(a => a.name.toLowerCase()).includes(value.toLowerCase())) {
      setParentState(value);
    }
  };
  return (
    <div className="search-bar">
      <Autocomplete
        onChange={event => console.log(event.target.value)}
        id="combo-box-demo"
        options={countries}
        style={{ borderRadius: 5 }}
        getOptionLabel={option => option.name}
        onInputChange={(event, newInputValue) => {
          handleSelectChange(newInputValue);
        }}
        renderInput={params => (
          <TextField
            {...params}
            label="Filter by country"
            variant="filled"
            color="secondary"
            style={{ background: '#fff', color: 'secondary', borderRadius: 5 }}
          />
        )}
      />
    </div>
  );
}

export default SearchBar;
