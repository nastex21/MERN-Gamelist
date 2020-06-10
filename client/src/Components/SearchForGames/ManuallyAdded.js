import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import ShowResults from "./ShowResults";
import axios from "axios";

export default function ManuallyAdded(props) {
  const [search, setSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [showBool, setShowBool] = useState(false);
  const [apiResults, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [valueText, setValueText] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  //store to see if platforms data is in localstorage
  useEffect(() => {
    let savedPlatforms;

    if (localStorage.getItem("stored-plats")) {
      savedPlatforms = JSON.parse(localStorage.getItem("stored-plats"));
      setOptions([...savedPlatforms]);
    }

    if (savedPlatforms) {
      setLoaded(true);
    } else {
      var getData = "/api/get-platforms-list";
      axios
        .get(getData)
        .then((response) => {
          // If request is good...
          var data = response.data;
          localStorage.setItem("stored-plats", JSON.stringify(data));
          setLoaded(true);
          setOptions([...data]);
        })
        .catch((error) => {
          console.log("error 3 " + error);
        });
    }
  }, []);

  // Game Text Input: onChange to set value of input text
  const updateName = (e) => {
    setValueText(e.target.value);
  };

  //Dropdown: onChange and searchChange to handle values of system selected
  const handleChange = (e, { value }) => {
    console.log(value);
    setValue(value);
    setShowBool(false);
  };

  //Dropdown: input text search platforms/systems list
  const handleSearchChange = (e, { searchQuery }) =>
    setSearchQuery({ searchQuery });

  //submit and search the database
  const submitValues = (e) => {
    e.preventDefault();

    if (value) {
      //user gave both a name title and platform
      const submitValue = value;

      const newIdObj = options.filter((item) =>
        item.value == submitValue ? item : null
      );

      const newId = newIdObj[0].key; //specific id of the platform
      console.log(newId);
      var obj = {
        params: {
          id: newId,
          system: value,
          name: valueText,
        },
      };

      axios
        .get("/api/get-games-list/db", obj)
        .then((response) => {
          setShowBool(true);
          setResults([...response.data.results]);
        })
        .catch((error) => console.log(error));
    } else {
      window.alert("Please select a system");
    }
  };

  //move data to Home Component to render results
  const addGameFromResults = (item) => {
    props.uploadData(item);
  };


  return (
    <div className="manualAddition">
      <form className="mobileForm desktopForm" onSubmit={submitValues}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-6 input-group input-group-lg">
              <input
                className="form-control mobileInputSearch desktopInputSearch"
                type="text"
                value={valueText}
                onChange={updateName}
              />
            </div>
            <div className="col-lg-4 col-6 input-group input-group-lg">
              {isLoaded ? (
                <Dropdown
                  className="form-control h-100"
                  placeholder="Select system"
                  fluid
                  selection
                  search={search}
                  options={options}
                  value={value}
                  onChange={handleChange}
                  onSearchChange={handleSearchChange}
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="col-lg-2 input-group input-group-lg">
              <input
                className="btn btn-dark form-control mobileInputButton desktopInputButton"
                type="submit"
                value="Search"
              />
            </div>
          </div>
        </div>
      </form>
      {apiResults.length > 0 ? (
        <div className="resultsWindow">
        <ShowResults
          results={apiResults}
          showBool={showBool}
          uploadData={addGameFromResults}
          platform={value}
          />
        </div>
      ) : apiResults.length == 0 && showBool ? (
        <p>Sorry no results</p>
      ) : null}
    </div>
  );
}
