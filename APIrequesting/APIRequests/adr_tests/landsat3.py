# Import necessary libraries
import requests as r
import getpass
import json

api = 'https://appeears.earthdatacloud.nasa.gov/api/'
user = getpass.getpass(prompt = 'Enter NASA Earthdata Login Username: ')
password = getpass.getpass(prompt = 'Enter NASA Earthdata Login Password: ')
token_response = r.post('{}login'.format(api), auth=(user, password)).json()
token = token_response['token']
head = {'Authorization': 'Bearer {}'.format(token)}

# Define task parameters
task = {
    'task_type': 'area',
    'task_name': 'Landsat Area Sample',
    'params': {
        'dates': [
            {
                'startDate': '01-01-2020',
                'endDate': '12-31-2020'
            }
        ],
        'layers': [
            {
                'product': 'LANDSAT/LC08/C01/T1_SR',  # Landsat 8 Surface Reflectance product
                'layer': 'B4' # red band
            },
            {
                'product': 'LANDSAT/LC08/C01/T1_SR',
                'layer': 'B5'  # near infrared?
            }
        ],
        'output': {
            'format': {
                'type': 'geotiff'
            },
            'projection': 'geographic'
        },
        'geo': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [[[-112.5, 36.0], [-112.5, 36.5], [-111.5, 36.5], [-111.5, 36.0], [-112.5, 36.0]]]
                    }
                }
            ]
        }
    }
}

# submit
task_response = r.post('{}task'.format(api), json=task, headers=head).json()
print(task_response)