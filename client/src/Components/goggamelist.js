import React, { Component } from "react";
import axios from "axios";

export default class GogGameList extends Component {

  //User ID: 46987937250904606
  state = {
    games: []
  };

  //image construction: `http://media.steampowered.com/steamcommunity/public/images/apps/${res.data.games[0].appid}/${res.data.games[0].img_logo_url}.jpg`
  //${`item.appid`}/${`item.img_logo_url`}.jpg
  getInfo = () => {
    var test = "http://localhost:5555/";
    axios.get(test).then(res => {
      console.log(res);
      this.setState({
        games: [...res.data.games]
      });
    });
  };

  render() {
    let { games } = this.state;
    console.log(this.state.games);
    // appid =
    // <img src={this.state.img} />
    // <p>{this.state.game}</p>
    return (
      <div>
        <div className="button">
          <button onClick={this.getInfo}> "Get GOG games" </button>
        </div>
        <div className="gameList">
          <p>You have {this.state.games.length} games on GOG</p>
          {games.map(items => (
            <div key={items.appid}>
              <img
                src={`http://media.steampowered.com/steamcommunity/public/images/apps/${items.appid}/${items.img_logo_url}.jpg`}
              />
              <p>{items.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
