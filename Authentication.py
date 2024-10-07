# marco wrote this around like 10:20 pm
import dateutil.parser
import requests
import dateutil
import datetime
import pytz
import atexit


class AppEEARAuthenticator:
    def __init__(self, user: str, passw: str):
        if not user or not passw:
            raise RuntimeError("Please supply a username and password.")

        self.user = user
        self.passw = passw
        self.endpoint = "https://appeears.earthdatacloud.nasa.gov/api/"
        self.tokenType = None
        self.token = None
        self.tokenExp = None
        self.s3accessKey = None
        self.s3secretKey = None
        self.s3sessionToken = None
        self.s3expiration = None

        self._login()
        self._retrieve_s3_credentials()
        atexit.register(self._logout)

    def _login(self):
        response = requests.post(f"{self.endpoint}login", auth=(self.user, self.passw))
        if response.status_code != 200:
            raise RuntimeError("Invalid login credentials.")

        data = response.json()
        self.tokenType = data["token_type"]
        self.token = data["token"]
        self.tokenExp = dateutil.parser.isoparse(data["expiration"])

    def _logout(self):
        if not self.token:
            return

        response = requests.post(
            f"{self.endpoint}logout", headers={"Authorization": f"Bearer {self.token}"}
        )

        if response.status_code != 204:
            raise RuntimeError("Failed to logout.")

        self.tokenType = None
        self.token = None
        self.tokenExp = None

    def _refresh(self):
        if not self.token:
            return

        now = datetime.datetime.now(pytz.utc)
        if now < self.tokenExp:
            return

        self._logout()
        self._login()

    def _retrieve_s3_credentials(self):
        response = requests.post(
            f"{self.endpoint}s3credentials", auth=(self.user, self.passw)
        )

        if response.status_code != 200:
            raise RuntimeError("Failed to retrieve S3 credentials.")

        data = response.json()
        self.s3accessKey = data["accessKeyId"]
        self.s3secretKey = data["secretAccessKey"]
        self.s3sessionToken = data["sessionToken"]
        self.s3expiration = dateutil.parser.isoparse(data["expiration"])

    def _refresh_s3_credentials(self):
        if not self.s3accessKey or not self.s3secretKey or not self.s3sessionToken:
            return

        now = datetime.datetime.now(pytz.utc)
        if now < self.s3expiration:
            return

        self._retrieve_s3_credentials()

    def get_s3_credentials(self):
        self._refresh_s3_credentials()
        return self.s3accessKey, self.s3secretKey, self.s3sessionToken

    def get_token(self):
        self._refresh()
        return self.token

    def logout(self):
        self._logout()


# if __name__ == "__main__":
#     test = AppEEARAuthenticator(user="helios_maplenauts", passw="NASASpaceApp2024!")

#     print(test.get_token())
#     print(test.get_s3_credentials())
