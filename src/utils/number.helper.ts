export const formatToLocaleString = (number: number, fractionDigits: number = 2) => {
  return number.toLocaleString("ru-RU", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
};
