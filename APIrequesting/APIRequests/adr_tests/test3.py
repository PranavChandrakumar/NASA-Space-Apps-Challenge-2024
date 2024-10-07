import requests

response = requests.get('https://appeears.earthdatacloud.nasa.gov/api/product')
for header in response.headers:
    print('{0}: {1}'.format(header, response.headers[header]))