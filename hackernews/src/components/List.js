import React from "react";
import { ListGroup } from "react-bootstrap";


function List({savedSearches}) {
 
    return(
        <ListGroup className="m-3">
        {savedSearches.map((item, i)=>(
            <ListGroup.Item key={i}>{item}
            </ListGroup.Item>
        ))}
        </ListGroup>
    )
}


export default List;