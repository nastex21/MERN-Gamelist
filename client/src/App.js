import React, { Component } from "react";
import HomePage from "./Components/HomePage";
import  { BreakpointProvider } from 'react-socks';
import './Components/css/App.css';

class App extends Component {
  render() {
    return (<BreakpointProvider>
        <HomePage />
    </BreakpointProvider>
    )
  }
}

export default App;