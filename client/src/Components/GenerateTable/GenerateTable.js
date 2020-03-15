import React from 'react';
import Table from 'react-bootstrap/Table';

function GenerateTable({ gamelist }) {
  console.log(gamelist);

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
        {gamelist.map((items, idx) => {
          if(items.provider == "steam"){
          return(
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>
              {items.game_img == '' ? null : <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${items.game_appid}/${items.game_img}.jpg`} alt={"Box art of " + items.game_name}
              />}
            </td>
            <td>{items.game_name}</td>
            <td>{items.game_system}</td>
          </tr>)
         } else if (items.provider == "manual") {
          return (
            <tr key={idx}>
            <td>{idx + 1}</td>
            <td>
              {items.game_img == '' ? null : <img style={{'width': 184, 'height': 69}} src={items.game_img} alt={"Box art of " + items.game_name}
              />}
            </td>
            <td>{items.game_name}</td>
            <td>{items.game_system}</td>
          </tr>
          )
         }})}
      </tbody>
    </Table>
  </div>
}

export default GenerateTable;