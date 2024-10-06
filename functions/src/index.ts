import * as functions from 'firebase-functions';

export const dailyFunction = functions.pubsub.schedule('0 21 * * *')
    .timeZone('UTC') // time zone
    .onRun((context) => {
        console.log('This will be run every day at 9 PM!');
        return 10;
    });
