import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

function ShowResults({
  showResultsUpdate,
  results,
  uploadData,
  platform,
  showBool
}) {
  const [singleSelectData, setSingleData] = useState([]); //data from single selection

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      var gameObj = {
        game_id: row.id,
        game_name: row.name,
        game_img: row.background_image,
        game_system: platform,
        game_release: row.released,
        provider: "manual",
      };
      var gameArr = [];
      gameArr.push(gameObj);

      setSingleData([...singleSelectData, ...gameArr]);
    } else if (!isSelect) {
      var gameArr = [...singleSelectData];
      gameArr = gameArr.filter((item) => item.game_id !== row.id);
      setSingleData([...gameArr]);
    }
  };

  const columns = [
    {
      dataField: "name",
      text: "Name",
    },
  ];

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectAll: true,
    onSelect: handleOnSelect,
  };

  const saveSelected = () => {
    uploadData(singleSelectData);
  };

  const closeDiv = () => {
    showResultsUpdate();
  };

  const showTable = () => {
    console.log(results);
    return (
      <div className="resultsTable">
        <div className="gameAdditionHeader">
          <FontAwesomeIcon
            onClick={closeDiv}
            icon={faWindowClose}
            style={{ float: "right" }}
          />
        </div>
        <BootstrapTable
          bootstrap4
          data={results}
          columns={columns}
          keyField={"id"}
          selectRow={selectRow}
        />

        <div className="resultsSaveButton">
          <input
            className="btn btn-dark"
            type="button"
            value="Save to database"
            onClick={saveSelected}
          />
        </div>
      </div>
    );
  };

  console.log(showBool);

  return <>{showBool ? showTable() : null}</>;
}

export default ShowResults;
