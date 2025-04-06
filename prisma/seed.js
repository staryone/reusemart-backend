import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";
import path from "path";
import fs from "fs";

// async function seed() {
//   const seedFilesPath = path.resolve("prisma\\seeding");

//   const seedFiles = fs
//     .readFileSync(seedFilesPath)
//     .filter((file) => file.endsWith(".seed.js"));

//   for (const seedFile of seedFiles) {
//     logger.info(seedFile);
//   }
// }

// seed();
// .then(() => {
//   logger.info("Berhasil menambahkan seluruh seed");
// })
// .catch((e) => {
//   logger.info(e);
//   process.exit(1);
// })
// .finally(() => {
//   prismaClient.$disconnect();
// });
