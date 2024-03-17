// Ref: https://www.feitsui.com/en/article/3

interface LocationData {
  country: string;
  city: string;
  airport: string;
}

export const getCountry = (location: string): string => {
  return EdgeLocationMapping[location.substring(0, 3)]?.country ?? "Unknown";
}

const EdgeLocationMapping: Record</* airport: */ string, LocationData> = {
    "EZE": {
      "country": "Argentina",
      "city": "Buenos Aires",
      "airport": "Ezeiza International Airport",
    },
    "BNE": {
      "country": "Australia",
      "city": "Brisbane",
      "airport": "Brisbane Airport",
    },
    "MEL": {
      "country": "Australia",
      "city": "Melbourne",
      "airport": "Melbourne Airport",
    },
    "PER": {
      "country": "Australia",
      "city": "Perth",
      "airport": "Perth Airport",
    },
    "SYD": {
      "country": "Australia",
      "city": "Sydney",
      "airport": "Sydney (Kingsford Smith) Airport",
    },
    "VIE": {
      "country": "Austria",
      "city": "Vienna",
      "airport": "Vienna International Airport",
    },
    "BAH": {
      "country": "Bahrain",
      "city": "Manama",
      "airport": "Bahrain International Airport",
    },
    "BRU": {
      "country": "Belgium",
      "city": "Brussels",
      "airport": "Brussels Airport",
    },
    "FOR": {
      "country": "Brazil",
      "city": "Fortaleza",
      "airport": "Fortaleza-Pinto Martins International Airport",
    },
    "GIG": {
      "country": "Brazil",
      "city": "Rio de Janeiro",
      "airport": "Rio de Janeiro International Airport",
    },
    "GRU": {
      "country": "Brazil",
      "city": "São Paulo",
      "airport": "São Paulo International Airport",
    },
    "SOF": {
      "country": "Bulgaria",
      "city": "Sofia",
      "airport": "Sofia Airport",
    },
    "YUL": {
      "country": "Canada",
      "city": "Montréal, QC",
      "airport": "Montréal International Airport",
    },
    "YTO": {
      "country": "Canada",
      "city": "Toronto, ON",
      "airport": "Greater Toronto Area",
    },
    "YVR": {
      "country": "Canada",
      "city": "Vancouver, BC",
      "airport": "Vancouver International Airport",
    },
    "SCL": {
      "country": "Chile",
      "city": "Santiago",
      "airport": "Arturo Merino Benítez International Airport",
    },
    "BJS": {
      "country": "China",
      "city": "Beijing",
      "airport": "Beijing",
    },
    "HKG": {
      "country": "China",
      "city": "Hong Kong",
      "airport": "Hong Kong International Airport",
    },
    "SHA": {
      "country": "China",
      "city": "Shanghai",
      "airport": "Shanghai Hongqiao International Airport",
    },
    "SZX": {
      "country": "China",
      "city": "Shenzhen, GD",
      "airport": "Shenzhen BaoAn International Airport",
    },
    "TPE": {
      "country": "China",
      "city": "Taipei, TW",
      "airport": "Taoyuan International Airport",
    },
    "ZHY": {
      "country": "China",
      "city": "Zhongwei, NX",
      "airport": "Zhongwei Shapotou Airport",
    },
    "BOG": {
      "country": "Colombia",
      "city": "Bogotá",
      "airport": "El Dorado International Airport",
    },
    "ZAG": {
      "country": "Croatia",
      "city": "Zagreb",
      "airport": "Zagreb Airport",
    },
    "PRG": {
      "country": "Czech Republic",
      "city": "Prague",
      "airport": "Václav Havel Airport Prague",
    },
    "CPH": {
      "country": "Denmark",
      "city": "Copenhagen",
      "airport": "Copenhagen Airport, Kastrup",
    },
    "HEL": {
      "country": "Finland",
      "city": "Helsinki",
      "airport": "Helsinki Airport",
    },
    "MRS": {
      "country": "France",
      "city": "Marseille",
      "airport": "Marseille Provence Airport",
    },
    "CDG": {
      "country": "France",
      "city": "Paris",
      "airport": "Charles de Gaulle International Airport",
    },
    "TXL": {
      "country": "Germany",
      "city": "Berlin",
      "airport": "Berlin-Tegel International Airport",
    },
    "DUS": {
      "country": "Germany",
      "city": "Düsseldorf",
      "airport": "Düsseldorf Airport",
    },
    "FRA": {
      "country": "Germany",
      "city": "Frankfurt",
      "airport": "Frankfurt am Main Airport",
    },
    "HAM": {
      "country": "Germany",
      "city": "Hamburg",
      "airport": "Hamburg Airport",
    },
    "MUC": {
      "country": "Germany",
      "city": "Munich",
      "airport": "Munich Airport",
    },
    "ATH": {
      "country": "Greece",
      "city": "Athens",
      "airport": "Athens International Airport Eleftherios Venizelos",
    },
    "BUD": {
      "country": "Hungary",
      "city": "Budapest",
      "airport": "Budapest Ferenc Liszt International Airport",
    },
    "BLR": {
      "country": "India",
      "city": "Bangalore",
      "airport": "Kempegowda International Airport",
    },
    "MAA": {
      "country": "India",
      "city": "Chennai",
      "airport": "Chennai International Airport",
    },
    "HYD": {
      "country": "India",
      "city": "Hyderabad",
      "airport": "Rajiv Gandhi International Airport",
    },
    "CCU": {
      "country": "India",
      "city": "Kolkata",
      "airport": "Netaji Subhas Chandra Bose International Airport",
    },
    "BOM": {
      "country": "India",
      "city": "Mumbai",
      "airport": "Chhatrapati Shivaji International Airport",
    },
    "DEL": {
      "country": "India",
      "city": "New Delhi",
      "airport": "Indira Gandhi International Airport",
    },
    "PNQ": {
      "country": "India",
      "city": "Pune",
      "airport": "Pune Airport",
    },
    "CGK": {
      "country": "Indonesia",
      "city": "Jakarta",
      "airport": "Soekarno-Hatta International Airport",
    },
    "DUB": {
      "country": "Ireland",
      "city": "Dublin",
      "airport": "Dublin Airport",
    },
    "TLV": {
      "country": "Israel",
      "city": "Tel Aviv",
      "airport": "Ben Gurion Airport",
    },
    "MXP": {
      "country": "Italy",
      "city": "Milan",
      "airport": "Milan Malpensa Airport",
    },
    "PMO": {
      "country": "Italy",
      "city": "Palermo",
      "airport": "Falcone-Borsellino Airport",
    },
    "FCO": {
      "country": "Italy",
      "city": "Rome",
      "airport": "Rome-Fiumicino International Airport",
    },
    "KIX": {
      "country": "Japan",
      "city": "Osaka",
      "airport": "Kansai International Airport",
    },
    "NRT": {
      "country": "Japan",
      "city": "Tokyo",
      "airport": "Narita International Airport",
    },
    "NBO": {
      "country": "Kenya",
      "city": "Nairobi",
      "airport": "Jomo Kenyatta International Airport",
    },
    "KUL": {
      "country": "Malaysia",
      "city": "Kuala Lumpur",
      "airport": "Kuala Lumpur International Airport",
    },
    "QRO": {
      "country": "Mexico",
      "city": "Querétaro",
      "airport": "Querétaro Intercontinental Airport",
    },
    "AMS": {
      "country": "Netherlands",
      "city": "Amsterdam",
      "airport": "Amsterdam Airport Schiphol",
    },
    "AKL": {
      "country": "New Zealand",
      "city": "Auckland",
      "airport": "Auckland Airport",
    },
    "LOS": {
      "country": "Nigeria",
      "city": "Lagos",
      "airport": "Murtala Muhammed International Airport",
    },
    "OSL": {
      "country": "Norway",
      "city": "Oslo",
      "airport": "Oslo Airport, Gardermoen",
    },
    "MCT": {
      "country": "Oman",
      "city": "Muscat",
      "airport": "Muscat International Airport",
    },
    "LIM": {
      "country": "Peru",
      "city": "Lima",
      "airport": "Jorge Chávez International Airport",
    },
    "MNL": {
      "country": "Philippines",
      "city": "Manila",
      "airport": "Ninoy Aquino International Airport",
    },
    "WAW": {
      "country": "Poland",
      "city": "Warsaw",
      "airport": "Warsaw Chopin Airport",
    },
    "LIS": {
      "country": "Portugal",
      "city": "Lisbon",
      "airport": "Humberto Delgado Airport",
    },
    "OTP": {
      "country": "Romania",
      "city": "Bucharest",
      "airport": "Henri Coandă International Airport",
    },
    "SIN": {
      "country": "Singapore",
      "city": "Singapore",
      "airport": "Singapore Changi Airport",
    },
    "CPT": {
      "country": "South Africa",
      "city": "Cape Town",
      "airport": "Cape Town International Airport",
    },
    "JNB": {
      "country": "South Africa",
      "city": "Johannesburg",
      "airport": "O. R. Tambo International Airport",
    },
    "ICN": {
      "country": "South Korea",
      "city": "Seoul",
      "airport": "Incheon International Airport",
    },
    "BCN": {
      "country": "Spain",
      "city": "Barcelona",
      "airport": "Josep Tarradellas Barcelona-El Prat Airport",
    },
    "MAD": {
      "country": "Spain",
      "city": "Madrid",
      "airport": "Adolfo Suárez Madrid-Barajas Airport",
    },
    "ARN": {
      "country": "Sweden",
      "city": "Stockholm",
      "airport": "Stockholm Arlanda Airport",
    },
    "ZRH": {
      "country": "Switzerland",
      "city": "Zürich",
      "airport": "Zürich Airport",
    },
    "BKK": {
      "country": "Thailand",
      "city": "Bangkok",
      "airport": "Suvarnabhumi Airport",
    },
    "IST": {
      "country": "Turkey",
      "city": "Istanbul",
      "airport": "Istanbul Airport",
    },
    "DXB": {
      "country": "United Arab Emirates",
      "city": "Dubai",
      "airport": "Dubai International Airport",
    },
    "FJR": {
      "country": "United Arab Emirates",
      "city": "Fujairah",
      "airport": "Fujairah International Airport",
    },
    "LHR": {
      "country": "United Kingdom",
      "city": "London",
      "airport": "London Heathrow Airport",
    },
    "MAN": {
      "country": "United Kingdom",
      "city": "Manchester",
      "airport": "Manchester Airport",
    },
    "IAD": {
      "country": "United States",
      "city": "Ashburn, VA",
      "airport": "Washington Dulles International Airport",
    },
    "ATL": {
      "country": "United States",
      "city": "Atlanta, GA",
      "airport": "Hartsfield-Jackson Atlanta International Airport",
    },
    "BOS": {
      "country": "United States",
      "city": "Boston, MA",
      "airport": "General Edward Lawrence Logan International Airport",
    },
    "ORD": {
      "country": "United States",
      "city": "Chicago, IL",
      "airport": "O'Hare International Airport",
    },
    "CMH": {
      "country": "United States",
      "city": "Columbus, OH",
      "airport": "John Glenn Columbus International Airport",
    },
    "DFW": {
      "country": "United States",
      "city": "Dallas/Fort Worth, TX",
      "airport": "Dallas/Fort Worth International Airport",
    },
    "DEN": {
      "country": "United States",
      "city": "Denver, CO",
      "airport": "Denver International Airport",
    },
    "HIO": {
      "country": "United States",
      "city": "Hillsboro, OR",
      "airport": "Portland Hillsboro Airport",
    },
    "IAH": {
      "country": "United States",
      "city": "Houston, TX",
      "airport": "George Bush Intercontinental Airport",
    },
    "JAX": {
      "country": "United States",
      "city": "Jacksonville, FL",
      "airport": "Jacksonville International Airport",
    },
    "MCI": {
      "country": "United States",
      "city": "Kansas City, MO",
      "airport": "Kansas City International Airport",
    },
    "LAX": {
      "country": "United States",
      "city": "Los Angeles, CA",
      "airport": "Los Angeles International Airport",
    },
    "MIA": {
      "country": "United States",
      "city": "Miami, FL",
      "airport": "Miami International Airport",
    },
    "MSP": {
      "country": "United States",
      "city": "Minneapolis, MN",
      "airport": "Minneapolis-Saint Paul International Airport",
    },
    "BNA": {
      "country": "United States",
      "city": "Nashville, TN",
      "airport": "Nashville International Airport",
    },
    "JFK": {
      "country": "United States",
      "city": "New York, NY",
      "airport": "John F. Kennedy International Airport",
    },
    "EWR": {
      "country": "United States",
      "city": "Newark, NJ",
      "airport": "Newark Liberty International Airport",
    },
    "PHL": {
      "country": "United States",
      "city": "Philadelphia, PA",
      "airport": "Philadelphia International Airport",
    },
    "PHX": {
      "country": "United States",
      "city": "Phoenix, AZ",
      "airport": "Phoenix Sky Harbor International Airport",
    },
    "PIT": {
      "country": "United States",
      "city": "Pittsburgh, PA",
      "airport": "Pittsburgh International Airport",
    },
    "SLC": {
      "country": "United States",
      "city": "Salt Lake City, UT",
      "airport": "Salt Lake City International Airport",
    },
    "SFO": {
      "country": "United States",
      "city": "San Francisco, CA",
      "airport": "San Francisco International Airport",
    },
    "SEA": {
      "country": "United States",
      "city": "Seattle, WA",
      "airport": "Seattle-Tacoma International Airport",
    },
    "IND": {
      "country": "United States",
      "city": "South Bend, IN",
      "airport": "Indianapolis International Airport",
    },
    "TPA": {
      "country": "United States",
      "city": "Tampa, FL",
      "airport": "Tampa International Airport",
    },
    "HAN": {
      "country": "Vietnam",
      "city": "Hanoi",
      "airport": "Noi Bai International Airport",
    },
    "SGN": {
      "country": "Vietnam",
      "city": "Ho Chi Minh City",
      "airport": "Tan Son Nhat International Airport",
    }
};
