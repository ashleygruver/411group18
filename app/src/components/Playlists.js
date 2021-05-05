import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PlaylistBar from './material-ui/PlaylistBar'
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const Playlists = () => {

	const [playlists, setPlaylists] = useState([]);

	const getPlaylists = () => {
		axios.get("http://localhost:5000/api/get-playlists", { withCredentials: true })
			.then((res) => {
				return res["data"]["items"]
			})
			.then((playlists) => {
				const modifiedPlaylists = playlists.map(({ collaborative, description, href, primary_color, snapshot_id, type, ...keepAttrs }) => keepAttrs);
				setPlaylists(modifiedPlaylists);
				console.log(modifiedPlaylists)
				return;
			})
	}

	useEffect(() => {
		getPlaylists();
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
			backgroundColor: 'white',
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
			width: '20vw',
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
					<div className={classes.text}>
						<h1>Playlist Palettes</h1>
					</div>
					<Button href="http://localhost:3000/generated-playlists" className={classes.button} variant="contained">
						View Generated Playlists
              		</Button>
				</div>
				<div className={classes.playlistWrapper}>
					<h2>My Playlists</h2>
					<div className={classes.playlists}>
						<h1>{playlists.map(playlist => (
							<PlaylistBar
								name={playlist["name"]}
								imageURL={playlist["images"][0]["url"]}
								owner={playlist["owner"]["display_name"]}
								tracks={playlist["tracks"]["total"]}
								URL={playlist['external_urls']['spotify']}
								id={playlist['id']}
							/>
						))}</h1>
					</div>
				</div>
			</div>
		)
	)
}


export default Playlists;