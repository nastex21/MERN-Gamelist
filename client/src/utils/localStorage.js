export function setStorage(name, value) {
  if (name == "initial") {
    localStorage.setItem("guest", true);
    localStorage.setItem("stored-steamgamedata", JSON.stringify([])); //local storage to act as a database for Steam games
    localStorage.setItem("stored-manualgamedata", JSON.stringify([])); //local storage to act as a database for manually entry games
  }

  if (name == "steam") {
    localStorage.setItem("stored-steamgamedata", JSON.stringify([...value]));
  }

  if (name == "manual") {
    localStorage.setItem("stored-manualgamedata", JSON.stringify([...value]));
  }
}

export function removeStorage() {
  localStorage.removeItem("guest");
  localStorage.removeItem("stored-steamgamedata");
  localStorage.removeItem("stored-manualgamedata");
}
