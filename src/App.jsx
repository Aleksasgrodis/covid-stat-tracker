import React, { Component } from 'react';
import GlobalOverview from './components/GlobalOverview';
import SearchBar from './components/SearchBar';
import SelectedCountryOverview from './components/SelectedCountryOverview';
import NewsFeed from './components/NewsFeed';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: null,
    };
    this.childStateChangeHandler = this.childStateChangeHandler.bind(this);
    this.resetSelectHandler = this.resetSelectHandler.bind(this);
  }

  childStateChangeHandler(country) {
    this.setState({
      selectedCountry: country,
    });
  }

  resetSelectHandler() {
    this.setState({
      selectedCountry: null,
    });
  }

  render() {
    const { selectedCountry } = this.state;
    return (
      <>
        <SearchBar setParentState={this.childStateChangeHandler} />
        { selectedCountry
          ? (
            <SelectedCountryOverview
              selected={selectedCountry}
              resetSelect={this.resetSelectHandler}
            />
          )
          : <GlobalOverview />}
        <NewsFeed />
      </>
    );
  }
}

export default App;
