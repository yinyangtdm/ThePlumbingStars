import type { Faq } from "./faqs";
import type { ServiceLocation, ServiceRegion } from "./serviceLocations";

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

export const CITY_HUBS: CityHub[] = [
  // ── Los Angeles County (15) ──────────────────────────────────────────────
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
    slug: "sherman-oaks",
    name: "Sherman Oaks",
    region: "losangeles",
    coords: [34.1514, -118.4426],
    permittingAuthority:
      "Sherman Oaks is a City of Los Angeles neighborhood — permits are issued by LADBS.",
    housingNote:
      "Sherman Oaks mixes mid-century Valley homes south of the hills with denser multifamily near Ventura Boulevard. Many 1940s–60s residences still have original cast-iron drains and aging water heaters.",
    terrainNote:
      "The south slope of the Santa Monica Mountains creates hillside laterals with steeper grades; the flatter areas toward Van Nuys Boulevard see more typical Valley-floor sewer layouts.",
    treeNote:
      "Older tree-lined streets (especially toward the hills) mean root intrusion is a recurring cause of slow drains and main-line backups.",
    serviceOrder: [
      "drain-cleaning",
      "camera-inspection",
      "hydro-jetting",
      "sewer-repair",
      "trenchless-replacement",
      "water-heater",
      "pipe-lining",
    ],
    intro:
      "Expert plumbing for Sherman Oaks homeowners — from Ventura Boulevard condos to hillside houses. Drain cleaning, camera inspections, hydro jetting, and sewer repair with transparent flat-rate pricing.",
    faqs: [
      {
        q: "Is Sherman Oaks covered by LA City plumbing codes?",
        a: "Yes. Sherman Oaks follows City of Los Angeles plumbing codes and LADBS permitting. We pull permits when your repair or replacement requires them.",
      },
      {
        q: "What causes recurring kitchen clogs in Sherman Oaks?",
        a: "Grease buildup in older cast-iron kitchen lines is common, especially in mid-century homes. Hydro jetting clears grease and scale more thoroughly than a basic snake.",
      },
      {
        q: "Do you service Sherman Oaks apartments and condos?",
        a: "Yes. We work with homeowners, HOAs, and property managers on unit-level and building drain issues — and we’ll tell you clearly when a shared main line is the real culprit.",
      },
      {
        q: "Should I camera-inspect before selling my Sherman Oaks home?",
        a: "A pre-sale camera inspection is one of the smartest due-diligence steps for Valley homes with older laterals. Buyers and escrow often ask for video proof of sewer condition.",
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
    slug: "tarzana",
    name: "Tarzana",
    region: "losangeles",
    coords: [34.1483, -118.556],
    permittingAuthority:
      "Tarzana is a Los Angeles city neighborhood — plumbing permits go through LADBS.",
    housingNote:
      "Tarzana’s housing ranges from postwar ranch homes to larger estates. Mid-century galvanized water lines and cast-iron drains remain a frequent source of low pressure and recurring clogs.",
    terrainNote:
      "Most of Tarzana sits on the Valley floor with relatively gentle grades, though properties closer to the southern hills can have steeper laterals.",
    treeNote:
      "Large private yards and mature trees mean root intrusion into older sewer laterals is a common call-out.",
    serviceOrder: [
      "drain-cleaning",
      "hydro-jetting",
      "sewer-repair",
      "camera-inspection",
      "water-heater",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Trusted plumbers for Tarzana homes — drain cleaning, hydro jetting, sewer repair, and water heater replacement with flat rates and written guarantees.",
    faqs: [
      {
        q: "Why is water pressure low in my Tarzana home?",
        a: "Aging galvanized supply lines often scale up from the inside, reducing flow. We can diagnose whether the issue is the main, branch lines, or the water heater.",
      },
      {
        q: "Can hydro jetting damage older Tarzana pipes?",
        a: "We camera-inspect first. Jetting is safe on sound laterals and is often the best way to clear roots and grease — we’ll recommend repair instead if the pipe is already collapsed.",
      },
      {
        q: "Do you install tankless water heaters in Tarzana?",
        a: "Yes. We size, permit (when required), install, and haul away the old tank — often same day for straightforward replacements.",
      },
      {
        q: "Are Tarzana plumbing jobs under LA City rules?",
        a: "Yes. Tarzana follows City of Los Angeles codes and LADBS permitting.",
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
    slug: "reseda",
    name: "Reseda",
    region: "losangeles",
    coords: [34.2014, -118.5362],
    permittingAuthority:
      "Reseda is within the City of Los Angeles — plumbing permits are handled by LADBS.",
    housingNote:
      "Reseda’s postwar tract homes and remodeled mid-century houses often still rely on original drain laterals. Many homeowners also face aging tank water heaters from 15+ years of service.",
    terrainNote:
      "Flat Valley floor with standard gravity sewer connections — straightforward layouts, but decades of deferred maintenance show up as recurring clogs.",
    treeNote:
      "Parkway trees and mature backyard landscaping drive root intrusion into clay and cast-iron laterals.",
    serviceOrder: [
      "drain-cleaning",
      "hydro-jetting",
      "water-heater",
      "camera-inspection",
      "sewer-repair",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Local plumbers for Reseda — drain cleaning, hydro jetting, water heater replacement, and sewer repair with same-day emergency options.",
    faqs: [
      {
        q: "Why does my Reseda kitchen sink keep clogging?",
        a: "Grease and food waste in older cast-iron kitchen lines is the usual culprit. Hydro jetting clears the line more thoroughly than repeated snaking.",
      },
      {
        q: "Can you replace a water heater the same day in Reseda?",
        a: "Often yes for standard tank swaps when the location and venting allow. Tankless conversions may need additional permitting and gas/electric prep.",
      },
      {
        q: "Do Reseda homes need LA City permits for plumbing?",
        a: "Yes when the work scope requires them — Reseda is City of LA territory under LADBS.",
      },
      {
        q: "Is trenchless repair available on Reseda lots?",
        a: "Yes. Many laterals can be renewed with pipe bursting or lining while protecting yards and driveways.",
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
    slug: "canoga-park",
    name: "Canoga Park",
    region: "losangeles",
    coords: [34.2011, -118.6057],
    permittingAuthority:
      "Canoga Park is a City of Los Angeles neighborhood — permits go through LADBS.",
    housingNote:
      "Canoga Park’s housing stock includes postwar homes and denser multifamily near commercial corridors. Aging drain laterals and tank water heaters are frequent service calls.",
    terrainNote:
      "Western Valley floor — mostly level lots with conventional gravity laterals.",
    treeNote:
      "Street trees and mature yards contribute to root-related sewer issues on older laterals.",
    serviceOrder: [
      "drain-cleaning",
      "water-heater",
      "sewer-repair",
      "camera-inspection",
      "hydro-jetting",
      "pipe-lining",
      "trenchless-replacement",
    ],
    intro:
      "Reliable plumbing for Canoga Park — drain cleaning, water heater replacement, sewer repair, and camera diagnostics with flat-rate pricing.",
    faqs: [
      {
        q: "Do you replace water heaters in Canoga Park apartments?",
        a: "Yes, when authorized by the owner or manager. We’ll confirm access, venting, and shutoffs before quoting a flat rate.",
      },
      {
        q: "What’s the most common Canoga Park drain call?",
        a: "Kitchen and bathroom clogs in older homes, plus main-line backups caused by roots or grease. Camera inspection confirms the cause.",
      },
      {
        q: "Is Canoga Park under LA City building rules?",
        a: "Yes. LADBS handles permitting for this neighborhood.",
      },
      {
        q: "Can trenchless methods save my driveway?",
        a: "Often. We recommend trenchless when the camera shows a repairable lateral and surface restoration would be costly.",
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
  {
    slug: "port-hueneme",
    name: "Port Hueneme",
    region: "ventura",
    coords: [34.1478, -119.1951],
    permittingAuthority:
      "Port Hueneme is an independently incorporated city — plumbing permits go through the City of Port Hueneme Community Development / Building Division.",
    housingNote:
      "Coastal Port Hueneme housing includes mid-century homes and multifamily near the harbor. Coastal moisture and aging tank water heaters are frequent service drivers.",
    terrainNote:
      "Flat coastal plain with conventional gravity laterals and relatively short runs compared with hillside communities.",
    treeNote:
      "Older residential blocks with mature trees can see root intrusion; overall less hillside complexity than inland cities.",
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
      "Plumbing Stars serving Port Hueneme — drain cleaning, water heater replacement, camera inspections, and sewer repair for coastal Ventura County homes.",
    faqs: [
      {
        q: "Who permits plumbing in Port Hueneme?",
        a: "The City of Port Hueneme Building Division for work inside city limits.",
      },
      {
        q: "Does coastal living affect plumbing equipment?",
        a: "Exterior corrosion on water heaters and exposed metal can progress faster near the ocean. We inspect condition and recommend replacement when corrosion or age make failure likely.",
      },
      {
        q: "Can you clear a sewer backup same day?",
        a: "Yes in most emergency cases. We’ll clear the line and advise if camera inspection or repair is the next step.",
      },
      {
        q: "Do you serve nearby Oxnard addresses too?",
        a: "Yes. Oxnard and Port Hueneme are both in our Ventura County service area — each has its own city permitting rules.",
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

export function findCityHubByName(query: string): CityHub | null {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;
  const exact = CITY_HUBS.find((hub) => hub.name.toLowerCase() === normalized);
  if (exact) return exact;
  const partial = CITY_HUBS.filter((hub) => hub.name.toLowerCase().includes(normalized));
  return partial.length === 1 ? partial[0] : null;
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
