import requests


 
def SetToken(): #Call this to set a token
    response = requests.post('https://appeears.earthdatacloud.nasa.gov/api/login', auth=('helios_maplenauts', 'NASASpaceApp2024!'))
    token_response = response.json()

    TOKEN = token_response['token']
    TOKEN = TOKEN 

    with open('token.txt', 'w') as file:
        file.write(TOKEN)

    return

def GetToken(): #Call this to get the token
    with open('token.txt', 'r') as file:
         TOKEN = file.readline().strip()

    return TOKEN  # Return the TOKEN variable
