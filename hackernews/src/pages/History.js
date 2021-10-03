import React, { useState } from "react";
import Headernav from "../components/HeaderNav";
import List from "../components/List";

function History() {
  //no 'setting' happens on this page, removed setter from useState hook.
  const [list] = useState(() => {
    const saved = sessionStorage.getItem("mySearches");
    const savedSearches = JSON.parse(saved);
    return savedSearches || [];
  });

  return (
    <>
      <Headernav />
      <h2 className="m-3">Search History</h2>
      <List savedSearches={list} />
    </>
  );
}

export default History;
