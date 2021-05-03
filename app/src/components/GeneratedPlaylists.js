import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GeneratedPlaylistBar from './material-ui/GeneratedPlaylistBar'
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const GeneratedPlaylists = () => {

	const [generatedPlaylists, setGeneratedPlaylists] = useState([]);

	const getGeneratedPlaylists = () => {
		axios.get("http://localhost:5000/api/view-generated-playlists", { withCredentials: true })
			.then((res) => {
                console.log(res["data"]["generatedPlaylists"])
				setGeneratedPlaylists(res["data"]["generatedPlaylists"]);
			})
	}

	useEffect(() => {
		getGeneratedPlaylists();
	}, [])

	const useStyles = makeStyles((theme) => ({

		main: {
			display: 'flex',
			flexDirection: 'column',
			backgroundColor: '#bfbfbf',
		},

		header: {
			backgroundColor: 'black',
			color: 'white',
			fontSize: '18px',
			paddingLeft: '10px',
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center"
		},

		playlistWrapper: {
			width: '80%',
			backgroundColor:'white',
			margin: 'auto',
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
			'& h2': {
				textAlign: 'center',
				fontSize: '8vw',
				margin: 0,
				[theme.breakpoints.up('xl')]: {
					fontSize: '153.6px',
				},
			},
		},

		playlists: {
			width: '90%',
			backgroundColor: 'red',
			margin: 'auto',
		},

		button: {
			width: '10vw',
			height: '4vw',
			margin: '1vw',
			fontSize: '1vw',
			color: 'black',
			backgroundColor: 'white',
			borderRadius: 0,
			boxShadow: 'none',
			'&:hover': {
				color: '#1D8954',
				backgroundColor: 'white',
			},
		},

	}));

	const classes = useStyles();

	return (
		(
			<div className={classes.main}>
				<div className={classes.header}>
					<h1>Playlist Palettes</h1>
					<Button href="http://localhost:3000/playlists" className={classes.button} variant="contained">
						Back
              		</Button>
				</div>
				<div className={classes.playlistWrapper}>
					<h2>Generated Playlists</h2>
						<div className={classes.playlists}>
							<h1>{generatedPlaylists.map(playlist => (
								<GeneratedPlaylistBar 
									name={playlist["name"]}
									imageURL={playlist["imageUrl"]}
									id={playlist['id']}
									colorOne={playlist["colors"][0]}
									colorTwo={playlist["colors"][1]}
									colorThree={playlist["colors"][2]}
									colorFour={playlist["colors"][3]}
									colorFive={playlist["colors"][4]}
									/>
							))}</h1>
						</div>
				</div>
			</div>
		)
	)
}


export default GeneratedPlaylists;