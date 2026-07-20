import type { Faq } from "./faqs";
import type { ServiceLocation, ServiceRegion } from "./serviceLocations";
import {
  formatCityList,
  SURROUNDING_CITIES_BY_HUB,
} from "./surroundingCities";

export type CityHub = {
  slug: string;
  name: string;
  region: ServiceRegion;
  coords: [number, number]; // [lat, lng]
  permittingAuthority: string;
  housingNote: string;
  terrainNote: string;
  treeNote: string;
  /** Ordered service slugs from services.ts — most relevant first for this city. */
  serviceOrder: string[];
  intro: string;
  faqs: Faq[];
};

const DEFAULT_SERVICE_ORDER = [
  "drain-cleaning",
  "sewer-repair",
  "hydro-jetting",
  "camera-inspection",
  "trenchless-replacement",
  "pipe-lining",
  "water-heater",
];

/**
 * Former hub cities no longer get their own star/page. Name/slug searches and
 * stale localStorage ids resolve to the geographically nearest remaining hub.
 */
const RETIRED_CITY_HUB_ALIASES: Record<string, string> = {
  tarzana: "woodland-hills",
  reseda: "northridge",
  "canoga park": "woodland-hills",
  "canoga-park": "woodland-hills",
  "sherman oaks": "van-nuys",
  "sherman-oaks": "van-nuys",
  "port hueneme": "oxnard",
  "port-hueneme": "oxnard",
};

