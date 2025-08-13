// // utils/flight.js

// /**
//  * Calculate layover time between two flight segments
//  * @param {string|Date} arrivalTime - The arrival time of first segment
//  * @param {string|Date} departureTime - The departure time of next segment
//  * @returns {{ hours: number, minutes: number, totalMinutes: number }} 
//  */
// export function calculateLayover(arrivalTime, departureTime) {

//  const parseTime = (timeStr) => {
//     if (!timeStr || typeof timeStr !== "string") return null;
//     const [hours, minutes] = timeStr.split(":").map(Number);
//     if (isNaN(hours) || isNaN(minutes)) return null;

//     const now = new Date();
//     now.setHours(hours, minutes, 0, 0);
//     return now;
//   };

//   const arrival = parseTime(arrivalTime);
//   const departure = parseTime(departureTime);

//   console.log("Arrival Time:", arrival);
//   console.log("Departure Time:", departure);
  

//   // Handle invalid dates
//   if (isNaN(arrival.getTime()) || isNaN(departure.getTime())) {
//     return { hours: 0, minutes: 0, totalMinutes: 0 };
//   }

//   const diffMs = departure - arrival; // milliseconds difference
//   const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));
//   const hours = Math.floor(totalMinutes / 60);
//   const minutes = totalMinutes % 60;

//   return { hours, minutes, totalMinutes };
// }




/**
 * Calculate layover time between two flight segments (Cleartrip style)
 * @param {string|Date} arrivalTime - "HH:mm" string or Date object (arrival at stopover)
 * @param {string|Date} departureTime - "HH:mm" string or Date object (departure after layover)
 * @returns {{ hours: number, minutes: number, totalMinutes: number }}
 */
export function calculateLayover(arrivalTime, departureTime) {
  // Helper to parse "HH:mm" strings into Date objects (today)
  const parseTime = (t) => {
    if (t instanceof Date) return t;
    if (!t || typeof t !== "string" || !t.match(/^\d{2}:\d{2}$/)) return null;
    const [hh, mm] = t.split(":").map(Number);
    if (isNaN(hh) || isNaN(mm)) return null;
    const d = new Date();
    d.setHours(hh, mm, 0, 0);
    return d;
  };

  const arrival = parseTime(arrivalTime);
  const departure = parseTime(departureTime);

  // Validate
  if (!arrival || !departure) {
    return { hours: 0, minutes: 0, totalMinutes: 0 };
  }

  // Calculate difference, handle crossing midnight
  let diffMinutes = (departure.getHours() * 60 + departure.getMinutes())
                  - (arrival.getHours() * 60 + arrival.getMinutes());
  if (diffMinutes < 0) diffMinutes += 24 * 60; // cross midnight

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return { hours, minutes, totalMinutes: diffMinutes };
}

