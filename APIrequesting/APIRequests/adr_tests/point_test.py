import requests

params = {
    'pretty': True,
    'lon': -100.0,  # Longitude
    'lat': 40.0,    # Latitude
    'startDate': '2020-01-01',  # Start date for the sample
    'endDate': '2020-12-31',    # End date for the sample
    'dataSet': 'MODIS_Terra_Aerosol_Optical_Depth_Daily_L3_Global_1km',
    'sampleType': 'point'
}
response = requests.post('https://appeears.earthdatacloud.nasa.gov/api/sample', json=params)
print(response.json())
quit()
point_sample = response.json()
print(point_sample)