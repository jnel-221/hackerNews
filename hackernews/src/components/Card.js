import React from "react";
import {Card} from "react-bootstrap";


function Cards({results}){

    return(
        <>
        {results.map((result,i) => (
        <Card className="my-3">
        
            <Card.Body key={i}>
                <Card.Title>{result.title}</Card.Title>
                <Card.Subtitle>by {result.author}</Card.Subtitle>
                <Card.Subtitle class="mt-1">created {result.date}</Card.Subtitle>
                <Card.Link href={result.url} target="_blank">View Story</Card.Link>
            </Card.Body>
        
        </Card>
        ))}
        </>
    );
}

export default Cards;