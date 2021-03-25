import React, { useState } from 'react'
import '../App.css';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import querystring from 'querystring';

const Home = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  const spotifyLogin = () => {
    const client_id = "1c5183fbe4c5491789c87f8638deb99d";
    const redirect_uri = "http://localhost:5000/callback";
    var scopes = 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative';
    window.open('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scopes,
        redirect_uri
      }), "_self"
    )
  }

  return (
    (
      <div className="App">
        <Button onClick={spotifyLogin} variant="contained">Login with Spotify</Button>
      </div>
    )

  )
}


export default Home;