import requests

# Endpoint to get all products
response = requests.get('https://appeears.earthdatacloud.nasa.gov/api/product')

# Check if the request was successful
if response.status_code == 200:
    products = response.json()
    print(products)  # Print all available products