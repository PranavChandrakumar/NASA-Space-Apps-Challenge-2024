import requests as r
import getpass
from dotenv import load_dotenv  
import os
import json

api = 'https://appeears.earthdatacloud.nasa.gov/api/'
# user = getpass.getpass(prompt='Enter NASA Earthdata Login Username: ')
# password = getpass.getpass(prompt='Enter NASA Earthdata Login Password: ')

# get username and password from .env
load_dotenv()
user = os.getenv('NASA_USERNAME')
password = os.getenv('NASA_PASSWORD')

print(user, password)

token_response = r.post(f'{api}login', auth=(user, password)).json()
print(token_response)
quit()


token = token_response['token']
print(token_response)

headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
}
products_response = r.get(f'{api}product', headers=headers).json()
print(f'AρρEEARS currently supports {len(products_response)} products.')
for product in products_response:
    print(product['ProductAndVersion'])