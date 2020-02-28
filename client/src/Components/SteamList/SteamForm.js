import React, { Component } from "react";

export default class SteamForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.submit}>
        <p>
          If you know your Steam ID and your profile is public, please use your
          Steam ID otherwise please sign in with your Steam account.
        </p>
        <input
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <input type="submit" value="Get Steam games" />
      </form>
    );
  }
}
