import requests as r
import getpass

api = 'https://appeears.earthdatacloud.nasa.gov/api/'
user = getpass.getpass(prompt='Enter NASA Earthdata Login Username: ')
password = getpass.getpass(prompt='Enter NASA Earthdata Login Password: ')

# Post the login request
token_response = r.post(f'{api}login', auth=(user, password)).json()
print(token_response)