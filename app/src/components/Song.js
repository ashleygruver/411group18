import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { Container } from '@material-ui/core';


// Generate random value to select a pattern for background
const rando = Math.floor(Math.random() * 10);

function choosePattern(param) {
  if (param == 0) {
    return "url(https://i.imgur.com/KXYyuQa.png)"
  }
  if (param == 1) {
    return "url(https://i.imgur.com/crAz0EG.png)"

  }
  if (param == 2) {
    return "url(https://i.imgur.com/IH7mCd7.png)"

  }
  if (param == 3) {
    return "url(https://i.imgur.com/MVCuQTH.png)"

  }
  if (param == 4) {
    return "url(https://i.imgur.com/GbvJ0hZ.png)"

  }
  if (param == 5) {
    return "url(https://i.imgur.com/h77Rfii.png)"

  }
  if (param == 6) {
    return "url(https://i.imgur.com/7d1QwYl.png)"

  }
  if (param == 7) {
    return "url(https://i.imgur.com/fwNroRf.png)"

  }
  if (param == 8) {
    return "url(https://i.imgur.com/hl4rqbK.png)"

  }
  if (param == 9) {
    return "url(https://i.imgur.com/QnQi3hC.png)"

  }
}

const pattern = choosePattern(rando);

//generates random number to be used as the background size percentage
const randoPercent = (Math.floor(Math.random() * 60)+11);



// default colors for page when nothing is being hovered over
const backgroundBaseColor = "#fdfdfd";
const fontBaseColor = "#424246";

// font color for dark themes and light themes
const fontBaseBlack = "#1d1d1d";
const fontBaseWhite = "#fdfdfd";


// removes # from colors, used for page redirect to https://color-hex.org/
function parseHex(hex) {
  return hex.substring(1);
  
}

// source code from here: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// source code from here: https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
function determineFontColor(color) {
  var convert = hexToRgb(color)
  if ((convert.r*0.299 + convert.g*0.587 + convert.b*0.114) > 186) 
    return fontBaseBlack 
  else {
    return fontBaseWhite
  }
}



/*
START SECTION:
This is an idea of how to parse an incoming request.
This is assuming that the sent version of the url
will replace every / with < so that the url can
be parsed by the browser properly. IDK if this 
is the best way to go abaout it.


TEST CASE:

name: Random Songs
imageUrl: https://source.unsplash.com/random
totalSongs = 3020
author: Spotify
link to playlist -> https://open.spotify.com/playlist/31J0PX4kQOlImKIX3FT2nq

url would be : localhost:3000/song/Random Songs,https:<<source.unsplash.com<random,3020,Spotify,https:<<open.spotify.com<playlist<31J0PX4kQOlImKIX3FT2nq


*/
var name = '';
var imageUrl = '';
var totalSongs = '';
var author = '';
var linktoPlaylist = '';

function fixURL(url) {
  return url.replaceAll("<", "/") 
}

function parseID(str) {
  var parsedValue = str.split(",")
  name = parsedValue[0]
  imageUrl = "url(" + fixURL(parsedValue[1])+ ")"
  console.log(imageUrl)
  totalSongs = parsedValue[2]
  author = parsedValue[3]
  linktoPlaylist = fixURL(parsedValue[4])
}

/*
END SECTION

*/




