import requests
import create_auth_token

# Original coordinates
lat = 43.59517929900716
lon = 79.62474413221395

# Grid size (3x3) with small increments
increment = 0.00000000000001
coordinates = []

for i in range(-1, 2):  # -1, 0, 1 for rows
    for j in range(-1, 2):  # -1, 0, 1 for columns
        coordinates.append({
            'latitude': round(lat + i * increment,14),
            'longitude': round(lon + j * increment,14)
        })

# Create the task request
task = {
    'task_type': 'point',
    'task_name': 'Final Template Script',
    'params': {
        'dates': [
            {
                'startDate': '01-01-2020',
                'endDate': '05-05-2020'
            }
        ],
        'layers': [
            {'layer': 'SR_B1', 'product': 'L08.002'},
            {'layer': 'SR_B2', 'product': 'L08.002'},
            {'layer': 'SR_B3', 'product': 'L08.002'},
            {'layer': 'SR_B4', 'product': 'L08.002'},
            {'layer': 'SR_B5', 'product': 'L08.002'},
            {'layer': 'SR_B6', 'product': 'L08.002'},
            {'layer': 'SR_B7', 'product': 'L08.002'},
            {'layer': 'SR_B1', 'product': 'L09.002'},
            {'layer': 'SR_B2', 'product': 'L09.002'},
            {'layer': 'SR_B3', 'product': 'L09.002'},
            {'layer': 'SR_B4', 'product': 'L09.002'},
            {'layer': 'SR_B5', 'product': 'L09.002'},
            {'layer': 'SR_B6', 'product': 'L09.002'},
            {'layer': 'SR_B7', 'product': 'L09.002'},
        ],
        'coordinates': coordinates  # Updated to include 3x3 grid
    }
}

# Submit the task request
token = create_auth_token.GetToken()
response = requests.post(
    'https://appeears.earthdatacloud.nasa.gov/api/task',
    json=task,
    headers={'Authorization': 'Bearer {0}'.format(token)}
)

task_response = response.json()
print(task_response)
