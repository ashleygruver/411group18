import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PlaylistBar from './material-ui/PlaylistBar'

const Playlists = () => {

	const [playlists, setPlaylists] = useState([]);

	const getPlaylists = () => {
		axios.get("http://localhost:5000/api/get-playlists", { withCredentials: true })
			.then((res) => {
				return res["data"]["items"]
			})
			.then((playlists) => {
				const modifiedPlaylists = playlists.map(({collaborative, description, external_urls, href, owner, primary_color, snapshot_id, tracks, type, ...keepAttrs}) => keepAttrs);
				setPlaylists(modifiedPlaylists);
				console.log(modifiedPlaylists)
				return;
			})
	}

	useEffect(() => {
		getPlaylists();
	}, [])

	return (
		(
			<div>
				<h1>{playlists.map(playlist => (
					<PlaylistBar 
						name={playlist["name"]}
						imageURL={playlist["images"][0]["url"]}
					/>
				))}</h1>
			</div>
		)

	)
}


export default Playlists;