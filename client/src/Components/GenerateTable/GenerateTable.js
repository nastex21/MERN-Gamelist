import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  selectFilter,
  textFilter,
  numberFilter,
  Comparator
} from "react-bootstrap-table2-filter";
import { uuid } from "uuidv4";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

function GenerateTable({ gamelist, gameslist2 }) {
  const [games, setGames] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [itemsPerPage, setItems] = useState("");

  useEffect(() => {
    console.log("hi");
  }, []);

  useEffect(() => {
    setGames([...gameslist2, ...gamelist]);
  }, [gamelist, gameslist2]);

  const selectOptions = [
    { value: "manual", label: "Added by User" },
    { value: "steam", label: "Steam" }
  ];

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

  const imageFormatter = (cell, row, rowIndex) => {
    if (row.provider === "manual") {
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

  const dateFormatter = cell => {
    if (cell) {
      return cell.substr(0, 4);
    }
  };

  const numFormatter = (a, b, c) => {
    if (c !== undefined) {
      return c + 1 + itemsPerPage * (pageNum - 1);
    }
  };

  const columns = [
     {
      dataField: "game_img",
      text: '',
      isDummyField: true,
      formatter: imageFormatter
    }, 
    {
      dataField: "game_name",
      text: "Name",
      sort: true,
      filter: textFilter({
        placeholder: "Search for game"
      })
    },  
      {
      dataField: "game_system",
      text: "Platform",
      sort: true,
      filter: textFilter({
        placeholder: "Search by platform"
      })
    }, 
      {
      dataField: "game_release",
      text: "Release Year",
      sort: true,
      formatter: dateFormatter,
      filter: numberFilter({
        comparators: [Comparator.EQ, Comparator.GT, Comparator.LT]
      })
    }, 
      {
      dataField: "provider",
      text: "Service",
      sort: true,
      formatter: cell => selectOptions.find(opt => opt.value === cell).label,
      filter: selectFilter({
        options: selectOptions
      })
    }  
  ];

  console.log(selectOptions);
  return (
    <div className="table">
      <BootstrapTable
        bootstrap4
        keyField={"game_img"}
        data={games}
        columns={columns}
        pagination={paginationFactory(options)}
        loading={true} //only loading is true, react-bootstrap-table will render overlay
        filter={filterFactory()}
        striped
        hover
        condensed
      />
    </div>
  );
}

export default GenerateTable;
