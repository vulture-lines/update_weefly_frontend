const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
const CURRENCY_API_URL = import.meta.env.VITE_CURRENCY_API_URL;
async function fetchExchangeRates(baseCurrency) {
  try {
    const url = `${CURRENCY_API_URL}?apikey=${CURRENCY_API_KEY}&base_currency=${baseCurrency}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Currency API returned ${response.status}`);
    }
    const data = await response.json();
    console.log("Exchange Rates", data);
    return data.data; // currencyapi.com uses data.data
  } catch (error) {
    console.error("Error fetching currency rates:", error.message);
    return null;
  }
}

// price conversion
function convertToRequestedCurrency(
  price,
  originalCurrency,
  baseCurrency,
  rates
) {
  if (originalCurrency.startsWith("0")) {
    originalCurrency = originalCurrency.substring(1); // remove first character
    originalCurrency = originalCurrency.substring(0, 3);
    console.log("originalCurrency after removing 0:", originalCurrency);
  }
  if (originalCurrency === baseCurrency) return price;
  if (!rates || !rates[originalCurrency]) {
    throw new Error(
      `Currency ${originalCurrency} not supported in exchange rates.`
    );
  }
  return price / rates[originalCurrency].value;
}

export { fetchExchangeRates, convertToRequestedCurrency };
