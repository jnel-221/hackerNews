import React, {useState} from "react";
import Headernav from "../components/HeaderNav";
import List from "../components/List";


function History(){
    //no 'setting' happens on this page, removed setter from useState hook.
    const [list] = useState(()=>{
        const saved = sessionStorage.getItem("mySearches");
        const savedSearches = JSON.parse(saved);
        return savedSearches|| [];
    })

     console.log("stored array values: ",list);
    return(
        <>
        <Headernav/>
        <h1 className="m-3">Search History</h1>
        <p>Where's your history?</p>
        <List savedSearches={list}/>
        </>
    );
}

export default History;