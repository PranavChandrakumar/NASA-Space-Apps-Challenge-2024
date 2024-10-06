import boto3
import urllib
import time
import boto3.session
import requests
import os
from Authentication import AppEEARAuthenticator
import aws_session

APPEEARS_ENDPOINT = "https://appeears.earthdatacloud.nasa.gov/api/"

if __name__ == "__main__":
    print("Obtaining token and submitting task...")
    authClient = AppEEARAuthenticator(
        user="helios_maplenauts", passw="NASASpaceApp2024!"
    )

    task = {
        "task_type": "point",
        "task_name": "Test Task",
        "params": {
            "dates": [
                {
                    "startDate": "01-01-2020",
                    "endDate": "01-31-2022",
                }
            ],
            "coordinates": [
                {
                    "latitude": 43.58045658045632,
                    "longitude": -79.65329465329421,
                }
            ],
            "layers": [
                {
                    "product": "L08.002",
                    "layer": "SR_B1",
                    "product": "L08.002",
                    "layer": "SR_B2",
                    "product": "L08.002",
                    "layer": "SR_B3",
                    "product": "L08.002",
                    "layer": "SR_B4",
                    "product": "L08.002",
                    "layer": "SR_B5",
                    "product": "L08.002",
                    "layer": "SR_B6",
                    "product": "L08.002",
                    "layer": "SR_B7",
                }
            ],
        },
    }

    token = authClient.get_token()
    task_response = requests.post(
        f"{APPEEARS_ENDPOINT}task",
        json=task,
        headers={"Authorization": f"Bearer {token}"},
    )
    task_response_data = task_response.json()
    task_id = task_response_data["task_id"]
    print(f"Succesfully submitted task with ID: {task_id}")

    while (
        status := requests.get(
            f"{APPEEARS_ENDPOINT}task/{task_id}",
            headers={"Authorization": f"Bearer {token}"},
        ).json()["status"]
    ) != "done":
        time_now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        print(f"\r{time_now}: Task status: {status}", end="")
        time.sleep(1)
    print()

    task_bundle = requests.get(
        f"{APPEEARS_ENDPOINT}bundle/{task_id}",
        headers={"Authorization": f"Bearer {token}"},
    ).json()

    files = [f for f in task_bundle["files"]]
    s3_urls = [f["s3_url"] for f in files]

    print(f"Task bundle files: {s3_urls}")

    region_name = "us-west-2"
    aws_session._validate_netrc()
    boto3_session = aws_session.get_boto3_refreshable_session(
        f"{APPEEARS_ENDPOINT}s3credentials", region_name
    )
    boto3_client = boto3_session.client("s3", config=boto3.session.Config(max_pool_connections=10))

    def download_file_s3(s3_url):
        parsed_url = urllib.parse.urlparse(s3_url)
        bucket_name = parsed_url.netloc
        key = parsed_url.path.lstrip("/")
        local_file_path = f"garbage/{key.split('/')[-1]}"

        local_dir = os.path.dirname(local_file_path)
        if local_dir:
            os.makedirs(local_dir, exist_ok=True)
        
        response = boto3_client.get_object(Bucket=bucket_name, Key=key)
        
        with open(local_file_path, 'wb') as f:
            f.write(response['Body'].read())
        
        print(f"Downloaded file to {local_file_path}")

for s3_url in s3_urls:
    download_file_s3(s3_url)
