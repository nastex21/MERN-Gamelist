import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";

export default function ManuallyAdded(props) {
  const [search, setSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [items, setItems] = useState();
  const [value, setValue] = useState('');
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
      setItems(savedPlatforms.value)
    } else {
      var getData = "/api/get-platforms-list";
      axios
        .get(getData)
        .then(response => {
          // If request is good...
          var data = response.data;
          localStorage.setItem("stored-plats", JSON.stringify(data));
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
  const updateName = ((e) => {
    setValueText(e.target.value);
  });

  //onChange and searchChange to handle values of system select
  const handleChange = ((e, {value}) => {
    setValue(value);
  })
  const handleSearchChange = (e, { searchQuery }) => setSearchQuery({ searchQuery });

  const submitValues = (e) => {
    e.preventDefault();
    var obj = {
      system: value,
      name: valueText
    }

    console.log(props);
    props.uploadData(obj)
  };

  return (
    <div className="manualAddition">
      <form onSubmit={submitValues}>
        <input
          type="text"
          value={valueText}
          onChange={updateName}
        />
        <Dropdown
          placeholder="Select console"
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
    </div>
  );
}
