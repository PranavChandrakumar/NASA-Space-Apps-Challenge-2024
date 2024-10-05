import requests


response = requests.post('https://appeears.earthdatacloud.nasa.gov/api/login', auth=('heliosbe', 'NASASpaceApps2024!'))
token_response = response.json()
print(token_response)

def GetToken():
    response = requests.post('https://appeears.earthdatacloud.nasa.gov/api/login', auth=('heliosbe', 'NASASpaceApps2024!'))
    token_response = response.json()
    print(token_response)
    
    return token_response
    