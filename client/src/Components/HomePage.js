import React, { useState, useEffect } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import NavbarTop from "./Navbar";
import FrontPage from "./FrontPageSplash";
import Dashboard from "./Dashboard";
import RegisterPage from "./AuthPages/Register";
import LoginPage from "./AuthPages/Login";
import LogoutPage from './AuthPages/Logout';
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

function HomePage(props) {
  const [guestUser, setGuestUser] = useState(false); //user is a Guest boolean
  const [authUser, setAuthUser] = useState(""); //registered and logged in user
  const [steamId, setSteamId] = useState(""); //steam ID 
  const [steam, setSteam] = useState(0); //has steam been used? 
  const [games, setGames] = useState([]); //array of games manually and automatically added (Only supports steam atm.)
  const [error, setError] = useState(null);
  const [token, setToken] = useState(false); //boolean to see if there's a token
  const [storedData, setDataFlag] = useState(false);

  //Authenticated: Check to see if there's a token meaning user has made an account and has logged in.
  if (!token) {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      setToken(true);
      setAuthUser(decoded);

      //delete localStorage data if user went from guest to registered
      if (localStorage.getItem("guest") || localStorage.getItem("stored-gamedata")) {
        localStorage.removeItem("guest");
        localStorage.removeItem("stored-gamedata");
      }
    }
  }

  //Authenticated: when user refreshses and the authUser is set, set the games state
  useEffect(() => {
    if (games.length == 0){
      setGames([...authUser.games]);
    }
  }, [authUser]);

  //Guest: if item guest exists, set guest state to true;
  if (localStorage.getItem("guest")) {
    if (!guestUser) {
      setGuestUser(true);
    }
  }

  //Guest: set localStorage for user that clicked on as Guest
  useEffect(() => {
    if (guestUser) {
      localStorage.setItem("guest", true)
    }
  }, [guestUser]);

  //Guest: if there's saved game data in the localstorage, populate the "games" state
  useEffect(() => {
    if (localStorage.getItem("stored-gamedata")) {
      localStorage.setItem("stored-gamedata", JSON.stringify(games));
    }
  }, [games]);

  //get local temp data in the localStorage since user is a GUEST. If localStorage doesn't exist, make one.
  if (!localStorage.jwtToken && storedData == false) {
    if (localStorage.getItem("stored-gamedata")) {
      const savedGames = JSON.parse(localStorage.getItem("stored-gamedata"));
      setGames([...savedGames]);
      setDataFlag(true);
    } else if (storedData) {
      localStorage.setItem("stored-gamedata", JSON.stringify(games));
    }
  }

  //listen for changes if the steamId state is altered
  useEffect(() => {
    console.log("useEffect");
    var steamID = steamId;
    var dataValue = {
      steamId: steamID,
      creditentials: authUser
    };
    axios.post("/api/get-games-list/steam", dataValue).then(res => {
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
    setSteamId(event.target.value);
  };

  //for submitting Steam ID
  const handleSubmit = event => {
    event.preventDefault();
    var data;
    if (authUser) {
      data = {
        steamID: steamId,
        user: authUser.id
      };
    } else {
      data = {
        steamID: steamId
      };
    }

    console.log(data);
    axios.post("/api/get-games-list/steam", data).then(res => {
      console.log(res.data);
      setGames([...games, ...res.data]);
      setSteam(1);
    });
  };

  //for logging in with Steam
  const handleClick = () => {
    window.open("http://localhost:5555/auth/steam", "_self");
  };

  //data sent from the Pull-Gamelists/ManualEntries component
  const manualData = objValue => {
    console.log(objValue);
    const newObj = {
      game_name: objValue.name,
      game_img: objValue.img,
      game_system: objValue.system,
      provider: "manual"
    };
    console.log(newObj);
    let newGames = [...games];
    newGames.unshift(newObj);
    console.log(newGames);
    setGames(newGames);
  };

  //user logged in and authenticated
  const LoginData = data => {
    console.log(data);
    setAuthUser(data);
    if (data.games.length > 0) {
    setGames([...data.games])
    }
  };

  //user is a guest;
  const enableGuestUser = () => {
    console.log("running");
    setGuestUser(true);
  };

  const handleLogout = () => {
    props.history.push("/login");
    console.log(props);
  }

  return (
    <>
      <NavbarTop token={token} enableGuestUser={enableGuestUser} />
      <Switch>
        {token ?
          <>
            <Redirect exact to={{ pathname: "/dashboard", handleChange: handleChange }} />
            <Route exact path="/dashboard"
              render={props => (
                <Dashboard
                  manualData={manualData}
                  steam={steam}
                  steamId={steamId}
                  value={steamId}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleClick={handleClick}
                  games={games}
                />
              )}
            />
            <Route exact path="/logout" render={props => <LogoutPage onClick={handleLogout} />} />
          }
          </> :
          <>
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" render={props => <LoginPage LoginData={LoginData} />} />
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/dashboard"
              render={props => (
                <Dashboard
                  manualData={manualData}
                  steam={steam}
                  steamId={steamId}
                  value={steamId}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleClick={handleClick}
                  games={games}
                />
              )}
            />
          </>
        }
      </Switch>
    </>
  );
}

export default withRouter(HomePage);
