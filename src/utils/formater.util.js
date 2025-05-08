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
  return `user-${id_penitip}-${String(Date.now())}`;
};
