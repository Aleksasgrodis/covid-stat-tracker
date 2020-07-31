import React from 'react';
import moment from 'moment';
import CountUp from 'react-countup';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from '@emotion/core';
import netherlands from '../db';
import diff from '../daily-diff';
import './GlobalOverview.scss';

const override = css`
  display: block;
  margin: 50px auto;
  border-color: red;
  width: 90px;
`;

const totalNewConfirmed = diff.map(a => a.new_cases).reduce((p, c) => p + c, 0);
const totalNewRecovered = diff
  .map(a => a.new_recovered)
  .reduce((p, c) => p + c, 0);
const totalNewDeaths = diff.map(a => a.new_deaths).reduce((p, c) => p + c, 0);

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
    const { statistics } = this.state;
    return statistics ? (
      <>
        <section className="global-overview">
          <h1>Global Overview</h1>
          <span className="last-update">
            {moment(statistics.lastChange).format('MMMM Do, HH:MM A')}{' '}
          </span>
          <div className="statistic confirmed">
            <span>
              <CountUp
                start={0}
                end={statistics.confirmed}
                duration={3.25}
                separator=","
              />
              <span className="difference">
                +{totalNewConfirmed} (+
                {((totalNewConfirmed * 100) / statistics.confirmed)
                  .toString()
                  .substr(0, 4)}
                %)
              </span>
            </span>
            <h3>Confirmed</h3>
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
                +{totalNewRecovered}&nbsp;
                (+
                { ((totalNewRecovered * 100) / statistics.recovered)
                  .toString()
                  .substr(0, 4)}
                %)
              </span>
            </span>
            <h3>Recovered</h3>
          </div>
          <div className="statistic-group">
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
                  +{totalNewDeaths}&nbsp;
                   (+
                  { ((totalNewDeaths * 100) / statistics.deaths)
                    .toString()
                    .substr(0, 4)}
                  %)
                </span>
              </span>
              <h3>Deaths</h3>
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
              <h3>Critical Condition</h3>
            </div>
          </div>
        </section>
        {/* <div className="graph"><Line data={data} options={{}} /></div> */}
      </>
    ) : (
      <PulseLoader css={override} color="white" size={25} />
    );
  }
}

export default GlobalOverview;
