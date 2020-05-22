import React, { useState } from "react";

function StatSection({ games, games2 }) {
  return (
    <div>
        <h3>Game Stats Breakdown</h3>
      {games.length === 0 ? null : (
        <p>You have {games.length + games2.length} games</p>
      )}
    </div>
  );
}

export default StatSection;
