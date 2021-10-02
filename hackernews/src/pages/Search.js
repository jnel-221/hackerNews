import React, {useState} from "react";
import Headernav from "../components/HeaderNav";
import Input from "../components/Input";

function Search(){
    const [search, setSearch]= useState("");
    const [history, setHistory]=useState([])

    function handleSubmit(e){
        e.preventDefault();
        console.log("You clicked submit! ", search);
        setHistory(history => [...history, search]);  
        setStorage(history);
    }
    // console.log("history array ",history);

    function setStorage(arr){
        sessionStorage.setItem("searchHistory", JSON.stringify(arr));
    }

   function handleChange(e){
       setSearch(e.target.value.trim());

    }
    // function storeSearches(search){
    //     let searches = [];
    //     searches.unshift(search);

    // }
    return(
        <>
        <Headernav/>
        {/* <h1>Hello World</h1> */}
        <Input handleSubmit={handleSubmit} handleChange={handleChange}/>
        <p>Hey, looks like you're searching for {search}!</p>
        </>
    )
}

export default Search;