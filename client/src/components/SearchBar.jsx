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
    fetch('/help/countries?format=json', {
      headers: {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        'x-rapidapi-key': 'fe19d920b6mshda2e13a544d46e0p1c15edjsn637f024a0cdd',
      },
    })
      .then(response => response.text())
      .then(data => JSON.parse(data))
      .then(countries => countries.map(cntry => cntry.name))
      .then(filtered => this.setState({ countryList: filtered }))
      .catch(err => console.log(err));
  }

  render() {
    const { countryList } = this.state;
    return (
      <select name="country" id="country">
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
