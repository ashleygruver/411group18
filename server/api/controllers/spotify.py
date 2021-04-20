from flask import (Blueprint, make_response, jsonify, request)
from api import mongo
import requests

spotify = Blueprint("spotify", __name__)  # initialize blueprint
playlist_db = mongo.db.playlists


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
    # Accesses browser cookie to fetch access token
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

        album_urls = [tracks[i]["track"]["album"]["images"][1]["url"]
                      for i in range(len(tracks))]
        response = {
            "albumUrls": album_urls
        }
        return make_response(response, 200)

    except Exception as e:
        print(e)


# This is a function
@spotify.route("/api/view-generated-playlists", methods=["GET"])
def view_generated_playlist():
    url = "https://api.spotify.com/v1/me"
    access_token = request.cookies.get('access_token')
    payload = {}
    headers = {
        'Authorization': 'Bearer ' + access_token
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    response = response.json()
    spotify_user_id = response["id"]
    user_exists = (playlist_db.find({"userId": spotify_user_id}).count() != 0)
    generated_playlists = []

    if not user_exists:
        try:
            user_data = {
                "userId": spotify_user_id,
                "playlists": []
            }
            playlist_db.insert_one(user_data)

        except Exception as e:
            print(e)

    else:
        data = playlist_db.find_one({"userId": spotify_user_id})
        generated_playlists = data["playlists"]

    response_object = {
        "generatedPlaylists": generated_playlists
    }

    return make_response(response_object, 200)

@spotify.route("/api/add-generated-playlists", methods=["POST"])
def add_generated_playlist():
    # add_generated_playlist(user_id):
    #     - if user_id doesn’t exist, create a user_id field with that generated playlist
    #     - else, just add/append on that specific user_id field.

    url = "https://api.spotify.com/v1/me"
    access_token = request.cookies.get('access_token')
    payload = {}
    headers = {
        'Authorization': 'Bearer ' + access_token
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    response = response.json()
    spotify_user_id = response["id"]
    user_exists = (playlist_db.find({"userId": spotify_user_id}).count() != 0)

    playlist_db_data = request.get_json()

    #does not have the user, so create one
    if not user_exists:
        try:
            user_data = {
                "userId": spotify_user_id,
                "playlists": []
            }
            playlist_db.insert_one(user_data)


        except Exception as e:
            print(e)

    #now we have a user, so we add a playlist
    playlist_db.update({"userId": spotify_user_id}, {'$push': {'playlists': playlist_db_data}})

    response_object = {
        "message": "generated playlist in mongodb",
        "status": True
    }

    return make_response(response_object, 200)
    




