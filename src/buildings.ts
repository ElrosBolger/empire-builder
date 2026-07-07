// buildings.ts
// Configurazione edifici organizzati in CATEGORIE sbloccate per prestige,
// disposte a PIRAMIDE: 4 categorie alla base (le più semplici e meno
// remunerative), poi 3, poi 2, e infine 1 sola all'apice (la migliore,
// il vertice assoluto). Ogni categoria contiene 15 edifici, e il primo
// edificio della categoria successiva è sempre leggermente superiore
// all'ultimo della precedente: la progressione è continua e molto graduale
// su tutta la scala (150 edifici totali, gradini piccoli e frequenti).

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
    baseCost: 126,
    baseIncome: 12,
    costMultiplier: 1.152,
    incomeMultiplier: 1.203,
    icon: '🏠',
    category: 'residential'
  },
  duplex: {
    name: "Bilocale",
    baseCost: 158,
    baseIncome: 15,
    costMultiplier: 1.153,
    incomeMultiplier: 1.206,
    icon: '🏠',
    category: 'residential'
  },
  house_medium: {
    name: "Villetta",
    baseCost: 198,
    baseIncome: 18,
    costMultiplier: 1.155,
    incomeMultiplier: 1.208,
    icon: '🏠',
    category: 'residential'
  },
  house_large: {
    name: "Villa Suburbana",
    baseCost: 248,
    baseIncome: 22,
    costMultiplier: 1.156,
    incomeMultiplier: 1.211,
    icon: '🏠',
    category: 'residential'
  },
  house_garden: {
    name: "Villa con Giardino",
    baseCost: 311,
    baseIncome: 27,
    costMultiplier: 1.158,
    incomeMultiplier: 1.214,
    icon: '🏠',
    category: 'residential'
  },
  house_view: {
    name: "Villa Panoramica",
    baseCost: 391,
    baseIncome: 33,
    costMultiplier: 1.159,
    incomeMultiplier: 1.217,
    icon: '🏠',
    category: 'residential'
  },
  luxury_residence: {
    name: "Residenza di Prestigio",
    baseCost: 490,
    baseIncome: 41,
    costMultiplier: 1.161,
    incomeMultiplier: 1.22,
    icon: '🏠',
    category: 'residential'
  },
  private_estate: {
    name: "Tenuta Privata",
    baseCost: 615,
    baseIncome: 51,
    costMultiplier: 1.162,
    incomeMultiplier: 1.223,
    icon: '🏠',
    category: 'residential'
  },
  house_pool: {
    name: "Villa con Piscina",
    baseCost: 772,
    baseIncome: 62,
    costMultiplier: 1.164,
    incomeMultiplier: 1.225,
    icon: '🏠',
    category: 'residential'
  },
  suburban_manor: {
    name: "Maniero Suburbano",
    baseCost: 969,
    baseIncome: 77,
    costMultiplier: 1.165,
    incomeMultiplier: 1.228,
    icon: '🏠',
    category: 'residential'
  },
  historic_residence: {
    name: "Residenza Storica",
    baseCost: 1220,
    baseIncome: 95,
    costMultiplier: 1.167,
    incomeMultiplier: 1.231,
    icon: '🏠',
    category: 'residential'
  },
  family_palace: {
    name: "Palazzo Familiare",
    baseCost: 1530,
    baseIncome: 117,
    costMultiplier: 1.169,
    incomeMultiplier: 1.234,
    icon: '🏠',
    category: 'residential'
  },
  aristocratic_villa: {
    name: "Villa Aristocratica",
    baseCost: 1920,
    baseIncome: 144,
    costMultiplier: 1.17,
    incomeMultiplier: 1.237,
    icon: '🏠',
    category: 'residential'
  },
  noble_mansion: {
    name: "Dimora Signorile",
    baseCost: 2400,
    baseIncome: 177,
    costMultiplier: 1.172,
    incomeMultiplier: 1.239,
    icon: '🏠',
    category: 'residential'
  },
  stall: {
    name: "Bancarella",
    baseCost: 3020,
    baseIncome: 218,
    costMultiplier: 1.173,
    incomeMultiplier: 1.242,
    icon: '🏪',
    category: 'commercial'
  },
  kiosk: {
    name: "Chiosco",
    baseCost: 3790,
    baseIncome: 269,
    costMultiplier: 1.175,
    incomeMultiplier: 1.245,
    icon: '🏪',
    category: 'commercial'
  },
  minimarket: {
    name: "Minimarket",
    baseCost: 4750,
    baseIncome: 332,
    costMultiplier: 1.176,
    incomeMultiplier: 1.248,
    icon: '🏪',
    category: 'commercial'
  },
  local_shop: {
    name: "Negozio di Quartiere",
    baseCost: 5970,
    baseIncome: 409,
    costMultiplier: 1.178,
    incomeMultiplier: 1.251,
    icon: '🏪',
    category: 'commercial'
  },
  boutique: {
    name: "Boutique",
    baseCost: 7490,
    baseIncome: 504,
    costMultiplier: 1.179,
    incomeMultiplier: 1.254,
    icon: '🏪',
    category: 'commercial'
  },
  concept_store: {
    name: "Concept Store",
    baseCost: 9400,
    baseIncome: 622,
    costMultiplier: 1.181,
    incomeMultiplier: 1.256,
    icon: '🏪',
    category: 'commercial'
  },
  showroom: {
    name: "Showroom",
    baseCost: 11800,
    baseIncome: 768,
    costMultiplier: 1.182,
    incomeMultiplier: 1.259,
    icon: '🏪',
    category: 'commercial'
  },
  flagship_store: {
    name: "Flagship Store",
    baseCost: 14800,
    baseIncome: 948,
    costMultiplier: 1.184,
    incomeMultiplier: 1.262,
    icon: '🏪',
    category: 'commercial'
  },
  commercial_gallery: {
    name: "Galleria Commerciale",
    baseCost: 18600,
    baseIncome: 1170,
    costMultiplier: 1.186,
    incomeMultiplier: 1.265,
    icon: '🏪',
    category: 'commercial'
  },
  shopping_mall: {
    name: "Centro Commerciale",
    baseCost: 23300,
    baseIncome: 1450,
    costMultiplier: 1.187,
    incomeMultiplier: 1.268,
    icon: '🏪',
    category: 'commercial'
  },
  regional_mall: {
    name: "Mall Regionale",
    baseCost: 29300,
    baseIncome: 1790,
    costMultiplier: 1.189,
    incomeMultiplier: 1.27,
    icon: '🏪',
    category: 'commercial'
  },
  shopping_district: {
    name: "Distretto dello Shopping",
    baseCost: 36700,
    baseIncome: 2210,
    costMultiplier: 1.19,
    incomeMultiplier: 1.273,
    icon: '🏪',
    category: 'commercial'
  },
  retail_park: {
    name: "Retail Park",
    baseCost: 46100,
    baseIncome: 2730,
    costMultiplier: 1.192,
    incomeMultiplier: 1.276,
    icon: '🏪',
    category: 'commercial'
  },
  commerce_citadel: {
    name: "Cittadella del Commercio",
    baseCost: 57800,
    baseIncome: 3370,
    costMultiplier: 1.193,
    incomeMultiplier: 1.279,
    icon: '🏪',
    category: 'commercial'
  },
  retail_empire: {
    name: "Impero del Retail",
    baseCost: 72600,
    baseIncome: 4170,
    costMultiplier: 1.195,
    incomeMultiplier: 1.282,
    icon: '🏪',
    category: 'commercial'
  },
  home_garden: {
    name: "Orto Domestico",
    baseCost: 91100,
    baseIncome: 5160,
    costMultiplier: 1.196,
    incomeMultiplier: 1.285,
    icon: '🌾',
    category: 'agricultural'
  },
  urban_garden: {
    name: "Orto Urbano",
    baseCost: 114000,
    baseIncome: 6390,
    costMultiplier: 1.198,
    incomeMultiplier: 1.287,
    icon: '🌾',
    category: 'agricultural'
  },
  smallholding: {
    name: "Podere",
    baseCost: 143000,
    baseIncome: 7900,
    costMultiplier: 1.199,
    incomeMultiplier: 1.29,
    icon: '🌾',
    category: 'agricultural'
  },
  farm: {
    name: "Fattoria",
    baseCost: 180000,
    baseIncome: 9780,
    costMultiplier: 1.201,
    incomeMultiplier: 1.293,
    icon: '🌾',
    category: 'agricultural'
  },
  modern_farmhouse: {
    name: "Cascina Moderna",
    baseCost: 226000,
    baseIncome: 12100,
    costMultiplier: 1.202,
    incomeMultiplier: 1.296,
    icon: '🌾',
    category: 'agricultural'
  },
  agri_estate: {
    name: "Tenuta Agricola",
    baseCost: 284000,
    baseIncome: 15000,
    costMultiplier: 1.204,
    incomeMultiplier: 1.299,
    icon: '🌾',
    category: 'agricultural'
  },
  agri_company: {
    name: "Azienda Agricola",
    baseCost: 356000,
    baseIncome: 18600,
    costMultiplier: 1.206,
    incomeMultiplier: 1.301,
    icon: '🌾',
    category: 'agricultural'
  },
  rural_coop: {
    name: "Cooperativa Rurale",
    baseCost: 447000,
    baseIncome: 23000,
    costMultiplier: 1.207,
    incomeMultiplier: 1.304,
    icon: '🌾',
    category: 'agricultural'
  },
  agrifood_district: {
    name: "Distretto Agroalimentare",
    baseCost: 561000,
    baseIncome: 28500,
    costMultiplier: 1.209,
    incomeMultiplier: 1.307,
    icon: '🌾',
    category: 'agricultural'
  },
  agri_consortium: {
    name: "Consorzio Agricolo",
    baseCost: 704000,
    baseIncome: 35300,
    costMultiplier: 1.21,
    incomeMultiplier: 1.31,
    icon: '🌾',
    category: 'agricultural'
  },
  agroindustrial_holding: {
    name: "Holding Agroindustriale",
    baseCost: 883000,
    baseIncome: 43700,
    costMultiplier: 1.212,
    incomeMultiplier: 1.313,
    icon: '🌾',
    category: 'agricultural'
  },
  agri_empire: {
    name: "Impero Agricolo",
    baseCost: 1110000,
    baseIncome: 54200,
    costMultiplier: 1.213,
    incomeMultiplier: 1.316,
    icon: '🌾',
    category: 'agricultural'
  },
  rural_conglomerate: {
    name: "Conglomerato Rurale",
    baseCost: 1390000,
    baseIncome: 67200,
    costMultiplier: 1.215,
    incomeMultiplier: 1.318,
    icon: '🌾',
    category: 'agricultural'
  },
  agri_monopoly: {
    name: "Monopolio Agricolo",
    baseCost: 1750000,
    baseIncome: 83300,
    costMultiplier: 1.216,
    incomeMultiplier: 1.321,
    icon: '🌾',
    category: 'agricultural'
  },
  land_empire: {
    name: "Impero della Terra",
    baseCost: 2190000,
    baseIncome: 103000,
    costMultiplier: 1.218,
    incomeMultiplier: 1.324,
    icon: '🌾',
    category: 'agricultural'
  },
  craft_workshop: {
    name: "Laboratorio Artigiano",
    baseCost: 2750000,
    baseIncome: 128000,
    costMultiplier: 1.219,
    incomeMultiplier: 1.327,
    icon: '🏭',
    category: 'industrial'
  },
  workshop: {
    name: "Officina",
    baseCost: 3450000,
    baseIncome: 159000,
    costMultiplier: 1.221,
    incomeMultiplier: 1.33,
    icon: '🏭',
    category: 'industrial'
  },
  small_manufacture: {
    name: "Piccola Manifattura",
    baseCost: 4330000,
    baseIncome: 197000,
    costMultiplier: 1.223,
    incomeMultiplier: 1.332,
    icon: '🏭',
    category: 'industrial'
  },
  factory: {
    name: "Fabbrica",
    baseCost: 5440000,
    baseIncome: 244000,
    costMultiplier: 1.224,
    incomeMultiplier: 1.335,
    icon: '🏭',
    category: 'industrial'
  },
  production_plant: {
    name: "Impianto Produttivo",
    baseCost: 6820000,
    baseIncome: 303000,
    costMultiplier: 1.226,
    incomeMultiplier: 1.338,
    icon: '🏭',
    category: 'industrial'
  },
  plant: {
    name: "Stabilimento Produttivo",
    baseCost: 8560000,
    baseIncome: 376000,
    costMultiplier: 1.227,
    incomeMultiplier: 1.341,
    icon: '🏭',
    category: 'industrial'
  },
  industrial_complex: {
    name: "Complesso Industriale",
    baseCost: 10700000,
    baseIncome: 467000,
    costMultiplier: 1.229,
    incomeMultiplier: 1.344,
    icon: '🏭',
    category: 'industrial'
  },
  manufacturing_hub: {
    name: "Polo Manifatturiero",
    baseCost: 13499999,
    baseIncome: 580000,
    costMultiplier: 1.23,
    incomeMultiplier: 1.347,
    icon: '🏭',
    category: 'industrial'
  },
  industrial_district: {
    name: "Distretto Industriale",
    baseCost: 16900000,
    baseIncome: 720000,
    costMultiplier: 1.232,
    incomeMultiplier: 1.349,
    icon: '🏭',
    category: 'industrial'
  },
  tech_hub: {
    name: "Polo Tecnologico",
    baseCost: 21200000,
    baseIncome: 893000,
    costMultiplier: 1.233,
    incomeMultiplier: 1.352,
    icon: '🏭',
    category: 'industrial'
  },
  industrial_conglomerate: {
    name: "Conglomerato Industriale",
    baseCost: 26699999,
    baseIncome: 1110000,
    costMultiplier: 1.235,
    incomeMultiplier: 1.355,
    icon: '🏭',
    category: 'industrial'
  },
  production_citadel: {
    name: "Cittadella Produttiva",
    baseCost: 33499999,
    baseIncome: 1380000,
    costMultiplier: 1.236,
    incomeMultiplier: 1.358,
    icon: '🏭',
    category: 'industrial'
  },
  manufacturing_empire: {
    name: "Impero Manifatturiero",
    baseCost: 42000000,
    baseIncome: 1710000,
    costMultiplier: 1.238,
    incomeMultiplier: 1.361,
    icon: '🏭',
    category: 'industrial'
  },
  industrial_monopoly: {
    name: "Monopolio Industriale",
    baseCost: 52699999,
    baseIncome: 2130000,
    costMultiplier: 1.24,
    incomeMultiplier: 1.363,
    icon: '🏭',
    category: 'industrial'
  },
  production_colossus: {
    name: "Colosso Produttivo",
    baseCost: 66099999,
    baseIncome: 2640000,
    costMultiplier: 1.241,
    incomeMultiplier: 1.366,
    icon: '🏭',
    category: 'industrial'
  },
  money_changer: {
    name: "Cambiavalute",
    baseCost: 83000000,
    baseIncome: 3280000,
    costMultiplier: 1.243,
    incomeMultiplier: 1.369,
    icon: '🏦',
    category: 'financial'
  },
  bank_branch: {
    name: "Sportello Bancario",
    baseCost: 104000000,
    baseIncome: 4080000,
    costMultiplier: 1.244,
    incomeMultiplier: 1.372,
    icon: '🏦',
    category: 'financial'
  },
  local_branch: {
    name: "Filiale Locale",
    baseCost: 131000000,
    baseIncome: 5060000,
    costMultiplier: 1.246,
    incomeMultiplier: 1.375,
    icon: '🏦',
    category: 'financial'
  },
  regional_bank: {
    name: "Banca Regionale",
    baseCost: 164000000,
    baseIncome: 6290000,
    costMultiplier: 1.247,
    incomeMultiplier: 1.378,
    icon: '🏦',
    category: 'financial'
  },
  national_bank: {
    name: "Banca Nazionale",
    baseCost: 206000000,
    baseIncome: 7820000,
    costMultiplier: 1.249,
    incomeMultiplier: 1.38,
    icon: '🏦',
    category: 'financial'
  },
  investment_fund: {
    name: "Fondo d'Investimento",
    baseCost: 258000000,
    baseIncome: 9720000,
    costMultiplier: 1.25,
    incomeMultiplier: 1.383,
    icon: '🏦',
    category: 'financial'
  },
  finance_company: {
    name: "Società Finanziaria",
    baseCost: 324000000,
    baseIncome: 12099999,
    costMultiplier: 1.252,
    incomeMultiplier: 1.386,
    icon: '🏦',
    category: 'financial'
  },
  banking_group: {
    name: "Gruppo Bancario",
    baseCost: 407000000,
    baseIncome: 14999999,
    costMultiplier: 1.253,
    incomeMultiplier: 1.389,
    icon: '🏦',
    category: 'financial'
  },
  financial_holding: {
    name: "Holding Finanziaria",
    baseCost: 511000000,
    baseIncome: 18700000,
    costMultiplier: 1.255,
    incomeMultiplier: 1.392,
    icon: '🏦',
    category: 'financial'
  },
  merchant_bank: {
    name: "Banca d'Affari",
    baseCost: 641000000,
    baseIncome: 23199999,
    costMultiplier: 1.257,
    incomeMultiplier: 1.394,
    icon: '🏦',
    category: 'financial'
  },
  banking_conglomerate: {
    name: "Conglomerato Bancario",
    baseCost: 805000000,
    baseIncome: 28899999,
    costMultiplier: 1.258,
    incomeMultiplier: 1.397,
    icon: '🏦',
    category: 'financial'
  },
  financial_empire: {
    name: "Impero Finanziario",
    baseCost: 1010000000,
    baseIncome: 35900000,
    costMultiplier: 1.26,
    incomeMultiplier: 1.4,
    icon: '🏦',
    category: 'financial'
  },
  credit_citadel: {
    name: "Cittadella del Credito",
    baseCost: 1270000000,
    baseIncome: 44700000,
    costMultiplier: 1.261,
    incomeMultiplier: 1.403,
    icon: '🏦',
    category: 'financial'
  },
  financial_monopoly: {
    name: "Monopolio Finanziario",
    baseCost: 1590000000,
    baseIncome: 55599999,
    costMultiplier: 1.263,
    incomeMultiplier: 1.406,
    icon: '🏦',
    category: 'financial'
  },
  wallstreet_empire: {
    name: "Impero di Wall Street",
    baseCost: 2000000000,
    baseIncome: 69100000,
    costMultiplier: 1.264,
    incomeMultiplier: 1.409,
    icon: '🏦',
    category: 'financial'
  },
  inn: {
    name: "Locanda",
    baseCost: 2510000000,
    baseIncome: 86000000,
    costMultiplier: 1.266,
    incomeMultiplier: 1.411,
    icon: '🏨',
    category: 'tourism'
  },
  boutique_hotel: {
    name: "Boutique Hotel",
    baseCost: 3140000000,
    baseIncome: 107000000,
    costMultiplier: 1.267,
    incomeMultiplier: 1.414,
    icon: '🏨',
    category: 'tourism'
  },
  city_hotel: {
    name: "Hotel di Città",
    baseCost: 3950000000,
    baseIncome: 133000000,
    costMultiplier: 1.269,
    incomeMultiplier: 1.417,
    icon: '🏨',
    category: 'tourism'
  },
  resort: {
    name: "Resort",
    baseCost: 4950000000,
    baseIncome: 166000000,
    costMultiplier: 1.27,
    incomeMultiplier: 1.42,
    icon: '🏨',
    category: 'tourism'
  },
  luxury_resort: {
    name: "Resort di Lusso",
    baseCost: 6210000000,
    baseIncome: 206000000,
    costMultiplier: 1.272,
    incomeMultiplier: 1.423,
    icon: '🏨',
    category: 'tourism'
  },
  grand_hotel: {
    name: "Grand Hotel",
    baseCost: 7800000000,
    baseIncome: 257000000,
    costMultiplier: 1.273,
    incomeMultiplier: 1.426,
    icon: '🏨',
    category: 'tourism'
  },
  tourist_village: {
    name: "Villaggio Turistico",
    baseCost: 9790000000,
    baseIncome: 319000000,
    costMultiplier: 1.275,
    incomeMultiplier: 1.428,
    icon: '🏨',
    category: 'tourism'
  },
  hotel_chain: {
    name: "Catena Alberghiera",
    baseCost: 12300000000,
    baseIncome: 397000000,
    costMultiplier: 1.277,
    incomeMultiplier: 1.431,
    icon: '🏨',
    category: 'tourism'
  },
  hospitality_empire: {
    name: "Impero dell'Ospitalità",
    baseCost: 15400000000,
    baseIncome: 495000000,
    costMultiplier: 1.278,
    incomeMultiplier: 1.434,
    icon: '🏨',
    category: 'tourism'
  },
  global_resort_chain: {
    name: "Catena Resort Globale",
    baseCost: 19300000000,
    baseIncome: 616000000,
    costMultiplier: 1.28,
    incomeMultiplier: 1.437,
    icon: '🏨',
    category: 'tourism'
  },
  tourism_empire: {
    name: "Impero del Turismo",
    baseCost: 24300000000,
    baseIncome: 767000000,
    costMultiplier: 1.281,
    incomeMultiplier: 1.44,
    icon: '🏨',
    category: 'tourism'
  },
  hotel_monopoly: {
    name: "Monopolio Alberghiero",
    baseCost: 30500000000,
    baseIncome: 954000000,
    costMultiplier: 1.283,
    incomeMultiplier: 1.442,
    icon: '🏨',
    category: 'tourism'
  },
  relax_citadel: {
    name: "Cittadella del Relax",
    baseCost: 38200000000,
    baseIncome: 1190000000,
    costMultiplier: 1.284,
    incomeMultiplier: 1.445,
    icon: '🏨',
    category: 'tourism'
  },
  exclusive_paradise: {
    name: "Paradiso Esclusivo",
    baseCost: 48000000000,
    baseIncome: 1480000000,
    costMultiplier: 1.286,
    incomeMultiplier: 1.448,
    icon: '🏨',
    category: 'tourism'
  },
  vacation_empire: {
    name: "Impero delle Vacanze",
    baseCost: 60200000000,
    baseIncome: 1840000000,
    costMultiplier: 1.287,
    incomeMultiplier: 1.451,
    icon: '🏨',
    category: 'tourism'
  },
  office_building: {
    name: "Palazzina Uffici",
    baseCost: 75600000000,
    baseIncome: 2290000000,
    costMultiplier: 1.289,
    incomeMultiplier: 1.454,
    icon: '🌆',
    category: 'metro'
  },
  office_tower: {
    name: "Torre Uffici",
    baseCost: 94900000000,
    baseIncome: 2860000000,
    costMultiplier: 1.29,
    incomeMultiplier: 1.457,
    icon: '🌆',
    category: 'metro'
  },
  business_complex: {
    name: "Complesso Direzionale",
    baseCost: 119000000000,
    baseIncome: 3560000000,
    costMultiplier: 1.292,
    incomeMultiplier: 1.459,
    icon: '🌆',
    category: 'metro'
  },
  skyscraper: {
    name: "Grattacielo",
    baseCost: 149000000000,
    baseIncome: 4430000000,
    costMultiplier: 1.294,
    incomeMultiplier: 1.462,
    icon: '🌆',
    category: 'metro'
  },
  panoramic_skyscraper: {
    name: "Grattacielo Panoramico",
    baseCost: 188000000000,
    baseIncome: 5520000000,
    costMultiplier: 1.295,
    incomeMultiplier: 1.465,
    icon: '🌆',
    category: 'metro'
  },
  business_district: {
    name: "Distretto Direzionale",
    baseCost: 235000000000,
    baseIncome: 6880000000,
    costMultiplier: 1.297,
    incomeMultiplier: 1.468,
    icon: '🌆',
    category: 'metro'
  },
  twin_tower: {
    name: "Torre Gemella",
    baseCost: 295000000000,
    baseIncome: 8570000000,
    costMultiplier: 1.298,
    incomeMultiplier: 1.471,
    icon: '🌆',
    category: 'metro'
  },
  corporate_center: {
    name: "Centro Direzionale",
    baseCost: 371000000000,
    baseIncome: 10700000000,
    costMultiplier: 1.3,
    incomeMultiplier: 1.473,
    icon: '🌆',
    category: 'metro'
  },
  corporate_skyline: {
    name: "Skyline Corporativo",
    baseCost: 465000000000,
    baseIncome: 13300000000,
    costMultiplier: 1.301,
    incomeMultiplier: 1.476,
    icon: '🌆',
    category: 'metro'
  },
  financial_district: {
    name: "Distretto Finanziario",
    baseCost: 584000000000,
    baseIncome: 16600000000,
    costMultiplier: 1.303,
    incomeMultiplier: 1.479,
    icon: '🌆',
    category: 'metro'
  },
  vertical_citadel: {
    name: "Cittadella Verticale",
    baseCost: 733000000000,
    baseIncome: 20600000000,
    costMultiplier: 1.304,
    incomeMultiplier: 1.482,
    icon: '🌆',
    category: 'metro'
  },
  real_estate_empire: {
    name: "Impero Immobiliare",
    baseCost: 920000000000,
    baseIncome: 25700000000,
    costMultiplier: 1.306,
    incomeMultiplier: 1.485,
    icon: '🌆',
    category: 'metro'
  },
  urban_monopoly: {
    name: "Monopolio Urbano",
    baseCost: 1150000000000,
    baseIncome: 32100000000,
    costMultiplier: 1.307,
    incomeMultiplier: 1.488,
    icon: '🌆',
    category: 'metro'
  },
  private_metropolis: {
    name: "Metropoli Privata",
    baseCost: 1450000000000,
    baseIncome: 39900000000,
    costMultiplier: 1.309,
    incomeMultiplier: 1.49,
    icon: '🌆',
    category: 'metro'
  },
  skyscraper_empire: {
    name: "Impero dei Grattacieli",
    baseCost: 1820000000000,
    baseIncome: 49800000000,
    costMultiplier: 1.311,
    incomeMultiplier: 1.493,
    icon: '🌆',
    category: 'metro'
  },
  private_dock: {
    name: "Molo Privato",
    baseCost: 2280000000000,
    baseIncome: 62000000000,
    costMultiplier: 1.312,
    incomeMultiplier: 1.496,
    icon: '🚢',
    category: 'port'
  },
  cargo_terminal: {
    name: "Terminal Merci",
    baseCost: 2860000000000,
    baseIncome: 77300000000,
    costMultiplier: 1.314,
    incomeMultiplier: 1.499,
    icon: '🚢',
    category: 'port'
  },
  port_dock: {
    name: "Scalo Portuale",
    baseCost: 3590000000000,
    baseIncome: 96400000000,
    costMultiplier: 1.315,
    incomeMultiplier: 1.502,
    icon: '🚢',
    category: 'port'
  },
  commercial_port: {
    name: "Porto Commerciale",
    baseCost: 4510000000000,
    baseIncome: 120000000000,
    costMultiplier: 1.317,
    incomeMultiplier: 1.504,
    icon: '🚢',
    category: 'port'
  },
  industrial_port: {
    name: "Porto Industriale",
    baseCost: 5660000000000,
    baseIncome: 150000000000,
    costMultiplier: 1.318,
    incomeMultiplier: 1.507,
    icon: '🚢',
    category: 'port'
  },
  logistics_hub: {
    name: "Hub Logistico",
    baseCost: 7110000000000,
    baseIncome: 187000000000,
    costMultiplier: 1.32,
    incomeMultiplier: 1.51,
    icon: '🚢',
    category: 'port'
  },
  global_logistics_hub: {
    name: "Hub Logistico Globale",
    baseCost: 8920000000000,
    baseIncome: 233000000000,
    costMultiplier: 1.321,
    incomeMultiplier: 1.513,
    icon: '🚢',
    category: 'port'
  },
  international_port_network: {
    name: "Rete Portuale Internazionale",
    baseCost: 11200000000000,
    baseIncome: 290000000000,
    costMultiplier: 1.323,
    incomeMultiplier: 1.516,
    icon: '🚢',
    category: 'port'
  },
  maritime_empire: {
    name: "Impero Marittimo",
    baseCost: 14000000000000,
    baseIncome: 362000000000,
    costMultiplier: 1.324,
    incomeMultiplier: 1.519,
    icon: '🚢',
    category: 'port'
  },
  port_alliance: {
    name: "Alleanza Portuale",
    baseCost: 17600000000000,
    baseIncome: 451000000000,
    costMultiplier: 1.326,
    incomeMultiplier: 1.521,
    icon: '🚢',
    category: 'port'
  },
  route_empire: {
    name: "Impero delle Rotte",
    baseCost: 22100000000000,
    baseIncome: 563000000000,
    costMultiplier: 1.328,
    incomeMultiplier: 1.524,
    icon: '🚢',
    category: 'port'
  },
  maritime_monopoly: {
    name: "Monopolio Marittimo",
    baseCost: 27800000000000,
    baseIncome: 701000000000,
    costMultiplier: 1.329,
    incomeMultiplier: 1.527,
    icon: '🚢',
    category: 'port'
  },
  naval_citadel: {
    name: "Cittadella Navale",
    baseCost: 34800000000000,
    baseIncome: 875000000000,
    costMultiplier: 1.331,
    incomeMultiplier: 1.53,
    icon: '🚢',
    category: 'port'
  },
  ocean_empire: {
    name: "Impero Oceanico",
    baseCost: 43700000000000,
    baseIncome: 1090000000000,
    costMultiplier: 1.332,
    incomeMultiplier: 1.533,
    icon: '🚢',
    category: 'port'
  },
  sea_dominion: {
    name: "Dominio dei Mari",
    baseCost: 54900000000000,
    baseIncome: 1360000000000,
    costMultiplier: 1.334,
    incomeMultiplier: 1.535,
    icon: '🚢',
    category: 'port'
  },
  startup: {
    name: "Start-up",
    baseCost: 68900000000000,
    baseIncome: 1700000000000,
    costMultiplier: 1.335,
    incomeMultiplier: 1.538,
    icon: '🏛️',
    category: 'empire'
  },
  emerging_company: {
    name: "Azienda Emergente",
    baseCost: 86400000000000,
    baseIncome: 2120000000000,
    costMultiplier: 1.337,
    incomeMultiplier: 1.541,
    icon: '🏛️',
    category: 'empire'
  },
  corporation: {
    name: "Società per Azioni",
    baseCost: 108000000000000,
    baseIncome: 2640000000000,
    costMultiplier: 1.338,
    incomeMultiplier: 1.544,
    icon: '🏛️',
    category: 'empire'
  },
  multinational: {
    name: "Multinazionale",
    baseCost: 136000000000000,
    baseIncome: 3290000000000,
    costMultiplier: 1.34,
    incomeMultiplier: 1.547,
    icon: '🏛️',
    category: 'empire'
  },
  diversified_multinational: {
    name: "Multinazionale Diversificata",
    baseCost: 171000000000000,
    baseIncome: 4110000000000,
    costMultiplier: 1.341,
    incomeMultiplier: 1.55,
    icon: '🏛️',
    category: 'empire'
  },
  conglomerate: {
    name: "Conglomerato",
    baseCost: 214000000000000,
    baseIncome: 5120000000000,
    costMultiplier: 1.343,
    incomeMultiplier: 1.552,
    icon: '🏛️',
    category: 'empire'
  },
  global_conglomerate: {
    name: "Conglomerato Globale",
    baseCost: 269000000000000,
    baseIncome: 6390000000000,
    costMultiplier: 1.344,
    incomeMultiplier: 1.555,
    icon: '🏛️',
    category: 'empire'
  },
  corporate_empire: {
    name: "Impero Corporativo",
    baseCost: 338000000000000,
    baseIncome: 7970000000000,
    costMultiplier: 1.346,
    incomeMultiplier: 1.558,
    icon: '🏛️',
    category: 'empire'
  },
  global_economic_dominion: {
    name: "Dominio Economico Globale",
    baseCost: 424000000000000,
    baseIncome: 9940000000000,
    costMultiplier: 1.348,
    incomeMultiplier: 1.561,
    icon: '🏛️',
    category: 'empire'
  },
  world_syndicate: {
    name: "Sindacato Mondiale",
    baseCost: 532000000000000,
    baseIncome: 12400000000000,
    costMultiplier: 1.349,
    incomeMultiplier: 1.564,
    icon: '🏛️',
    category: 'empire'
  },
  transnational_empire: {
    name: "Impero Transnazionale",
    baseCost: 668000000000000,
    baseIncome: 15500000000000,
    costMultiplier: 1.351,
    incomeMultiplier: 1.566,
    icon: '🏛️',
    category: 'empire'
  },
  global_monopoly: {
    name: "Monopolio Globale",
    baseCost: 838000000000000,
    baseIncome: 19300000000000,
    costMultiplier: 1.352,
    incomeMultiplier: 1.569,
    icon: '🏛️',
    category: 'empire'
  },
  power_citadel: {
    name: "Cittadella del Potere",
    baseCost: 1050000000000000,
    baseIncome: 24100000000000,
    costMultiplier: 1.354,
    incomeMultiplier: 1.572,
    icon: '🏛️',
    category: 'empire'
  },
  borderless_empire: {
    name: "Impero Senza Confini",
    baseCost: 1320000000000000,
    baseIncome: 30100000000000,
    costMultiplier: 1.355,
    incomeMultiplier: 1.575,
    icon: '🏛️',
    category: 'empire'
  },
  absolute_dominion: {
    name: "Dominio Assoluto",
    baseCost: 1660000000000000,
    baseIncome: 37500000000000,
    costMultiplier: 1.357,
    incomeMultiplier: 1.578,
    icon: '🏛️',
    category: 'empire'
  },
  elite_council: {
    name: "Consiglio d'Elite",
    baseCost: 2080000000000000,
    baseIncome: 46800000000000,
    costMultiplier: 1.358,
    incomeMultiplier: 1.581,
    icon: '👑',
    category: 'hegemony'
  },
  international_trust: {
    name: "Trust Internazionale",
    baseCost: 2610000000000000,
    baseIncome: 58400000000000,
    costMultiplier: 1.36,
    incomeMultiplier: 1.583,
    icon: '👑',
    category: 'hegemony'
  },
  economic_cartel: {
    name: "Cartello Economico",
    baseCost: 3270000000000000,
    baseIncome: 72900000000000,
    costMultiplier: 1.361,
    incomeMultiplier: 1.586,
    icon: '👑',
    category: 'hegemony'
  },
  global_syndicate: {
    name: "Sindacato Globale",
    baseCost: 4110000000000000,
    baseIncome: 90900000000000,
    costMultiplier: 1.363,
    incomeMultiplier: 1.589,
    icon: '👑',
    category: 'hegemony'
  },
  supranational_consortium: {
    name: "Consorzio Sovranazionale",
    baseCost: 5160000000000000,
    baseIncome: 113000000000000,
    costMultiplier: 1.365,
    incomeMultiplier: 1.592,
    icon: '👑',
    category: 'hegemony'
  },
  world_directorate: {
    name: "Direttorio Mondiale",
    baseCost: 6470000000000000,
    baseIncome: 142000000000000,
    costMultiplier: 1.366,
    incomeMultiplier: 1.595,
    icon: '👑',
    category: 'hegemony'
  },
  global_economic_order: {
    name: "Ordine Economico Globale",
    baseCost: 8120000000000000,
    baseIncome: 177000000000000,
    costMultiplier: 1.368,
    incomeMultiplier: 1.597,
    icon: '👑',
    category: 'hegemony'
  },
  throne_of_capital: {
    name: "Trono del Capitale",
    baseCost: 10200000000000000,
    baseIncome: 221000000000000,
    costMultiplier: 1.369,
    incomeMultiplier: 1.6,
    icon: '👑',
    category: 'hegemony'
  },
  absolute_hegemony: {
    name: "Egemonia Assoluta",
    baseCost: 12800000000000000,
    baseIncome: 275000000000000,
    costMultiplier: 1.371,
    incomeMultiplier: 1.603,
    icon: '👑',
    category: 'hegemony'
  },
  supreme_order: {
    name: "Ordine Supremo",
    baseCost: 16100000000000000,
    baseIncome: 344000000000000,
    costMultiplier: 1.372,
    incomeMultiplier: 1.606,
    icon: '👑',
    category: 'hegemony'
  },
  eternal_empire: {
    name: "Impero Eterno",
    baseCost: 20200000000000000,
    baseIncome: 429000000000000,
    costMultiplier: 1.374,
    incomeMultiplier: 1.609,
    icon: '👑',
    category: 'hegemony'
  },
  total_sovereignty: {
    name: "Sovranità Totale",
    baseCost: 25300000000000000,
    baseIncome: 535000000000000,
    costMultiplier: 1.375,
    incomeMultiplier: 1.612,
    icon: '👑',
    category: 'hegemony'
  },
  infinite_dominion: {
    name: "Dominio Infinito",
    baseCost: 31700000000000000,
    baseIncome: 668000000000000,
    costMultiplier: 1.377,
    incomeMultiplier: 1.614,
    icon: '👑',
    category: 'hegemony'
  },
  absolute_throne: {
    name: "Trono Assoluto",
    baseCost: 39800000000000000,
    baseIncome: 834000000000000,
    costMultiplier: 1.378,
    incomeMultiplier: 1.617,
    icon: '👑',
    category: 'hegemony'
  },
  economic_singularity: {
    name: "Singolarità Economica",
    baseCost: 50000000000000000,
    baseIncome: 1040000000000000,
    costMultiplier: 1.38,
    incomeMultiplier: 1.62,
    icon: '👑',
    category: 'hegemony'
  },
}

