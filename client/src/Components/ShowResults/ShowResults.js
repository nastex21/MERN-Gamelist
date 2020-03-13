import React, { useState, useEffect } from "react";
import { Icon, Table } from 'semantic-ui-react'

function ShowResults(props) {
    console.log(props);
    return (
        <div className="resultsTable">
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>Results</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {props.results.map((item, idx) => {
                     return (<Table.Row key={idx}>
                            <Table.Cell>
                                {idx + 1}
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Icon name='folder'>{item.name}</Icon>
                            </Table.Cell>
                        </Table.Row> )
                })}
                </Table.Body>
            </Table>
        </div>
    )
}

export default ShowResults;