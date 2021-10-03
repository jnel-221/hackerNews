//store searches in session storage
function setStorage(query) {
  let history = JSON.parse(sessionStorage.getItem("mySearches")) || [];
  if (query !== "") {
    history = [query, ...history];

    sessionStorage.setItem("mySearches", JSON.stringify(history));
  }
}

export default setStorage;
