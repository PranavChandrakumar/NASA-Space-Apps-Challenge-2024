import requests as r
import getpass
from dotenv import load_dotenv  
import os
import json

# get username and password from .env
load_dotenv()
api = 'https://appeears.earthdatacloud.nasa.gov/api/'
user = os.getenv('NASA_USERNAME')
password = os.getenv('NASA_PASSWORD')
token_response = r.post(f'{api}login', auth=(user, password)).json()
token = token_response['token']
print(token_response)

# request products
product_response = r.get(f'{api}product').json()
print(f'AρρEEARS currently supports {len(product_response)} products.')
products = {p['ProductAndVersion']: p for p in product_response}
for product in products:
    print(f'{product}: {products[product]["Description"]}')

landsat9_product = 'L09.002'
landsat9_product_info = products[landsat9_product]
print(landsat9_product_info)
print('\n\n\n\nRESET\n\n\n\n\n')

lst_response = r.get('{}product/{}'.format(api, product_response[1])).json()  # Request layers for the 2nd product (index 1) in the list: MOD11A2.061
list(lst_response.keys())