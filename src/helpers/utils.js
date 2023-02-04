import { fileURLToPath } from "url";
import { dirname } from "path";
import logger from "../config/winston.config.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(dirname(__filename), "../");

logger.log("debug", `Dirname: ${__dirname} `);

export default __dirname;
