// import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import '../App.css';
// import Button from '@material-ui/core/Button';
// import axios from 'axios';
// import querystring from 'querystring';
// // might have to do 'yarn add @material-ui/icons

// const Home = () => {

//     const [loggedIn, setLoggedIn] = useState(false);
  
//     const spotifyLogin = () => {
//       const client_id = "1c5183fbe4c5491789c87f8638deb99d";
//       const redirect_uri = "http://localhost:5000/callback";
//       var scopes = 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative';
//       window.open('https://accounts.spotify.com/authorize?' +
//         querystring.stringify({
//           response_type: 'code',
//           client_id: client_id,
//           scope: scopes,
//           redirect_uri
//         }), "_self"
//       )
//     }

//     const useStyles = makeStyles((theme) => ({
//         root: {
//             minHeight: '100vh',
//             backgroundImage: `url(${process.env.PUBLIC_URL + '/imgs/listening.png'})`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: 'cover',
//         },
//         logo: {
//             display: 'flex',
//             justifyContent: 'center',
            
//             // paddingLeft: '780px',
//             paddingTop: '50px',
//         },
//         text: {
//             display: 'flex',
//             justifyContent: 'center', //horizontal
//             alignItems: 'center', //vertical
//             lineHeight: '80px', //line spacing
//             letterSpacing: '10px', //letter spacing
//             height: '450px',
//             textAlign: 'center',
//             color: 'white',
//             fontSize: 20,
//         }
//     }));
    
//     const classes = useStyles();
//     return (
//       (
//         <div className={classes.root}>
//             <div className={classes.logo}>
//                 <img src='/imgs/Group 11.png' width='13%'></img>
//             </div>
//             <div className={classes.text}>
//                 <h1>WHERE <br /> MUSIC MEETS <br /> COLOR.</h1>
//             </div>
//             <div className="App">
//                 <Button onClick={spotifyLogin} variant="contained">Login with Spotify</Button>
//             </div>
//         </div>
//       )
  
//     )
// }

// export default Home;
