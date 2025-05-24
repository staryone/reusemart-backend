export const formatStringDate = (rawDate) => {
  const date = new Date(rawDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}${month}${year}`;
};

export const formatUTCtoWIB = (rawDate) => {
  const now = new Date(rawDate);
  const utc7OffsetMs = 7 * 60 * 60 * 1000;
  const utc7Date = new Date(now.getTime() + utc7OffsetMs);
  utc7Date.toISOString().slice(0, 23);

  return utc7Date;
};
