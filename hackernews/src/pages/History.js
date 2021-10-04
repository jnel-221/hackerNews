import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Headernav from "../components/HeaderNav";
import List from "../components/List";

function History() {
  const [list, setList] = useState(() => {
    const saved = sessionStorage.getItem("mySearches");
    const savedSearches = JSON.parse(saved);
    return savedSearches || [];
  });

  function handleClick(e){
    e.preventDefault();
    sessionStorage.clear();
    setList([]);
  }

  return (
    <>
      <Headernav />
      <h2 className="m-3">Search History</h2>
      <List savedSearches={list} />
      <Button variant="warning" className="m-3" type="submit" onClick={handleClick}>Clear History</Button>
    </>
  );
}

export default History;
