import requests
import json

product_id = 'L09.002'
response = requests.get('https://appeears.earthdatacloud.nasa.gov/api/product/{0}'.format(product_id))
layer_response = response.json()
print(layer_response)
print(json.dumps(layer_response, indent=2))