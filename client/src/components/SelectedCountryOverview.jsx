import React, { Component } from 'react';

class SelectedCountryOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: null,
      country: null,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.props;
    console.log(prevProps, prevState);
    console.log(this.props, this.state);
    if (this.props.selected !== this.state.country) {
      console.log('should run once!');
      setTimeout(() => {
        this.fetchCountryData(selected);
      }, 1500);
    }
  }

  fetchCountryData(country) {
    this.setState({ country: this.props.selected });
    fetch(`/country?format=json&name=${country}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        'x-rapidapi-key': 'fe19d920b6mshda2e13a544d46e0p1c15edjsn637f024a0cdd',
      },
    })
      .then(response => response.text())
      .then(data => JSON.parse(data))
      .then(countryStats => this.setState({ countryData: countryStats[0] }))
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { countryData } = this.state;
    return countryData ? (
      <>
        <h1>confirmed total: {countryData.confirmed}</h1>
        <h1>country: {countryData.country}</h1>
      </>
    ) : (
      <h2>select country to view</h2>
    );
  }
}

export default SelectedCountryOverview;
