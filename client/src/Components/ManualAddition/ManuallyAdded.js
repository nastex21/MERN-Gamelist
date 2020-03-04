import React, { Component } from "react";
import Select from "react-dropdown-select";
import { options } from './options';

export default class ManuallyAdded extends Component {
    state = {
        selectValues: []
    }

    setValues = selectValues => this.setState({ selectValues });
    render() {
        return (
            <div className="manualAddition">
                <form onSubmit={this.props.updateGames}>
                    <input
                        type="text"
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                    <Select options={options} onChange={(values) => this.setValues(values)} />
                    <input type="submit" value="Search" />
                </form>
            </div>
        )
    }
}

