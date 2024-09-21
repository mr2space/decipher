import pino, { destination } from "pino";
import path from "path";

const fileTransport = pino.transport({
    target: 'pino/file',
    options: { destination: `${process.cwd()}/logs/server.log` }
})


const logger = pino({timestamp:pino.stdTimeFunctions.isoTime}, pino.destination(`${process.cwd()}/logs/server.log`));

export { logger };