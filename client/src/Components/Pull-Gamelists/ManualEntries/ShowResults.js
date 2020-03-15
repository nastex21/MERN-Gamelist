import React, { useState, useEffect } from "react";
import { Icon, Table, Label } from "semantic-ui-react";

function ShowResults(props) {
  console.log(props);


  return (
    <div className="resultsTable">
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.results.map((item, idx) => {
            console.log(item.name);
            return (
              <Table.Row key={idx} onClick={() => props.uploadData(item)}>
                <Table.Cell>
                  <Label ribbon>{idx + 1}</Label>
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default ShowResults;
