// buildings.ts
// Configurazione edifici organizzati in CATEGORIE sbloccate per prestige,
// disposte a PIRAMIDE: 4 categorie alla base (le più semplici e meno
// remunerative), poi 3, poi 2, e infine 1 sola all'apice (la migliore,
// il vertice assoluto). Ogni categoria contiene 9 edifici, e il primo
// edificio della categoria successiva è sempre leggermente superiore
// all'ultimo della precedente: la progressione è continua su tutta la scala.

import type { BuildingType, BuildingCategory } from './types'

export const BUILDINGS: Record<string, BuildingType> = {
  shack: {
    name: "Baracca",
    baseCost: 100,
    baseIncome: 10,
    costMultiplier: 1.15,
    incomeMultiplier: 1.2,
    icon: '🏠',
    category: 'residential'
  },
  house_small: {
    name: "Casetta",
    baseCost: 146,
    baseIncome: 14,
    costMultiplier: 1.153,
    incomeMultiplier: 1.205,
    icon: '🏠',
    category: 'residential'
  },
  duplex: {
    name: "Bilocale",
    baseCost: 214,
    baseIncome: 19,
    costMultiplier: 1.155,
    incomeMultiplier: 1.209,
    icon: '🏠',
    category: 'residential'
  },
  house_medium: {
    name: "Villetta",
    baseCost: 313,
    baseIncome: 27,
    costMultiplier: 1.158,
    incomeMultiplier: 1.214,
    icon: '🏠',
    category: 'residential'
  },
  house_large: {
    name: "Villa Suburbana",
    baseCost: 458,
    baseIncome: 39,
    costMultiplier: 1.16,
    incomeMultiplier: 1.219,
    icon: '🏠',
    category: 'residential'
  },
  house_garden: {
    name: "Villa con Giardino",
    baseCost: 670,
    baseIncome: 55,
    costMultiplier: 1.163,
    incomeMultiplier: 1.224,
    icon: '🏠',
    category: 'residential'
  },
  house_view: {
    name: "Villa Panoramica",
    baseCost: 979,
    baseIncome: 78,
    costMultiplier: 1.166,
    incomeMultiplier: 1.228,
    icon: '🏠',
    category: 'residential'
  },
  luxury_residence: {
    name: "Residenza di Prestigio",
    baseCost: 1430,
    baseIncome: 110,
    costMultiplier: 1.168,
    incomeMultiplier: 1.233,
    icon: '🏠',
    category: 'residential'
  },
  private_estate: {
    name: "Tenuta Privata",
    baseCost: 2100,
    baseIncome: 156,
    costMultiplier: 1.171,
    incomeMultiplier: 1.238,
    icon: '🏠',
    category: 'residential'
  },
  stall: {
    name: "Bancarella",
    baseCost: 3060,
    baseIncome: 221,
    costMultiplier: 1.173,
    incomeMultiplier: 1.242,
    icon: '🏪',
    category: 'commercial'
  },
  kiosk: {
    name: "Chiosco",
    baseCost: 4480,
    baseIncome: 314,
    costMultiplier: 1.176,
    incomeMultiplier: 1.247,
    icon: '🏪',
    category: 'commercial'
  },
  minimarket: {
    name: "Minimarket",
    baseCost: 6560,
    baseIncome: 446,
    costMultiplier: 1.178,
    incomeMultiplier: 1.252,
    icon: '🏪',
    category: 'commercial'
  },
  local_shop: {
    name: "Negozio di Quartiere",
    baseCost: 9590,
    baseIncome: 634,
    costMultiplier: 1.181,
    incomeMultiplier: 1.257,
    icon: '🏪',
    category: 'commercial'
  },
  boutique: {
    name: "Boutique",
    baseCost: 14000,
    baseIncome: 902,
    costMultiplier: 1.184,
    incomeMultiplier: 1.261,
    icon: '🏪',
    category: 'commercial'
  },
  concept_store: {
    name: "Concept Store",
    baseCost: 20500,
    baseIncome: 1280,
    costMultiplier: 1.186,
    incomeMultiplier: 1.266,
    icon: '🏪',
    category: 'commercial'
  },
  showroom: {
    name: "Showroom",
    baseCost: 30000,
    baseIncome: 1830,
    costMultiplier: 1.189,
    incomeMultiplier: 1.271,
    icon: '🏪',
    category: 'commercial'
  },
  flagship_store: {
    name: "Flagship Store",
    baseCost: 43900,
    baseIncome: 2610,
    costMultiplier: 1.191,
    incomeMultiplier: 1.276,
    icon: '🏪',
    category: 'commercial'
  },
  commercial_gallery: {
    name: "Galleria Commerciale",
    baseCost: 64200,
    baseIncome: 3720,
    costMultiplier: 1.194,
    incomeMultiplier: 1.28,
    icon: '🏪',
    category: 'commercial'
  },
  home_garden: {
    name: "Orto Domestico",
    baseCost: 93900,
    baseIncome: 5310,
    costMultiplier: 1.197,
    incomeMultiplier: 1.285,
    icon: '🌾',
    category: 'agricultural'
  },
  urban_garden: {
    name: "Orto Urbano",
    baseCost: 137000,
    baseIncome: 7590,
    costMultiplier: 1.199,
    incomeMultiplier: 1.29,
    icon: '🌾',
    category: 'agricultural'
  },
  smallholding: {
    name: "Podere",
    baseCost: 201000,
    baseIncome: 10800,
    costMultiplier: 1.202,
    incomeMultiplier: 1.294,
    icon: '🌾',
    category: 'agricultural'
  },
  farm: {
    name: "Fattoria",
    baseCost: 294000,
    baseIncome: 15500,
    costMultiplier: 1.204,
    incomeMultiplier: 1.299,
    icon: '🌾',
    category: 'agricultural'
  },
  modern_farmhouse: {
    name: "Cascina Moderna",
    baseCost: 430000,
    baseIncome: 22200,
    costMultiplier: 1.207,
    incomeMultiplier: 1.304,
    icon: '🌾',
    category: 'agricultural'
  },
  agri_estate: {
    name: "Tenuta Agricola",
    baseCost: 629000,
    baseIncome: 31700,
    costMultiplier: 1.209,
    incomeMultiplier: 1.309,
    icon: '🌾',
    category: 'agricultural'
  },
  agri_company: {
    name: "Azienda Agricola",
    baseCost: 920000,
    baseIncome: 45400,
    costMultiplier: 1.212,
    incomeMultiplier: 1.313,
    icon: '🌾',
    category: 'agricultural'
  },
  rural_coop: {
    name: "Cooperativa Rurale",
    baseCost: 1350000,
    baseIncome: 65100,
    costMultiplier: 1.215,
    incomeMultiplier: 1.318,
    icon: '🌾',
    category: 'agricultural'
  },
  agrifood_district: {
    name: "Distretto Agroalimentare",
    baseCost: 1970000,
    baseIncome: 93300,
    costMultiplier: 1.217,
    incomeMultiplier: 1.323,
    icon: '🌾',
    category: 'agricultural'
  },
  craft_workshop: {
    name: "Laboratorio Artigiano",
    baseCost: 2880000,
    baseIncome: 134000,
    costMultiplier: 1.22,
    incomeMultiplier: 1.327,
    icon: '🏭',
    category: 'industrial'
  },
  workshop: {
    name: "Officina",
    baseCost: 4210000,
    baseIncome: 192000,
    costMultiplier: 1.222,
    incomeMultiplier: 1.332,
    icon: '🏭',
    category: 'industrial'
  },
  small_manufacture: {
    name: "Piccola Manifattura",
    baseCost: 6160000,
    baseIncome: 275000,
    costMultiplier: 1.225,
    incomeMultiplier: 1.337,
    icon: '🏭',
    category: 'industrial'
  },
  factory: {
    name: "Fabbrica",
    baseCost: 9010000,
    baseIncome: 395000,
    costMultiplier: 1.228,
    incomeMultiplier: 1.342,
    icon: '🏭',
    category: 'industrial'
  },
  production_plant: {
    name: "Impianto Produttivo",
    baseCost: 13199999,
    baseIncome: 567000,
    costMultiplier: 1.23,
    incomeMultiplier: 1.346,
    icon: '🏭',
    category: 'industrial'
  },
  plant: {
    name: "Stabilimento Produttivo",
    baseCost: 19300000,
    baseIncome: 815000,
    costMultiplier: 1.233,
    incomeMultiplier: 1.351,
    icon: '🏭',
    category: 'industrial'
  },
  industrial_complex: {
    name: "Complesso Industriale",
    baseCost: 28199999,
    baseIncome: 1170000,
    costMultiplier: 1.235,
    incomeMultiplier: 1.356,
    icon: '🏭',
    category: 'industrial'
  },
  manufacturing_hub: {
    name: "Polo Manifatturiero",
    baseCost: 41200000,
    baseIncome: 1680000,
    costMultiplier: 1.238,
    incomeMultiplier: 1.36,
    icon: '🏭',
    category: 'industrial'
  },
  industrial_district: {
    name: "Distretto Industriale",
    baseCost: 60299999,
    baseIncome: 2420000,
    costMultiplier: 1.24,
    incomeMultiplier: 1.365,
    icon: '🏭',
    category: 'industrial'
  },
  money_changer: {
    name: "Cambiavalute",
    baseCost: 88200000,
    baseIncome: 3480000,
    costMultiplier: 1.243,
    incomeMultiplier: 1.37,
    icon: '🏦',
    category: 'financial'
  },
  bank_branch: {
    name: "Sportello Bancario",
    baseCost: 129000000,
    baseIncome: 5000000,
    costMultiplier: 1.246,
    incomeMultiplier: 1.375,
    icon: '🏦',
    category: 'financial'
  },
  local_branch: {
    name: "Filiale Locale",
    baseCost: 189000000,
    baseIncome: 7200000,
    costMultiplier: 1.248,
    incomeMultiplier: 1.379,
    icon: '🏦',
    category: 'financial'
  },
  regional_bank: {
    name: "Banca Regionale",
    baseCost: 276000000,
    baseIncome: 10400000,
    costMultiplier: 1.251,
    incomeMultiplier: 1.384,
    icon: '🏦',
    category: 'financial'
  },
  national_bank: {
    name: "Banca Nazionale",
    baseCost: 404000000,
    baseIncome: 14899999,
    costMultiplier: 1.253,
    incomeMultiplier: 1.389,
    icon: '🏦',
    category: 'financial'
  },
  investment_fund: {
    name: "Fondo d'Investimento",
    baseCost: 591000000,
    baseIncome: 21500000,
    costMultiplier: 1.256,
    incomeMultiplier: 1.393,
    icon: '🏦',
    category: 'financial'
  },
  finance_company: {
    name: "Società Finanziaria",
    baseCost: 864000000,
    baseIncome: 30899999,
    costMultiplier: 1.259,
    incomeMultiplier: 1.398,
    icon: '🏦',
    category: 'financial'
  },
  banking_group: {
    name: "Gruppo Bancario",
    baseCost: 1260000000,
    baseIncome: 44600000,
    costMultiplier: 1.261,
    incomeMultiplier: 1.403,
    icon: '🏦',
    category: 'financial'
  },
  financial_holding: {
    name: "Holding Finanziaria",
    baseCost: 1850000000,
    baseIncome: 64199999,
    costMultiplier: 1.264,
    incomeMultiplier: 1.408,
    icon: '🏦',
    category: 'financial'
  },
  inn: {
    name: "Locanda",
    baseCost: 2700000000,
    baseIncome: 92599999,
    costMultiplier: 1.266,
    incomeMultiplier: 1.412,
    icon: '🏨',
    category: 'tourism'
  },
  boutique_hotel: {
    name: "Boutique Hotel",
    baseCost: 3960000000,
    baseIncome: 133000000,
    costMultiplier: 1.269,
    incomeMultiplier: 1.417,
    icon: '🏨',
    category: 'tourism'
  },
  city_hotel: {
    name: "Hotel di Città",
    baseCost: 5790000000,
    baseIncome: 192000000,
    costMultiplier: 1.271,
    incomeMultiplier: 1.422,
    icon: '🏨',
    category: 'tourism'
  },
  resort: {
    name: "Resort",
    baseCost: 8460000000,
    baseIncome: 278000000,
    costMultiplier: 1.274,
    incomeMultiplier: 1.427,
    icon: '🏨',
    category: 'tourism'
  },
  luxury_resort: {
    name: "Resort di Lusso",
    baseCost: 12400000000,
    baseIncome: 400000000,
    costMultiplier: 1.277,
    incomeMultiplier: 1.431,
    icon: '🏨',
    category: 'tourism'
  },
  grand_hotel: {
    name: "Grand Hotel",
    baseCost: 18100000000,
    baseIncome: 578000000,
    costMultiplier: 1.279,
    incomeMultiplier: 1.436,
    icon: '🏨',
    category: 'tourism'
  },
  tourist_village: {
    name: "Villaggio Turistico",
    baseCost: 26500000000,
    baseIncome: 834000000,
    costMultiplier: 1.282,
    incomeMultiplier: 1.441,
    icon: '🏨',
    category: 'tourism'
  },
  hotel_chain: {
    name: "Catena Alberghiera",
    baseCost: 38700000000,
    baseIncome: 1200000000,
    costMultiplier: 1.284,
    incomeMultiplier: 1.445,
    icon: '🏨',
    category: 'tourism'
  },
  hospitality_empire: {
    name: "Impero dell'Ospitalità",
    baseCost: 56700000000,
    baseIncome: 1740000000,
    costMultiplier: 1.287,
    incomeMultiplier: 1.45,
    icon: '🏨',
    category: 'tourism'
  },
  office_building: {
    name: "Palazzina Uffici",
    baseCost: 82900000000,
    baseIncome: 2510000000,
    costMultiplier: 1.29,
    incomeMultiplier: 1.455,
    icon: '🌆',
    category: 'metro'
  },
  office_tower: {
    name: "Torre Uffici",
    baseCost: 121000000000,
    baseIncome: 3620000000,
    costMultiplier: 1.292,
    incomeMultiplier: 1.46,
    icon: '🌆',
    category: 'metro'
  },
  business_complex: {
    name: "Complesso Direzionale",
    baseCost: 177000000000,
    baseIncome: 5230000000,
    costMultiplier: 1.295,
    incomeMultiplier: 1.464,
    icon: '🌆',
    category: 'metro'
  },
  skyscraper: {
    name: "Grattacielo",
    baseCost: 258999999999,
    baseIncome: 7550000000,
    costMultiplier: 1.297,
    incomeMultiplier: 1.469,
    icon: '🌆',
    category: 'metro'
  },
  panoramic_skyscraper: {
    name: "Grattacielo Panoramico",
    baseCost: 379000000000,
    baseIncome: 10900000000,
    costMultiplier: 1.3,
    incomeMultiplier: 1.474,
    icon: '🌆',
    category: 'metro'
  },
  business_district: {
    name: "Distretto Direzionale",
    baseCost: 555000000000,
    baseIncome: 15800000000,
    costMultiplier: 1.302,
    incomeMultiplier: 1.478,
    icon: '🌆',
    category: 'metro'
  },
  twin_tower: {
    name: "Torre Gemella",
    baseCost: 812000000000,
    baseIncome: 22800000000,
    costMultiplier: 1.305,
    incomeMultiplier: 1.483,
    icon: '🌆',
    category: 'metro'
  },
  corporate_center: {
    name: "Centro Direzionale",
    baseCost: 1190000000000,
    baseIncome: 32900000000,
    costMultiplier: 1.308,
    incomeMultiplier: 1.488,
    icon: '🌆',
    category: 'metro'
  },
  corporate_skyline: {
    name: "Skyline Corporativo",
    baseCost: 1740000000000,
    baseIncome: 47600000000,
    costMultiplier: 1.31,
    incomeMultiplier: 1.493,
    icon: '🌆',
    category: 'metro'
  },
  private_dock: {
    name: "Molo Privato",
    baseCost: 2540000000000,
    baseIncome: 68800000000,
    costMultiplier: 1.313,
    incomeMultiplier: 1.497,
    icon: '🚢',
    category: 'port'
  },
  cargo_terminal: {
    name: "Terminal Merci",
    baseCost: 3720000000000,
    baseIncome: 99500000000,
    costMultiplier: 1.315,
    incomeMultiplier: 1.502,
    icon: '🚢',
    category: 'port'
  },
  port_dock: {
    name: "Scalo Portuale",
    baseCost: 5440000000000,
    baseIncome: 144000000000,
    costMultiplier: 1.318,
    incomeMultiplier: 1.507,
    icon: '🚢',
    category: 'port'
  },
  commercial_port: {
    name: "Porto Commerciale",
    baseCost: 7950000000000,
    baseIncome: 208000000000,
    costMultiplier: 1.321,
    incomeMultiplier: 1.511,
    icon: '🚢',
    category: 'port'
  },
  industrial_port: {
    name: "Porto Industriale",
    baseCost: 11600000000000,
    baseIncome: 301000000000,
    costMultiplier: 1.323,
    incomeMultiplier: 1.516,
    icon: '🚢',
    category: 'port'
  },
  logistics_hub: {
    name: "Hub Logistico",
    baseCost: 17000000000000,
    baseIncome: 436000000000,
    costMultiplier: 1.326,
    incomeMultiplier: 1.521,
    icon: '🚢',
    category: 'port'
  },
  global_logistics_hub: {
    name: "Hub Logistico Globale",
    baseCost: 24900000000000,
    baseIncome: 630000000000,
    costMultiplier: 1.328,
    incomeMultiplier: 1.526,
    icon: '🚢',
    category: 'port'
  },
  international_port_network: {
    name: "Rete Portuale Internazionale",
    baseCost: 36400000000000,
    baseIncome: 912000000000,
    costMultiplier: 1.331,
    incomeMultiplier: 1.53,
    icon: '🚢',
    category: 'port'
  },
  maritime_empire: {
    name: "Impero Marittimo",
    baseCost: 53200000000000,
    baseIncome: 1320000000000,
    costMultiplier: 1.333,
    incomeMultiplier: 1.535,
    icon: '🚢',
    category: 'port'
  },
  startup: {
    name: "Start-up",
    baseCost: 77900000000000,
    baseIncome: 1910000000000,
    costMultiplier: 1.336,
    incomeMultiplier: 1.54,
    icon: '🏛️',
    category: 'empire'
  },
  emerging_company: {
    name: "Azienda Emergente",
    baseCost: 114000000000000,
    baseIncome: 2770000000000,
    costMultiplier: 1.339,
    incomeMultiplier: 1.544,
    icon: '🏛️',
    category: 'empire'
  },
  corporation: {
    name: "Società per Azioni",
    baseCost: 167000000000000,
    baseIncome: 4000000000000,
    costMultiplier: 1.341,
    incomeMultiplier: 1.549,
    icon: '🏛️',
    category: 'empire'
  },
  multinational: {
    name: "Multinazionale",
    baseCost: 244000000000000,
    baseIncome: 5800000000000,
    costMultiplier: 1.344,
    incomeMultiplier: 1.554,
    icon: '🏛️',
    category: 'empire'
  },
  diversified_multinational: {
    name: "Multinazionale Diversificata",
    baseCost: 356000000000000,
    baseIncome: 8400000000000,
    costMultiplier: 1.346,
    incomeMultiplier: 1.559,
    icon: '🏛️',
    category: 'empire'
  },
  conglomerate: {
    name: "Conglomerato",
    baseCost: 521000000000000,
    baseIncome: 12200000000000,
    costMultiplier: 1.349,
    incomeMultiplier: 1.563,
    icon: '🏛️',
    category: 'empire'
  },
  global_conglomerate: {
    name: "Conglomerato Globale",
    baseCost: 763000000000000,
    baseIncome: 17600000000000,
    costMultiplier: 1.352,
    incomeMultiplier: 1.568,
    icon: '🏛️',
    category: 'empire'
  },
  corporate_empire: {
    name: "Impero Corporativo",
    baseCost: 1120000000000000,
    baseIncome: 25500000000000,
    costMultiplier: 1.354,
    incomeMultiplier: 1.573,
    icon: '🏛️',
    category: 'empire'
  },
  global_economic_dominion: {
    name: "Dominio Economico Globale",
    baseCost: 1630000000000000,
    baseIncome: 36900000000000,
    costMultiplier: 1.357,
    incomeMultiplier: 1.578,
    icon: '🏛️',
    category: 'empire'
  },
  elite_council: {
    name: "Consiglio d'Elite",
    baseCost: 2390000000000000,
    baseIncome: 53500000000000,
    costMultiplier: 1.359,
    incomeMultiplier: 1.582,
    icon: '👑',
    category: 'hegemony'
  },
  international_trust: {
    name: "Trust Internazionale",
    baseCost: 3490000000000000,
    baseIncome: 77500000000000,
    costMultiplier: 1.362,
    incomeMultiplier: 1.587,
    icon: '👑',
    category: 'hegemony'
  },
  economic_cartel: {
    name: "Cartello Economico",
    baseCost: 5110000000000000,
    baseIncome: 112000000000000,
    costMultiplier: 1.364,
    incomeMultiplier: 1.592,
    icon: '👑',
    category: 'hegemony'
  },
  global_syndicate: {
    name: "Sindacato Globale",
    baseCost: 7470000000000000,
    baseIncome: 163000000000000,
    costMultiplier: 1.367,
    incomeMultiplier: 1.596,
    icon: '👑',
    category: 'hegemony'
  },
  supranational_consortium: {
    name: "Consorzio Sovranazionale",
    baseCost: 10900000000000000,
    baseIncome: 236000000000000,
    costMultiplier: 1.37,
    incomeMultiplier: 1.601,
    icon: '👑',
    category: 'hegemony'
  },
  world_directorate: {
    name: "Direttorio Mondiale",
    baseCost: 16000000000000000,
    baseIncome: 342000000000000,
    costMultiplier: 1.372,
    incomeMultiplier: 1.606,
    icon: '👑',
    category: 'hegemony'
  },
  global_economic_order: {
    name: "Ordine Economico Globale",
    baseCost: 23400000000000000,
    baseIncome: 496000000000000,
    costMultiplier: 1.375,
    incomeMultiplier: 1.611,
    icon: '👑',
    category: 'hegemony'
  },
  throne_of_capital: {
    name: "Trono del Capitale",
    baseCost: 34200000000000000,
    baseIncome: 719000000000000,
    costMultiplier: 1.377,
    incomeMultiplier: 1.615,
    icon: '👑',
    category: 'hegemony'
  },
  absolute_hegemony: {
    name: "Egemonia Assoluta",
    baseCost: 50000000000000000,
    baseIncome: 1040000000000000,
    costMultiplier: 1.38,
    incomeMultiplier: 1.62,
    icon: '👑',
    category: 'hegemony'
  },
}

