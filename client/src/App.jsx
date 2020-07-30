import React, { Component } from 'react';
import GlobalOverview from './components/GlobalOverview';
import SearchBar from './components/SearchBar';
import SelectedCountryOverview from './components/SelectedCountryOverview';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: null,
    };
    this.childStateChangeHandler = this.childStateChangeHandler.bind(this);
  }

  childStateChangeHandler(country) {
    this.setState({
      selectedCountry: country,
    });
  // console.log(`say something`);
  }

  // componentDidMount() {
  //   this.setState({
  //     selectedCountry: 'nigeria',
  //   });
  // }

  render() {
    const { selectedCountry } = this.state;
    return (
      <>
        <SearchBar setParentState={this.childStateChangeHandler} />
        <h1>hello, i am app</h1>
        <GlobalOverview />
        <SelectedCountryOverview selected={selectedCountry} />
      </>
    );
  }
}

export default App;
