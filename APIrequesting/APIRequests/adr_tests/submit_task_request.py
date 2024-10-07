import requests
from dotenv import load_dotenv
import os
import requests as r

load_dotenv()
api = 'https://appeears.earthdatacloud.nasa.gov/api/'
user = os.getenv('NASA_USERNAME')
password = os.getenv('NASA_PASSWORD')
token_response = r.post(f'{api}login', auth=(user, password)).json()

# create the task request
task = {
    'task_type': 'point',
    'task_name': 'my-task',
    'params': {
         'dates': [
         {
             'startDate': '01-01-2024',
             'endDate': '03-01-2024'
         }],
         'layers': [
         {
             'product': 'MOD11A1.061',
             'layer': 'LST_Day_1km'
         }],
         'coordinates': [
         {
             'latitude': 42,
             'longitude': -72
         }]
    }
}

# submit the task request
token = token_response['token']
response = requests.post(
    'https://appeears.earthdatacloud.nasa.gov/api/task', 
    json=task, 
    headers={'Authorization': 'Bearer {0}'.format(token)})
task_response = response.json()
print(task_response)