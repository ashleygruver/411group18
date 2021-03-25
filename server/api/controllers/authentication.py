from flask import (
    abort,
    Flask,
    make_response,
    redirect,
    render_template,
    request,
    session,
    url_for,
    Blueprint
)
import requests
import json
import os

authentication = Blueprint("authentication", __name__)  # initialize blueprint


CLIENT_ID = "1c5183fbe4c5491789c87f8638deb99d"
CLIENT_SECRET = "e5ebd2b68d98473d999ed3b7046de7ea"
REDIRECT_URI = "http://localhost:5000/callback"
frontend_redirect_uri = "http://localhost:3000"

# Spotify API endpoints
AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
ME_URL = 'https://api.spotify.com/v1/me'


# function that is called when you visit /
@authentication.route('/<loginout>')
def login(loginout):
    '''Login or logout user.
    Note:
        Login and logout process are essentially the same. Logout forces
        re-login to appear, even if their token hasn't expired.
    '''
    # Request authorization from user
    scope = 'user-read-private user-read-email'

    if loginout == 'logout':
        payload = {
            'client_id': CLIENT_ID,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            # 'state': state,
            'scope': scope,
            'show_dialog': True,
        }
    elif loginout == 'login':
        payload = {
            'client_id': CLIENT_ID,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            # 'state': state,
            'scope': scope,
        }
    else:
        abort(404)

    # res = make_response(redirect(f'{AUTH_URL}/?{urlencode(payload)}'))
    # res.set_cookie('spotify_auth_state', state)

    return "done"


@authentication.route('/callback')
def callback():
    error = request.args.get('error')
    code = request.args.get('code')
    state = request.args.get('state')
    stored_state = request.cookies.get('spotify_auth_state')

    # Request tokens with code we obtained
    payload = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
    }

    # `auth=(CLIENT_ID, SECRET)` basically wraps an 'Authorization'
    # header with value:
    # b'Basic ' + b64encode((CLIENT_ID + ':' + SECRET).encode())
    res = requests.post(TOKEN_URL, auth=(CLIENT_ID, CLIENT_SECRET), data=payload)
    res_data = res.json()
    
    response = make_response(redirect("http://localhost:3000/playlists"))
    response.set_cookie('access_token', res_data['access_token'])
    response.set_cookie('refresh_token', res_data['refresh_token'])
    return response


@authentication.route('/refresh')
def refresh():
    '''Refresh access token.'''

    payload = {
        'grant_type': 'refresh_token',
        'refresh_token': session.get('tokens').get('refresh_token'),
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    res = requests.post(
        TOKEN_URL, auth=(CLIENT_ID, CLIENT_SECRET), data=payload, headers=headers
    )
    res_data = res.json()

    # Load new token into session
    session['tokens']['access_token'] = res_data.get('access_token')

    return json.dumps(session['tokens'])