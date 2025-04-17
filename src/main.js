import { logger } from "./application/logging.js";
import { app } from "./application/app.js";

app.listen(3000, () => {
  logger.info(`Server running on http://localhost:3000`);
});
