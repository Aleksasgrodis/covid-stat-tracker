import React from 'react';
import moment from 'moment';

class GlobalOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: null,
    };
  }

  componentDidMount() {
    this.fetchGlobalData();
  }

  fetchGlobalData() {
    fetch('/totals?format=json', {
      headers: {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        'x-rapidapi-key': 'fe19d920b6mshda2e13a544d46e0p1c15edjsn637f024a0cdd',
      },
    })
      .then(response => response.text())
      // .then(data => this.setState({ statistics: data }));
      .then(data => this.setState({ statistics: JSON.parse(data)[0] }))
      .catch(err => console.log(err));
  }

  render() {
    // const {
    //   statistics:
    //   {
    //     confirmed,
    //     critical,
    //     deaths,
    //     recovered,
    //     lastChange
    //   },
    // } = this.state;
    // return this.statistics ? {confirmed} : <h2>loading</h2>
    const { statistics } = this.state;
    return statistics ? (
      <>
        <h2>
          confirmed:
          {statistics.confirmed}
        </h2>
        <h2>
          recovered:
          {statistics.recovered}
        </h2>
        <h2>
          deaths:
          {statistics.deaths}
        </h2>
        <h2>
          critical:
          {statistics.critical}
        </h2>
        <h2>
          Last change:
          {moment(statistics.lastChange).format('MMMM Do, HH:MM A')}
        </h2>
      </>
    ) : <h2>theyre not</h2>;
  }
}

export default GlobalOverview;
