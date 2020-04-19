import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  selectFilter,
  textFilter,
  numberFilter,
  Comparator,
} from "react-bootstrap-table2-filter";
import axios from "axios";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

let nameFilter;
let platformFilter;
let dateFilter;
let serviceFilter;

var arr = [];

function GenerateTable({ gamelist, gameslist2, userId }) {
  const [games, setGames] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [itemsPerPage, setItems] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [unselectable, setUnselected] = useState([]);

  useEffect(() => {
    setGames([...gameslist2, ...gamelist]);
  }, [gamelist, gameslist2]);

  const selectOptions = [
    {
      value: "manual",
      label: "Double click to select whether physical/digital copy",
    },
    {
      value: "steam",
      label: "Steam",
    },
    {
      value: "physical",
      label: "Physical Copy",
    },
    {
      value: "steam_manual_entry",
      label: "Steam",
    },
    {
      value: "gog",
      label: "Good Old Games (GOG)",
    },
    {
      value: "ios",
      label: "App Store",
    },
    {
      value: "android",
      label: "Google Play Store",
    },
    {
      value: "uplay",
      label: "Uplay",
    },
    {
      value: "epic",
      label: "Epic Game Store",
    },
    {
      value: "origin",
      label: "EA Origin Store",
    },
    {
      value: "game_pass",
      label: "Xbox Game Pass",
    },
    {
      value: "battle",
      label: "Battle.net",
    },
    {
      value: "itch",
      label: "Itchi.io",
    },
    {
      value: "windows_store",
      label: "Windows Store",
    },
    {
      value: "batheseda",
      label: "Batheseda",
    },
  ];

  const options = {
    onSizePerPageChange: (sizePerPage, page) => {
      setItems(sizePerPage);
      setPage(page);
    },
    onPageChange: (page, sizePerPage) => {
      setItems(sizePerPage);
      setPage(page);
    },
  };

  const imageFormatter = (cell, row, rowIndex) => {
    if (row.provider === "steam") {
      arr = [...arr, row.game_img];
      setTimeout(() => {
        setUnselected([...arr]);
      }, [100]);
    }

    if (row.provider !== "steam") {
      return (
        <img
          style={{ width: 184, height: 69 }}
          key={rowIndex}
          src={row.game_img}
          alt={"Box art of " + row.game_name}
        />
      );
    } else {
      return (
        <img
          key={rowIndex}
          src={`http://media.steampowered.com/steamcommunity/public/images/apps/${row.game_appid}/${row.game_img}.jpg`}
          alt={"Box art of " + row.game_name}
        />
      );
    }
  };

  const dateFormatter = (cell) => {
    if (cell) {
      return cell.substr(0, 4);
    }
  };

  var numFormatter = (a, b, c) => {
    if (c !== undefined) {
      return c + 1 + itemsPerPage * (pageNum - 1);
    }
  };

  const afterSaveCell = (oldValue, newValue, cellData, dataColumn) => {
    const dataValue = {
      flag: "blurToSave",
      id: userId,
      data: cellData,
    };

    const token = localStorage.jwtToken;
    if (token) {
      axios.post("/api/save-games", dataValue).then((res) => {
        console.log(res);
      });
    } else {
      var savedManualGames = JSON.parse(
        localStorage.getItem("stored-manualgamedata")
      );
      var cleanArr = savedManualGames;
      cleanArr.forEach((element, index) => {
        if (element.game_id === cellData.game_id) {
          cleanArr[index] = cellData;
        }
      });
      localStorage.setItem("stored-manualgamedata", JSON.stringify(cleanArr));
    }
  };

  const handleClick = () => {
    nameFilter("");
    platformFilter("");
    dateFilter("");
    serviceFilter();
  };

  const CaptionElement = () => {
    return (
      <div className="headerItems">
        <h3
          style={{
            borderRadius: "0.25em",
            textAlign: "center",
            color: "purple",
            border: "1px solid purple",
            padding: "0.5em",
          }}
        >
          Game Collection
        </h3>
        <div className="buttonsHeader">
          <div className="tableButtons float-left">
            <button className="btn btn-lg btn-primary" onClick={handleClick}>
              Clear all filters
            </button>
          </div>
          {selected ? (
            <div className="tableButtons float-right">
              <button className="btn btn-lg btn-primary" onClick={deleteGames}>
                Delete Game(s)
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const deleteGames = () => {

  }

  const handleOnSelect = (row, isSelect, c) => {
    console.log(row);
    console.log(c);
    if (isSelect) {
      let newArr = [...selectedItems];
      newArr = [...newArr, c];
      setSelected(true);
      setSelectedItems([...newArr]);
    } else {
      setSelected(false);
    }
  };

  const columns = [
    {
      dataField: "game_num",
      text: "#",
      isDummyField: true,
      editable: false,
      formatter: numFormatter,
    },
    {
      dataField: "game_img",
      text: "",
      isDummyField: true,
      editable: false,
      formatter: imageFormatter,
    },
    {
      dataField: "game_name",
      text: "Name",
      sort: true,
      editable: true,
      filter: textFilter({
        getFilter: (filter) => {
          nameFilter = filter;
        },
      }),
    },
    {
      dataField: "game_system",
      text: "Platform",
      sort: true,
      editable: false,
      filter: textFilter({
        placeholder: "Search by platform",
        getFilter: (filter) => {
          platformFilter = filter;
        },
      }),
    },
    {
      dataField: "game_release",
      text: "Release Year",
      sort: true,
      editable: false,
      formatter: dateFormatter,
      filter: numberFilter({
        comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
        getFilter: (filter) => {
          dateFilter = filter;
        },
      }),
    },
    {
      dataField: "provider",
      text: "Service",
      sort: true,
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "manual",
            label: "Double click to select whether physical/digital copy",
          },
          {
            value: "physical",
            label: "Physical Copy",
          },
          {
            value: "steam_manual_entry",
            label: "Steam",
          },
          {
            value: "gog",
            label: "Good Old Games (GOG)",
          },
          {
            value: "ios",
            label: "App Store",
          },
          {
            value: "android",
            label: "Google Play Store",
          },
          {
            value: "uplay",
            label: "Uplay",
          },
          {
            value: "epic",
            label: "Epic Game Store",
          },
          {
            value: "origin",
            label: "EA Origin Store",
          },
          {
            value: "game_pass",
            label: "Xbox Game Pass",
          },
          {
            value: "battle",
            label: "Battle.net",
          },
          {
            value: "itch",
            label: "Itchi.io",
          },
          {
            value: "windows_store",
            label: "Windows Store",
          },
          {
            value: "batheseda",
            label: "Batheseda",
          },
        ],
      },
      formatter: (cell) =>
        selectOptions.find((opt) => opt.value === cell).label,
      filter: selectFilter({
        options: selectOptions,
        getFilter: (filter) => {
          serviceFilter = filter;
        },
      }),
    },
  ];

  const selectRow = {
    mode: "checkbox",
    hideSelectAll: true,
    onSelect: handleOnSelect,
    nonSelectable: unselectable,
    nonSelectableStyle: (row, rowIndex) => {
      return { backgroundColor: "gray" };
    },
    bgColor: "#00BFFF",
  };

  const nonEditRows = () => {
    return unselectable;
  };

  console.log(selected);
  console.log(selectedItems);

  return (
    <div className="table">
      <BootstrapTable
        bootstrap4
        caption={<CaptionElement />}
        keyField={"game_img"}
        data={games}
        columns={columns}
        pagination={paginationFactory(options)}
        filter={filterFactory()}
        striped
        hover
        condensed
        selectRow={selectRow}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,
          nonEditableRows: nonEditRows,
          afterSaveCell,
        })}
      />
    </div>
  );
}

export default GenerateTable;
