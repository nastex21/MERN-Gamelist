import React, { useState, useEffect, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Row, Col } from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  selectFilter,
  textFilter,
  numberFilter,
  Comparator
} from "react-bootstrap-table2-filter";
import StatSection from "../StatsSection/Stats";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

let nameFilter;
let platformFilter;
let dateFilter;
let serviceFilter;
const token = localStorage.getItem("jwtToken");
var savedManualGames = JSON.parse(
  localStorage.getItem("stored-manualgamedata")
);

var arr = [];

// Hook
const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

function GenerateTable({
  gamelist,
  gameslist2,
  userId,
  deletedGamesRender,
  successAddMsg,
}) {
  const [games, setGames] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [itemsPerPage, setItems] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [unselectable, setUnselected] = useState([]);

  // Get the previous value (was passed into hook on last render)
  const prevCountGames = usePrevious(games);

  useEffect(() => {
    ("useeffect");
    setSelected(false);
    setSelectedItems([]);
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
        setSelected(false);
        setSelectedItems([]);
      }, [100]);
    }

    if (row.provider !== "steam") {
      return (
        <img
          className="img-fluid"
          key={rowIndex}
          src={row.game_img}
          alt={"Box art of " + row.game_name}
        />
      );
    } else {
      return (
        <img
          className="img-fluid"
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

    if (token) {
      axios.post("/api/save-games", dataValue).then((res) => {
        return null;
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
        <StatSection games={gamelist} games2={gameslist2} />
        <div className="buttonsHeader" style={{ width: "100%" }}>
          <Container fluid>
            <Row>
              <Col>
                {selectedItems.length === 1 ? (
                  <button
                    className="btn btn-lg btn-dark float-left"
                    onClick={deleteGames}
                  >
                    Delete Game
                  </button>
                ) : selectedItems.length > 1 ? (
                  <button
                    className="btn btn-lg btn-dark float-left"
                    onClick={deleteGames}
                  >
                    Delete Games
                  </button>
                ) : null}
              </Col>
              <Col xs={6}>
                {successAddMsg ? (
                  successAddMsg.singleGame ||
                  successAddMsg.pluralGames ||
                  successAddMsg.noGames ? (
                    <Alert
                      variant="success"
                      className={successAddMsg ? "fadeIn" : "fadeOut"}
                    >
                      <p style={{ textAlign: "center" }}>
                        {successAddMsg.singleGame ||
                          successAddMsg.pluralGames ||
                          successAddMsg.noGames}
                      </p>
                    </Alert>
                  ) : null
                ) : null}
              </Col>
              <Col>
                <button
                  className="btn btn-lg btn-dark float-right"
                  onClick={handleClick}
                >
                  Clear all filters
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  };

  const deleteGames = () => {
    if (!token) {
      var newArr = [...savedManualGames];
      var newArr2 = newArr.filter((f) => !selectedItems.includes(f.game_id));
      localStorage.setItem("stored-manualgamedata", JSON.stringify(newArr2));
      savedManualGames = JSON.parse(
        localStorage.getItem("stored-manualgamedata")
      );

      setSelectedItems([]);
      setSelected(false);

      deletedGamesRender(savedManualGames);
    } else {
      axios.post("/api/delete-games", selectedItems).then((res) => {
        setSelectedItems([]);
        setSelected(false);
        deletedGamesRender(res.data.games);
      });
    }
  };

  const handleOnSelect = (row, isSelect, c) => {
    var newArr = [...selectedItems];

    if (isSelect) {
      newArr = [...newArr, row.game_id];
      setSelectedItems([...newArr]);
      setSelected(true);
    } else {
      newArr = newArr.filter((item) => item !== row.game_id);
      setSelectedItems([...newArr]);
      setSelected(false);
    }
  };

  const filterDate = (options, data) => {
    var dataFiltered;
    if (options.comparator == ">" && options.number !== "" && options.number.length > 3) {
      dataFiltered = data.filter(function (item) {
        if (item.game_release !== undefined) {
          var newDate = Number(item.game_release.substr(0, 4));
          return newDate > Number(options.number);
        }
      });
    } else if (options.comparator == "<" && options.number !== "" && options.number.length > 3) {
      dataFiltered = data.filter(function (item) {
        if (item.game_release !== undefined) {
          var newDate = Number(item.game_release.substr(0, 4));
          return newDate < Number(options.number);
        }
      });
    } else if (options.comparator == "=" && options.number !== "" && options.number.length > 3) {
      dataFiltered = data.filter(function (item) {
        if (item.game_release !== undefined) {
          var newDate = Number(item.game_release.substr(0, 4));
          return newDate == Number(options.number);
        }
      });
    } else {
      dataFiltered = data;
    }

    return dataFiltered;
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
      text: "Year",
      sort: true,
      editable: false,
      headerClasses: "yearColHeader",
      formatter: dateFormatter,
      filter: numberFilter({
        withoutEmptyComparatorOption: true,
        comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
        defaultValue: { comparator: Comparator.GT },
        onFilter: filterDate,
        getFilter: (filter) => {
          dateFilter = filter;
        } 
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
      return { backgroundColor: "#d6d8d9" };
    },
    bgColor: "#00BFFF",
  };

  const nonEditRows = () => {
    return unselectable;
  };

  return (
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
      condensed={true}
      selectRow={selectRow}
      cellEdit={cellEditFactory({
        mode: "dbclick",
        blurToSave: true,
        nonEditableRows: nonEditRows,
        afterSaveCell,
      })}
    />
  );
}

export default GenerateTable;
