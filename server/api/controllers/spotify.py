from flask import (Blueprint, make_response, jsonify, request)
import requests

spotify = Blueprint("spotify", __name__)  # initialize blueprint

def get_colors_from_images(image_urls):
    """Call the Google API to get the principal colors from the images"""
    url = "https://vision.googleapis.com/v1/images:annotate";
    auth = "key goes here";
    headers = {"Authorization": "Bearer {}".format(auth)};
    colors = [];
    
    assert(len(image_urls) == 2);
    for i in image_urls:
        message = {
          "requests": 
          [
            {
              "image": 
              {
                "source": 
                {
                  "gcsImageUri": i
                }
              },
              "features": 
              [
                {
                  "maxResults": 10,
                  "type": "IMAGE_PROPERTIES"
                },
              ]
            }
          ]
        };
        response = requests.request("POST", url, headers=headers, data=message);
        response = response.json();
        colors.append(response);
    return colors;

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
        
        album_urls= [tracks[i]["track"]["album"]["images"][1]["url"] for i in range(len(tracks))]
        urls_dict
        for i in album_urls:
            if i in urls_dict:
                urls_dict[i] += 1;
            else:
                urls_dict[i] = 1;

        colors = get_colors_from_images(sorted(urls_dict, key=urls_dict.get, reverse=True)[:2]);

        scores = {};
        for i in range(len(colors)):
            for j in colors[i].dominant_colors.colors:
                if (j.color.red, j.color.green, j.color.blue) in scores:
                    scores[(j.color.red, j.color.green, j.color.blue)] += j.score * urls_dict[sorted(urls_dict, key=urls_dict.get, reverse=True)[i]];
                else:
                    scores[(j.color.red, j.color.green, j.color.blue)] = j.score * urls_dict[sorted(urls_dict, key=urls_dict.get, reverse=True)[i]];

        

        response = {
            "colors": []
        }
        for i in scores:
            response["colors"].append({"color": i, "score": scores[i]});
        return make_response(response, 200)

    except Exception as e:
        print(e)

