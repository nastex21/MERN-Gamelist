import React, { Component } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import SteamGameList from './SteamList/steamgamelist';

class GenerateTable extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      console.log(this.props),
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
            <SteamGameList games={this.props.gamelist} />
          </tbody>
        </Table>
      </div>
    );
  }
}

export default GenerateTable; 