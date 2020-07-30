import React, { useState } from 'react';
import countries from '../countryList';

const SearchBar = ({ setParentState }) => {
  const [countryList, setCountryList] = useState(countries);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     countryList: null,
  //   };
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.fetchCountryList();
  //   }, 2000);
  // }

  // remove fetch, use DB
  // fetchCountryList() {
  //   fetch('/api/countries')
  //     .then(response => response.text())
  //     .then(data => JSON.parse(data))
  //     .then(countries => countries.map(cntry => cntry.name))
  //     .then(filtered => this.setState({ countryList: filtered }))
  //     .catch(err => console.log(err));
  // }

  const handleSelectChange = event => {
    const { value } = event.target;
    // const { setParentState } = this.props;
    setParentState(value);
  };

  // const { countryList } = this.state;
  return (
    <select
      name="country"
      id="country"
      onChange={event => handleSelectChange(event)}
    >
      {countryList ? (
        countryList.map(country => <option value={country.name}>{country.name}</option>)
      ) : (
        <h2>asd</h2>
      )}
    </select>
  );
};

export default SearchBar;
