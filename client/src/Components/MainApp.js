import React, { useState, useEffect } from "react";
import ManuallyAdded from './Pull-Gamelists/ManualEntries/ManuallyAdded';
import SteamForm from './Pull-Gamelists/SteamList/SteamForm';
import GenerateTable from "./GenerateTable/GenerateTable";

export default function MainApp({ manualData, steam, steamId, value, handleChange, handleSubmit, handleClick, games }) {
    console.log(steam);
    return (
        <>
            <div className="manualBox">
                <ManuallyAdded uploadData={manualData} />
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
            {
                games.length === 0 ? null : (
                    <GenerateTable gamelist={games} />
                )
            }
        </>
    )
}