export const CATEGORIES: BuildingCategory[] = [
  { key: 'residential', name: 'Residenziale', icon: '🏠', unlockPrestige: 0, description: "Il punto di partenza di ogni impero.", pyramidRow: 1, buildings: ['shack', 'house_small', 'duplex', 'house_medium', 'house_large', 'house_garden', 'house_view', 'luxury_residence', 'private_estate'] },
  { key: 'commercial', name: 'Commerciale', icon: '🏪', unlockPrestige: 4, description: "Il commercio muove la città.", pyramidRow: 1, buildings: ['stall', 'kiosk', 'minimarket', 'local_shop', 'boutique', 'concept_store', 'showroom', 'flagship_store', 'commercial_gallery'] },
  { key: 'agricultural', name: 'Agricola', icon: '🌾', unlockPrestige: 10, description: "La terra è ricchezza, se sai coltivarla.", pyramidRow: 1, buildings: ['home_garden', 'urban_garden', 'smallholding', 'farm', 'modern_farmhouse', 'agri_estate', 'agri_company', 'rural_coop', 'agrifood_district'] },
  { key: 'industrial', name: 'Industriale', icon: '🏭', unlockPrestige: 18, description: "Produzione su scala industriale.", pyramidRow: 1, buildings: ['craft_workshop', 'workshop', 'small_manufacture', 'factory', 'production_plant', 'plant', 'industrial_complex', 'manufacturing_hub', 'industrial_district'] },
  { key: 'financial', name: 'Finanziaria', icon: '🏦', unlockPrestige: 28, description: "Il denaro genera denaro.", pyramidRow: 2, buildings: ['money_changer', 'bank_branch', 'local_branch', 'regional_bank', 'national_bank', 'investment_fund', 'finance_company', 'banking_group', 'financial_holding'] },
  { key: 'tourism', name: 'Turistica', icon: '🏨', unlockPrestige: 40, description: "Ospitalità d'élite per chi ha già dimostrato valore.", pyramidRow: 2, buildings: ['inn', 'boutique_hotel', 'city_hotel', 'resort', 'luxury_resort', 'grand_hotel', 'tourist_village', 'hotel_chain', 'hospitality_empire'] },
  { key: 'metro', name: 'Metropolitana', icon: '🌆', unlockPrestige: 55, description: "Domina lo skyline della città.", pyramidRow: 2, buildings: ['office_building', 'office_tower', 'business_complex', 'skyscraper', 'panoramic_skyscraper', 'business_district', 'twin_tower', 'corporate_center', 'corporate_skyline'] },
  { key: 'port', name: 'Portuale', icon: '🚢', unlockPrestige: 75, description: "Le rotte commerciali del mondo passano da qui.", pyramidRow: 3, buildings: ['private_dock', 'cargo_terminal', 'port_dock', 'commercial_port', 'industrial_port', 'logistics_hub', 'global_logistics_hub', 'international_port_network', 'maritime_empire'] },
  { key: 'empire', name: 'Impero', icon: '🏛️', unlockPrestige: 100, description: "Il vertice assoluto del potere economico.", pyramidRow: 3, buildings: ['startup', 'emerging_company', 'corporation', 'multinational', 'diversified_multinational', 'conglomerate', 'global_conglomerate', 'corporate_empire', 'global_economic_dominion'] },
  { key: 'hegemony', name: 'Egemonia', icon: '👑', unlockPrestige: 150, description: "Non esiste nulla di più grande. Sei la storia stessa.", pyramidRow: 4, buildings: ['elite_council', 'international_trust', 'economic_cartel', 'global_syndicate', 'supranational_consortium', 'world_directorate', 'global_economic_order', 'throne_of_capital', 'absolute_hegemony'] },
]
// ─── Calcoli economici (identici a prima: lavorano per chiave, indipendenti dalle categorie) ───

