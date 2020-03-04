import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { options } from "./options";

export default class ManuallyAdded extends Component {
  state = {
    search: true,
    searchQuery: null,
    value: []
  };

  setValues = selectValues => this.setState({ selectValues });
  handleChange = (e, { value }) => this.setState({ value })
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  render() {
    const {  search, value } = this.state;
    console.log(value);
    return (
      <div className="manualAddition">
        <form onSubmit={this.props.updateGames}>
          <input
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <Dropdown
            placeholder="Select console"
            fluid
            selection
            search={search}
            options={options}
            value={value}
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
