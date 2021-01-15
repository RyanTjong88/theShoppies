import React, { Component } from 'react';
import Search from './Search';
import styled from 'styled-components';

const Global = styled.div`
    width: 90%;
    max-width: 1280px;
    margin: 0 auto;

    h1 {
      font-size: 3rem;
    }
`;

class App extends Component {
  render() {
    return (
      <>
        <Global className="wrapper">
          <h1>The Shoppies</h1>
          <Search />
        </Global>
      </>
    );
  }
}

export default App;