export function calculateBuildingCost(type: string, level: number): number {
  const building = BUILDINGS[type]
  if (!building) return 0
  return Math.floor(building.baseCost * Math.pow(building.costMultiplier, level - 1))
}

export function calculateBuildingIncome(type: string, level: number): number {
  const building = BUILDINGS[type]
  if (!building) return 0
  return Math.floor(building.baseIncome * Math.pow(building.incomeMultiplier, level - 1))
}

// Il livello dipende SOLO dal totale guadagnato nella vita: onesto, mai gonfiabile
// costruendo in fretta molto reddito. Curva a radice cubica: cresce rapida all'inizio,
// poi rallenta in modo naturale e prevedibile, senza mai diventare impossibile da raggiungere.
export function calculateLevel(totalEarned: number, _totalIncome?: number): number {
  return Math.max(1, Math.floor(Math.cbrt(Math.max(0, totalEarned) / 1000)) + 1)
}

export function calculateUpgradeBatch(
  type: string,
  fromLevel: number,
  count: number,
  money?: number
): { levels: number; totalCost: number } {
  let totalCost = 0
  let levels = 0
  for (let i = 1; i <= count; i++) {
    const stepCost = calculateBuildingCost(type, fromLevel + i)
    if (money !== undefined && totalCost + stepCost > money) break
    totalCost += stepCost
    levels++
  }
  return { levels, totalCost }
}

