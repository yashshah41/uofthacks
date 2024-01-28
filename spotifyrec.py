import spotipy
from spotipy.oauth2 import SpotifyPKCE, SpotifyOAuth
from datetime import datetime
import requests
import base64

#spotipy is used to enable OAuth2, without it edit operations on accounts are not allowed
# if that is not working properly an alternate to that is curling through requests directly


def open_spotify():
    CLIENT_ID = "4a93c35c81234688b1f6ccdca18410e8"
    CLIENT_SECRET = "d16d6f2eb9a24f46aaaafae4733d9235"

    sp_oauth = SpotifyPKCE(
        client_id=CLIENT_ID,
        # client_secret=CLIENT_SECRET,
        redirect_uri='http://localhost/',
        scope='playlist-modify-private, user-modify-playback-state'
    )

    sp = spotipy.Spotify(
        client_credentials_manager=sp_oauth, requests_timeout=15)
    return sp


# Replace 'your_client_id' and 'your_client_secret' with your actual client ID and client secret
    # client_id = '5c2434ea578a45609a9a7fd5044a8320'
    # client_secret = 'd16d6f2eb9a24f46aaaafae4733d9235'

    # # Base64 encode the client ID and client secret
    # client_creds = f"{client_id}:{client_secret}"
    # client_creds_b64 = base64.b64encode(client_creds.encode())

    # # Get access token
    # token_url = "https://accounts.spotify.com/api/token"
    # token_data = {
    #     "grant_type": "client_credentials"
    # }
    # token_headers = {
    #     "Authorization": f"Basic {client_creds_b64.decode()}"
    # }
    # r = requests.post(token_url, data=token_data, headers=token_headers)
    # token_response_data = r.json()
    # access_token = token_response_data['access_token']

    # return access_token


#get the user id (primarily used for adding to a song to a playlist)
def user_id():
    return sp.current_user()["id"]

# create authenticate object and just reuse it in the other functions
sp = open_spotify()

def make_playlist():
    uid = user_id()
    now = datetime.now()
    playlist_id = sp.user_playlist_create(uid, now.strftime(
        "%Y/%m/%d, %H:%M:%S DemocracyDJ"), public=False, collaborative=False, description="This playlist was voted on and created automatically")["id"]
    return playlist_id

# give us N number of recs given a seed genre
# for testing and dev we used hip hop and 5 but we were going to make this customizable for the user given more time
def recommendations():
    r = sp.recommendations(seed_genres=['hip-hop'], limit=5)

    tracks = []
    for track in r['tracks']:
        tracks.append({'song': track['name'],
                       'author': track['artists'][0]['name'],
                       'duration_ms': track['duration_ms'],
                       'image': track['album']['images'][0]['url'],
                       'uri': track['uri'],
                       })
    return tracks
    # Use the access token to make requests to the Spotify Web API without spotipy
# Make a GET request to the recommendation endpoint to get hip hop recommendations
    # recommendations_url = "https://api.spotify.com/v1/recommendations?seed_genres=hip-hop&limit=5"
    # recommendations_headers = {
    #     "Authorization": f"Bearer {open_spotify()}"
    # }
    # r = requests.get(recommendations_url, headers=recommendations_headers)
    # tracks = []
    # for track in r.json()['tracks']:
    #     tracks.append({'song': track['name'],
    #                    'author': track['artists'][0]['name'],
    #                    'duration_ms': track['duration_ms'],
    #                    'image': track['album']['images'][0]['url'],
    #                    'uri': track['uri'],
    #                    })
    return tracks

# Queue a song
#requires OAuth
def enqueue(uri: str) -> None:
    sp.add_to_queue(uri=uri)

# When a room is created a playlist is created and all songs that are voted on are added to that playlist
# this is if a song is memorable or just to remember all the songs that were played
# requires OAuth
def add_track_to_playlist(playlist_id, track):
    sp.user_playlist_add_tracks(user_id(), playlist_id, tracks=[track])
