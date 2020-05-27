import React from "react";

function StatSection({ games, games2 }) {
  const gamesComb = [...games, ...games2];
  function valueSwitch(value) {
    switch (value) {
      case "manual":
        return "No provider selected";
      case "steam":
        return "Steam";
      case "physical":
        return "Physical Copy";
      case "steam_manual_entry":
        return "Steam";
      case "gog":
        return "Good Old Games (GOG)";
      case "ios":
        return "App Store";
      case "android":
        return "Google Play Store";
      case "uplay":
        return "Uplay";
      case "epic":
        return "Epic Game Store";
      case "origin":
        return "EA Origin Store";
      case "game_pass":
        return "Xbox Game Pass";
      case "battle":
        return "Battle.net";
      case "itch":
        return "Itchi.io";
      case "windows_store":
        return "Windows Store";
      case "batheseda":
        return "Batheseda";
      default:
        return null;
    }
  }

  const gameStats = () => {
    var gameSystemOcc = gamesComb.reduce(
      (acc, o) => ((acc[o.game_system] = (acc[o.game_system] || 0) + 1), acc),
      {}
    );
    var providerOcc = gamesComb.reduce(
      (acc, o) => ((acc[o.provider] = (acc[o.provider] || 0) + 1), acc),
      {}
    );

    return (
      <>
        <h3 className="w-100" style={{ textAlign: "center" }}>Game Stats Breakdown</h3>
        <div className="systemStats">
          <p>Systems</p>
          <ul className="list-group">
            {Object.entries(gameSystemOcc).map(([key, value]) => {
              return (
                <li
                  className="systemLi border-0 list-group-item d-flex justify-content-between align-items-center"
                  key={key}
                >
                  {key}
                  <span className="systemLabel badge badge-primary badge-pil">
                    {value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="servicesStats">
          <p>Services</p>
          <ul className="list-group border-0">
            {Object.entries(providerOcc).map(([key, value]) => {
              return (
                <li
                  className="servicesLi border-0 list-group-item d-flex justify-content-between align-items-center"
                  key={key}
                >
                  {valueSwitch(key)}
                  <span className="servicesLabel badge badge-primary badge-pill">
                    {value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <h3 style={{ textAlign: "center" }}>
          You have {gamesComb.length} games in total.
        </h3>
      </>
    );
  };
  return <>{gamesComb.length === 0 ? null : gameStats()}</>;
}

export default StatSection;
