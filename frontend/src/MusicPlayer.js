import React from 'react'
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Room from './Room';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 450,
    borderRadius:'5px'
    },
});

function MusicPlayer(props) {
   const classes = useStyles();
  const songProgress = (props.time / props.duration) * 100;
   const skipSong=()=> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }
  const pauseSong = () => { 
    const requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/spotify/pause',requestOption)
    }
  const playSong = () => {
      const requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/spotify/play', requestOption)
    }
    return (
      <Card className={classes.root}>
        <Grid container alignItems='center'>
          <Grid item align='center' xs={4}>
            <img src={props.image_url} height='100%' width='100%' />
          </Grid>
          <Grid item align='center' xs={8}>
            <Typography component='h5' variant='h5'>
              {props.title}
            </Typography>
            <Typography color='textSecondary' variant='subtitle1'>
              {props.artist}
            </Typography>
            <div>
              <IconButton
                onClick={() => {
                  props.is_playing ? pauseSong() : playSong();
                }}>
                {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={() => {skipSong()}}>
              {props.votes} / {props.votes_required}
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant='determinate' value={songProgress} />
      </Card>
    );
}
MusicPlayer.defaultProps = {
  title: "Currently no is playing",
  artist: "",
  duration: 0,
  time: 0,
  image_url:
    "https://www.google.com/search?q=No+user+icon&sxsrf=ALeKk02B4Vh9ezxlXWgk3h0fde410pFPjg:1615733788832&tbm=isch&source=iu&ictx=1&fir=sUNDS6QsosX14M%252CX07s45UQ1BLzrM%252C_&vet=1&usg=AI4_-kR0ELctuWW03P1xSakA4OiwEWxlog&sa=X&ved=2ahUKEwiWmaO0hbDvAhW763MBHWMQAPgQ9QF6BAgNEAE#imgrc=sUNDS6QsosX14M",
  is_playing: false,
  votes: 0,
  id: 0,
};
export default MusicPlayer
