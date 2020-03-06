import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";
import { localsName } from "ejs";

export default class ManuallyAdded extends Component {
  state = {
    search: true,
    searchQuery: null,
    value: [],
    options: [],
    isLoaded: false
  };

  componentDidMount() {
    let savedPlatforms;

    if (localStorage.getItem("stored-plats")) {
      savedPlatforms = JSON.parse(localStorage.getItem("stored-plats"));
      this.setState({
        options: [...savedPlatforms]
      })
    }

    if (savedPlatforms) {
      console.log('true')
      this.setState({
        isLoaded: true,
        items: savedPlatforms.value
      });
    } else {
      var getData = "/api/get-platforms-list";
      axios
        .get(getData)
        .then(response => {
          console.log(response);
          // If request is good...
          var data = response.data.results;
          console.log(data);
          localStorage.setItem("stored-plats", JSON.stringify(data));
        })
        .then(response =>{
          var data = response.data.results;
          this.setState({
            isLoaded: true,
            options: [...data]
          })
        }
        )
        .catch(error => {
          console.log("error 3 " + error);
        });
    }
  }

  setValues = selectValues => this.setState({ selectValues });
  handleChange = (e, { value }) => this.setState({ value });
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  render() {
    const { search, value, options } = this.state;
    console.log(options);
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
