// export function parseLuggageOptions(input) {
// 	const options = []

// 	const regex =
// 		/(\d+)\s+\(\s*(\d+)\s*bags\s*-\s*([\dKg+\s]+?)(?:\s*total)?\s*-\s*([\d.]+)\s*(GBP)\)/g

// 	let match

// 	while ((match = regex.exec(input)) !== null) {
// 		const [_, optionStr, bagsStr, weightStr, priceStr, currency] = match

// 		const option = parseInt(optionStr)
// 		const bags = parseInt(bagsStr)

// 		// Handle "15Kg" or "15Kg+23Kg+15Kg"
// 		const weights = weightStr
// 			.replace(/\s/g, '')
// 			.split('+')
// 			.filter(w => w)
// 		const totalWeight = weights
// 			.map(w => parseInt(w.replace('Kg', '')))
// 			.reduce((a, b) => a + b, 0)
// 		const price = parseFloat(priceStr)

// 		options.push({
// 			option,
// 			bags,
// 			weights,
// 			totalWeight,
// 			price,
// 			currency,
// 		})
// 	}

// 	return options
// }

export function parseLuggageOptions(input) {
  const options = [];

  // Updated regex:
  // - Supports optional "Option:" or "Please Select..." prefixes
  // - Handles "8Kg", "15kg+23Kg", etc.
  // - Captures 3-letter currency codes dynamically
  const regex =
    /(\d+)\s*\(\s*(\d+)\s*bags\s*-\s*([\d+KkGg\s]+?)(?:\s*total)?\s*-\s*([\d.]+)\s*([A-Z]{3})\)/g;

  let match;

  while ((match = regex.exec(input)) !== null) {
    const [_, optionStr, bagsStr, weightStr, priceStr, currency] = match;

    const option = parseInt(optionStr);
    const bags = parseInt(bagsStr);

    // Extract weights like "8Kg", "15kg", etc. and preserve casing
    const weights = weightStr
      .replace(/\s/g, "") // Remove all spaces
      .split("+")
      .filter(Boolean); // Remove empty strings

    const totalWeight = weights
      .map((w) => parseInt(w.replace(/[^0-9]/g, ""))) // Extract numeric part
      .reduce((a, b) => a + b, 0);

    const price = parseFloat(priceStr);

    options.push({
      option,
      bags,
      weights, // e.g., ["8Kg"]
      totalWeight, // e.g., 8
      price,
      currency, // e.g., "EUR"
    });
  }

  return options;
}
