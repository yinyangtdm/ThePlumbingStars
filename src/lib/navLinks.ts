export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  children: NavLink[];
}

export type NavItem = NavLink | NavDropdown;

export function isNavDropdown(item: NavItem): item is NavDropdown {
  return "children" in item;
}

export const defaultNavItems: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
  {
    label: "Areas",
    children: [
      { label: "Los Angeles County", href: "/losangeles" },
      { label: "Ventura County", href: "/ventura" },
    ],
  },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

/** Flat list for mobile menu (expands Areas into sub-links). */
export function flattenNavItems(items: NavItem[]): NavLink[] {
  const flat: NavLink[] = [];
  for (const item of items) {
    if (isNavDropdown(item)) {
      flat.push(...item.children);
    } else {
      flat.push(item);
    }
  }
  return flat;
}

export const sfvCities = [
  "Westlake Village", "Agoura Hills", "Calabasas", "Hidden Hills",
  "Bell Canyon", "West Hills", "Woodland Hills", "Canoga Park",
  "Winnetka", "Chatsworth", "Northridge", "Porter Ranch",
  "Granada Hills", "Mission Hills", "North Hills", "Sylmar",
  "San Fernando", "Pacoima", "Arleta", "Panorama City",
  "Sun Valley", "Sunland-Tujunga", "Reseda", "Lake Balboa",
  "Tarzana", "Encino", "Van Nuys", "Valley Glen",
  "Sherman Oaks", "Studio City", "Valley Village", "North Hollywood",
  "Toluca Lake",
];

export const westsideCities = [
  "Malibu", "Topanga", "Pacific Palisades", "Brentwood",
  "Santa Monica", "Westwood", "Bel Air", "Holmby Hills",
  "Beverly Hills", "Century City", "West Los Angeles", "Sawtelle",
  "Rancho Park", "Cheviot Hills", "Palms", "Culver City",
  "Venice", "Mar Vista", "West Hollywood", "Hollywood",
  "East Hollywood", "Los Feliz", "Silver Lake", "Echo Park",
  "Hancock Park", "Larchmont", "Fairfax", "Mid-Wilshire",
  "Koreatown", "Mid-City",
];

export const eastsideCities = [
  "Glendale", "Burbank", "La Cañada Flintridge", "La Crescenta",
  "Montrose", "Altadena", "Pasadena", "South Pasadena",
  "Eagle Rock", "Highland Park", "Mount Washington", "Glassell Park",
  "Cypress Park", "Atwater Village",
];

export const venturaCities = [
  "Ventura", "Oxnard", "Camarillo", "Thousand Oaks",
  "Simi Valley", "Moorpark", "Newbury Park", "Santa Paula",
  "Fillmore", "Ojai", "Port Hueneme", "Oak View",
  "Somis", "Westlake Village",
];

export const laAreaGroups = [
  { heading: "San Fernando Valley", cities: sfvCities },
  { heading: "Westside & Central LA", cities: westsideCities },
  { heading: "Eastside & Pasadena", cities: eastsideCities },
];
