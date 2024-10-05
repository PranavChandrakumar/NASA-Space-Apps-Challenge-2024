import requests as r
import getpass
from dotenv import load_dotenv  
import os
import json

api = 'https://appeears.earthdatacloud.nasa.gov/api/'
# user = getpass.getpass(prompt='Enter NASA Earthdata Login Username: ')
# password = getpass.getpass(prompt='Enter NASA Earthdata Login Password: ')

# get username and password from .env
user = os.getenv('NASA_USERNAME')
password = os.getenv('NASA_PASSWORD')

token_response = r.post(f'{api}login', auth=(user, password)).json()
print(token_response)

# request products
product_response = r.get(f'{api}product').json()
print(f'AρρEEARS currently supports {len(product_response)} products.')
products = {p['ProductAndVersion']: p for p in product_response}
for product in products:
    print(f'{product}: {products[product]["Description"]}')
with open('APIrequesting/products.json', 'w') as f:
    json.dump(product_response, f)