import React, { useState, useRef, useEffect } from "react";
import Headernav from "../components/HeaderNav";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import Cards from "../components/Card";
import FormatDate from "../utils/helpers/formatDate.js";

function Search() {
  // const [search, setSearch] = useState("");
 //above hook commented out; trying useRef hook to resolve iterative-string-saving bug.

  const search = useRef(null);

  const [results, setResults] = useState([]);

//below hook commented out; replacing w/useEffect hook to store search terms as they're captured in 'handleSubmit'.
//   const [history, setHistory] = useState([]);

//first draft, saving for reference until all storing bugs resolved.
//  useEffect(function storeSearch(){
//     let history = JSON.parse(sessionStorage.getItem("mySearches"))||[];
     
//     if(search !== ""){
        
//         history = [...history, search];

//         sessionStorage.setItem("mySearches",JSON.stringify(history))
//         console.log("useEffect history has what: ", history);
//     }

//   })


//second draft: iterative-string-saving bug resolved, but replaced with string-saved-twice-on-handleSubmit bug.
   useEffect(()=>{
    let history = JSON.parse(sessionStorage.getItem("mySearches"))||[];
    let query = search.current.value.trim();
        if(query !== ""){
            
            history = [...history, query];
    
            sessionStorage.setItem("mySearches",JSON.stringify(history))
            console.log("useEffect history has what: ", history);
        }
   })

 
  function handleSubmit(e) {
    e.preventDefault();
    let query = search.current.value.trim();
    console.log("handleSubmit; ref hook working? ",query);
    
    // setSearch(e.target.value.trim());    
    if (search !== "") {
      axios
        .get(`http://hn.algolia.com/api/v1/search?query=${query}&tags=story`)
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
        // onClick={(e) => setSearch(e.target.value.trim())}
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
      {/* <p>Hey, looks like you're searching for {search}!</p> */}

      <Cards results={results} />
    </>
  );
}

export default Search;
