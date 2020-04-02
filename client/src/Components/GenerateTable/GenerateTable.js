import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  selectFilter, textFilter
} from "react-bootstrap-table2-filter";

function GenerateTable({ gamelist, gameslist2 }) {
  const [games, setGames] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [itemsPerPage, setItems] = useState("");

  useEffect(() => {
    setGames([...gameslist2, ...gamelist]);
  }, [gamelist, gameslist2]);

  const selectOptions = {
    0: "Manual",
    1: "Steam"
  };

  const options = {
    onSizePerPageChange: (sizePerPage, page) => {
      setItems(sizePerPage);
      setPage(page);
    },
    onPageChange: (page, sizePerPage) => {
      setItems(sizePerPage);
      setPage(page);
    }
  };

  const imageFormatter = (cell, row) => {
    if (row.provider === "manual") {
      return (
        <img
          style={{ width: 184, height: 69 }}
          src={row.game_img}
          alt={"Box art of " + row.game_name}
        />
      );
    } else {
      return (
        <img
          src={`http://media.steampowered.com/steamcommunity/public/images/apps/${row.game_appid}/${row.game_img}.jpg`}
          alt={"Box art of " + row.game_name}
        />
      );
    }
  };

  const dateFormatter = cell => {
    if (cell) {
      return cell.substr(0, 4);
    }
  };

  const numFormatter = (a, b, c) => {
    return c + 1 + itemsPerPage * (pageNum - 1);
  };

  const providerFormatter = cell => {
    if (cell == "steam") {
      return "Steam";
    } else if (cell == "manual") {
      return "Added by user";
    }
  };

  const columns = [
    {
      dataField: "game_num",
      text: "#",
      formatter: numFormatter
    },
    {
      dataField: "game_img",
      formatter: imageFormatter
    },
    {
      dataField: "game_name",
      text: "Name",
      sort: true,
      filter: textFilter({
        placeholder: 'Search for game'
      })
    },
    {
      dataField: "game_system",
      text: "System",
      sort: true
    },
    {
      dataField: "game_release",
      text: "Release Year",
      sort: true,
      formatter: dateFormatter
    },
    {
      dataField: "provider",
      text: "Service",
      sort: true,
      formatter: providerFormatter => selectOptions[providerFormatter],
      filter: selectFilter({
        options: selectOptions
      })
    }
  ];

  return (
    <div className="table">
      <button className="btn btn-lg btn-primary">
        {' filter columns by option "good" and "unknow" '}
      </button>
      <BootstrapTable
        keyField="id"
        data={games}
        columns={columns}
        pagination={paginationFactory(options)}
        filter={filterFactory()}
      />
    </div>
  );
}

export default GenerateTable;
