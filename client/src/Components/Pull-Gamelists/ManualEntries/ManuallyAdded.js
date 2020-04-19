import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import ShowResults from "./ShowResults";
import axios from "axios";

export default function ManuallyAdded(props) {
  const [search, setSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [showResults, setShowResults] = useState(0);
  const [previousPage, setPreviousPage] = useState("");
  const [nextPage, setNextPage] = useState("");
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
          setNextPage(response.data.next);
          setPreviousPage(response.data.previous);
          setResults([...response.data.results]);
          setShowResults(1);
        })
        .catch((error) => console.log(error));
    } else {
      //if user doesn't give a platform and is only doing a general search of game title

      var obj = {
        params: {
          name: valueText
        }
      }
      axios.get('/api/get-games-list/db', obj).then((response) => {
        console.log(response);
          setNextPage(response.data.next);
          setPreviousPage(response.data.previous);
          setResults([...response.data.results]);
          setShowResults(1);
        })
        .catch((error) => console.log(error));
    }
  };

  //move data to Home Component to render results
  const addGameFromResults = (item) => {
    props.uploadData(item);
  };

  return (
    <div className="manualAddition">
      <form onSubmit={submitValues}>
        <input type="text" value={valueText} onChange={updateName} />
        {isLoaded ? (
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
        ) : (
          <p>Loading...</p>
        )}
        <input type="submit" value="Search" />
      </form>
      {apiResults.length > 0 ? (
        <ShowResults
          nextPage={nextPage}
          prevPage={previousPage}
          results={apiResults}
          showResults={showResults}
          uploadData={addGameFromResults}
          platform={value}
        />
      ) : apiResults.length == 0 && showResults == 1 ? (
        <p>Sorry no results</p>
      ) : null}
    </div>
  );
}
