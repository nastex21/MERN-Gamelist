import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import NavbarTop from './Navbar';
import FrontPage from './FrontPageSplash';
import MainApp from './MainApp';
import RegisterPage from './AuthPages/Register';
import LoginPage from './AuthPages/Login';
import Guest from './Guest';
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

export default function HomePage() {
  const [user, setUser] = useState({});
  const [steamId, setSteamId] = useState('');
  const [steam, setSteam] = useState(0);
  const [games, setGames] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [authenticated, setAuth] = useState(false);
  const [storedData, setDataFlag] = useState(false);
  const [localUser, setLocalUser] = useState(false);

  HomePage.propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      profileImageUrl: PropTypes.string,
      steamId: PropTypes.string,
      screenName: PropTypes.string,
      _id: PropTypes.string
    })
  };

  if (authenticated == false && storedData == false) {
    if (localStorage.getItem("stored-gamedata")) {
      const savedGames = JSON.parse(localStorage.getItem("stored-gamedata"));
      setGames([...savedGames]);
      setDataFlag(true);
    } else {
      localStorage.setItem("stored-gamedata", JSON.stringify(games));
    }
  }

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

  //listen for changes if the steamId state is altered
  useEffect(() => {
    var steamID = steamId;
    var dataValue = {
      value: steamID
    };
    axios.post('/api/get-games-list/steam', dataValue).then(res => {
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
    axios.post('/api/get-games-list/steam', data).then(res => {
      setGames([...games, ...res.data]);
      setSteam(1);
    });
  };

  //for logging in with Steam
  const handleClick = () => {
    window.open("http://localhost:5555/auth/steam", "_self");
  }

  //data sent from the Pull-Gamelists/ManualEntries component
  const manualData = (objValue) => {
    console.log(objValue);
    const newObj = {
      'game_name': objValue.name,
      'game_img': objValue.img,
      'game_system': objValue.system,
      'provider': 'manual'
    }
    console.log(newObj);
    let newGames = [...games];
    newGames.unshift(newObj);
    console.log(newGames)
    setGames(newGames)
  }

  const enableLocalUser = () => {
    setLocalUser(true);
  }

  return (
    <>
      <Router>
       <NavbarTop />
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          {!localUser ? <Route exact path="/" component={FrontPage} /> : null } 
          <Route exact path="/dashboard" render={(props) => <MainApp manualData={manualData} steam={steam} steamId={steamId} value={value} handleChange={handleChange} handleSubmit={handleSubmit} handleClick={handleClick} games={games} /> } />
          </Switch>
          <a className="creditIcon" style={{ backgroundColor: 'black', color: 'white', textDecoration: 'none', padding: '4px 6px', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif', fontSize: '12px', fontWeight: 'bold', lineHeight: '1.2', display: 'inline-block', borderRadius: '3px', position: 'absolute' }} href="https://unsplash.com/@alexxsvch?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Alexey Savchenko"><span style={{ display: 'inline-block', padding: '2px 3px' }}><svg xmlns="http://www.w3.org/2000/svg" style={{ height: '12px', width: 'auto', position: 'relative', verticalAlign: 'middle', top: '-2px', fill: 'white' }} viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" /></svg></span><span style={{ display: 'inline-block', padding: '2px 3px' }}>Image credit to Alexey Savchenko</span></a>
      </Router>

    </>
  );
}
