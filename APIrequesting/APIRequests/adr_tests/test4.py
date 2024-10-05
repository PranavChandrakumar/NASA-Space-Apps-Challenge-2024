import requests

etag = '"lpdms-1588697873.0-38046-811470625"'
response = requests.get(
    'https://appeears.earthdatacloud.nasa.gov/api/product', 
    headers={'If-None-Match': etag}
)
print(response.status_code) 