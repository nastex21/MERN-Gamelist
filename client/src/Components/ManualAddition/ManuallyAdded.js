import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import axios from 'axios';

export default class ManuallyAdded extends Component {
  state = {
    search: true,
    searchQuery: null,
    value: [],
    options: []
  };

  componentDidMount(){
    var data = [];
    var getData = '/api/get-games-list';
    axios.get(getData)
    .then( response => {// If request is good...
      console.log(response.data)
    },)
    .catch((error) => {
      console.log('error 3 ' + error);
    })
  }

  setValues = selectValues => this.setState({ selectValues });
  handleChange = (e, { value }) => this.setState({ value })
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  render() {
    const {  search, value, options } = this.state;
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
