const laZips = new Set([
  // San Fernando Valley
  "91301", "91302", "91303", "91304", "91306", "91307", "91311", "91316",
  "91324", "91325", "91326", "91330", "91331", "91335",
  "91340", "91341", "91342", "91343", "91344", "91345", "91346",
  "91350", "91351", "91352", "91356", "91364", "91367",
  "91401", "91402", "91403", "91405", "91406", "91411", "91423", "91436",
  // Burbank / Glendale
  "91201", "91202", "91203", "91204", "91205", "91206", "91207", "91208", "91214",
  "91501", "91502", "91503", "91504", "91505", "91506", "91510",
  // North Hollywood / Studio City / Valley Village / Toluca Lake
  "91601", "91602", "91604", "91605", "91606", "91607", "91608",
  // Pasadena / Altadena / La Cañada / South Pasadena
  "91001", "91011", "91101", "91103", "91104", "91105", "91106", "91107", "91108",
  // Eagle Rock / Highland Park / Glassell Park / Atwater / Cypress Park
  "90031", "90039", "90041", "90042", "90065",
  // Westside
  "90024", "90025", "90034", "90049", "90064", "90066", "90230", "90232",
  "90272", "90291", "90292", "90401", "90402", "90403", "90404", "90405",
  // Malibu / Topanga
  "90265", "90290",
  // Beverly Hills / West Hollywood
  "90210", "90211", "90212", "90046", "90048", "90069",
  // Central LA
  "90004", "90005", "90006", "90007", "90010", "90012", "90013", "90014",
  "90015", "90016", "90017", "90018", "90019", "90020", "90021",
  "90026", "90027", "90028", "90029", "90032", "90033",
  "90035", "90036", "90037", "90038", "90057", "90068",
  // Koreatown / Mid-City / Fairfax / Hancock Park
  "90004", "90019", "90036",
]);

const venturaZips = new Set([
  // Ventura
  "93001", "93003", "93004",
  // Camarillo
  "93010", "93012",
  // Fillmore
  "93015", "93016",
  // Moorpark
  "93020", "93021",
  // Oak View / Lake Sherwood
  "93022",
  // Ojai
  "93023", "93024",
  // Oxnard
  "93030", "93033", "93035", "93036",
  // Port Hueneme
  "93041", "93043", "93044",
  // Santa Paula
  "93060", "93061",
  // Simi Valley
  "93063", "93065",
  // Thousand Oaks / Newbury Park
  "91320", "91360", "91361",
  // Westlake Village (Ventura County side)
  "91362",
  // Somis / El Rio
  "93066",
]);

export function getRegionByZip(zip: string): "losangeles" | "ventura" | null {
  if (laZips.has(zip)) return "losangeles";
  if (venturaZips.has(zip)) return "ventura";
  return null;
}
