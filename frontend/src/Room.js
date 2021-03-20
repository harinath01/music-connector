import React, { useState, useEffect } from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Button, Box, Grid } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import "./Room.css";
import copy from "copy-to-clipboard";
import Settings from "./Settings";
import MusicPlayer from "./MusicPlayer";

function Room(props) {
  const [votesToSkip, setvotes] = useState(2);
  const [guestCanPause, setguestCanPause] = useState(false);
  const [isHost, setHost] = useState(false);
  const [code, setCode] = useState(null);
  const [showSetting, setShowSettings] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [spotifyAuthenticated, setSpotifyauth] = useState(false);
  const [song, setSong] = useState("");
  

const toCopy = () => {
    copy(code);
  };

  const leaveButtonPressed = () => {
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOption).then((_response) => {
      props.leaveRoomCallback();
      props.history.push("/");
    });
  };

  const settingsButtonPressed = () => {
    showSetting ? setShowSettings(false) : setShowSettings(true);
  };

  const refreshCallback = () => {
    refresh ? setRefresh(false) : setRefresh(true);
  };

  const authenticateSpotify = () => {
    if (!spotifyAuthenticated) {
      fetch("/spotify/is-authenticated")
        .then((response) => response.json())
        .then((data) => {
          setSpotifyauth(data.status);
          console.log(data.status);
          if (!data.status) {
            fetch("/spotify/get-auth-url")
              .then((response) => response.json())
              .then((data) => {
                window.location.replace(data.url);
              });
          }
        });
    }
  };

  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }else{
          return {}
        };
      })
      .then((data) => {
        setSong(data)
      });
  };

  const roomCode = props.match.params.roomCode;

  useEffect(() => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((response) => {
        if (!response.ok) {
          props.leaveRoomCallback();
          props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        setvotes(data.votes_to_skip);
        setguestCanPause(data.guest_can_pause);
        setHost(data.is_host);
        setCode(data.code);
        if (data.is_host) {
          authenticateSpotify();
        }
      });
  }, [refresh]);
  let interval;
  useEffect(() => {
    interval = setInterval(getCurrentSong, 1000)
    return () => { clearInterval(interval) };
  }, [song]);

  if (showSetting) {
    return (
      <div className=''>
        <Settings
          votesToSkip={votesToSkip}
          guestCanPause={guestCanPause}
          update={true}
          settingsCallback={settingsButtonPressed}
          refreshCallback={refreshCallback}
          code={code}
        />
      </div>
    );
  } else {
    return (
      <div className='room'>
        <div className='room_details'>
          <div className='code_display'>
            <div className='background'>
              <h1>{code}</h1>
              <FileCopyIcon
                onClick={toCopy}
                className='copy_button hover_button'
                style={{ fontSize: "25px" }}
              />
            </div>
            {isHost && (
              <SettingsIcon
                onClick={settingsButtonPressed}
                className='hover_button'
                style={{ fontSize: "25px" }}
              />
            )}
          </div>

          <MusicPlayer {...song} />
          <div className='button'>
            <Button
              variant='contained'
              color='secondary'
              onClick={leaveButtonPressed}>
              Leave
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