const Song = () => {

  const [background, setBackground] = useState(backgroundBaseColor);

  const [font, setFont] = useState(fontBaseColor);

  const [hovered, setHovered] = useState(1);

/*  **** Colors from the Google API would be placed ***** */
  const [color1] = useState("#cfa074");
  const [color2] = useState("#fd45d1");
  const [color3] = useState("#ffc410");
  const [color4] = useState("#44b3c4");

  // determines the appropiate font color based on the background color
  const font1 = determineFontColor(color1);
  const font2 = determineFontColor(color2);
  const font3 = determineFontColor(color3);
  const font4 = determineFontColor(color4);




  const setStyle = (background, font) => {
    setBackground(background);
    setFont(font);
  };

  const borderBase1 = 'medium solid ' + background;
  const borderBase2 = 'thin solid ' + '#ffffff'; // base2 is white the whole time; no changes

  const {id} = useParams(); 
  // grab the url id; from the parameters we can parse the necessary information to get the
  // image, name, song count, etc.
  parseID(id);



  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      backgroundColor: background,
        backgroundImage: pattern,
        backgroundSize: randoPercent+'%',
    },
    image: {
      backgroundImage: imageUrl,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      opacity: hovered,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: 450,
      height: 450,
      marginTop: '5%',
      border: borderBase1,

    },
    grider: {
      backgroundColor: background,
      color: font,

    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
    },

    captions: {
      marginLeft: theme.spacing(15),
    },

    boxed1: {
      backgroundColor: color1,
      border: "thick",
      borderColor: "#ffffff",
      width: 80,
      height: 80,
      margin: 10,
      marginLeft: 10,
      fontSize: '3em',

    },

    boxed2: {
      backgroundColor: color2,
      width: 80,
      height: 80,
      margin: 10,
      marginLeft: 10,
      fontSize: '3em',
    },

    boxed3: {
      backgroundColor: color3,
      width: 80,
      height: 80,
      margin: 10,
      marginLeft: 10,
      fontSize: '3em',
    },

    boxed4: {
      backgroundColor: color4,
      width: 80,
      height: 80,
      margin: 10,
      marginLeft: 10,
      fontSize: '3em',
      
    },

    title:{
      backgroundColor: background,
      marginTop: 450,
      padding: theme.spacing(1,1,1),
      fontSize: 30,
      border: borderBase2,

      fontFamily: 'Roboto',
      fontWeight: 'Bold',
      color: font,
    },


  }));

  const classes = useStyles();

/*   Based on these sources:
        https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side
        https://codesandbox.io/s/change-state-onmouseenter-onmouseout-after-gvqfn
 */

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Container className={classes.image} onMouseEnter={() => setHovered(0.6)}
            onMouseOut={() => setHovered(1)} onClick={() => window.open(linktoPlaylist)}>
        <Typography align = 'center' className = {classes.title} component = {Paper} elevation = {6}>
          {name} 
        </Typography>
      </Container>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={12} square className={classes.grider}>
     
      <div className={classes.paper}>
          <Typography component="h1" variant="h">
            Scheme for this playlist:
          </Typography>
        </div>
        <Container>
          <div onClick={() => window.open("https://color-hex.org/color/"+parseHex(color1))} onMouseEnter={() => setStyle(color1, font1)}
            onMouseOut={() => setStyle(backgroundBaseColor, fontBaseColor)} className= {classes.boxed1} > 
            <div className= {classes.captions}>
              {color1}
            </div> 
          </div>

          <div onClick={() => window.open("https://color-hex.org/color/"+parseHex(color2))} onMouseEnter={() => setStyle(color2, font2)}
            onMouseOut={() => setStyle(backgroundBaseColor, fontBaseColor)} className= {classes.boxed2} > 
            <div className= {classes.captions}>
              {color2}
            </div> 
          </div>

          <div onClick={() => window.open("https://color-hex.org/color/"+parseHex(color3))} onMouseEnter={() => setStyle(color3, font3)}
            onMouseOut={() => setStyle(backgroundBaseColor, fontBaseColor)} className= {classes.boxed3} > 
            <div className= {classes.captions}>
              {color3}
            </div> 
          </div>

          <div onClick={() => window.open("https://color-hex.org/color/"+parseHex(color4))} onMouseEnter={() => setStyle(color4, font4)}
            onMouseOut={() => setStyle(backgroundBaseColor, fontBaseColor)} className= {classes.boxed4} > 
              <div className= {classes.captions}>
              {color4}
            </div> 
          </div>
        </Container>

        <div className={classes.paper}>
          <Typography component="h1" variant="h6">
            Playlist by: {author}<br></br>
            Number of Songs: {totalSongs}
          </Typography>
        </div>


      </Grid>
    </Grid>
  );
}

export default Song;
