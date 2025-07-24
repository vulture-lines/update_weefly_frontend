// export function parseSeatMap(displayText) {
// 	// const regex = /(8019-\d+[A-Z])\((.*?)\)/g
// 	const regex = /(\d{3,5}-\d+[A-Z])\((.*?)\)/g

// 	const seatList = []

// 	const featureDescriptions = {
// 		W: 'Window',
// 		N: 'Middle',
// 		A: 'Aisle',
// 		C: 'Centre section',
// 		'1A': 'Not for infant',
// 		'1I': 'Unsuitable for infant',
// 		IE: 'Unsuitable for child',
// 		'16+': 'Aged 16+ only',
// 		B: 'Bassinet',
// 		H: 'Handicapped access',
// 		K: 'Bulkhead',
// 		PS: 'Preferred seat',
// 		F: 'Extra seat',
// 		G: 'Comfort',
// 		E: 'Exit row',
// 		EL: 'Extra legroom',
// 		Q: 'Quiet zone',
// 		UF: 'Up front',
// 		UP: 'Upper deck',
// 		WG: 'Over wing',
// 		FR: 'Front row',
// 		FC: 'Front cabin',
// 		AC: 'Aft cabin',
// 		CC: 'Centre cabin',
// 		L3R: 'Last 3 rows',
// 		L4R: 'Last 4 rows',
// 		O: 'Premium block',
// 		BD: 'Bed seat',
// 		EP: 'Enhanced privacy',
// 		T: 'Unavailable',
// 		CL: 'Closet',
// 		D: 'Exit door',
// 		EX: 'Emergency exit',
// 		GN: 'Galley',
// 		LA: 'Lavatory',
// 		ST: 'Stairs',
// 		NS: 'Not seat',
// 	}

// 	const invalidSeatCodes = ['CL', 'D', 'EX', 'GN', 'LA', 'ST', 'NS']

// 	let match
// 	while ((match = regex.exec(displayText)) !== null) {
// 		const fullSeat = match[1] // e.g. 8017-1A
// 		const meta = match[2] // e.g. A|E|IE|1A|EL@6.99GBP@319

// 		const flightNumber = fullSeat.split('-')[0] // "8019"
// 		const seat = fullSeat.split('-')[1] // 1A
// 		const row = parseInt(seat.match(/\d+/)?.[0] || 0, 10)
// 		const column = seat.match(/[A-Z]$/)?.[0] || ''

// 		const [featurePart, pricePart] = meta.split('@')
// 		const features = featurePart ? featurePart.split('|') : []
// 		const price = pricePart
// 			? parseFloat(pricePart.replace('GBP', '').split('@')[0])
// 			: 0

// 		// Skip non-seats (e.g. galley, stairs)
// 		if (features.some(f => invalidSeatCodes.includes(f))) continue

// 		// Determine seat type with priority
// 		let type = 'standard'
// 		if (features.includes('T')) type = 'Unavailable'
// 		else if (features.includes('EL')) type = 'extra_legroom'
// 		else if (features.includes('E')) type = 'exit'
// 		else if (features.includes('W')) type = 'window'
// 		else if (features.includes('A')) type = 'aisle'
// 		else if (features.includes('N')) type = 'middle'

// 		// Determine class
// 		// let seatClass = 'unknown'
// 		// if (features.includes('E')) seatClass = 'economy'
// 		// if (features.includes('B')) seatClass = 'business'
// 		// if (features.includes('F')) seatClass = 'first'

// 		seatList.push({
// 			flightNumber,
// 			seat, // e.g. '1A'
// 			row,
// 			column,
// 			price,
// 			features,
// 			type,
// 			// class: seatClass,
// 			description: features.map(f => featureDescriptions[f] || f),
// 		})
// 	}

// 	return seatList
// }

export function parseSeatMap(displayText) {
  const regex = /(\d{3,5}-\d+[A-Z])\((.*?)\)/g;

  const seatList = [];

  const featureDescriptions = {
    W: "Window",
    N: "Middle",
    A: "Aisle",
    C: "Centre section",
    "1A": "Not for infant",
    "1I": "Unsuitable for infant",
    IE: "Unsuitable for child",
    "16+": "Aged 16+ only",
    B: "Bassinet",
    H: "Handicapped access",
    K: "Bulkhead",
    PS: "Preferred seat",
    F: "Extra seat",
    G: "Comfort",
    E: "Exit row",
    EL: "Extra legroom",
    Q: "Quiet zone",
    UF: "Up front",
    UP: "Upper deck",
    WG: "Over wing",
    FR: "Front row",
    FC: "Front cabin",
    AC: "Aft cabin",
    CC: "Centre cabin",
    L3R: "Last 3 rows",
    L4R: "Last 4 rows",
    O: "Premium block",
    BD: "Bed seat",
    EP: "Enhanced privacy",
    T: "Unavailable",
    CL: "Closet",
    D: "Exit door",
    EX: "Emergency exit",
    GN: "Galley",
    LA: "Lavatory",
    ST: "Stairs",
    NS: "Not seat",
  };

  const invalidSeatCodes = ["CL", "D", "EX", "GN", "LA", "ST", "NS"];

  let match;
  while ((match = regex.exec(displayText)) !== null) {
    const fullSeat = match[1];
    const meta = match[2];

    const flightNumber = fullSeat.split("-")[0];
    const seat = fullSeat.split("-")[1];
    const row = parseInt(seat.match(/\d+/)?.[0] || 0, 10);
    const column = seat.match(/[A-Z]$/)?.[0] || "";

    // Extract everything before the first '@' as features
    const featurePart = meta.split("@")[0];
    const features = featurePart ? featurePart.split("|") : [];

    // Extract price and currency with regex
    const priceCurrencyMatch = meta.match(/@([\d.]+)\s*([A-Z]{3})/); // e.g. @375000.00IDR

    let price = 0;
    let currency = "";

    if (priceCurrencyMatch) {
      price = parseFloat(priceCurrencyMatch[1]);
      currency = priceCurrencyMatch[2];
    }

    if (features.some((f) => invalidSeatCodes.includes(f))) continue;

    let type = "standard";
    if (features.includes("T")) type = "Unavailable";
    else if (features.includes("EL")) type = "extra_legroom";
    else if (features.includes("E")) type = "exit";
    else if (features.includes("W")) type = "window";
    else if (features.includes("A")) type = "aisle";
    else if (features.includes("N")) type = "middle";

    seatList.push({
      flightNumber,
      seat,
      row,
      column,
      price,
      currency,
      features,
      type,
      description: features.map((f) => featureDescriptions[f] || f),
    });
  }

  return seatList;
}
