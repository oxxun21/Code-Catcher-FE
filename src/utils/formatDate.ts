export const formatDate = (dateItem: string): string => {
  const date = new Date(dateItem);
  const year = date.getUTCFullYear().toString();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");

  return `${year}.${month}.${day}`;
};
