import requests

params = {'pretty': True}
product_id = 'LANDSAT/LC09/C01/T1_SR'
response = requests.get(
    f'https://appeears.earthdatacloud.nasa.gov/api/product/{product_id}',
    params=params
)
product_info = response.json()
print(product_info)
