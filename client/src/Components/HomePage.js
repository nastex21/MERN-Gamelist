import React, { useState, useEffect, useMemo } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { setStorage, removeStorage } from "../utils/localStorage";
import { UserContext } from "../UserContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import NavbarTop from "./Nav/Navbar";
import FrontPage from "./MainFrontPage/FrontPageSplash";
import Dashboard from "./Dashboard/Dashboard";
import RegisterPage from "./AuthPages/Register";
import ImportSection from "./Desktop/ImportSection/ImportSection";
import AddGamesSection from './Desktop/AddGamesSection/AddGames';
import LoginPage from "./AuthPages/Login";
import LogoutPage from "./AuthPages/Logout";
import ManuallyAdded from "./SearchForGames/ManuallyAdded";

var savedSteamGames;
var savedManualGames;

function getItems() {
  savedSteamGames = JSON.parse(localStorage.getItem("stored-steamgamedata"));
  savedManualGames = JSON.parse(localStorage.getItem("stored-manualgamedata"));
}

function HomePage(props) {
  const [guestUser, setGuestUser] = useState(true); //set whether user is in Guest mode
  const [authUserInfo, setAuthUserInfo] = useState(""); //registered and logged in user information
  const [steamId, setSteamId] = useState(""); //steam ID
  const [steamInputValue, setValue] = useState(""); // needed a separate value that didn't constantly change the steamId state
  const [steam, setSteam] = useState(0); //has steam been used?
  const [games, setGames] = useState([]); //array of Steam games
  const [games2, setGames2] = useState([]); //manually added games that were saved and pulled from database
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [successAddMsg, setSuccessAddMsg] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const value = useMemo(() => ({ registerSuccess, setRegisterSuccess }), [
    registerSuccess,
    setRegisterSuccess,
  ]);
  const locationHistory = props.location.pathname;

  //If there's no token then the user is a guest otherwise user has been authorized
  if (token == null && guestUser) {
    getItems();
    //if localstorage item doesn't exist, then set item else populatet the games state else
    // if local storage games db is bigger in length then update games
    if (!localStorage.getItem("guest")) {
      setStorage("initial");
      getItems();
    }
  } else if (token && guestUser) {
    //delete localStorage data if user went from guest to registered
    removeStorage();

    const decoded = jwt_decode(token); //contains the user database ID and username

    //if guestUser == true (meaning the user's status is set to 'guest') and there's a token (only an auth user can have a token) then make guestUser state false
    if (guestUser && authUserInfo == "") {
      setGuestUser(false);
      setGames([]);
      setGames2([]);
      setAuthUserInfo(decoded);
    }
  }

  useEffect(() => {
    if (successAddMsg) {
      setTimeout(() => {
        setSuccessAddMsg(false);
      }, 3000);
    }
  }, [successAddMsg]);

  useEffect(() => {
    if (savedSteamGames) {
      setGames([...savedSteamGames]);
      setGames2([...savedManualGames]);
    }

    //event listener when user clicks on Steam login button
    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:5555") return;

      const jwtoken = localStorage.jwtToken;

      var { token, ok } = event.data;

      const decodedToken = jwt_decode(token);

      var dataValue = {
        steamID: decodedToken.user,
        creditentials: authUserInfo,
      };

      if (!jwtoken) {
        dataValue.user = "guest";
      }

      axios.post("/api/get-games-list/steam", dataValue).then((res) => {
        if (res.data.name === "Error") {
          return null;
        } else {
          if (!jwtoken) {
            setStorage("steam", [...res.data, ...savedSteamGames]);
            setSteamId(decodedToken.user);
            setGames([...res.data]);
            setSteam(1);
          } else {
            setSteamId(dataValue.steamID);
            setGames([...res.data.steamGames]);
            setSteam(1);
          }
        }
      });
    });
  }, []);

  //Auth: get games when successfully logged in.
  useEffect(() => {
    if (!guestUser && games.length === 0 && games2.length === 0) {
      axios
        .post("/auth/login/success", authUserInfo)
        .then((response) => {
          if (response.status === 200) {
            setSteamId(response.data.steamID);
            setGames([...response.data.steamGames]); //games from Steam pulled from the database
            setGames2([...response.data.games]); //games pulled from database that were manually added
          } else {
            throw new Error("failed to authenticate user");
          }
        })
        .catch((error) => {
          setError("Failed to authenticated user");
        });
    }
  }, [authUserInfo]);

  //for manual addition of Steam ID
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //for submitting Steam ID
  const handleSubmit = (event) => {
    event.preventDefault();
    var data;
    if (!guestUser) {
      data = {
        steamID: steamInputValue,
        user: authUserInfo.id,
      };
    } else {
      data = {
        user: "guest",
        steamID: steamInputValue,
      };
    }

    axios.post("/api/get-games-list/steam", data).then((res) => {
      if (res.data.steamGames) {
        setGames([...res.data.steamGames]);
        setGames2([...res.data.games]);
        setSteam(1);
        setSteamId(steamInputValue);
      }

      if (guestUser) {
        setStorage("steam", [...savedSteamGames, ...res.data]);
        setGames([...savedSteamGames, ...res.data]);
      }
    });
  };

  //for logging in with Steam
  const handleClick = () => {
    const popupWindow = window.open(
      "http://localhost:5555/auth/steam",
      "_blank",
      "width=800, height=600"
    );
    if (window.focus) popupWindow.focus();
  };

  //data sent from the Pull-Gamelists/ManualEntries component
  const manualData = (objValue) => {
    if (token) {
      var manualGames = [...games2]; //clean games array from database

      var ids = new Set(manualGames.map(({ game_id }) => game_id)); //get the game_ids from the newGames list

      var checkForDupes = objValue.filter(({ game_id }) => !ids.has(game_id)); //check for dupes

      manualGames = [...checkForDupes];

      var dataObj = {
        user: {
          id: authUserInfo.id,
        },
        game: manualGames,
      };

      axios.post("/api/save-games", dataObj).then((res) => {
        setGames2([...res.data.games]);
        if (manualGames.length == 1) {
          var msgObj = {
            singleGame: "Game was successfully added.",
          };
          setSuccessAddMsg(msgObj);
        } else if (manualGames.length > 1) {
          var msgObj = {
            pluralGames: "Games were successfully added.",
          };
          setSuccessAddMsg(msgObj);
        } else {
          if (manualGames.length == 0) {
            var msgObj = {
              noGames:
                "No games were added. Most likely they already exist in your database.",
            };
            setSuccessAddMsg(msgObj);
          }
        }
      });
    }

    if (guestUser || !token) {
      var manualGames = [...savedManualGames]; //clean array of manually added games that are/were saved

      var ids = new Set(manualGames.map(({ game_id }) => game_id)); //get the game_ids from the newGames list

      var checkForDupes = objValue.filter(({ game_id }) => !ids.has(game_id)); //check for dupes

      manualGames = [...checkForDupes, ...manualGames];

      setStorage("manual", [...manualGames]);

      setGames2([...manualGames]);

      if (checkForDupes.length == 1) {
        var msgObj = {
          singleGame: "Game was successfully added.",
        };
        setSuccessAddMsg(msgObj);
      }

      if (checkForDupes.length > 1) {
        var msgObj = {
          pluralGames: "Games were successfully added.",
        };
        setSuccessAddMsg(msgObj);
      }

      if (checkForDupes == 0) {
        var msgObj = {
          noGames:
            "No games were added. Most likely they were already in your database.",
        };
        setSuccessAddMsg(msgObj);
      }
    }
  };

  const handleLogout = () => {
    setGames([]);
    setGames2([]);
    props.history.push("/login");
  };

  //Update Steam games
  const updateSteamGames = () => {
    let dataObj = {};
    dataObj.steamId = steamId;
    dataObj.dbid = authUserInfo.id;
    axios.post("/api/get-games-list/updateSteam", dataObj).then((res) => {
      if (res.data.error) {
        window.alert(res.data.error); //change later
        setError(res.data.error);
      } else {
        setGames([...res.data]);
      }
    });
  };

  const deletedGamesRender = (data) => {
    if (!token) {
      savedManualGames = JSON.parse(
        localStorage.getItem("stored-manualgamedata")
      );
      setGames2([...savedManualGames]);
    } else {
      setGames2([...data]);
    }
  };

  const authUserRender = () => {
    return (
      <div
        className={
          locationHistory == "/dashboard"
            ? "mainDiv yesScroll"
            : "mainDiv noScroll"
        }
      >
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <Dashboard
                manualData={manualData}
                steam={steam}
                steamId={steamId}
                userId={authUserInfo.id}
                value={steamInputValue}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClick={handleClick}
                games={games}
                games2={games2}
                updateSteamGames={updateSteamGames}
                deletedGamesRender={deletedGamesRender}
                successAddMsg={successAddMsg}
              />
            )}
          />
          <Route
            exact
            path="/dashboard/import"
            render={(props) => (
              <ImportSection
                steamId={steamId}
                value={steamInputValue}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClick={handleClick}
                updateSteamGames={updateSteamGames}
              />
            )}
          />
          <Route exact path="/dashboard/search" render={(props) => (
            <AddGamesSection   manualData={manualData}  />
          )}/>
          <Route
            exact
            path="/dashboard/search"
            render={(props) => <ManuallyAdded />}
          />
          <Route
            exact
            path="/logout"
            render={(props) => <LogoutPage onClick={handleLogout} />}
          />
          <Redirect
            exact
            to={{ pathname: "/dashboard", handleChange: handleChange }}
          />
        </Switch>
      </div>
    );
  };

  const guestUserRender = () => {
    return (
      <div
        className={
          locationHistory == "/dashboard"
            ? "mainDiv yesScroll"
            : "mainDiv noScroll"
        }
      >
        <NavbarTop guestUser={guestUser} location={props.location} />
        <Switch>
          <UserContext.Provider value={value}>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <Dashboard
                  manualData={manualData}
                  steam={steam}
                  steamId={steamId}
                  value={steamInputValue}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleClick={handleClick}
                  games={games}
                  games2={games2}
                  deletedGamesRender={deletedGamesRender}
                  successAddMsg={successAddMsg}
                />
              )}
            />
          </UserContext.Provider>
        </Switch>
      </div>
    );
  };

  return <>{!guestUser ? authUserRender() : guestUserRender()}</>;
}

export default withRouter(HomePage);
