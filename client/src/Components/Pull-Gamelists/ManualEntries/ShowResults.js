import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";

function ShowResults(props) {
  const [singleSelectData, setSingleData] = useState([]); //data from single selection

  const handleOnSelect = (row, isSelect) => {
    if (isSelect){
      var gameObj = {
        game_id: row.id,
        game_name: row.name,
        game_img: row.background_image,
        game_system: props.platform,
        game_release: row.released,
        provider: 'manual'
      }
      var gameArr = [];
      gameArr.push(gameObj);

      setSingleData([...singleSelectData, ...gameArr]); 
    } else if (!isSelect) {
      var gameArr = [...singleSelectData];
      gameArr = gameArr.filter(item => item.game_id !== row.id);
      setSingleData([...gameArr]);
    }
  };

  const columns = [
    {
      dataField: "name",
      text: "Name",
    }
  ]

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectAll: true,
    onSelect: handleOnSelect
  };

  const saveSelected = () => {
    props.uploadData(singleSelectData)
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
        <input type="button" value="Save to database" onClick={saveSelected} />
      </div>
    </div>
  );
}

export default ShowResults;
