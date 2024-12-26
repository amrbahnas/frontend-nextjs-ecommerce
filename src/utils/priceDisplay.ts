export const formatPrice = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatCompactPrice = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

export const parsePrice = (
  priceString: string,
  locale: string = "en-US"
): number | null => {
  try {
    // Remove currency symbols and spaces
    const cleanString = priceString.replace(/[^0-9.,]/g, "");
    // Parse the number using the locale
    const number = Number.parseFloat(cleanString);
    return isNaN(number) ? null : number;
  } catch {
    return null;
  }
};
