import * as functions from "firebase-functions";
import axios from "axios";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const api = "https://appeears.earthdatacloud.nasa.gov/api/";
const user = process.env.USER;
const password = process.env.PASSWORD;

const options: cors.CorsOptions = {
  origin: ["http://localhost:3000"],
}

export const testHttpFunction = functions
  .https.onRequest((request: functions.https.Request, response: any): void => {
    cors(options)(request, response, async () => {
      // we anticipatee the request to contain a username and a password cleartext
      try {
        const {username, password} = request.body;
        if (!username || !password) {
          response.status(400).send("Missing username or password");
          return;
        }

        // just return the username and password as a response
        response.status(200).send({username, password});
      } catch (error) {
        console.error("Error in testHttpFunction:", error);
        response.status(500).send("Internal server error");
      }
    });
  });

export const fetchLandsatData = functions.pubsub.schedule("0 21 * * *")
  .timeZone("UTC")
  .onRun(async () => {
    try {
      const tokenResponse = await axios.post(`${api}login`, {}, {
        auth: {
          username: user,
          password: password,
        },
      });
      const token = tokenResponse.data.token;

      const task = {
        task_type: "point",
        task_name: "Landsat 8 and 9 SR Bands 1-7",
        params: {
          dates: [
            {
              endDate: "01-31-2022",
              startDate: "01-01-2020",
            },
          ],
          layers: [
            {layer: "SR_B1", product: "L09.002"},
            {layer: "SR_B2", product: "L09.002"},
            {layer: "SR_B3", product: "L09.002"},
            {layer: "SR_B4", product: "L09.002"},
            {layer: "SR_B5", product: "L09.002"},
            {layer: "SR_B6", product: "L09.002"},
            {layer: "SR_B7", product: "L09.002"},
            {layer: "SR_B1", product: "L08.002"},
            {layer: "SR_B2", product: "L08.002"},
            {layer: "SR_B3", product: "L08.002"},
            {layer: "SR_B4", product: "L08.002"},
            {layer: "SR_B5", product: "L08.002"},
            {layer: "SR_B6", product: "L08.002"},
            {layer: "SR_B7", product: "L08.002"},
          ],
          coordinates: [
            {
              latitude: 43.58045658045632,
              longitude: -79.65329465329421,
            },
          ],
        },
      };

      const taskResponse = await axios.post(`${api}task`, task, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log("Task created:", taskResponse.data);

      return null;
    } catch (error) {
      console.error("Error fetching Landsat data:", error);
      throw new Error("Failed to fetch Landsat data");
    }
  });


