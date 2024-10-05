import requests

params = {
    'pretty': True,
    'dataSet': 'MODIS_Terra_Surface_Temperature_Daily_L3_Global_1km',
    'spatialFilter': {
        'type': 'Polygon',
        'coordinates': [[
            [-100.0, 40.0],
            [-99.0, 40.0],
            [-99.0, 41.0],
            [-100.0, 41.0],
            [-100.0, 40.0]
        ]]
    },
    'startDate': '2024-01-01',
    'endDate': '2024-03-01',
    'sampleType': 'area'
}
response = requests.post('https://appeears.earthdatacloud.nasa.gov/api/sample', json=params)
area_sample = response.json()
print(area_sample)
