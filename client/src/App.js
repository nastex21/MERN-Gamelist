import React, { Component } from "react";
import axios from "axios";
import SteamGameList from "./Components/steamgamelist";
import GogGameList from "./Components/goggamelist";
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

  tableRender = () => {
    return (
      <div className="table">
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <SteamGameList games={this.state.games} />
          </tbody>
        </Table>
      </div>
    );
  };
  render() {
    console.log(this.state.games.length);
    return (
      <div>
        <div className="button">
          <form onSubmit={this.handleSubmit}>
            <p>If you know your Steam ID and your profile is public, please use your Steam ID.</p>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Get Steam games" />
          </form>
          {this.state.games.length === 0 ? null : (
            <p>You have {this.state.games.length} games on Steam</p>
          )}
        </div>
        {this.state.games.length === 0 ? null : this.tableRender()}
      </div>
    );
  }
}
