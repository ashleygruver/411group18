import React from 'react';
import { makeStyles, createMuiTheme, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Button';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    padding: '10px 0',
    borderRadius: 0,
    boxShadow: 'none',
    '&:hover': {
      '& $cover':{
        width: '25vw',
        height: '25vw',
        [theme.breakpoints.up('xl')]: {
          width: (1920 * 0.2),
          height: (1920 * 0.2),
    },
      },
      '& $title':{
        fontSize: '3.5vw',
        fontWeight: 700,
        [theme.breakpoints.up('xl')]: {
          fontSize: '67.2px',
        },
      },
      '& $details':{
        fontSize: '3vw',
        [theme.breakpoints.up('xl')]: {
          fontSize: '57.6px',
        },
      },
      '& $buttonRow':{
        display: 'flex',
        flexDirection:'row',
      },
    },
  },

  cover: {
    width: '15vw',
    height: '15vw',
    [theme.breakpoints.up('xl')]: {
      width: (1920 * 0.15),
      height: (1920 * 0.15),
    },
  },

  contentWrapper: {
    padding: '0 1vw',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '50%',
    [theme.breakpoints.up('xl')]: {
      width: '691.2px',
    },
  },

  title: {
    fontSize: '3vw',
    fontWeight: 700,
    [theme.breakpoints.up('xl')]: {
      fontSize: '57.6px',
    },
  },

  details:{
    fontSize: '2.5vw',
    [theme.breakpoints.up('xl')]: {
      fontSize: '48px',
    },
  },

  owner: {
    fontStyle: 'italic',
  },

  buttonRow:{
    display: 'none',
  },

  button:{
    width: '10vw',
    height: '4vw',
    margin: '1vw',
    fontSize: '1vw',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 0,
    boxShadow: 'none',
    '&:hover': {
      color: '#1D8954',
      backgroundColor: 'black',
      },
  },

}));

export default function PlaylistBar(props) {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={props.imageURL}/>
        <div className={classes.content}>
          <CardContent className={classes.contentWrapper}>
            <Typography className={classes.title}>
              {props.name}
            </Typography>
            <Typography className={classes.details}>
              {props.tracks} Songs
            </Typography>
            <Typography className={classes.details}>
              By: <span className={classes.owner}>{props.owner}</span>
            </Typography>
          </CardContent>
          <CardActions className={classes.buttonRow}>
              <Button href={props.URL} target='_blank' className={classes.button} variant="contained">
                Listen 
              </Button>
              <Button className={classes.button} variant="contained">
                Use This Playlist
              </Button>
          </CardActions>
        </div>
    </Card>
  );
}