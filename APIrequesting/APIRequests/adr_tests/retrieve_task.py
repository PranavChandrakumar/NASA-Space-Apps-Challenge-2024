import requests
from dotenv import load_dotenv
import os
import requests as r


load_dotenv()
api = 'https://appeears.earthdatacloud.nasa.gov/api/'
user = os.getenv('NASA_USERNAME')
password = os.getenv('NASA_PASSWORD')
token_response = r.post(f'{api}login', auth=(user, password)).json()
token = token_response['token']

task_id = '3715e6c7-aded-403c-9151-9ec5f6c6c072'
response = requests.get(
    'https://appeears.earthdatacloud.nasa.gov/api/task/{0}'.format(task_id), 
    headers={'Authorization': 'Bearer {0}'.format(token)}
)
task_response = response.json()
print(task_response)