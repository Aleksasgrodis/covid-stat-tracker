import React, { Component } from 'react';
import GlobalOverview from './components/GlobalOverview';
import SearchBar from './components/SearchBar';
import logo from './logo.svg';
import './App.css';

const App = () => {
  return (
    <>
      <SearchBar />
      <h1>hello, i am app</h1>
      <GlobalOverview />
    </>
  );
};

export default App;
