import morgan from "morgan";
import { logger } from "../../logger.js";
const morganFormat = ":method :url :status :response-time ms";

export const morganLogger = morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(" ")[0],
                url: message.split(" ")[1],
                status: message.split(" ")[2],
                responseTime: message.split(" ")[3],
            };
            logger.info(JSON.stringify(logObject));
        },
    },
});
