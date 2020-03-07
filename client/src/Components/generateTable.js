import React from 'react';
import Table from 'react-bootstrap/Table';
import SteamGameList from './SteamList/steamgamelist';

function GenerateTable({ gamelist }) {

  return <div className="table">
    <Table striped bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <SteamGameList games={gamelist} />
      </tbody>
    </Table>
  </div>
}

export default GenerateTable;