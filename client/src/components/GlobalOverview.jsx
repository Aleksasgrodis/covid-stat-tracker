import React from 'react';
import moment from 'moment';
import CountUp from 'react-countup';
import netherlands from '../db';
import { Line } from 'react-chartjs-2';
import './GlobalOverview.scss';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
  ],
};

class GlobalOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: null,
    };
    this.chartData = netherlands.filter((a, i) => i % 7 === 0);
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
      <section className="global-overview">
        <div className="statistic confirmed">
          <span>
            <CountUp
              start={0}
              end={statistics.confirmed}
              duration={3.25}
              separator=","
            />
          </span>
          <h4>Confirmed</h4>
        </div>
        <div className="statistic recovered">
          <span>
            <CountUp
              start={0}
              end={statistics.recovered}
              duration={3.25}
              separator=","
            />
          </span>
          <h4>Recovered</h4>
        </div>
        <div className="statistic deaths">
          <span>
            <CountUp
              start={0}
              end={statistics.deaths}
              duration={3.25}
              separator=","
            />
          </span>
          <h4>Deaths</h4>
        </div>
        <div className="statistic critical">
          <span>
            <CountUp
              start={0}
              end={statistics.critical}
              duration={3.25}
              separator=","
            />
          </span>
          <h4>Critical </h4>
        </div>
        <div className="statistic last-change">
          <span>
            {moment(statistics.lastChange).format('MMMM Do, HH:MM A')}
          </span>
          <h4>Last Change</h4>
        </div>
        <div className="graph">
          <Line data={data} />
        </div>
      </section>
    ) : (
      <h2>theyre not</h2>
    );
  }
}

export default GlobalOverview;
