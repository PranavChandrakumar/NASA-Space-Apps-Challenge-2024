import boto3
from Authentication import AppEEARAuthenticator

if __name__ == "__main__":
    authClient = AppEEARAuthenticator(
        user="helios_maplenauts", passw="NASASpaceApp2024!"
    )

    accessKey, secretKey, sessionToken = authClient.get_s3_credentials()
    botoSession = boto3.Session(
        aws_access_key_id=accessKey,
        aws_secret_access_key=secretKey,
        aws_session_token=sessionToken,
    )

    S3client = botoSession.client("s3")
    response = S3client.list_objects_v2(
        Bucket="usgs-landsat",
        Prefix="collection02/level-2/standard/oli-tirs/2020/026/027/LC08_L2SP_026027_20200827_20200906_02_T1/",
        RequestPayer="requester",
    )

    for obj in response.get("Contents", []):
        print(obj["Key"])
