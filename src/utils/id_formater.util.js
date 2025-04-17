export const idToString = (prefix, id) => {
  return prefix + Number(id).toString();
};

export const idToInteger = (id) => {
  return parseInt(String(id).slice(1));
};
