import functions_framework
import requests
import os

# Load environment variables from Firebase functions config
nasa_username = os.environ.get('NASA_USERNAME', functions_framework.config().nasa.username)
nasa_password = os.environ.get('NASA_PASSWORD', functions_framework.config().nasa.password)

@functions_framework.cloud_event
def nasa_task(cloud_event):
    try:
        api_url = 'https://appeears.earthdatacloud.nasa.gov/api/'

        # Fetch the authentication token
        token_response = requests.post(f'{api_url}login', auth=(nasa_username, nasa_password))
        token_response.raise_for_status()  # Raise exception for HTTP errors
        token = token_response.json().get('token')

        # Define the task payload
        task_payload = {
            'task_type': 'point',
            'task_name': 'Landsat 8 and 9 SR Bands 1-7',
            'params': {
                "dates": [
                    {"endDate": "01-31-2022", "startDate": "01-01-2020"}
                ],
                "layers": [
                    {"layer": "SR_B1", "product": "L09.002"},
                    {"layer": "SR_B2", "product": "L09.002"},
                    {"layer": "SR_B3", "product": "L09.002"},
                    {"layer": "SR_B4", "product": "L09.002"},
                    {"layer": "SR_B5", "product": "L09.002"},
                    {"layer": "SR_B6", "product": "L09.002"},
                    {"layer": "SR_B7", "product": "L09.002"},
                    {"layer": "SR_B1", "product": "L08.002"},
                    {"layer": "SR_B2", "product": "L08.002"},
                    {"layer": "SR_B3", "product": "L08.002"},
                    {"layer": "SR_B4", "product": "L08.002"},
                    {"layer": "SR_B5", "product": "L08.002"},
                    {"layer": "SR_B6", "product": "L08.002"},
                    {"layer": "SR_B7", "product": "L08.002"}
                ],
                "coordinates": [
                    {"latitude": 43.58045658045632, "longitude": -79.65329465329421}
                ]
            }
        }

        # Submit the task
        task_response = requests.post(f'{api_url}task', json=task_payload, headers={'Authorization': f'Bearer {token}'})
        task_response.raise_for_status()
        task_id = task_response.json().get('task_id')
        print(f'Task submitted successfully: {task_id}')

        # Check the status of the task
        status_response = requests.get(f'{api_url}task/{task_id}', headers={'Authorization': f'Bearer {token}'})
        status_response.raise_for_status()
        task_status = status_response.json()
        print(f'Task Status: {task_status}')

    except requests.RequestException as e:
        print(f'Error occurred: {e}')
        return f'Error: {e}', 500

    return 'Task processed successfully!', 200
