import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./JoinRoom.css";

function JoinRoom(props) {
  const [error, seterror] = useState(null);
  const [roomCode, setroomCode] = useState(null);
  const handleChange = (e) => {
    setroomCode(e.target.value);
  };
  const handleButtonPressed = () => {
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOption)
      .then((response) => {
        if (response.ok) {
          props.history.push(`/room/${roomCode}`);
        } else {
          seterror("Room not found.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='joinpage'>
      <div className='joinform'>
        <h1 className='title'>Join the Room</h1>
        <Box mt={3}>
          <TextField
            variant='outlined'
            label='code'
            placeholder='Enter the code'
            required='true'
            type='text'
            error={error}
            helperText={error}
            onChange={handleChange}
          />
        </Box>
        <Box mt={5} pb={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={handleButtonPressed}>
            Enter
          </Button>
        </Box>
        <Button color='secondary' to='/' component={Link}>
          back
        </Button>
      </div>
    </div>
  );
}

export default JoinRoom;
