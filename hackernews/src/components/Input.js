import React from "react";
import{InputGroup, FormControl, Button} from "react-bootstrap";


function Input(){

    function handleSubmit(e){
        e.preventDefault();
        console.log("You clicked submit!")
    }

    return(
    <InputGroup className="mt-3 mx-auto">
    <FormControl
      placeholder="Search for Articles"
      aria-label="Search for Articles"
      aria-describedby="basic-addon2"
    />
    <Button variant="outline-warning" id="button-addon2" type="submit" onClick={handleSubmit}>
      Search
    </Button>
  </InputGroup>
    );
}

export default Input;