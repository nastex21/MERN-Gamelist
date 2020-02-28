import React, { Component } from "react";
import axios from "axios";
import GenerateTable from "./generateTable";
import SteamForm from './SteamList/SteamForm';
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

export default class HomePage extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      profileImageUrl: PropTypes.string,
      steamId: PropTypes.string,
      screenName: PropTypes.string,
      _id: PropTypes.string
    })
  };

  state = {
    user: {},
    error: null,
    authenticated: false,
    value: "",
    steamId: '',
    steam: 0,
    games: []
  };

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        console.log("failed")
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        console.log('success')
        console.log(responseJson.user);
        this.setState({
          authenticated: true,
          user: responseJson.user,
          steamId: responseJson.user.steamId
        });
      })
      .catch(error => {
        console.log('failed 2nd')
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.steamId !== this.state.steamId) {
      var steamID = this.state.steamId;
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
    }
  }

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
    console.log(this.state);
    return (
      <div>
        <div className="button">
          {this.state.steam == 0 && this.state.steamId == '' ? <SteamForm value={this.state.value} onChange={this.handleChange} submit={this.handleSubmit} /> : null}
          {this.state.steam == 0 ? <SteamForm steamId={this.state.steamId} /> : null}
          {this.state.steam == 0 ? <div className="steamLogIn">
            <a onClick={this.handleClick}>
              <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_border.png" />
            </a>
          </div> : null}
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
