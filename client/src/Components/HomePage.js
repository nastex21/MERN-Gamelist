import React, { useState, useEffect, useRef } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import NavbarTop from "./Navbar";
import Cookies from "js-cookie";
import FrontPage from "./FrontPageSplash";
import Dashboard from "./Dashboard";
import RegisterPage from "./AuthPages/Register";
import LoginPage from "./AuthPages/Login";
import LogoutPage from "./AuthPages/Logout";
import { decode } from "jsonwebtoken";

var savedGames;

function HomePage(props) {
  const [guestUser, setGuestUser] = useState(true); //set whether user is in Guest mode
  const [authUserInfo, setAuthUserInfo] = useState(""); //registered and logged in user information
  const [steamId, setSteamId] = useState(""); //steam ID
  const [steamInputValue, setValue] = useState(""); // needed a separate value that didn't constantly change the steamId state
  const [steam, setSteam] = useState(0); //has steam been used?
  const [games, setGames] = useState([]); //array of Steam games
  const [manEntryGames, setManualGame] = useState([]); //container to hold manually added games added by user from input
  const [games2, setGames2] = useState([]); //manually added games that were saved and pulled from database
  const [error, setError] = useState(null);

  //If there's no token then the user is a guest otherwise user has been authorized
  if (!localStorage.jwtToken) {
    savedGames = JSON.parse(localStorage.getItem("stored-gamedata"));
    //if localstorage item doesn't exist, then set item else populatet the games state else
    // if local storage games db is bigger in length then update games
    if (!localStorage.getItem("guest")) {
      localStorage.setItem("guest", true);
      localStorage.setItem("stored-gamedata", JSON.stringify([])); //local storage to act as a database
    } else {
      if (!savedGames) {
        localStorage.setItem("stored-gamedata", JSON.stringify([])); //local storage to act as a database
      }
    }
  } else {
    // get token and use token info in the authUserInfo state
    //delete localStorage data if user went from guest to registered
    localStorage.removeItem("guest");
    localStorage.removeItem("stored-gamedata");

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token); //contains the user database ID and username

    //if guestUser == true (meaning the user's status is set to 'guest') and there's a token (only an auth user can have a token) then make guestUser state false
    if (guestUser && token) {
      console.log("token");
      setGuestUser(false);
      setAuthUserInfo(decoded);
    }
  }

  useEffect(() => {
    if (savedGames) {
      setGames2([...savedGames]);
    }

    //event listener when user clicks on Steam login button
    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:5555") return;

      const jwtoken = localStorage.jwtToken;

      const { token, ok } = event.data;

      const decodedToken = jwt_decode(token);

      console.log(decodedToken);
      var dataValue = {
        steamID: decodedToken.user,
        creditentials: authUserInfo
      }

      if (!jwtoken) {
        dataValue.user = "guest";
      }

      console.log(dataValue);

      axios.post("/api/get-games-list/steam", dataValue).then((res) => {
        console.log(res);
        if (res.data.name === "Error") {
          return null;
        } else {
          console.log(res);
          if (!jwtoken) {
            localStorage.setItem(
              "stored-gamedata",
              JSON.stringify([...res.data, ...savedGames])
            );
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
          console.log(response.status);
          if (response.status === 200) {
            console.log(response);
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

    console.log(data);
    axios.post("/api/get-games-list/steam", data).then((res) => {
      console.log(res.data);
      if (res.data.steamGames) {
        setGames([...res.data.steamGames]);
        setGames2([...res.data.games]);
        setSteam(1);
        setSteamId(steamInputValue);
      }

      if (guestUser) {
        console.log("guestUser");
        console.log(savedGames);
        localStorage.setItem(
          "stored-gamedata",
          JSON.stringify([...savedGames, ...res.data])
        );
        setGames([...savedGames, ...res.data]);
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
    console.log("manualData");
    console.log(objValue);
    var newGames = [...games2]; //games from database
    var newEntryGames = [...manEntryGames]; //games recently added by user
    var checkedArr = objValue; //kept the original value clean and used this to filter
    var ids = new Set(newGames.map(({ game_id }) => game_id)); //get the game_ids from the newGames list

    checkedArr = checkedArr.filter(({ game_id }) => !ids.has(game_id)); //check for dupes

    newGames = [...checkedArr, ...newGames];
    newEntryGames = [...checkedArr, ...newEntryGames];

    if (guestUser) {
      localStorage.setItem(
        "stored-gamedata",
        JSON.stringify([...newGames, ...savedGames])
      );
      setGames2(newGames);
      setManualGame(newEntryGames);
    }

    if (!guestUser) {
      var dataObj = {
        user: {
          id: authUserInfo.id,
        },
        game: newEntryGames,
      };
      console.log(dataObj);
      axios.post("/api/save-games", dataObj).then((res) => {
        setGames2([...res.data.games]);
      });
    }
  };

  const handleLogout = () => {
    props.history.push("/login");
  };

  // Get the previous value (was passed into hook on last render)
  const prevGames = usePrevious(manEntryGames);

  //Update Steam games
  const updateSteamGames = () => {
    let dataObj = {};
    dataObj.steamId = steamId;
    dataObj.dbid = authUserInfo.id;
    axios.post("/api/get-games-list/updateSteam", dataObj).then((res) => {
      console.log(res);
      if (res.data.error) {
        window.alert(res.data.error); //change later
        setError(res.data.error);
      } else {
        setGames([...res.data]);
      }
    });
  };

  console.log(games2);

  return (
    <>
      <NavbarTop guestUser={guestUser} />
      <Switch>
        {!guestUser ? (
          <>
            <Redirect
              exact
              to={{ pathname: "/dashboard", handleChange: handleChange }}
            />
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
                />
              )}
            />
            <Route
              exact
              path="/logout"
              render={(props) => <LogoutPage onClick={handleLogout} />}
            />
            }
          </>
        ) : (
          <>
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" render={(props) => <LoginPage />} />
            <Route exact path="/" component={FrontPage} />
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
                />
              )}
            />
          </>
        )}
      </Switch>
    </>
  );
}

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default withRouter(HomePage);
