from flask import (Blueprint, make_response, jsonify, request)
from api import mongo, app
import requests
import json

spotify = Blueprint("spotify", __name__)  # initialize blueprint
playlist_db = mongo.db.playlists

# Helper function for Calling Google API
def get_colors_from_images(image_urls):
    """Call the Google API to get the principal colors from the images"""
    GOOGLE_API_KEY = app.config["GOOGLE_API_KEY"]
    url = "https://vision.googleapis.com/v1/images:annotate?key=" + GOOGLE_API_KEY
    colors = []
    headers = {
        'Content-Type': 'application/json'
    }
    assert(len(image_urls) == 2)
    for i in image_urls:
        message = json.dumps({
            "requests": [
                {
                    "image": {
                        "source": {
                            "imageUri": i
                        }
                    },
                    "features": [
                        {
                            "maxResults": 10,
                            "type": "IMAGE_PROPERTIES"
                        }
                    ]
                }
            ]
        })
        response = requests.request("POST", url, headers=headers, data=message)
        response = response.json()
        colors.append(response)
    return colors


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
def get_colors_from_album(playlist_id):
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
        urls_dict = {}
        for i in album_urls:
            if i in urls_dict:
                urls_dict[i] += 1
            else:
                urls_dict[i] = 1

        colors = get_colors_from_images(
            sorted(urls_dict, key=urls_dict.get, reverse=True)[:2]
        )
        
        scores = {}
        for i in range(len(colors)):
            for j in colors[i]["responses"][0]["imagePropertiesAnnotation"]["dominantColors"]["colors"]:
                if (j["color"]["red"], j["color"]["green"], j["color"]["blue"]) in scores:
                    scores[(j["color"]["red"], j["color"]["green"], j["color"]["blue"])] += j["score"] * \
                        urls_dict[sorted(
                            urls_dict, key=urls_dict.get, reverse=True)[i]]
                else:
                    scores[(j["color"]["red"], j["color"]["green"], j["color"]["blue"])] = j["score"] * \
                        urls_dict[sorted(
                            urls_dict, key=urls_dict.get, reverse=True)[i]]

        google_response = {
            "colors": []
        }
        for i in scores:
            google_response["colors"].append({"color": i, "score": scores[i], "hex": "#%02x%02x%02x" % i})

        url = "https://api.spotify.com/v1/me"
        access_token = request.cookies.get('access_token')
        payload = {}
        headers = {
            'Authorization': 'Bearer ' + access_token
        }

        spotify_user_response = requests.request("GET", url, headers=headers, data=payload)
        spotify_user_response = spotify_user_response.json()
        spotify_user_id = spotify_user_response["id"]
        user_exists = (playlist_db.find({"userId": spotify_user_id}).count() != 0)

        playlist_db_data = {
            "id": playlist_id,
            "name": response["name"],
            "imageUrl": response["images"][0]["url"],
            "colors": [i["hex"] for i in google_response["colors"][:5]]
        }

        # does not have the user, so create one
        if not user_exists:
            try:
                user_data = {
                    "userId": spotify_user_id,
                    "playlists": []
                }
                playlist_db.insert_one(user_data)

            except Exception as e:
                print(e)

        # now we have a user, so we add a playlist
        playlist_db.update({"userId": spotify_user_id}, {
                        '$push': {'playlists': playlist_db_data}})
        
        print("updated to DB")

        print(type(google_response))
        return make_response(google_response, 200)

    except Exception as e:
        print(e)
        return e


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

    # does not have the user, so create one
    if not user_exists:
        try:
            user_data = {
                "userId": spotify_user_id,
                "playlists": []
            }
            playlist_db.insert_one(user_data)

        except Exception as e:
            print(e)

    # now we have a user, so we add a playlist
    playlist_db.update({"userId": spotify_user_id}, {
                       '$push': {'playlists': playlist_db_data}})

    response_object = {
        "message": "generated playlist in mongodb",
        "status": True
    }

    return make_response(response_object, 200)
