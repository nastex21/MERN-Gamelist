import React, { useState, useEffect } from "react";
import ManuallyAdded from "./Pull-Gamelists/ManualEntries/ManuallyAdded";
import SteamForm from "./Pull-Gamelists/SteamList/SteamForm";
import GenerateTable from "./GenerateTable/GenerateTable";

export default function Dashboard({
  manualData,
  steam,
  steamId,
  userId,
  value,
  handleChange,
  handleSubmit,
  handleClick,
  games,
  games2, 
  updateSteamGames
})

{
  console.log('Dashboard');
  console.log('games, games2');
  console.log(games);
  console.log(games2);
  return (
    <div className="dashboard">
      <div className="manualBox">
        <ManuallyAdded uploadData={manualData} />
      </div>
      <div className="buttonBox">
        {!steamId ? (
          <SteamForm
            value={value}
            onChange={handleChange}
            submit={handleSubmit}
          />
        ) : null}
        <hr />
        {!steamId ? (
          <div className="steamLogIn">
            <a onClick={handleClick}>
              <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
            </a>
          </div>
        ) : null}
        {steamId ? <input type="button" value="Update Steam Games" onClick={updateSteamGames}/> : null}
        {games.length === 0 ? null : (
          <p>You have {games.length + games2.length} games</p>
        )}
      </div>
      <hr />
        {games.length === 0 && games2.length === 0 ? null : <GenerateTable gamelist={games} gameslist2={games2} userId={userId}/>} 
    </div>
  );
}
