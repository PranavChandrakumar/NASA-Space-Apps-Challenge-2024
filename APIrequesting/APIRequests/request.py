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
    'task_name': 'Landsat 8 and 9 SR Bands 1-7',
    'params': {
        "dates": [
            {
                "endDate": "01-31-2022",
                "startDate": "01-01-2020"
            }
        ],
        "layers": [
            {
                "layer": "SR_B1",
                "product": "L09.002"
            },
            {
                "layer": "SR_B2",
                "product": "L09.002"
            },
            {
                "layer": "SR_B3",
                "product": "L09.002"
            },
            {
                "layer": "SR_B4",
                "product": "L09.002"
            },      
            {
                "layer": "SR_B5",
                "product": "L09.002"
            },
            {
                "layer": "SR_B6",
                "product": "L09.002"
            },
            {
                "layer": "SR_B7",
                "product": "L09.002"
            },
            {
                "layer": "SR_B1",
                "product": "L08.002"
            },
            {
                "layer": "SR_B2",
                "product": "L08.002"
            },
            {
                "layer": "SR_B3",
                "product": "L08.002"
            },
            {
                "layer": "SR_B4",
                "product": "L08.002"
            },      
            {
                "layer": "SR_B5",
                "product": "L08.002"
            },
            {
                "layer": "SR_B6",
                "product": "L08.002"
            },
            {
                "layer": "SR_B7",
                "product": "L08.002"
            }
        ],
        "coordinates": [
            {
                "latitude": 43.58045658045632,
                "longitude": -79.65329465329421
            }
        ]
    }
}

print(token_response)
quit()

token = token_response['token']
response = r.post(
    'https://appeears.earthdatacloud.nasa.gov/api/task', 
    json=task, 
    headers={'Authorization': 'Bearer {0}'.format(token)})
task_response = response.json()
task_id = task_response['task_id']
print(task_response)

response = r.get(
    'https://appeears.earthdatacloud.nasa.gov/api/task/{0}'.format(task_id), 
    headers={'Authorization': 'Bearer {0}'.format(token)}
)
task_response = response.json()
print(task_response)