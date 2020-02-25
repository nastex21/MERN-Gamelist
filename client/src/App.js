import React, { Component } from "react";
import axios from "axios";
import SteamGameList from "./Components/steamgamelist";
import GogGameList from "./Components/goggamelist";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

export default class App extends Component {
  state = {
    games: []
  };

  getInfo = () => {
    var test = "http://localhost:5555/";
    axios.get(test).then(res => {
      console.log(res);
      this.setState({
        games: [...res.data.games]
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
          <button onClick={this.getInfo}>Get Steam games</button>
          {this.state.games.length === 0 ? null : (
            <p>You have {this.state.games.length} games on Steam</p>
          )}
        </div>
        {this.state.games.length === 0 ? null : this.tableRender()}
      </div>
    );
  }
}
