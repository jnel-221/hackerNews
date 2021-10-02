import React, { useState } from "react";
import Headernav from "../components/HeaderNav";
// import Input from "../components/Input";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import axios from "axios";

function Search() {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);
  const [results, setResults] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    console.log("You clicked submit! ", search);

    if (search !== "") {
      axios
        .get(`http://hn.algolia.com/api/v1/search?query=${search}&tags=story`)
        .then((res) => {
          const stuff = res.data.hits;
          console.log("api call returned ", stuff);
        });
    } else {
      console.log("enter search term to get results");
    }

    setHistory((history) => [...history, search]);
    setStorage(history);
    console.log(
      "handleSubmit history ",
      history,
      ` history is ${history.length} items long`
    );
  }

  function setStorage(array) {
    // let storedHistory = JSON.parse(sessionStorage.getItem("searchHistory"))|| [];
    let json = JSON.stringify(array);

    console.log("setStorage history arr to string contains ", json);
  }

//   function handleChange(e) {
//     e.preventDefault();
//     setSearch(e.target.value.trim());
//   }

  return (
    <>
      <Headernav />
      {/* <h1>Hello World</h1> */}
      <InputGroup
        className="mt-3 mx-auto"
        id="search-term"
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
      >
        <FormControl
          placeholder="Search for Articles"
          aria-label="Search for Articles"
          aria-describedby="basic-addon2"
        />
        <Button
          variant="outline-warning"
          id="button-addon2"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </InputGroup>
      <p>Hey, looks like you're searching for {search}!</p>
      {/* <p> Hey, look at our search array {history}</p> */}
    </>
  );
}

export default Search;
