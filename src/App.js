import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDo from './ToDo';
import Styled from 'styled-components'


const Container = Styled.div`
  width: 45%;
  height: 300px;
  text-align: center;
`;


class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <ToDo />
        </Container>
      </div>
    );
  }
}

export default App;
