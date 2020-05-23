import React, { useState } from "react";

function StatSection({ games, games2 }) {
  console.log(games);
  console.log(games2);
  const gameStats = () => {
    var gameSystemOcc = games2.reduce(
      (acc, o) => ((acc[o.game_system] = (acc[o.game_system] || 0) + 1), acc),
      {}
    );
    var providerOcc = games2.reduce(
      (acc, o) => ((acc[o.provider] = (acc[o.provider] || 0) + 1), acc),
      {}
    );
    console.log(providerOcc);
    return (
      <>
        <h3 style={{ textAlign: "center" }}>Game Stats Breakdown</h3>
        <p>You have {games.length + games2.length} games in total.</p>
        {Object.entries(providerOcc).map(([key, value]) => {
          return (
          <li className="travelcompany-input" key={key}>
            <span className="input-label">
              {key == "manual" ? "No provider selected" : key} : {value}
            </span>
          </li>
          )
        })}
      </>
    );
  };
  return <div>{games.length === 0 ? null : gameStats()}</div>;
}

export default StatSection;
