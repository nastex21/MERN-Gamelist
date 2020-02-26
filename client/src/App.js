import React, { Component } from "react";
import axios from "axios";
import GenerateTable from './Components/generateTable';
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

export default class App extends Component {
  state = {
    value: '',
    games: []
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var test = "http://localhost:5555/";
    var steamID = this.state.value;
    var data = {
      value: steamID
    };
    axios.post(test, data).then(res => {
      console.log(res.data);
      this.setState({
        games: [...this.state.games, ...res.data.games]
      });
    });
  };

  render() {
    console.log(this.state.games);
    return (
      <div>
        <div className="button">
          <form onSubmit={this.handleSubmit}>
            <p>If you know your Steam ID and your profile is public, please use your Steam ID otherwise please sign in with your Steam account.</p>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Get Steam games" />
          </form>
          <div className="steamLogIn">
            <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_border.png" />
          </div>
          {this.state.games.length === 0 ? null : (
            <p>You have {this.state.games.length} games</p>
          )}
        </div>
        {this.state.games.length === 0 ? null : <GenerateTable gamelist={this.state.games} />}
      </div>
    );
  }
}
