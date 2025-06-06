import { logger } from "./application/logging.js";
import { app } from "./application/app.js";
import cron from "node-cron";
import transaksiService from "./services/transaksi.service.js";
import penitipanService from "./services/penitipan.service.js";
import penitipService from "./services/penitip.service.js";
import pengirimanService from "./services/pengiriman.service.js";

app.listen(3001, () => {
  logger.info(`Server running on http://localhost:3001`);

  cron.schedule("* * * * *", async () => {
    const result = await transaksiService.checkExpiredTransactions();
    logger.info("Memeriksa transaksi kadaluwarsa...");
    logger.info(result);
  });

  // cron.schedule("* * * * *", async () => {
  //   const result = await penitipanService.checkMasaPenitipan();
  //   logger.info("Memeriksa masa penitipan...");
  //   logger.info(result);
  // });
  cron.schedule("0 0 0 * * *", async () => {
    const result = await penitipanService.checkMasaPenitipan();
    logger.info("Memeriksa masa penitipan...");
    logger.info(result);
  });

  // cron.schedule("* * * * *", async () => {
  //   logger.info("Update top seller...");
  //   const result = await penitipService.topSeller();
  //   logger.info(result);
  // });
  cron.schedule("0 0 0 1 * *", async () => {
    const result = await penitipService.topSeller();
    logger.info("Update top seller...");
    logger.info(result);
  });

  cron.schedule("0 0 0 * * *", async () => {
    const result = await pengirimanService.cekPengirimanHangus();
    logger.info("Memeriksa pengiriman hangus...");
    logger.info(result);
  });

  cron.schedule("0 0 0 * * *", async () => {
    const result = await pengirimanService.cekPengirimanSedangDikirimToday();
    logger.info("Memeriksa pengiriman yang sedang dikirim kurir...");
    logger.info(result);
  });
});
