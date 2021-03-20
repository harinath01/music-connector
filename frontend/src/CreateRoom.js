import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateRoom.css";
import {
  Box,
  Button,
  FormLabel,
  FormControlLabel,
  TextField,
  Radio,
  RadioGroup,
} from "@material-ui/core";

function CreateRoom(props) {
  const [guestCanPause, setguestCanPause] = useState(props.guestCanPause);
  const [votesToSkip, setvotes] = useState(props.votesToSkip);
  
  const handleGuestCanPauseChange = (event) => {
    setguestCanPause(event.target.value);
  };
  const HandleVotesSKip = (e) => {
    setvotes(e.target.value);
  };
  const handleRoomButtonPressed = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("/api/createroom", requestOptions)
      .then((response) => response.json())
      .then((data) => props.history.push(`/room/${data.code}`));
  };
  return (
    <div className='createroom'>
      <h1 className='title'>
        {props.update ? "Update a Room" : "Create a Room"}
      </h1>
      <div className='radio'>
        <FormLabel>Guest's Control of Playback State</FormLabel>
        <RadioGroup
          row
          defaultValue={guestCanPause.toString()}
          value={guestCanPause.toString()}
          onChange={handleGuestCanPauseChange}>
          <FormControlLabel
            value='true'
            control={<Radio color='primary' />}
            label='Play/Pause'
            labelPlacement='bottom'
          />
          <FormControlLabel
            value='false'
            control={<Radio color='secondary' />}
            label='No Control'
            labelPlacement='bottom'
          />
        </RadioGroup>
      </div>
      <TextField
        required={true}
        type={"number"}
        defaultValue={votesToSkip.toString()}
        onChange={HandleVotesSKip}
        inputProps={{
          min: 1,
          style: { textAlign: "center" },
        }}
        helperText='Votes Required To Skip Song'
      />
      <Box mt={5} pb={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={
            props.update ? ()=>{ props.updateButtonPressed(guestCanPause,votesToSkip) } : handleRoomButtonPressed
          }>
          {props.update ? "Update" : "Create"}
        </Button>
      </Box>
      {props.update ? (
        <Button
          color='secondary'
          onClick={() => {
            props.settingsCallback(guestCanPause, votesToSkip);
          }}>
          close
        </Button>
      ) : (
        <Button color='secondary' to='/' component={Link}>
          Back
        </Button>
      )}
    </div>
  );
}
CreateRoom.defaultProps={ 
  update: false,
  votesToSkip: 2,
  guestCanPause: true,
  updateButtonPressed: () => {},
  settingsCallback: () => { }
}
export default CreateRoom;
