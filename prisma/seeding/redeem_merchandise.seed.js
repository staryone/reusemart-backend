import { prismaClient } from "../../src/application/database.js";
import { logger } from "../../src/application/logging.js";

const listRedeemMerchandise = [
  {
    // id_redeem_merch: ,
    // tanggal_redeem: ,
    // id_pembeli: ,
  },
];

export async function redeemMerchandiseSeeding() {
  await prismaClient.redeemMerchandise.createMany({
    data: listRedeemMerchandise,
  });
}

redeemMerchandiseSeeding()
  .then(() => {
    logger.info("Berhasil menambahkan seluruh seeding redeem merchandise");
  })
  .catch((e) => {
    logger.info(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
