import React, { Component } from "react";

export default class SteamGameList extends Component {
  render() {
    return (
      <>
        {this.props.games.map((items, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>
              {items.img_logo_url == '' ? null :  <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${items.appid}/${items.img_logo_url}.jpg`} alt={"Box art of " + items.name}
              />}
            </td>
            <td>{items.name}</td>
          </tr>
        ))}
      </>
    );
  }
}