import requests

params = {'pretty': True}
product_id = 'SRTMGL1_NC.003'
response = requests.get(
    'https://appeears.earthdatacloud.nasa.gov/api/product/{0}'.format(product_id),
    params=params)
product_response = response.text
print(product_response)