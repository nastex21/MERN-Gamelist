import React, { useState, useEffect } from "react";
import { Dropdown, SearchCategory } from "semantic-ui-react";
import ShowResults from "../ShowResults/ShowResults";
import axios from "axios";

export default function ManuallyAdded(props) {
  const [search, setSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [systemID, setSystemID] = useState("");
  const [items, setItems] = useState();
  const [showResults, setShowResults] = useState(0);
  const [previousPage, setPreviousPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [apiResults, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [valueText, setValueText] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoaded, setLodaded] = useState(false);

  useEffect(() => {
    let savedPlatforms;

    if (localStorage.getItem("stored-plats")) {
      savedPlatforms = JSON.parse(localStorage.getItem("stored-plats"));
      console.log(savedPlatforms);
      setOptions([...savedPlatforms]);
    }

    if (savedPlatforms) {
      setLodaded(true);
      console.log(savedPlatforms.value);
      setItems(savedPlatforms.value);
    } else {
      var getData = "/api/get-platforms-list";
      axios
        .get(getData)
        .then(response => {
          // If request is good...
          var data = response.data;
          localStorage.setItem("stored-plats", JSON.stringify(data));
          console.log(data);
          this.setState({
            isLoaded: true,
            options: [...data]
          });
          setLodaded(true);
          setOptions([...data]);
        })
        .catch(error => {
          console.log("error 3 " + error);
        });
    }
  }, []);

  // onChange to set value of input text
  const updateName = e => {
    setValueText(e.target.value);
  };

  //onChange and searchChange to handle values of system select
  const handleChange = (e, { value }) => {
    console.log(value);
    setValue(value);
  };
  const handleSearchChange = (e, { searchQuery }) =>
    setSearchQuery({ searchQuery });

  const submitValues = e => {
    e.preventDefault();
    /*     if (showResults == 1) {
      console.log("yes")
      resetFunc();
    } */
    const submitValue = value;
    const newIdObj = options.filter(item =>
      item.value == submitValue ? item : null
    );
    const newId = newIdObj[0].key;
    setSystemID(newId);
    var obj = {
      params: {
        id: newId,
        system: value,
        name: valueText
      }
    };

    axios
      .get("/api/get-games-list/db", obj)
      .then(response => {
        console.log(response.data);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
        setResults([...response.data.results]);
        setShowResults(1);
      })
      .catch(error => console.log(error));
    //props.uploadData(obj)
  };

  const resetFunc = () => {
    setShowResults(0);
    setValueText("");
    setNextPage("");
    setPreviousPage("");
    setResults("");
  };

  useEffect(() => {
    console.log(apiResults);
    console.log(previousPage);
    console.log(nextPage);
  }, [apiResults, previousPage, nextPage]);

  return (
    <div className="manualAddition">
      <form onSubmit={submitValues}>
        <input type="text" value={valueText} onChange={updateName} />
        <Dropdown
          placeholder="Select system"
          fluid
          selection
          search={search}
          options={options}
          value={value}
          onChange={handleChange}
          onSearchChange={handleSearchChange}
        />
        <input type="submit" value="Add Game" />
      </form>
      {apiResults.length > 0 ? (
        <ShowResults
          nextPage={nextPage}
          prevPage={previousPage}
          results={apiResults}
          showResults={showResults}
          resetFunc={resetFunc}
        />
      ) : apiResults.length == 0 && showResults == 1 ? <p>Sorry no results</p> : null }
    </div>
  );
}
