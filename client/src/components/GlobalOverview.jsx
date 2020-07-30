import React from 'react';
import moment from 'moment';
import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';
import netherlands from '../db';
import diff from '../daily-diff';
import './GlobalOverview.scss';

const totalNewConfirmed = diff.map(a => a.new_cases).reduce((p, c) => p + c, 0);
const totalNewRecovered = diff.map(a => a.new_recovered).reduce((p, c) => p + c, 0);
const totalNewDeaths = diff.map(a => a.new_deaths).reduce((p, c) => p + c, 0);

const filteredData = netherlands.filter((a, i) => i % 7 === 0);
console.log(filteredData);

const data = {
  labels: filteredData
    .map(a => moment(a.last_update).format('DD/MMM'))
    .reverse(),
  datasets: [
    {
      label: 'Confirmed Cases',
      fill: true,
      lineTension: 0.9,
      backgroundColor: 'rgba(75,192,192,0.5)',
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
      data: filteredData.map(a => a.total_cases).reverse(),
    },
    {
      label: 'Recovered',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(24,255,19,0.4)',
      borderColor: 'rgba(24,255,19,1)',
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
      data: filteredData.map(a => a.total_recovered).reverse(),
    },
    {
      label: 'Deaths',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(244,15,19,0.4)',
      borderColor: 'rgba(244,15,19,1)',
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
      data: filteredData.map(a => a.total_deaths).reverse(),
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
    fetch('/api/total')
      .then(response => response.text())
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
            <span className="difference">
              +
              {totalNewConfirmed}
              {' '}
              (+
              {((totalNewConfirmed * 100) / statistics.confirmed).toString().substr(0, 4) }
              %)
            </span>
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
            <span className="difference">
              {' '}
              +
              {totalNewRecovered}
              (+
              {((totalNewRecovered * 100) / statistics.recovered).toString().substr(0, 4) }
              %)
            </span>
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
            <span className="difference">
              {' '}
              +
              {totalNewDeaths}
              (+
              {((totalNewDeaths * 100) / statistics.deaths).toString().substr(0, 4) }
              %)
            </span>
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