export const CITY_HUBS: CityHub[] = [
  // ── Los Angeles County (14) ──────────────────────────────────────────────
  {
    slug: "encino",
    name: "Encino",
    region: "losangeles",
    coords: [34.1526, -118.5019],
    permittingAuthority:
      "Encino is a neighborhood of the City of Los Angeles — plumbing permits go through the Los Angeles Department of Building and Safety (LADBS), not a separate city hall.",
    housingNote:
      "Much of Encino’s housing stock dates to the 1950s–60s ranch-home boom along Ventura Boulevard, with hillside estates climbing the Santa Monica Mountains. Original galvanized supply lines and cast-iron drains are still common in that era of construction.",
    terrainNote:
      "Flats south of the boulevard sit on relatively level Valley floor; properties north of Ventura climb quickly. Hillside sewer lines and ejector pumps are a frequent repair topic above the boulevard.",
    treeNote:
      "Mature street trees and large private oaks along older Encino streets contribute to root intrusion into clay and cast-iron sewer laterals — a leading reason we recommend camera inspection before major drain work.",
    serviceOrder: [
      "drain-cleaning",
      "hydro-jetting",
      "camera-inspection",
      "trenchless-replacement",
      "sewer-repair",
      "pipe-lining",
      "water-heater",
    ],
    intro:
      "Licensed plumbers serving Encino’s ranch homes, hillside estates, and Ventura Boulevard corridors. We handle drain cleaning, sewer repair, hydro jetting, and trenchless options with flat-rate pricing and same-day emergency response.",
    faqs: [
      {
        q: "Do Encino homes need LADBS permits for sewer work?",
        a: "Yes. Encino is inside the City of Los Angeles, so most sewer lateral replacements and significant plumbing alterations require LADBS permits. We handle the permit process when your job needs one.",
      },
      {
        q: "Why do hillside Encino properties clog more often?",
        a: "Steeper grades and longer laterals above Ventura Boulevard can slow flow and collect grease and debris. Camera inspection usually shows whether the issue is roots, scale, or a grade-related belly.",
      },
      {
        q: "Can you replace a sewer line without tearing up my Encino driveway?",
        a: "Often yes. Trenchless pipe bursting or CIPP lining can renew many laterals with access pits instead of a full open trench — especially useful on landscaped hillside lots.",
      },
      {
        q: "How fast can you arrive for an Encino emergency?",
        a: "We typically arrive within about 60 minutes for true emergencies across the San Fernando Valley, including Encino. You’ll get a text when we’re en route.",
      },
    ],
  },
  {
    slug: "woodland-hills",
    name: "Woodland Hills",
    region: "losangeles",
    coords: [34.1683, -118.6058],
    permittingAuthority:
      "Woodland Hills is within the City of Los Angeles — LADBS handles plumbing and sewer permits.",
    housingNote:
      "Woodland Hills grew heavily from the 1950s through the 1980s. Many homes still have original drain laterals; some 1970s–80s supply lines used materials that are now past expected service life.",
    terrainNote:
      "Rolling foothills at the western edge of the Valley mean some properties sit above street sewers and rely on ejector pumps or longer laterals.",
    treeNote:
      "Mature landscaping and hillside plantings increase root-intrusion risk into clay and older PVC laterals.",
    serviceOrder: [
      "sewer-repair",
      "trenchless-replacement",
      "camera-inspection",
      "drain-cleaning",
      "hydro-jetting",
      "water-heater",
      "pipe-lining",
    ],
    intro:
      "Plumbing Stars serving Woodland Hills with drain cleaning, sewer repair, trenchless replacement, and water heater installs. Local knowledge of foothill laterals and LADBS permitting.",
    faqs: [
      {
        q: "Do Woodland Hills hillside homes need special sewer equipment?",
        a: "Some do. Homes above the street sewer may use ejector pumps or have longer laterals. We diagnose with a camera and explain repair options before any digging.",
      },
      {
        q: "Is trenchless pipe repair available in Woodland Hills?",
        a: "Yes. Pipe bursting and CIPP lining are often ideal on landscaped foothill lots where open-trench excavation would damage driveways or slopes.",
      },
      {
        q: "How do I know if my Woodland Hills water heater needs replacement?",
        a: "Tank heaters over 10–12 years old, rusty tank bottoms, or frequent repairs are common red flags. We can same-day swap tank or tankless units and haul away the old one.",
      },
      {
        q: "Who issues the permit for a sewer lateral replacement?",
        a: "LADBS. Woodland Hills is City of LA territory, so we coordinate City permits when the scope requires them.",
      },
    ],
  },
  {
    slug: "van-nuys",
    name: "Van Nuys",
    region: "losangeles",
    coords: [34.1899, -118.4514],
    permittingAuthority:
      "Van Nuys is part of the City of Los Angeles — LADBS issues plumbing and sewer permits.",
    housingNote:
      "Van Nuys has a large inventory of mid-century single-family homes and multifamily buildings. Older cast-iron and clay sewer laterals are common, along with aging tank water heaters.",
    terrainNote:
      "Mostly flat Valley floor — standard lateral layouts, but shared apartment mains and older commercial corridors add complexity on denser blocks.",
    treeNote:
      "Parkway trees and mature residential landscaping contribute to root intrusion, especially on clay laterals.",
    serviceOrder: [
      "drain-cleaning",
      "camera-inspection",
      "sewer-repair",
      "hydro-jetting",
      "water-heater",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Fast, flat-rate plumbing in Van Nuys — drain cleaning, camera inspections, sewer repair, and water heater replacement for houses and multifamily buildings.",
    faqs: [
      {
        q: "Do you work on Van Nuys apartment buildings?",
        a: "Yes. We service unit drains and building laterals, and we’ll document findings with camera video so managers know whether the issue is unit-side or shared.",
      },
      {
        q: "What should I do if sewage is backing up into a Van Nuys tub?",
        a: "Stop using water and call us. A main-line backup needs prompt clearing — we often clear it the same day and show you the camera footage afterward.",
      },
      {
        q: "Is a camera inspection worth it before buying in Van Nuys?",
        a: "Yes. Older Valley laterals can hide offset joints and root damage that a visual walkthrough won’t show.",
      },
      {
        q: "Who permits sewer work in Van Nuys?",
        a: "LADBS. We handle permit coordination when your repair or replacement requires City approval.",
      },
    ],
  },
  {
    slug: "north-hollywood",
    name: "North Hollywood",
    region: "losangeles",
    coords: [34.1727, -118.3784],
    permittingAuthority:
      "North Hollywood is a City of Los Angeles neighborhood — permits go through LADBS.",
    housingNote:
      "NoHo spans classic bungalows, courtyard apartments, and newer transit-oriented housing. Older stock often has original drain lines; denser buildings share lateral systems that need careful diagnosis.",
    terrainNote:
      "Mostly flat Valley terrain with typical LA City sewer connections — complexity comes more from multifamily shared lines than from hills.",
    treeNote:
      "Mature trees on older residential streets remain a common source of root-related sewer slowdowns.",
    serviceOrder: [
      "drain-cleaning",
      "camera-inspection",
      "hydro-jetting",
      "sewer-repair",
      "water-heater",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Plumbing service for North Hollywood homes and apartments — drain cleaning, camera inspections, hydro jetting, and sewer repair with clear, flat-rate pricing.",
    faqs: [
      {
        q: "Can you tell if a NoHo clog is my unit or the building main?",
        a: "Usually yes. We check fixtures and run a camera when needed so you (or your landlord) know who owns the problem before authorizing major work.",
      },
      {
        q: "Do newer NoHo developments still need plumbing service?",
        a: "Yes. Even newer buildings can have construction debris in lines, valve issues, or water-heater failures — and we service them under the same flat-rate model.",
      },
      {
        q: "How quickly can you reach North Hollywood?",
        a: "We’re typically on-site within about an hour for emergencies across this part of the Valley.",
      },
      {
        q: "Are permits LADBS or a separate NoHo office?",
        a: "LADBS. North Hollywood does not have a separate city building department.",
      },
    ],
  },
  {
    slug: "northridge",
    name: "Northridge",
    region: "losangeles",
    coords: [34.2381, -118.5301],
    permittingAuthority:
      "Northridge is a City of Los Angeles neighborhood — LADBS issues required plumbing permits.",
    housingNote:
      "Northridge includes postwar homes, 1970s–80s tract development, and properties rebuilt or remodeled after the 1994 earthquake. Pipe materials vary widely by era — camera inspection is the reliable way to know what you’re dealing with.",
    terrainNote:
      "Generally flat northwestern Valley terrain with standard sewer laterals; some larger lots have longer runs to the street main.",
    treeNote:
      "Mature landscaping around older homes increases root-intrusion risk in aging laterals.",
    serviceOrder: [
      "camera-inspection",
      "drain-cleaning",
      "sewer-repair",
      "hydro-jetting",
      "water-heater",
      "trenchless-replacement",
      "pipe-lining",
    ],
    intro:
      "Plumbing Stars in Northridge — camera inspections, drain cleaning, sewer repair, and water heater service tailored to the Valley’s mixed housing eras.",
    faqs: [
      {
        q: "Why start with a camera inspection in Northridge?",
        a: "Housing ages and remodel histories vary block by block. Video shows whether you have clay, cast iron, or PVC — and whether roots, offsets, or collapse are the real problem.",
      },
      {
        q: "Do earthquake-era remodels change plumbing codes?",
        a: "Remodeled sections should meet the code in force at the time of work. We evaluate what’s actually in the ground/walls rather than assuming everything matches the original build year.",
      },
      {
        q: "Can you clear a main-line backup same day?",
        a: "Yes in most cases. We clear the line, camera it, and give you a flat-rate recommendation if repair is needed.",
      },
      {
        q: "Who issues Northridge plumbing permits?",
        a: "LADBS — Northridge is City of Los Angeles.",
      },
    ],
  },
  {
    slug: "san-fernando",
    name: "San Fernando",
    region: "losangeles",
    coords: [34.2819, -118.4389],
    permittingAuthority:
      "San Fernando is an independently incorporated city — plumbing permits are issued by the City of San Fernando Community Development Department / Building & Safety, not LADBS.",
    housingNote:
      "San Fernando’s housing stock includes postwar bungalows, mid-century tract homes, and multifamily near the downtown corridor. Many older residences still have original cast-iron drains and aging water heaters.",
    terrainNote:
      "Generally flat northeastern Valley terrain with standard sewer laterals; some larger lots have longer runs to the street main.",
    treeNote:
      "Mature street trees and private landscaping increase root-intrusion risk in aging clay and cast-iron laterals.",
    serviceOrder: [
      "drain-cleaning",
      "camera-inspection",
      "sewer-repair",
      "hydro-jetting",
      "water-heater",
      "trenchless-replacement",
      "pipe-lining",
    ],
    intro:
      "Licensed plumbers serving San Fernando — drain cleaning, camera inspections, sewer repair, and water heater service with City of San Fernando permit coordination and flat-rate pricing.",
    faqs: [
      {
        q: "Is San Fernando under LADBS for plumbing permits?",
        a: "No. San Fernando is its own city with its own Building & Safety department. We pull San Fernando permits when your repair or replacement requires them.",
      },
      {
        q: "What causes recurring drain clogs in San Fernando homes?",
        a: "Grease, scale, and root intrusion in older cast-iron and clay laterals are common. Hydro jetting and camera inspection show whether you’re dealing with a simple blockage or a damaged pipe.",
      },
      {
        q: "Can you clear a main-line backup same day in San Fernando?",
        a: "Yes in most cases. We clear the line, camera it, and give you a flat-rate recommendation if repair is needed.",
      },
      {
        q: "Do you serve nearby Sylmar and Pacoima addresses too?",
        a: "Yes. Surrounding northeast Valley communities are in our Los Angeles County service area — permitting rules depend on whether the address is City of San Fernando or City of LA.",
      },
    ],
  },
  {
    slug: "burbank",
    name: "Burbank",
    region: "losangeles",
    coords: [34.1808, -118.3089],
    permittingAuthority:
      "Burbank is an independently incorporated city with its own Community Development Department / Building Division — not LADBS, even though it borders City of LA neighborhoods.",
    housingNote:
      "Burbank’s Media District and residential streets mix older bungalows with multifamily and newer construction. Older bungalows commonly still have cast-iron drains and aging sewer laterals.",
    terrainNote:
      "Mostly gentle grades with foothill edges toward the Verdugos — hillside properties can have longer or steeper laterals.",
    treeNote:
      "Tree-lined residential streets make root intrusion a recurring cause of sewer slowdowns in older laterals.",
    serviceOrder: [
      "sewer-repair",
      "camera-inspection",
      "drain-cleaning",
      "hydro-jetting",
      "trenchless-replacement",
      "water-heater",
      "pipe-lining",
    ],
    intro:
      "Licensed plumbers serving the City of Burbank — sewer repair, camera inspections, drain cleaning, and trenchless options, with familiarity with Burbank’s own permitting process.",
    faqs: [
      {
        q: "Is Burbank plumbing permitted by LADBS or the City of Burbank?",
        a: "City of Burbank. It’s an independent municipality with its own building division. We coordinate Burbank permits when your job requires them.",
      },
      {
        q: "Why do older Burbank bungalows need camera inspections?",
        a: "Cast-iron and clay laterals of that era often develop root intrusion, offsets, and scale. Video shows whether cleaning or replacement is the right next step.",
      },
      {
        q: "Do you work near the studios / Media District?",
        a: "Yes. We service residential and small commercial plumbing throughout Burbank, including denser blocks near the studios.",
      },
      {
        q: "Can you trenchless-replace a Burbank sewer lateral?",
        a: "Often yes. Trenchless methods minimize disruption to driveways and landscaping while meeting City of Burbank requirements.",
      },
    ],
  },
  {
    slug: "glendale",
    name: "Glendale",
    region: "losangeles",
    coords: [34.1425, -118.2551],
    permittingAuthority:
      "Glendale is a separately incorporated city — plumbing and sewer permits go through the City of Glendale Community Development Department, not LADBS.",
    housingNote:
      "Glendale includes Craftsman and mid-century homes plus dense multifamily near Brand Boulevard. Older housing frequently has original cast-iron drains and aging laterals.",
    terrainNote:
      "Foothill neighborhoods climb toward the Verdugos with steeper laterals; flatter areas toward Atwater and the LA River corridor have more conventional grades.",
    treeNote:
      "Mature street trees in older Glendale neighborhoods contribute heavily to root intrusion in clay and cast-iron sewer lines.",
    serviceOrder: [
      "camera-inspection",
      "sewer-repair",
      "drain-cleaning",
      "hydro-jetting",
      "trenchless-replacement",
      "pipe-lining",
      "water-heater",
    ],
    intro:
      "Plumbing service for Glendale homeowners — camera inspections, sewer repair, drain cleaning, and trenchless options, with City of Glendale permitting handled when required.",
    faqs: [
      {
        q: "Does Glendale use LADBS for plumbing permits?",
        a: "No. Glendale is its own city. We work with Glendale’s Community Development Department when permits are required.",
      },
      {
        q: "Are foothill Glendale homes harder to repair?",
        a: "Access and grade can add complexity, but camera diagnostics and trenchless methods often avoid large hillside excavations.",
      },
      {
        q: "What causes main-line backups in older Glendale homes?",
        a: "Roots, offset joints, and scale in aging laterals are the top findings on camera. Cleaning may buy time; replacement is needed when the pipe is structurally failed.",
      },
      {
        q: "Do you service Glendale condos and apartments?",
        a: "Yes. We diagnose unit vs. shared-line issues and provide video documentation for boards and managers.",
      },
    ],
  },
  {
    slug: "santa-monica",
    name: "Santa Monica",
    region: "losangeles",
    coords: [34.0195, -118.4912],
    permittingAuthority:
      "Santa Monica is an independently incorporated city — permits are issued by the City of Santa Monica Building & Safety Division, not LADBS.",
    housingNote:
      "Santa Monica’s housing spans Craftsman bungalows, mid-century apartments, and modern condo developments. Coastal moisture and older building stock accelerate corrosion in aging metal pipes and water heaters.",
    terrainNote:
      "Mostly gentle coastal plain grades; older buildings often have tight access for excavation, making trenchless options especially valuable.",
    treeNote:
      "Mature street trees on older residential blocks contribute to root intrusion in aging laterals.",
    serviceOrder: [
      "drain-cleaning",
      "camera-inspection",
      "trenchless-replacement",
      "pipe-lining",
      "sewer-repair",
      "water-heater",
      "hydro-jetting",
    ],
    intro:
      "Expert plumbers in Santa Monica — drain cleaning, camera inspections, trenchless sewer repair, and water heater replacement with City of Santa Monica permit coordination.",
    faqs: [
      {
        q: "Who permits plumbing work in Santa Monica?",
        a: "The City of Santa Monica Building & Safety Division. We coordinate city permits when your repair or replacement requires them.",
      },
      {
        q: "Why recommend trenchless methods in Santa Monica?",
        a: "Tight lots, shared driveways, and landscaped courtyards make open-trench excavation costly. Pipe lining and bursting often restore laterals with far less surface disruption.",
      },
      {
        q: "Do coastal conditions affect plumbing?",
        a: "Salt air and moisture can accelerate exterior corrosion on water heaters and exposed metal. Interior scale and aging laterals are still the bigger in-wall/in-ground issues.",
      },
      {
        q: "Can you service Santa Monica condo buildings?",
        a: "Yes — with HOA authorization when required. We document findings clearly for boards and unit owners.",
      },
    ],
  },
  {
    slug: "malibu",
    name: "Malibu",
    region: "losangeles",
    coords: [34.048, -118.71],
    permittingAuthority:
      "Malibu is an independently incorporated city — plumbing permits are issued by the City of Malibu Building Safety / Community Development department, not LADBS.",
    housingNote:
      "Malibu’s housing ranges from beach cottages and mid-century canyon homes to large hillside estates. Many properties rely on septic systems or long private laterals rather than dense municipal sewer grids, and coastal moisture accelerates corrosion on aging metal supply lines and water heaters.",
    terrainNote:
      "Steep canyon and bluff lots are common west of PCH. Long sewer or septic runs, ejector pumps, and limited excavation access make camera diagnosis and trenchless options especially valuable before any dig.",
    treeNote:
      "Mature oaks and canyon vegetation increase root intrusion risk in older clay and cast-iron laterals — camera inspection is strongly recommended before major drain or sewer work.",
    serviceOrder: [
      "camera-inspection",
      "drain-cleaning",
      "hydro-jetting",
      "trenchless-replacement",
      "pipe-lining",
      "sewer-repair",
      "water-heater",
    ],
    intro:
      "Licensed plumbers serving Malibu’s coastal homes, canyon estates, and Pacific Coast Highway corridors. Drain cleaning, camera inspections, trenchless sewer repair, and water heater service with City of Malibu permit coordination.",
    faqs: [
      {
        q: "Who issues plumbing permits in Malibu?",
        a: "The City of Malibu Building Safety / Community Development department. Malibu is its own city — not LADBS territory. We coordinate Malibu permits when your job requires them.",
      },
      {
        q: "Do Malibu homes often use septic instead of sewer?",
        a: "Many do, especially on hillside and canyon lots. We diagnose drain and tank-related issues carefully and recommend camera inspection before any major excavation or replacement.",
      },
      {
        q: "Why recommend trenchless methods in Malibu?",
        a: "Steep grades, landscaped bluffs, and limited street access make open-trench work expensive and disruptive. Pipe lining and trenchless replacement often restore lines with far less surface damage.",
      },
      {
        q: "Do you offer same-day emergency plumbing in Malibu?",
        a: "Yes. Emergency drain and sewer calls are prioritized with flat-rate pricing and no after-hours surcharge.",
      },
    ],
  },
  {
    slug: "beverly-hills",
    name: "Beverly Hills",
    region: "losangeles",
    coords: [34.0736, -118.4004],
    permittingAuthority:
      "Beverly Hills is an independently incorporated city with its own Community Development / Building & Safety permitting — not LADBS.",
    housingNote:
      "Beverly Hills includes early-20th-century estates, mid-century homes, and extensively remodeled properties. Many older laterals and specialty fixtures require careful diagnosis before any invasive work.",
    terrainNote:
      "Flats near the business triangle are relatively level; northern and canyon-adjacent properties can involve steeper grades and longer sewer runs.",
    treeNote:
      "Large specimen trees and mature landscaping increase root-intrusion risk and make low-disruption trenchless repairs highly desirable.",
    serviceOrder: [
      "camera-inspection",
      "trenchless-replacement",
      "pipe-lining",
      "sewer-repair",
      "drain-cleaning",
      "hydro-jetting",
      "water-heater",
    ],
    intro:
      "Discreet, professional plumbing for Beverly Hills — camera diagnostics, trenchless sewer solutions, drain cleaning, and water heater service with City of Beverly Hills permitting when required.",
    faqs: [
      {
        q: "Is Beverly Hills under LA City plumbing permits?",
        a: "No. Beverly Hills is its own city with its own building department. We pull Beverly Hills permits when the scope requires them.",
      },
      {
        q: "Can you repair a sewer without disrupting landscaping?",
        a: "That’s a primary reason clients choose trenchless lining or bursting here. We camera first and recommend the least-invasive method that actually fixes the pipe.",
      },
      {
        q: "Do you offer same-day emergency service in Beverly Hills?",
        a: "Yes. Emergency drain and sewer calls are prioritized with the same flat-rate pricing — no after-hours surcharge.",
      },
      {
        q: "Will you provide video of the sewer inspection?",
        a: "Yes. Camera inspections include video so you can see exactly what we found before approving repair work.",
      },
    ],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    region: "losangeles",
    // Just north of Koreatown (central LA star)
    coords: [34.082, -118.301],
    permittingAuthority:
      "Most of central Los Angeles is City of Los Angeles territory — plumbing permits go through the Los Angeles Department of Building and Safety (LADBS).",
    housingNote:
      "Central Los Angeles mixes pre-war bungalows, courtyard apartments, mid-rise multifamily, and remodeled craft homes. Older buildings frequently retain cast-iron drains, galvanized supply lines, and shared laterals that need careful diagnosis.",
    terrainNote:
      "Mostly gentle basin grades with dense urban lots. Access constraints, alley laterals, and shared building mains matter more than steep hillside terrain.",
    treeNote:
      "Mature street trees on older residential blocks remain a common source of root intrusion into clay and cast-iron sewer laterals.",
    serviceOrder: [
      "drain-cleaning",
      "camera-inspection",
      "hydro-jetting",
      "sewer-repair",
      "water-heater",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Licensed plumbers serving central Los Angeles — from Koreatown and Mid-Wilshire to surrounding neighborhoods. Drain cleaning, camera inspections, hydro jetting, and sewer repair with LADBS permit coordination and flat-rate pricing.",
    faqs: [
      {
        q: "Do central LA homes need LADBS permits for sewer work?",
        a: "Yes. Most sewer lateral replacements and significant plumbing alterations inside the City of Los Angeles require LADBS permits. We handle the permit process when your job needs one.",
      },
      {
        q: "Can you tell if a clog is my unit or the building main?",
        a: "Usually yes. We check fixtures and run a camera when needed so you (or your landlord) know who owns the problem before authorizing major work.",
      },
      {
        q: "Do you service apartments and condos in central LA?",
        a: "Yes. We work with homeowners, HOAs, and property managers on unit-level and building drain issues — and we’ll tell you clearly when a shared main line is the real culprit.",
      },
      {
        q: "How fast can you arrive for a Los Angeles emergency?",
        a: "We typically arrive within about 60 minutes for true emergencies across central Los Angeles. You’ll get a text when we’re en route.",
      },
    ],
  },
  {
    slug: "culver-city",
    name: "Culver City",
    region: "losangeles",
    coords: [34.0211, -118.3965],
    permittingAuthority:
      "Culver City is a separately incorporated city — plumbing permits go through Culver City Building Safety, not LADBS.",
    housingNote:
      "Culver City mixes bungalows, mid-century homes, and newer multifamily near studio and downtown corridors. Older homes frequently need drain and water-heater attention; remodeled properties may have mixed pipe materials.",
    terrainNote:
      "Mostly gentle Westside grades with standard lateral connections — access constraints on denser lots matter more than steep terrain.",
    treeNote:
      "Mature street trees in older neighborhoods contribute to root intrusion in aging sewer laterals.",
    serviceOrder: [
      "drain-cleaning",
      "camera-inspection",
      "water-heater",
      "sewer-repair",
      "hydro-jetting",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Plumbing Stars serving Culver City — drain cleaning, camera inspections, water heater replacement, and sewer repair with City of Culver City permit coordination.",
    faqs: [
      {
        q: "Who issues Culver City plumbing permits?",
        a: "Culver City Building Safety. It’s an independent city, not LADBS territory.",
      },
      {
        q: "Do studio-adjacent apartments need different plumbing service?",
        a: "The fixtures are similar, but shared laterals and HOA rules often apply. We diagnose carefully and document findings for managers.",
      },
      {
        q: "Can you same-day replace a water heater in Culver City?",
        a: "Often for standard tank replacements. Tankless upgrades may need additional gas/electric and permit prep.",
      },
      {
        q: "Is trenchless sewer repair available here?",
        a: "Yes — especially useful where driveways and landscaping would make open-trench work expensive.",
      },
    ],
  },
  {
    slug: "pasadena",
    name: "Pasadena",
    region: "losangeles",
    coords: [34.1478, -118.1445],
    permittingAuthority:
      "Pasadena is an independently incorporated city — permits are handled by the City of Pasadena Planning & Community Development / Building Division, not LADBS.",
    housingNote:
      "Pasadena’s Craftsman bungalows, period revival homes, and older multifamily stock often retain original cast-iron drains and aging laterals. Historic properties benefit from careful, low-impact repair methods.",
    terrainNote:
      "Arroyo-adjacent and foothill neighborhoods can involve grade changes; flatter central neighborhoods have more conventional sewer layouts.",
    treeNote:
      "Pasadena’s mature canopy — oak, liquidambar, and street trees — is a major driver of root intrusion into older sewer laterals.",
    serviceOrder: [
      "camera-inspection",
      "sewer-repair",
      "hydro-jetting",
      "drain-cleaning",
      "trenchless-replacement",
      "pipe-lining",
      "water-heater",
    ],
    intro:
      "Licensed plumbers in Pasadena — camera inspections, sewer repair, hydro jetting, and trenchless options for Craftsman homes and older laterals, with City of Pasadena permitting when needed.",
    faqs: [
      {
        q: "Does Pasadena use LADBS?",
        a: "No. Pasadena is its own city with its own building division. We coordinate Pasadena permits when required.",
      },
      {
        q: "Why are root problems so common in Pasadena?",
        a: "Mature trees plus aging clay/cast-iron laterals are a classic combination. Camera inspection and hydro jetting are usually the first diagnostic and clearing steps.",
      },
      {
        q: "Can you work on historic Pasadena homes without major excavation?",
        a: "Often yes. Trenchless lining and bursting are designed to renew laterals while protecting landscaping, driveways, and historic streetscapes.",
      },
      {
        q: "Do you provide inspection video for escrow?",
        a: "Yes. Pre-sale camera inspections with video are a common request for Pasadena transactions.",
      },
    ],
  },

  // ── Ventura County (8) ───────────────────────────────────────────────────
  {
    slug: "ventura",
    name: "Ventura",
    region: "ventura",
    // Just east of downtown Ventura / map label
    coords: [34.281, -119.26],
    permittingAuthority:
      "The City of Ventura (San Buenaventura) is independently incorporated. Plumbing and sewer permits are issued by the City of Ventura Community Development Department / Building & Safety — not Ventura County Building & Safety, and not LADBS.",
    housingNote:
      "Ventura’s stock spans Craftsman and Spanish Revival homes downtown and in Midtown, mid-century tract near the Avenue and College area, Pierpont beach cottages, and hillside properties toward the foothills. Older laterals are often original cast iron or clay; coastal moisture accelerates corrosion on tank water heaters and exposed metal supply lines.",
    terrainNote:
      "Downtown, Midtown, and Pierpont sit on relatively level coastal plain with conventional gravity laterals. Foothill and Arundell-adjacent properties climb quickly — longer laterals, steeper grades, and occasional ejector systems are common repair topics above Main Street and toward the hills.",
    treeNote:
      "Mature street trees along Midtown, the Avenue, and older residential blocks drive root intrusion into aging clay and cast-iron laterals. Camera inspection before major drain or sewer work is strongly recommended in those neighborhoods.",
    serviceOrder: [
      "drain-cleaning",
      "camera-inspection",
      "water-heater",
      "sewer-repair",
      "hydro-jetting",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Licensed plumbers serving the City of Ventura — from Downtown and Midtown to Pierpont, the Avenue, and foothill neighborhoods. Drain cleaning, camera inspections, water heater replacement, and sewer repair with City of Ventura permit coordination and flat-rate pricing.",
    faqs: [
      {
        q: "Who issues plumbing permits in the City of Ventura?",
        a: "City of Ventura Building & Safety (Community Development), not the county. We confirm jurisdiction for your parcel and pull Ventura city permits when your repair or replacement requires them.",
      },
      {
        q: "Do Pierpont and beach-area homes need different plumbing care?",
        a: "Coastal moisture can speed exterior corrosion on water heaters and exposed metal. Interior issues are still usually aging laterals, grease, or roots — we camera-diagnose before recommending repair or replacement.",
      },
      {
        q: "Why do Midtown and Avenue drains clog repeatedly?",
        a: "Older cast-iron and clay laterals plus mature street trees mean roots and scale are common. Hydro jetting clears buildup more thoroughly than a basic snake; camera video shows whether the pipe itself needs lining or replacement.",
      },
      {
        q: "Can you clear a Ventura sewer backup the same day?",
        a: "Yes in most emergency cases. We clear the line, camera it when appropriate, and give you a written flat-rate quote before any repair work continues — including nights and weekends at the same rate.",
      },
    ],
  },
  {
    slug: "thousand-oaks",
    name: "Thousand Oaks",
    region: "ventura",
    coords: [34.1706, -118.8376],
    permittingAuthority:
      "Thousand Oaks is an independently incorporated city in Ventura County — plumbing permits go through the City of Thousand Oaks Community Development Department.",
    housingNote:
      "Conejo Valley tract homes from the 1970s–90s dominate much of Thousand Oaks. Homes from that era commonly need water heater replacements and may still have aging supply-line materials approaching end of service life.",
    terrainNote:
      "Rolling Conejo Valley terrain with planned neighborhoods — most laterals are conventional, though hillside pockets exist near open-space edges.",
    treeNote:
      "Landscaping is mature in older tracts; root intrusion appears, but less universally than in early-20th-century LA neighborhoods with clay laterals.",
    serviceOrder: [
      "water-heater",
      "pipe-lining",
      "drain-cleaning",
      "camera-inspection",
      "sewer-repair",
      "hydro-jetting",
      "trenchless-replacement",
    ],
    intro:
      "Plumbing Stars serving Thousand Oaks — water heater replacement, pipe lining, drain cleaning, and sewer repair for Conejo Valley homes, with City of Thousand Oaks permitting when required.",
    faqs: [
      {
        q: "Who permits plumbing work in Thousand Oaks?",
        a: "The City of Thousand Oaks Community Development Department. We coordinate city permits when your job requires them.",
      },
      {
        q: "Why are water heater replacements so common here?",
        a: "A large share of Thousand Oaks housing was built in the 1970s–90s, so many original tanks are past expected lifespan. We install tank or tankless and haul away the old unit.",
      },
      {
        q: "Do you serve Newbury Park addresses separately?",
        a: "Most Newbury Park addresses are within Thousand Oaks city limits and share city permitting. We also have a dedicated Newbury Park page covering that community’s specifics.",
      },
      {
        q: "Is trenchless sewer repair available in Thousand Oaks?",
        a: "Yes. Camera inspection tells us whether lining, bursting, or traditional repair is the right fit for your lateral.",
      },
    ],
  },
  {
    slug: "simi-valley",
    name: "Simi Valley",
    region: "ventura",
    coords: [34.2694, -118.7815],
    permittingAuthority:
      "Simi Valley is an independently incorporated city — permits go through the City of Simi Valley Building & Safety Division.",
    housingNote:
      "Simi Valley’s housing is largely late-20th-century tract development with some older pockets. Water heaters and drain maintenance are frequent calls; pipe materials vary by tract era.",
    terrainNote:
      "Valley floor neighborhoods are relatively level; hillside edges toward the Santa Susanas can involve steeper laterals and longer runs.",
    treeNote:
      "Mature tract landscaping contributes to occasional root intrusion, especially on older laterals.",
    serviceOrder: [
      "drain-cleaning",
      "water-heater",
      "camera-inspection",
      "sewer-repair",
      "hydro-jetting",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Local plumbers for Simi Valley — drain cleaning, water heater replacement, camera inspections, and sewer repair with City of Simi Valley permit coordination.",
    faqs: [
      {
        q: "Is Simi Valley under Ventura County building permits or city permits?",
        a: "Inside city limits, the City of Simi Valley Building & Safety Division handles plumbing permits. We confirm jurisdiction before pulling papers.",
      },
      {
        q: "Can you same-day clear a Simi Valley sewer backup?",
        a: "Yes in most emergency cases. We clear the line, camera it when appropriate, and quote any repair in writing before work continues.",
      },
      {
        q: "Do hillside Simi Valley homes need special equipment?",
        a: "Sometimes — steeper laterals or ejector systems need proper diagnosis. Camera inspection is the starting point.",
      },
      {
        q: "Do you install tankless water heaters in Simi Valley?",
        a: "Yes. We size the unit for your household and handle gas/electric requirements and permits when needed.",
      },
    ],
  },
  {
    slug: "camarillo",
    name: "Camarillo",
    region: "ventura",
    coords: [34.2164, -119.0376],
    permittingAuthority:
      "Camarillo is an independently incorporated city — plumbing permits are issued by the City of Camarillo Community Development Department.",
    housingNote:
      "Camarillo’s planned communities and mid-to-late 20th-century homes often need routine drain service and water heater upgrades as original equipment ages out.",
    terrainNote:
      "Mostly gentle Oxnard Plain / foothill-edge grades with conventional sewer connections.",
    treeNote:
      "Landscaped tracts see periodic root issues; less severe than older LA clay-lateral neighborhoods but still a common camera finding.",
    serviceOrder: [
      "drain-cleaning",
      "water-heater",
      "camera-inspection",
      "hydro-jetting",
      "sewer-repair",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Plumbing service for Camarillo homes — drain cleaning, water heater replacement, camera inspections, and sewer repair with City of Camarillo permitting when required.",
    faqs: [
      {
        q: "Who issues Camarillo plumbing permits?",
        a: "The City of Camarillo Community Development Department for work inside city limits.",
      },
      {
        q: "What’s a typical Camarillo plumbing emergency?",
        a: "Main-line backups and failed water heaters are the most common after-hours calls. We respond with flat-rate pricing — no night or weekend surcharge.",
      },
      {
        q: "Do you camera-inspect before hydro jetting?",
        a: "Yes when the line’s condition is unknown. Video protects you from jetting a collapsed or severely broken pipe.",
      },
      {
        q: "Can you trenchless-replace a Camarillo sewer lateral?",
        a: "Often yes. We’ll show you the footage and compare trenchless vs. open-trench options before you decide.",
      },
    ],
  },
  {
    slug: "oxnard",
    name: "Oxnard",
    region: "ventura",
    coords: [34.1975, -119.1771],
    permittingAuthority:
      "Oxnard is an independently incorporated city — plumbing permits go through the City of Oxnard Development Services / Building Division.",
    housingNote:
      "Oxnard’s housing ranges from older coastal and central neighborhoods to newer tracts. Coastal moisture and older multifamily stock make drain maintenance and water heater corrosion common service themes.",
    terrainNote:
      "Flat coastal plain — conventional gravity laterals; denser blocks can involve shared lines and tight access.",
    treeNote:
      "Older neighborhoods with mature trees see root intrusion; newer tracts less so.",
    serviceOrder: [
      "drain-cleaning",
      "camera-inspection",
      "sewer-repair",
      "water-heater",
      "hydro-jetting",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Plumbing Stars in Oxnard — drain cleaning, camera inspections, sewer repair, and water heater service for coastal Ventura County homes and multifamily buildings.",
    faqs: [
      {
        q: "Who permits plumbing work in Oxnard?",
        a: "City of Oxnard Building Division for jobs inside city limits. We handle permit coordination when required.",
      },
      {
        q: "Does coastal air affect water heaters?",
        a: "Exterior corrosion can progress faster near the coast. Interior tank failure still follows age and maintenance — we inspect and replace when needed.",
      },
      {
        q: "Do you service Oxnard apartments?",
        a: "Yes. We work with owners and managers on unit and building drain issues and provide clear documentation.",
      },
      {
        q: "How fast can you reach Oxnard for an emergency?",
        a: "We prioritize Ventura County emergencies and typically arrive within about an hour when crews are available in the area.",
      },
    ],
  },
  {
    slug: "moorpark",
    name: "Moorpark",
    region: "ventura",
    coords: [34.2855, -118.882],
    permittingAuthority:
      "Moorpark is an independently incorporated city — plumbing permits are handled by the City of Moorpark Community Development Department.",
    housingNote:
      "Moorpark’s housing is largely late-20th-century planned development. Water heaters and drain laterals from original builds are entering replacement age across many tracts.",
    terrainNote:
      "Rolling hills and planned neighborhoods — most laterals are standard, with some hillside properties near open space.",
    treeNote:
      "Mature tract landscaping can contribute to root intrusion as neighborhoods age.",
    serviceOrder: [
      "water-heater",
      "drain-cleaning",
      "camera-inspection",
      "sewer-repair",
      "pipe-lining",
      "hydro-jetting",
      "trenchless-replacement",
    ],
    intro:
      "Trusted plumbers for Moorpark — water heater replacement, drain cleaning, camera inspections, and sewer repair with City of Moorpark permitting when needed.",
    faqs: [
      {
        q: "Is Moorpark under Ventura County or city building permits?",
        a: "Inside city limits, City of Moorpark Community Development handles plumbing permits.",
      },
      {
        q: "Why replace water heaters proactively in Moorpark?",
        a: "Many tract homes still run original or near-original tanks past 10–12 years. Proactive replacement avoids flood damage from a tank failure.",
      },
      {
        q: "Do you offer flat-rate pricing in Moorpark?",
        a: "Yes. Every job is quoted in writing before work begins — including emergencies.",
      },
      {
        q: "Can you camera-inspect a Moorpark sewer before escrow closes?",
        a: "Yes. Pre-sale inspections with video are available and often requested by buyers.",
      },
    ],
  },
  {
    slug: "newbury-park",
    name: "Newbury Park",
    region: "ventura",
    coords: [34.185, -118.913],
    permittingAuthority:
      "Most of Newbury Park is within the City of Thousand Oaks (annexed after Thousand Oaks incorporated in 1964). Plumbing permits for those addresses go through the City of Thousand Oaks — not a separate Newbury Park city hall. A few pockets such as Casa Conejo remain unincorporated Ventura County.",
    housingNote:
      "Newbury Park’s housing is largely mid-to-late 20th-century Conejo Valley development. Water heater replacements and aging drain laterals are common as original equipment ages out.",
    terrainNote:
      "Western Conejo Valley terrain with planned neighborhoods and some hillside edges toward open space and the Conejo Grade.",
    treeNote:
      "Mature landscaping in established tracts contributes to occasional root-related drain issues.",
    serviceOrder: [
      "water-heater",
      "drain-cleaning",
      "camera-inspection",
      "pipe-lining",
      "sewer-repair",
      "hydro-jetting",
      "trenchless-replacement",
    ],
    intro:
      "Plumbing service for Newbury Park — water heater replacement, drain cleaning, and sewer repair. Most addresses fall under City of Thousand Oaks permitting; we confirm jurisdiction before pulling permits.",
    faqs: [
      {
        q: "Is Newbury Park its own city?",
        a: "No. Most of Newbury Park is part of the City of Thousand Oaks. A small unincorporated pocket (including Casa Conejo) remains under Ventura County. We verify your address’s jurisdiction before permitting.",
      },
      {
        q: "Who issues my plumbing permit?",
        a: "Usually the City of Thousand Oaks Community Development Department. Unincorporated addresses may require Ventura County permits instead.",
      },
      {
        q: "Do you serve the 91320 ZIP?",
        a: "Yes. Newbury Park / 91320 is within our Ventura County service area.",
      },
      {
        q: "Can you same-day replace a water heater in Newbury Park?",
        a: "Often for standard tank swaps. We’ll confirm venting, access, and any permit needs up front.",
      },
    ],
  },
  {
    slug: "westlake-village",
    name: "Westlake Village",
    region: "ventura",
    coords: [34.1464, -118.807],
    permittingAuthority:
      "Westlake Village is an independently incorporated city that straddles the Los Angeles–Ventura county line. Addresses on the Ventura County side are permitted through the City of Westlake Village; we confirm the correct jurisdiction for your parcel.",
    housingNote:
      "Westlake Village’s planned community housing from the late 1960s onward often needs water heater upgrades and careful sewer maintenance to protect landscaped lots and shared community aesthetics.",
    terrainNote:
      "Master-planned grades around the lake and hillsides — trenchless methods are popular where open trenches would damage landscaping or driveways.",
    treeNote:
      "Mature community landscaping and private yards increase root-intrusion risk as laterals age.",
    serviceOrder: [
      "trenchless-replacement",
      "pipe-lining",
      "camera-inspection",
      "water-heater",
      "drain-cleaning",
      "sewer-repair",
      "hydro-jetting",
    ],
    intro:
      "Discreet plumbing for Westlake Village — trenchless sewer solutions, camera inspections, water heater replacement, and drain cleaning with careful attention to landscaped lots and city permitting.",
    faqs: [
      {
        q: "Is Westlake Village in LA County or Ventura County?",
        a: "Both — the city spans the county line. We confirm your parcel’s county and city permitting requirements before work begins.",
      },
      {
        q: "Why emphasize trenchless repairs here?",
        a: "Landscaped lots, shared aesthetics, and driveway access make low-disruption lining and bursting especially valuable compared with open-trench excavation.",
      },
      {
        q: "Do HOAs need to approve plumbing work?",
        a: "Sometimes for exterior or shared improvements. We can provide camera video and written scopes that boards often request.",
      },
      {
        q: "Do you offer emergency service in Westlake Village?",
        a: "Yes — 24/7 emergency response with the same flat-rate pricing as daytime calls.",
      },
    ],
  },
];

export function getAllCityHubs(): CityHub[] {
  return CITY_HUBS;
}

export function getCityHubs(region: ServiceRegion): CityHub[] {
  return CITY_HUBS.filter((hub) => hub.region === region);
}

export function getCityHub(region: ServiceRegion, slug: string): CityHub | undefined {
  return CITY_HUBS.find((hub) => hub.region === region && hub.slug === slug);
}

/** Maps a retired hub slug (or city name) to the nearest remaining hub slug, if any. */
export function resolveRetiredCityHubSlug(query: string): string | null {
  const normalized = query.trim().toLowerCase().replace(/-/g, " ");
  if (!normalized) return null;
  const dashed = normalized.replace(/\s+/g, "-");
  return (
    RETIRED_CITY_HUB_ALIASES[normalized] ??
    RETIRED_CITY_HUB_ALIASES[dashed] ??
    null
  );
}

export function findCityHubByName(query: string): CityHub | null {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;
  const exact = CITY_HUBS.find((hub) => hub.name.toLowerCase() === normalized);
  if (exact) return exact;
  const partial = CITY_HUBS.filter((hub) => hub.name.toLowerCase().includes(normalized));
  if (partial.length === 1) return partial[0];

  const aliasSlug = resolveRetiredCityHubSlug(normalized);
  if (aliasSlug) {
    return CITY_HUBS.find((hub) => hub.slug === aliasSlug) ?? null;
  }

  const surroundingMatch = CITY_HUBS.find((hub) =>
    surroundingCitiesFor(hub).some((city) => city.toLowerCase() === normalized)
  );
  if (surroundingMatch) return surroundingMatch;

  const surroundingPartial = CITY_HUBS.filter((hub) =>
    surroundingCitiesFor(hub).some((city) => city.toLowerCase().includes(normalized))
  );
  if (surroundingPartial.length === 1) return surroundingPartial[0];

  return null;
}

/** Nearby communities that route to / are covered by this hub page. */
export function surroundingCitiesFor(hub: Pick<CityHub, "slug">): string[] {
  return SURROUNDING_CITIES_BY_HUB[hub.slug] ?? [];
}

/** Short label for titles: "Encino, Lake Balboa" or "Encino & Nearby Areas". */
export function hubTitleArea(hub: CityHub): string {
  const nearby = surroundingCitiesFor(hub);
  if (nearby.length === 0) return hub.name;
  if (nearby.length <= 2) return `${hub.name}, ${formatCityList(nearby)}`;
  return `${hub.name} & Nearby Areas`;
}

/** Full service-area phrase naming the hub and every surrounding community. */
export function hubServiceAreaPhrase(hub: CityHub): string {
  const nearby = surroundingCitiesFor(hub);
  if (nearby.length === 0) return hub.name;
  return `${hub.name} and surrounding communities including ${formatCityList(nearby)}`;
}

/** Hero / JSON-LD body: hub intro plus explicit surrounding-city coverage. */
export function hubPageIntro(hub: CityHub): string {
  const nearby = surroundingCitiesFor(hub);
  if (nearby.length === 0) {
    return `${hub.intro} This page is for homeowners in ${hub.name}.`;
  }
  return `${hub.intro} This page covers ${hub.name} and surrounding communities including ${formatCityList(nearby)}.`;
}

/** Meta description with city names for SEO. */
export function hubMetaDescription(hub: CityHub, suffix?: string): string {
  const nearby = surroundingCitiesFor(hub);
  const named =
    nearby.length > 0 ? `${hub.name}, ${formatCityList(nearby)}` : hub.name;
  const base = `${hub.intro} Serving ${named}.`;
  return suffix ? `${base} ${suffix}` : base;
}

export function toServiceLocation(hub: CityHub): ServiceLocation {
  return {
    id: hub.slug,
    name: hub.name,
    coords: hub.coords,
    region: hub.region,
  };
}

export function cityHubPath(hub: CityHub): string {
  return hub.region === "losangeles" ? `/losangeles/${hub.slug}` : `/ventura/${hub.slug}`;
}

export function cityServicePath(hub: CityHub, serviceSlug: string): string {
  return `${cityHubPath(hub)}/${serviceSlug}`;
}

export function orderedServicesForHub(hub: CityHub): string[] {
  const order = hub.serviceOrder.length > 0 ? hub.serviceOrder : DEFAULT_SERVICE_ORDER;
  const seen = new Set<string>();
  const result: string[] = [];
  for (const slug of order) {
    if (!seen.has(slug)) {
      seen.add(slug);
      result.push(slug);
    }
  }
  for (const slug of DEFAULT_SERVICE_ORDER) {
    if (!seen.has(slug)) result.push(slug);
  }
  return result;
}
