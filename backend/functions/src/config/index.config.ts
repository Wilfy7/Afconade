import dotenv from "dotenv";

dotenv.config();

const devApp = {
    dev: {
        port: process.env.SERVERPORT,
        db: {
            uri: process.env.DB_URI
        },
        matchesapi: {
            uri: process.env.API_URL,
            apiKey: process.env.XRAPIDAPIKEY,
            apiHost: process.env.XRAPIDAPIHOST
        },
    },
};


export default devApp;