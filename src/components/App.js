import React, { Component } from 'react';
import Search from './Search';
import '../App.css';

class App extends Component {
  render() {
    return (
      <>
        <div className="wrapper">
          <h1>The Shoppies</h1>
          <Search />
        </div>
      </>
    );
  }
}

export default App;
