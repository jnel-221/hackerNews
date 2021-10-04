import React, { useState, useRef } from "react";
import Headernav from "../components/HeaderNav";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import Cards from "../components/Card";
import FormatDate from "../utils/helpers/formatDate.js";
import setStorage from "../utils/helpers/setStorage.js";

function Search() {
  const search = useRef(null);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    let query = search.current.value.trim();

    if (query !== "") {
      axios
        .get(`https://hn.algolia.com/api/v1/search?query=${query}&tags=story`)
        .then((res) => {
          const stories = res.data.hits;

          setResults(stories);
          setResults((stories) => {
            return stories;
          });
          parseResults(stories);
        });
    } else {
      alert("Please enter search terms to get results");
    }
    setStorage(query);
    clearState();
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

  function clearState() {
    setValue("");
  }

  function handleKeypress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }
  return (
    <>
      <Headernav />
      <InputGroup
        className="mt-3 mb-4 px-5"
        id="search-term"
        onKeyPress={handleKeypress}
      >
        <FormControl
          placeholder="Search for Articles"
          aria-label="Search for Articles"
          aria-describedby="basic-addon2"
          value={value}
          ref={search}
          onChange={(e) => setValue(e.target.value.trim())}
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
      <Cards results={results} />
    </>
  );
}

export default Search;
