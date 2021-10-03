import React, { useState, useRef, useEffect } from "react";
import Headernav from "../components/HeaderNav";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import Cards from "../components/Card";
import FormatDate from "../utils/helpers/formatDate.js";

function Search() {

  const search = useRef(null);
  const [results, setResults] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    let query = search.current.value.trim();
   
    if (search !== "") {
      axios
        .get(`http://hn.algolia.com/api/v1/search?query=${query}&tags=story`)
        .then((res) => {
          const stories = res.data.hits;

          setResults(stories);
          setResults((stories) => {
            return stories;
          });
          parseResults(stories);
        });
    } else {
      console.log("enter search term to get results");
    }
    setStorage(query);
  }

  function parseResults(arr) {
    setResults(
      arr.map((story) => {
        return {
          title: story.title,
          author: story.author,
          url: story.url,
          date: FormatDate(story.created_at),
        };
      })
    );
  }

  function setStorage(query) {
    let history = JSON.parse(sessionStorage.getItem("mySearches")) || [];
    if (query !== "") {
      history = [query, ...history];

      sessionStorage.setItem("mySearches", JSON.stringify(history));
      console.log("useEffect history has what: ", history);
    }
  }

  return (
    <>
      <Headernav />
      <InputGroup
        className="mt-3 mb-4 mx-auto"
        id="search-term"
        value={search}
      >
        <FormControl
          placeholder="Search for Articles"
          aria-label="Search for Articles"
          aria-describedby="basic-addon2"
          ref={search}
        />
        <Button
          variant="outline-warning"
          id="button-addon2"
          type="reset"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </InputGroup>
      <Cards results={results} />
    </>
  );
}

export default Search;
