import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";

function ShowResults(props) {
  console.log(props);

const handleOnSelect = (row, isSelect) => {
    console.log('single select');
  }

const handleOnSelectAll = (isSelect, rows) => {
    console.log('selected all');
  }

  const columns = [
    {
      dataField: "name",
      text: "Name",
    },
  ];

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };

  const saveSelected = () => {

  };

  return (
    <div className="resultsTable">
      <h3>Add games</h3>
      <BootstrapTable
        bootstrap4
        data={props.results}
        columns={columns}
        keyField={"id"}
        selectRow={selectRow}
      />
          <div className="resultsSaveButton">
            <input onClick={saveSelected} />
          </div>
    </div>

  );
}

export default ShowResults;
