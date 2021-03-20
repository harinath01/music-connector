import "./App.css";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Room from "./Room";
import Home from "./Home";

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [roomCode, setCode] = useState(null);
  const cleanCallback = () => {
    setCode(null);
  };
  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setCode(data.code);
      });
  }, []);

  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return roomCode ? (
                <Redirect to={`/room/${roomCode}`} />
              ) : (
                <Home />
              );
            }}
          />
          <Route path='/join' component={JoinRoom} />
          <Route path='/create' component={CreateRoom} />
          <Route
            path='/room/:roomCode'
            render={(props) => {
              return <Room {...props} leaveRoomCallback={cleanCallback} />;
            }}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
