import { Button, ButtonGroup } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className='home'>
      <h1>House Party</h1>
      <Button color='secondary' variant='contained' to='/join' component={Link}>
        Join a room
        </Button>
      <hr />
      <span class='or'>or</span>
        <Button
          color='primary'
          variant='contained'
          to='/create'
          component={Link}>Create Room</Button>
      </div>
  
  );
}

export default Home;
