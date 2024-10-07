require('dotenv').config();
const axios = require('axios');

const api = 'https://appeears.earthdatacloud.nasa.gov/api/';
const user = process.env.NASA_USERNAME;
const password = process.env.NASA_PASSWORD;

axios.post(`${api}login`, {}, {
    auth: {
        username: user,
        password: password
    }
}).then(tokenResponse => {
    const token = tokenResponse.data.token;

    const task = {
        'task_type': 'point',
        'task_name': 'Landsat 8 and 9 SR Bands 1-7',
        'params': {
            "dates": [
                {
                    "endDate": "01-31-2022",
                    "startDate": "01-01-2020"
                }
            ],
            "layers": [
                {
                    "layer": "SR_B1",
                    "product": "L09.002"
                },
                {
                    "layer": "SR_B2",
                    "product": "L09.002"
                },
                {
                    "layer": "SR_B3",
                    "product": "L09.002"
                },
                {
                    "layer": "SR_B4",
                    "product": "L09.002"
                },
                {
                    "layer": "SR_B5",
                    "product": "L09.002"
                },
                {
                    "layer": "SR_B6",
                    "product": "L09.002"
                },
                {
                    "layer": "SR_B7",
                    "product": "L09.002"
                },
                {
                    "layer": "SR_B1",
                    "product": "L08.002"
                },
                {
                    "layer": "SR_B2",
                    "product": "L08.002"
                },
                {
                    "layer": "SR_B3",
                    "product": "L08.002"
                },
                {
                    "layer": "SR_B4",
                    "product": "L08.002"
                },
                {
                    "layer": "SR_B5",
                    "product": "L08.002"
                },
                {
                    "layer": "SR_B6",
                    "product": "L08.002"
                },
                {
                    "layer": "SR_B7",
                    "product": "L08.002"
                }
            ],
            "coordinates": [
                {
                    "latitude": 43.58045658045632,
                    "longitude": -79.65329465329421
                }
            ]
        }
    };

    // Submit the task request
    axios.post(`${api}task`, task, {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
        const taskResponse = response.data;
        const taskId = taskResponse.task_id;
        console.log('Task Response:', taskResponse);

        // Get the task status
        axios.get(`${api}task/${taskId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(taskStatusResponse => {
            console.log('Task Status:', taskStatusResponse.data);
        }).catch(err => {
            console.error('Error fetching task status:', err);
        });
    }).catch(err => {
        console.error('Error submitting task:', err);
    });
}).catch(err => {
    console.error('Error fetching token:', err);
});
