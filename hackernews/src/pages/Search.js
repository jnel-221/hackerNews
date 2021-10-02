import React, { useState } from "react";
import Headernav from "../components/HeaderNav";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import Cards from "../components/Card";

function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  

  function handleSubmit(e) {
    e.preventDefault();

    console.log("You clicked submit! ", search);

    if (search !== "") {
      axios
        .get(`http://hn.algolia.com/api/v1/search?query=${search}&tags=story`)
        .then((res) => {
          const stories = res.data.hits;
          
          setResults(stories);
          setResults((stories)=>{
              console.log("updater ",stories)
              return stories;
          });
          parseHistory(stories);
          
        });
    } else {
      console.log("enter search term to get results");
    }

    setHistory((history) => [...history, search]);
    setHistory((history) => {
        return history;
    })
    setStorage(history);
   
    console.log(
      "handleSubmit history ",
      history,
      ` history is ${history.length} items long`
    );
   
  }

  function parseHistory(arr){
    setResults(arr.map((story)=> {
        return{
            title: story.title,
            author: story.author,
            url: story.url,
            date: story.created_at,
        };
        
    }))
  }
  console.log("parseHistory: ", results);

  function setStorage(array) {
    let json = JSON.stringify(array);
    console.log("setStorage history arr to string contains ", json);
    sessionStorage.setItem("searchHistory",json);
  }

//   function handleChange(e) {
//     e.preventDefault();
//     setSearch(e.target.value.trim());
//   }

  return (
    <>
      <Headernav />
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

      <Cards results={results}/>
    </>
  );
}

export default Search;
