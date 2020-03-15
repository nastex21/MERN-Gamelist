import React from "react";

function SteamForm({ submit, value, onChange }) {
    return (
      <form onSubmit={submit}>
        <p>
          If you know your Steam ID and your profile is public, please use your
          Steam ID otherwise please sign in with your Steam account.
        </p>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
        <input type="submit" value="Get Steam games" />
      </form>
    );
}

export default SteamForm;