export const CATEGORIES: BuildingCategory[] = [
  { key: 'residential', name: 'Residenziale', icon: '🏠', unlockPrestige: 0, description: "Il punto di partenza di ogni impero.", pyramidRow: 1, buildings: ['shack', 'house_small', 'duplex', 'house_medium', 'house_large', 'house_garden', 'house_view', 'luxury_residence', 'private_estate', 'house_pool', 'suburban_manor', 'historic_residence', 'family_palace', 'aristocratic_villa', 'noble_mansion'] },
  { key: 'commercial', name: 'Commerciale', icon: '🏪', unlockPrestige: 4, description: "Il commercio muove la città.", pyramidRow: 1, buildings: ['stall', 'kiosk', 'minimarket', 'local_shop', 'boutique', 'concept_store', 'showroom', 'flagship_store', 'commercial_gallery', 'shopping_mall', 'regional_mall', 'shopping_district', 'retail_park', 'commerce_citadel', 'retail_empire'] },
  { key: 'agricultural', name: 'Agricola', icon: '🌾', unlockPrestige: 10, description: "La terra è ricchezza, se sai coltivarla.", pyramidRow: 1, buildings: ['home_garden', 'urban_garden', 'smallholding', 'farm', 'modern_farmhouse', 'agri_estate', 'agri_company', 'rural_coop', 'agrifood_district', 'agri_consortium', 'agroindustrial_holding', 'agri_empire', 'rural_conglomerate', 'agri_monopoly', 'land_empire'] },
  { key: 'industrial', name: 'Industriale', icon: '🏭', unlockPrestige: 18, description: "Produzione su scala industriale.", pyramidRow: 1, buildings: ['craft_workshop', 'workshop', 'small_manufacture', 'factory', 'production_plant', 'plant', 'industrial_complex', 'manufacturing_hub', 'industrial_district', 'tech_hub', 'industrial_conglomerate', 'production_citadel', 'manufacturing_empire', 'industrial_monopoly', 'production_colossus'] },
  { key: 'financial', name: 'Finanziaria', icon: '🏦', unlockPrestige: 28, description: "Il denaro genera denaro.", pyramidRow: 2, buildings: ['money_changer', 'bank_branch', 'local_branch', 'regional_bank', 'national_bank', 'investment_fund', 'finance_company', 'banking_group', 'financial_holding', 'merchant_bank', 'banking_conglomerate', 'financial_empire', 'credit_citadel', 'financial_monopoly', 'wallstreet_empire'] },
  { key: 'tourism', name: 'Turistica', icon: '🏨', unlockPrestige: 40, description: "Ospitalità d'élite per chi ha già dimostrato valore.", pyramidRow: 2, buildings: ['inn', 'boutique_hotel', 'city_hotel', 'resort', 'luxury_resort', 'grand_hotel', 'tourist_village', 'hotel_chain', 'hospitality_empire', 'global_resort_chain', 'tourism_empire', 'hotel_monopoly', 'relax_citadel', 'exclusive_paradise', 'vacation_empire'] },
  { key: 'metro', name: 'Metropolitana', icon: '🌆', unlockPrestige: 55, description: "Domina lo skyline della città.", pyramidRow: 2, buildings: ['office_building', 'office_tower', 'business_complex', 'skyscraper', 'panoramic_skyscraper', 'business_district', 'twin_tower', 'corporate_center', 'corporate_skyline', 'financial_district', 'vertical_citadel', 'real_estate_empire', 'urban_monopoly', 'private_metropolis', 'skyscraper_empire'] },
  { key: 'port', name: 'Portuale', icon: '🚢', unlockPrestige: 75, description: "Le rotte commerciali del mondo passano da qui.", pyramidRow: 3, buildings: ['private_dock', 'cargo_terminal', 'port_dock', 'commercial_port', 'industrial_port', 'logistics_hub', 'global_logistics_hub', 'international_port_network', 'maritime_empire', 'port_alliance', 'route_empire', 'maritime_monopoly', 'naval_citadel', 'ocean_empire', 'sea_dominion'] },
  { key: 'empire', name: 'Impero', icon: '🏛️', unlockPrestige: 100, description: "Il vertice assoluto del potere economico.", pyramidRow: 3, buildings: ['startup', 'emerging_company', 'corporation', 'multinational', 'diversified_multinational', 'conglomerate', 'global_conglomerate', 'corporate_empire', 'global_economic_dominion', 'world_syndicate', 'transnational_empire', 'global_monopoly', 'power_citadel', 'borderless_empire', 'absolute_dominion'] },
  { key: 'hegemony', name: 'Egemonia', icon: '👑', unlockPrestige: 150, description: "Non esiste nulla di più grande. Sei la storia stessa.", pyramidRow: 4, buildings: ['elite_council', 'international_trust', 'economic_cartel', 'global_syndicate', 'supranational_consortium', 'world_directorate', 'global_economic_order', 'throne_of_capital', 'absolute_hegemony', 'supreme_order', 'eternal_empire', 'total_sovereignty', 'infinite_dominion', 'absolute_throne', 'economic_singularity'] },
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

export function getUnlockedCategories(prestige: number): BuildingCategory[] {
  return CATEGORIES.filter(c => prestige >= c.unlockPrestige)
}

export function getNextLockedCategory(prestige: number): BuildingCategory | null {
  const locked = CATEGORIES.filter(c => prestige < c.unlockPrestige)
  return locked.length > 0 ? locked[0] : null
}

export function groupCategoriesByPyramidRow(cats: BuildingCategory[]): Record<number, BuildingCategory[]> {
  const grouped: Record<number, BuildingCategory[]> = {}
  for (const cat of cats) {
    if (!grouped[cat.pyramidRow]) grouped[cat.pyramidRow] = []
    grouped[cat.pyramidRow].push(cat)
  }
  return grouped
}
