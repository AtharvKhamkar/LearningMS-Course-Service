import pino from "pino"
const APP_ID = process.env.APP_ID;
const LOG_LEVEL = process.env.LOG_LEVEL;

const l = pino({
    name: APP_ID,
    level: LOG_LEVEL
})

export default l;