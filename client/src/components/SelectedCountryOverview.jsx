import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['Confirmed', 'Recovered', 'Deaths'],
  datasets: [
    {
      data: [17255093, 10740492, 672425],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};
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
      this.fetchCountryData(selected);
    }
  }

  fetchCountryData(country) {
    this.setState({ country: this.props.selected });
    fetch(`/api/countries/${country}`)
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
        <h1>critical: {countryData.critical}</h1>
        <h1>deaths: {countryData.deaths}</h1>
        <h1>recovered: {countryData.recovered}</h1>
        <h1>country: {countryData.lastChange}</h1>
        <Pie
          data={{
            labels: ['Confirmed', 'Recovered', 'Deaths'],
            datasets: [
              {
                data: [countryData.confirmed, countryData.recovered, countryData.deaths],
                backgroundColor: ['#fff', '#b9ffb7', '#d62828'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              },
            ],
          }}
        />
      </>
    ) : (
      <>
        <h2>select country to view</h2>
      </>
    );
  }
}

export default SelectedCountryOverview;
