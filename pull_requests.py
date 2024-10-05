import requests
import create_auth_token

# create the task request
task = {
    'task_type': 'point',
    'task_name': 'my-task',
    'params': {
         'dates': [
         {
             'startDate': '01-01-2010',
             'endDate': '01-31-2010'
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
token = create_auth_token.GetToken()
response = requests.post(
    'https://appeears.earthdatacloud.nasa.gov/api/task', 
    json=task, 
    headers={'Authorization': 'Bearer {0}'.format(token)})
task_response = response.json()
print(task_response)