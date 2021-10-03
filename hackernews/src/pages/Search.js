import React, { useState, useEffect } from "react";
import Headernav from "../components/HeaderNav";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import Cards from "../components/Card";
import FormatDate from "../utils/helpers/formatDate.js";

function Search() {
  const [search, setSearch] = useState("");
  useEffect(function storeSearch(){
    let history = JSON.parse(sessionStorage.getItem("mySearches"))||[];
     
    if(search !== ""){
        
        history = [...history, search];

        sessionStorage.setItem("mySearches",JSON.stringify(history))
        console.log("useEffect history has what: ", history);
    }

  })


  const [results, setResults] = useState([]);
//   const [history, setHistory] = useState([]);

 
  function handleSubmit(e) {
    e.preventDefault();

    setSearch(e.target.value.trim());    
    if (search !== "") {
      axios
        .get(`http://hn.algolia.com/api/v1/search?query=${search}&tags=story`)
        .then((res) => {
          const stories = res.data.hits;

          setResults(stories);
          setResults((stories) => {
            return stories;
          });
          parseHistory(stories);
        });
    } else {
      console.log("enter search term to get results");
    }

  }

  

  function parseHistory(arr) {
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


  return (
    <>
      <Headernav />
      <InputGroup
        className="mt-3 mb-4 mx-auto"
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
      {/* <p>Hey, looks like you're searching for {search}!</p> */}

      <Cards results={results} />
    </>
  );
}

export default Search;
