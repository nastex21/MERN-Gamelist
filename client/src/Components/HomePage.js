import React, { Component } from "react";
import axios from "axios";
import GenerateTable from "./generateTable";
import SteamForm from './SteamList/SteamForm';
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

export default class HomePage extends Component {
  state = {
    value: "",
    steam: 0, 
    games: []
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  };

 handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.value);
    var steamID = this.state.value;
    var data = {
      value: steamID
    };
    axios.post('/api/get-games-list', data).then(res => {
      console.log(res.data);
      this.setState({
        games: [...this.state.games, ...res.data.games],
        steam: 1
      });
    });
  }; 

  handleClick = () => {
    window.open("http://localhost:5555/auth/steam", "_self");
  }

  render() {
    console.log(this.state.games);
    return (
      <div>
        <div className="button">
          {this.state.steam == 0 ? <SteamForm value={this.state.value} onChange={this.handleChange} submit={this.handleSubmit} /> : null}
          <div className="steamLogIn">
            <a onClick={this.handleClick}>
              <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_border.png" />
            </a>
          </div>
          {this.state.games.length === 0 ? null : (
            <p>You have {this.state.games.length} games</p>
          )}
        </div>
        {this.state.games.length === 0 ? null : (
          <GenerateTable gamelist={this.state.games} />
        )}
      </div>
    );
  }
}
