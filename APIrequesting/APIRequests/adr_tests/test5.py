import requests

params = {'pretty': True}
product_id = 'SRTMGL1_NC.003'  # Example product ID
response = requests.get(
    f'https://appeears.earthdatacloud.nasa.gov/api/product/{product_id}',
    params=params
)
product_info = response.json()
print(product_info)
