import React, { useState } from "react";
import CreateRoom from "./CreateRoom";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function Update({
  votesToSkip,
  guestCanPause,
  update,
  settingsCallback,
  code,
  refreshCallback
}) {
  const [successMsg, setsucessMsg] = useState("")
  const [errorMsg, seterrorMsg] = useState("");
  const updateButtonPressed = (guestCanPause, votesToSkip) => {
    const requestOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: code,
      }),
    };
    fetch("/api/update-room", requestOption)
      .then(response  => {
        if (response.ok) {
          setsucessMsg('Room uploaded successfully...')
          settingsCallback()
          refreshCallback()
        }
        else { 
          seterrorMsg('Error updating room...')
        }
      });
  };
  return (
    <div className='settings'>
      <Collapse in={successMsg != "" || errorMsg != ""}>
        {successMsg != "" ? (
          <Alert
            severity="success"
            onClose={() => {
              setsucessMsg("");
            }}
          >
            {successMsg}
          </Alert>
        ) : (
            <Alert
              severity="error"
              onClose={() => {
                seterrorMsg("");
              }}
            >
              {errorMsg}
            </Alert>)}
      </Collapse>
      <CreateRoom
        votesToSkip={votesToSkip}
        guestCanPause={guestCanPause}
        update={update}
        settingsCallback={settingsCallback}
        updateButtonPressed={updateButtonPressed}
      />
    </div>
  );
}

export default Update;
