import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function GenerateTable({ gamelist, gameslist2 }) {
  const [games, setGames] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [itemsPerPage, setItems] = useState('');

  useEffect(() => {
    setGames([...gameslist2, ...gamelist]);
  }, [gamelist, gameslist2]);

  const options = {
    onSizePerPageChange: (sizePerPage, page) => {
      console.log('Size per page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
      setItems(sizePerPage);
      setPage(page);
    },
    onPageChange: (page, sizePerPage) => {
      console.log('Page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
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
    return (c + 1) + (itemsPerPage * (pageNum - 1));
  };

  console.log(games);
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
      sort: true
    },
    {
      dataField: "game_system",
      text: "System"
    },
    {
      dataField: "game_release",
      text: "Release Year",
      formatter: dateFormatter
    }
  ];

  return (
    <div className="table">
      <BootstrapTable
        keyField="id"
        data={games}
        columns={columns}
        pagination={paginationFactory(options)}
      />
    </div>
  );
}

export default GenerateTable;
