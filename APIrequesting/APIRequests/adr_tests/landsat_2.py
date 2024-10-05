import requests

response = requests.get('https://appeears.earthdatacloud.nasa.gov/api/products')
if response.status_code == 200:
    products = response.json()
    print(products)
else:
    print(f"Error: {response.status_code} - {response.text}")

response = requests.get('https://appeears.earthdatacloud.nasa.gov/api/status')
if response.status_code == 200:
    status_info = response.json()
    print(status_info)
else:
    print(f"Error: {response.status_code} - {response.text}")
