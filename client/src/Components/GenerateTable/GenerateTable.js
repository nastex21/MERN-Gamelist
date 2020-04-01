import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from "react-bootstrap/Pagination";

function GenerateTable({ gamelist, gameslist2 }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    setGames([...gameslist2, ...gamelist])
  }, [gamelist, gameslist2]);

  return <div className="table">
    <Table striped bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th>Name</th>
          <th>System</th>
          <th>Release Year</th>
        </tr>
      </thead>
      <tbody>
        {games.map((items, idx) => {
          return (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                {items.game_img == '' ? null : items.provider == "manual" ? <img style={{ 'width': 184, 'height': 69 }} src={items.game_img} alt={"Box art of " + items.game_name}
                /> : <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${items.game_appid}/${items.game_img}.jpg`} alt={"Box art of " + items.game_name}
                /> }
              </td>
              <td>{items.game_name}</td>
              <td>{items.game_system}</td>
              <td>{items.game_release !== undefined ? items.game_release.substr(0,4) : null}</td>
            </tr>
          ) 
        })}
      </tbody>
    </Table>
  </div>
}

export default GenerateTable;