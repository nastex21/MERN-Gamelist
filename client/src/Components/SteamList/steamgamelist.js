import React, { Component } from "react";

export default class SteamGameList extends Component {
  render() {
    return (
      <>
        {this.props.games.map((items, idx) => {
          return(
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>
              {items.game_img == '' ? null : <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${items.game_appid}/${items.game_img}.jpg`} alt={"Box art of " + items.game_name}
              />}
            </td>
            <td>{items.game_name}</td>
            <td>{items.game_system}</td>
          </tr>
        )})}
      </>
    );
  }
}