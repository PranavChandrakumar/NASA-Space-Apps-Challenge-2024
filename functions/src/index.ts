import * as functions from "firebase-functions";

export const checkPassover = functions.pubsub.schedule("0 21 * * *")
  .timeZone("UTC")
  .onRun((context) => {
    console.log("Passover check");
    return 10;
  });
