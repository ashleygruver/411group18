from flask import (Blueprint, make_response, jsonify, request)
import requests

spotify = Blueprint("spotify", __name__)  # initialize blueprint


@spotify.route("/api/get-playlists", methods=["GET"])
def get_playlists():
    access_token = request.cookies.get('access_token')

    try:
        url = "https://api.spotify.com/v1/me/playlists"

        payload = {}
        headers = {
            'Authorization': 'Bearer ' + access_token
        }

        response = requests.request("GET", url, headers=headers, data=payload)
        response = response.json()
        return make_response(response, 200)
    except Exception as e:
        print(e)

# API to get all album covers of a selected playlist
@spotify.route("/api/get-album-covers/<playlist_id>", methods=["GET"])
def get_all_album_covers(playlist_id):
    access_token = request.cookies.get('access_token')
    try:
        url = "https://api.spotify.com/v1/playlists/" + playlist_id
        payload = {}
        headers = {
            'Authorization': 'Bearer ' + access_token
        }

        response = requests.request("GET", url, headers=headers, data=payload)
        response = response.json()
        tracks = response["tracks"]["items"]
        album_urls= [tracks[i]["track"]["album"]["images"][1]["url"] for i in range(len(tracks))]
        response = {
            "albumUrls": album_urls
        }
        return make_response(response, 200)
    except Exception as e:
        print(e)

