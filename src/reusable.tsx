type CurrencyRates = {
    [key: string]: number; // Object with string keys (currency codes) and number values (rates)
  };
  
export  type FormattedRate = {
    currency: string;
    rate: number;
  };
  
  export const formatRates = async (currencyRates: CurrencyRates): Promise<FormattedRate[]> => {
    const arrayOfCurrencies = Object.entries(currencyRates).map(([currency, rate]) => ({
      currency,
      rate,
    }));
  
    return arrayOfCurrencies;
  };
  


// Adds commas to the values being displayed
export const formatWithCommas = (value: string | number): string => {
  if (!value) return '';
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};