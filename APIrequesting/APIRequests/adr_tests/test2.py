import requests

params = {'limit': 2, 'offset': 2}
response = requests.get(
    'https://appeears.earthdatacloud.nasa.gov/api/product',
    params=params)
product_response = response.json()
print(product_response)