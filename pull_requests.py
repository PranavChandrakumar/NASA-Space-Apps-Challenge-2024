import requests
import create_auth_token

# create the task request
task = {
    'task_type': 'point',
    'task_name': 'my-task',
    'params': {
         'dates': [
         {
             'startDate': '01-01-2020',
             'endDate': '01-31-2022'
         }],
         'layers': [
         {
             'product': 'L08.002',
             'layer': 'SR_B1',
             'product': 'L08.002',
             'layer': 'SR_B2',
             'product': 'L08.002',
             'layer': 'SR_B3',
             'product': 'L08.002',
             'layer': 'SR_B4',
             'product': 'L08.002',
             'layer': 'SR_B5',
             'product': 'L08.002',
             'layer': 'SR_B6',
             'product': 'L08.002',
             'layer': 'SR_B7',
         }],
         'coordinates': [
         {
             'latitude': 43.58045658045632,
             'longitude': -79.65329465329421
         }]
    }
}

# submit the task request
token = create_auth_token.GetToken()
response = requests.post(
    'https://appeears.earthdatacloud.nasa.gov/api/task', 
    json=task, 
    headers={'Authorization': 'Bearer {0}'.format(token)})
task_response = response.json()
print(task_response)