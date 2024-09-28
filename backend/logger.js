import pino from "pino";
import fs from "fs";
import path from "path";

const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = pino({
  transport: {
    target: "pino/file",
    options: {
      destination: path.join(logDirectory, "server.log"),
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export { logger };