import React, { Component } from 'react';
import moment from 'moment';
import CountUp from 'react-countup';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from '@emotion/core';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import './SelectedCountryOverview.scss';

import { defaults, Doughnut } from 'react-chartjs-2';

defaults.global.legend.display = false;

const override = css`
  display: block;
  margin: 50px auto;
  border-color: red;
  width: 90px;
`;

class SelectedCountryOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: null,
      country: null,
      countryDataDiff: null,
    };
  }

  componentDidMount() {
    const { selected } = this.props;
    this.fetchCountryData(selected);
    setTimeout(() => {
      if (!this.state.countryData) {
        this.handleDataNotFound();
      }
    }, 3500);
  }

  handleDataNotFound() {
    this.props.resetSelect();
  }

  componentDidUpdate(prevProps) {
    const { selected } = this.props;
    const { countryData, countryDataDiff } = this.state;
    if (selected !== this.state.country) {
      this.fetchCountryData(selected);
    }
    if (countryData && !countryDataDiff) {
      this.fetchCountryDailyDiff(countryData.code);
    }
    if (countryData && countryDataDiff && countryData.code !== countryDataDiff.country) {
      this.fetchCountryDailyDiff(countryData.code);
    }
  }

  fetchCountryData(country) {
    const { selected } = this.props;
    this.setState({ country: selected });
    fetch(`/api/countryStats/${country}`)
      .then(response => response.text())
      .then(data => JSON.parse(data))
      .then(countryStats => this.setState({ countryData: countryStats[0] }))
      .catch(err => {
        console.log(err);
      });
  }

  fetchCountryDailyDiff(countryCode) {
    fetch(`/api/countryDifference/${countryCode}`)
      .then(res => res.text())
      .then(ress => JSON.parse(ress))
      .then(data => this.setState({ countryDataDiff: data }))
      .catch(err => console.log(err));
  }

  render() {
    const { countryData, countryDataDiff } = this.state;
    const { resetSelect } = this.props;
    return countryData ? (
      <section className="global-overview selected">
        <h1>
          <button type="submit" onClick={() => resetSelect()}>
            <i className="fa fa-angle-left" aria-hidden="true" />
          </button>
          {countryData.country}
          &nbsp;
          {getUnicodeFlagIcon(countryData.code)}
        </h1>
        <span className="last-update">
          {moment(countryData.lastChange).format('MMMM Do, HH:MM A')}
        </span>
        <Doughnut
          data={{
            labels: ['Confirmed', 'Recovered', 'Deaths'],
            datasets: [
              {
                data: [
                  countryData.confirmed,
                  countryData.recovered,
                  countryData.deaths,
                ],
                backgroundColor: ['#b4eaf5', '#b9ffb7', '#ff4f4f'],
                hoverBackgroundColor: ['#fff', '#fff', '#fff'],
              },
            ],
          }}
          height={55}
          width={55}
        />
        <div className="single">
          <div className="statistic-group">
            <div className="statistic confirmed">
              <span>
                <CountUp
                  start={0}
                  end={countryData.confirmed}
                  duration={3.25}
                  separator=","
                />
                <span className="difference">
                  { countryDataDiff && !countryDataDiff.error ? `+${countryDataDiff.new_cases}` : null }
                </span>
              </span>
              <h3>Confirmed</h3>
            </div>
            <div className="statistic recovered">
              <span>
                <CountUp
                  start={0}
                  end={countryData.recovered}
                  duration={3.25}
                  separator=","
                />
                <span className="difference">
                  { countryDataDiff && !countryDataDiff.error ? `+${countryDataDiff.new_recovered}` : null }
                </span>
              </span>
              <h3>Recovered</h3>
            </div>
          </div>
          <div className="statistic-group">
            <div className="statistic deaths">
              <span className="select">
                <CountUp
                  start={0}
                  end={countryData.deaths}
                  duration={3.25}
                  separator=","
                />
                <span className="difference">
                  { countryDataDiff && !countryDataDiff.error ? `+${countryDataDiff.new_deaths}` : null }
                </span>
              </span>
              <h3>Deaths</h3>
            </div>
            <div className="statistic critical">
              <span>
                <CountUp
                  start={0}
                  end={countryData.critical}
                  duration={3.25}
                  separator=","
                />
              </span>
              <h3>Critical</h3>
            </div>
          </div>
        </div>
      </section>
    ) : (
      <PulseLoader css={override} color="white" size={25} />
    );
  }
}

export default SelectedCountryOverview;