// ─── Prestige ───
export function calculatePrestigeGain(level: number): number {
  if (level < 10) return 0
  return Math.max(1, Math.floor(Math.pow(level / 10, 1.4)))
}

export function calculatePrestigeBonus(prestige: number) {
  const sqrt = Math.sqrt(prestige)
  return {
    incomeBonus: sqrt * 0.05,
    costBonus: sqrt * 0.015,
    slotBonus: Math.floor(sqrt / Math.sqrt(10))
  }
}

export const BASE_SLOTS = 12

export function calculateTotalSlots(prestige: number, boughtSlots: number): number {
  const bonus = calculatePrestigeBonus(prestige)
  return BASE_SLOTS + bonus.slotBonus + boughtSlots
}

export function calculateSlotCost(boughtSlots: number): number {
  return Math.floor(50000 * Math.pow(2.5, boughtSlots))
}

// ─── Categorie: sblocco progressivo per prestige, disposte a piramide ───

export function isCategoryUnlocked(categoryKey: string, prestige: number): boolean {
  const cat = CATEGORIES.find(c => c.key === categoryKey)
  if (!cat) return false
  return prestige >= cat.unlockPrestige
}

// Tutte le categorie già sbloccate, in ordine
export function getUnlockedCategories(prestige: number): BuildingCategory[] {
  return CATEGORIES.filter(c => prestige >= c.unlockPrestige)
}

// La SOLA prossima categoria ancora bloccata (se esiste): è l'unica "anteprima"
// che il giocatore deve vedere, per dargli un obiettivo senza svelare tutto il resto.
export function getNextLockedCategory(prestige: number): BuildingCategory | null {
  const locked = CATEGORIES.filter(c => prestige < c.unlockPrestige)
  return locked.length > 0 ? locked[0] : null
}

// Raggruppa un set di categorie (sbloccate + eventuale anteprima) per riga della
// piramide, dalla base (1) all'apice (4), per il rendering a forma di piramide.
export function groupCategoriesByPyramidRow(cats: BuildingCategory[]): Record<number, BuildingCategory[]> {
  const grouped: Record<number, BuildingCategory[]> = {}
  for (const cat of cats) {
    if (!grouped[cat.pyramidRow]) grouped[cat.pyramidRow] = []
    grouped[cat.pyramidRow].push(cat)
  }
  return grouped
}
