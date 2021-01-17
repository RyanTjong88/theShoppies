import React, { Component } from 'react';
import Search from './Search';
import Footer from './Footer';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="bodyColor">
        <div className="wrapper">
          <h1>The Shoppies</h1>
          <Search />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
