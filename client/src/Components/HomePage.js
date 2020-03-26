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
import { localsName } from "ejs";

function HomePage(props) {
  const [guestUser, setGuestUser] = useState(true); //set whether user is in Guest mode
  const [authUserInfo, setAuthUserInfo] = useState(''); //registered and logged in user information
  const [steamId, setSteamId] = useState(""); //steam ID 
  const [steam, setSteam] = useState(0); //has steam been used? 
  const [games, setGames] = useState([]); //array of games manually and automatically added (Only supports steam atm.)
  const [error, setError] = useState(null);

  //If there's no token then set to true since the user isn't logged in
  console.log(localStorage.jwtToken);
  if (!localStorage.jwtToken) {
    var savedGames;
    //if localstorage item doesn't exist, then set item else populatet the games state else 
    // if local storage games db is bigger in length then update games
    if (!localStorage.getItem("stored-gamedata")) {
      savedGames = JSON.parse(localStorage.getItem("stored-gamedata"));
      localStorage.setItem("stored-gamedata", true); //local storage to act as a database
    } else if (savedGames.length > games.length) {
      setGames(...savedGames);
    }
  } else {
    // get token and use token info in the authUserInfo state
    //delete localStorage data if user went from guest to registered
    if (localStorage.getItem("stored-gamedata")) {
      localStorage.removeItem("stored-gamedata");
    }
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    if (guestUser && token && authUserInfo === '') {
      setGuestUser(false);
      setAuthUserInfo(decoded);
    }
  }

  console.log(guestUser);

  //Authenticated user: fetch Steam ID if Steam ID  exists
  useEffect(() => {
    if (!guestUser) {
      console.log("inside token")
      // Fetch does not send cookies. So you should add credentials: 'include'
      axios.get("/auth/login/success", {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "withCredentials": true
        }
      })
        .then(response => {
          console.log(response.status);
          if (response.status === 200) {
            console.log(response);
            setSteamId(response.data.steamID);
          } else {
            throw new Error("failed to authenticate user");
          }
        })
        .catch(error => {
          setError("Failed to authenticated user");
        });
    }
  }, []);

  //Guest: if there's a change in the games state, then update the local games storage database
  useEffect(() => {
    if (localStorage.getItem("stored-gamedata")) {
      localStorage.setItem("stored-gamedata", JSON.stringify(games));
    }
  }, [games]);

  //listen for changes if the steamId state is altered
  useEffect(() => {
    console.log("useEffect");
    console.log(steamId);
    var dataValue = {
      steamId: steamId,
      creditentials: authUserInfo
    };
    console.log(dataValue);
    if (steamId && dataValue) {
      axios.post("/api/get-games-list/steam", dataValue).then(res => {
        console.log(res);
        if (res.data.name === "Error") {
          return null;
        } else {
          setGames([...games, ...res.data]);
          setSteam(1);
        }
      });
    };
  }, [steamId]);

  //Authenticated: when user refreshses and the authUserInfo is set, set the games state
  useEffect(() => {
    if (games.length == 0 && authUserInfo.games !== undefined) {
      setGames([...authUserInfo.games]);
    }
  }, [authUserInfo]);

  //for manual addition of Steam ID
  const handleChange = event => {
    setSteamId(event.target.value);
  };

  //for submitting Steam ID
  const handleSubmit = event => {
    event.preventDefault();
    var data;
    if (authUserInfo) {
      data = {
        steamID: steamId,
        user: authUserInfo.id
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
    setAuthUserInfo(data);
    if (data.games.length > 0) {
      setGames([...data.games])
    }
  };

  const handleLogout = () => {
    props.history.push("/login");
    console.log(props);
  }

  return (
    <>
      <NavbarTop guestUser={guestUser} />
      <Switch>
        {!guestUser ?
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