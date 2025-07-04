export const idToString = (prefix, id) => {
  return prefix + Number(id).toString();
};

export const idToInteger = (id) => {
  return parseInt(String(id).slice(1));
};

export const idOrgToInteger = (id) => {
  return parseInt(String(id).slice(3));
};

export const formatImageName = (fieldname) => {
  return fieldname + "-" + String(Date.now());
};

export const formatNamaGambarBarang = (id_penitip) => {
  const now = new Date();
  now.setHours(now.getHours() + 7);
  return `user-${id_penitip}-${String(now.getTime())}`;
};

export const formatBuktiPembayaran = (id_pembeli) => {
  const now = new Date();
  now.setHours(now.getHours() + 7);
  return `user-${id_pembeli}-buktiBayar-${String(now.getTime())}`;
};

export const generateNomorNota = (tanggal_transaksi, id) => {
  const year = new Date(tanggal_transaksi).getFullYear().toString().slice(2);
  const month = (new Date(tanggal_transaksi).getMonth() + 1)
    .toString()
    .padStart(2, "0");

  return `${year}.${month}.${id}`;
};
