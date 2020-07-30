import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchCountryList();
    }, 2000);
  }

  fetchCountryList() {
    fetch('/api/countries')
      .then(response => response.text())
      .then(data => JSON.parse(data))
      .then(countries => countries.map(cntry => cntry.name))
      .then(filtered => this.setState({ countryList: filtered }))
      .catch(err => console.log(err));
  }

  handleSelectChange(event) {
    const { value } = event.target;
    const { setParentState } = this.props;
    setParentState(value);
  }

  render() {
    const { countryList } = this.state;
    return (
      <select name="country" id="country" onChange={event => this.handleSelectChange(event)}>
        {countryList ? (
          countryList.map(country => <option value={country}>{country}</option>)
        ) : (
          <h2>asd</h2>
        )}
      </select>
    );
  }
}

export default SearchBar;
