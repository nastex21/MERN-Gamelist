import React, { useState, useEffect } from "react";
import axios from "axios";
import GenerateTable from "./generateTable";
import SteamForm from './SteamList/SteamForm';
import ManuallyAdded from './ManualAddition/ManuallyAdded'
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

export default function HomePage() {
  const [user, setUser] = useState({});
  const [steamId, setSteamId] = useState();
  const [steam, setSteam] = useState(0);
  const [games, setGames] = useState([]);
  const [value, setValue] = useState();
  const [system, setSystem] = useState();
  const [customNameGame, setCustomName] = useState();
  const [customGamesAdded, setCustomGames] = useState([]);
  const [error, setError] = useState(null);
  const [authenticated, setAuth] = useState(false);

  HomePage.propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      profileImageUrl: PropTypes.string,
      steamId: PropTypes.string,
      screenName: PropTypes.string,
      _id: PropTypes.string
    })
  };

  useEffect(() => {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        console.log("failed")
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        setAuth(true);
        setUser(responseJson.user);
        setSteamId(responseJson.user.steamId)
      })
      .catch(error => {
        console.log('failed 2nd')
        setAuth(false);
        setError("Failed to authenticated user");
      });
  }, []);

  useEffect(() => {
    var steamID = steamId;
    var dataValue = {
      value: steamID
    };
    axios.post('/api/get-games-list', dataValue).then(res => {
      console.log(res);
      if (res.data.name === "Error") {
        return null;
      } else {
        setGames([...games, ...res.data]);
        setSteam(1);
      }
    });
  }, [steamId]);

  //for manual addition of Steam ID
  const handleChange = event => {
    setValue(event.target.value);
  };

  //for submitting Steam ID
  const handleSubmit = event => {
    event.preventDefault();
    var steamID = value;
    console.log(steamID);
    var data = {
      value: steamID
    };
    axios.post('/api/get-games-list', data).then(res => {
      setGames([...games, ...res.data]);
      setSteam(1);
    });
  };

  //for logging in with Steam
  const handleClick = () => {
    window.open("http://localhost:5555/auth/steam", "_self");
  }

  //manually adding custom games
  const updateCustomGames = (event) => {
    event.preventDefault();
    if (system == '') {
      window.alert("Please select a system")
    } else if (customNameGame == '') {
      window.alert("Please name your game")
    } else {
      setCustomGames({});
      setCustomName(event.target.value);
    }
  }

  const getValueDropdown = (data) => {
    setSystem(data);
  }

  return (
    <div>
      <div className="manualBox">
        <ManuallyAdded games={customGamesAdded} updateGames={updateCustomGames} valueDropDown={getValueDropdown} />
      </div>
      <div className="button">
        {steam == 0 || steamId == '' ? <SteamForm value={value} onChange={handleChange} submit={handleSubmit} /> : null}

        {steam == 0 ? <div className="steamLogIn">
          <a onClick={handleClick}>
            <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_border.png" />
          </a>
        </div> : null}
        {games.length === 0 ? null : (
          <p>You have {games.length} games</p>
        )}
      </div>
      {games.length === 0 ? null : (
        <GenerateTable gamelist={games} />
      )}
    </div>
  );
}
