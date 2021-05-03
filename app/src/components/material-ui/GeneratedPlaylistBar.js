import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    width: '4vw',
    height: '4vw',
    margin: '1vw',
    fontSize: '.75vw',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 0,
    boxShadow: 'none',
    '&:hover': {
      color: 'black',
      backgroundColor: 'black',
      },
  },

}));

const GeneratedPlaylistBar = (props) => {


  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={props.imageURL}/>
        <div className={classes.content}>
          <CardContent className={classes.contentWrapper}>
            <Typography className={classes.title}>
              {props.name}
            </Typography>
          </CardContent>
          <CardActions className={classes.buttonRow}>
              <Button className={classes.button} variant="contained" style={{
                backgroundColor: props.colorOne,
              }}>
                {props.colorOne}
              </Button>
              <Button className={classes.button} variant="contained" style={{
                backgroundColor: props.colorTwo,
              }}>
                {props.colorTwo}
              </Button>
              <Button className={classes.button} variant="contained" style={{
                backgroundColor: props.colorThree,
              }}>
                {props.colorThree}
              </Button>
              <Button className={classes.button} variant="contained" style={{
                backgroundColor: props.colorFour,
              }}>
                {props.colorFour}
              </Button>
              <Button className={classes.button} variant="contained" style={{
                backgroundColor: props.colorFive,
              }}>
                {props.colorFive}
              </Button>

          </CardActions>
        </div>
    </Card>
  );

}


export default GeneratedPlaylistBar;
