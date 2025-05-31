import { logger } from "./application/logging.js";
import { app } from "./application/app.js";
import cron from "node-cron";
import transaksiService from "./services/transaksi.service.js";
import penitipanService from "./services/penitipan.service.js";

app.listen(3001, () => {
  logger.info(`Server running on http://localhost:3001`);

  cron.schedule("* * * * *", async () => {
    const result = await transaksiService.checkExpiredTransactions();
    logger.info("Memeriksa transaksi kadaluwarsa...");
    logger.info(result);
  });

  cron.schedule("0 0 0 * * *", async () => {
    const result = await penitipanService.checkMasaPenitipan();
    logger.info("Memeriksa masa penitipan...");
    logger.info(result);
  });
});
