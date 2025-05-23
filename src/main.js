import { logger } from "./application/logging.js";
import { app } from "./application/app.js";
import cron from "node-cron";


app.listen(3001, () => {
  logger.info(`Server running on http://localhost:3001`);
});
