// buildings.ts
// Configurazione edifici organizzati in CATEGORIE sbloccate per prestige.
// Ogni categoria contiene 9 edifici; il primo della categoria successiva
// e' sempre leggermente superiore all'ultimo della precedente: la progressione
// e' continua attraverso tutto il gioco, non solo dentro una categoria.

import type { BuildingType, BuildingCategory } from './types'

export const BUILDINGS: Record<string, BuildingType> = {
  shack: {
    name: 'Baracca',
    baseCost: 100,
    baseIncome: 10,
    costMultiplier: 1.15,
    incomeMultiplier: 1.2,
    icon: '🏠',
    category: 'residential'
  },
  house_small: {
    name: 'Casetta',
    baseCost: 144,
    baseIncome: 13,
    costMultiplier: 1.153,
    incomeMultiplier: 1.205,
    icon: '🏠',
    category: 'residential'
  },
  duplex: {
    name: 'Bilocale',
    baseCost: 208,
    baseIncome: 19,
    costMultiplier: 1.155,
    incomeMultiplier: 1.21,
    icon: '🏠',
    category: 'residential'
  },
  house_medium: {
    name: 'Villetta',
    baseCost: 299,
    baseIncome: 26,
    costMultiplier: 1.158,
    incomeMultiplier: 1.215,
    icon: '🏠',
    category: 'residential'
  },
  house_large: {
    name: 'Villa Suburbana',
    baseCost: 431,
    baseIncome: 36,
    costMultiplier: 1.16,
    incomeMultiplier: 1.22,
    icon: '🏠',
    category: 'residential'
  },
  house_garden: {
    name: 'Villa con Giardino',
    baseCost: 622,
    baseIncome: 51,
    costMultiplier: 1.163,
    incomeMultiplier: 1.225,
    icon: '🏠',
    category: 'residential'
  },
  house_view: {
    name: 'Villa Panoramica',
    baseCost: 896,
    baseIncome: 71,
    costMultiplier: 1.166,
    incomeMultiplier: 1.23,
    icon: '🏠',
    category: 'residential'
  },
  luxury_residence: {
    name: 'Residenza di Prestigio',
    baseCost: 1290,
    baseIncome: 98,
    costMultiplier: 1.168,
    incomeMultiplier: 1.235,
    icon: '🏠',
    category: 'residential'
  },
  private_estate: {
    name: 'Tenuta Privata',
    baseCost: 1860,
    baseIncome: 138,
    costMultiplier: 1.171,
    incomeMultiplier: 1.24,
    icon: '🏠',
    category: 'residential'
  },
  stall: {
    name: 'Bancarella',
    baseCost: 2680,
    baseIncome: 193,
    costMultiplier: 1.174,
    incomeMultiplier: 1.245,
    icon: '🏪',
    category: 'commercial'
  },
  kiosk: {
    name: 'Chiosco',
    baseCost: 3870,
    baseIncome: 269,
    costMultiplier: 1.176,
    incomeMultiplier: 1.25,
    icon: '🏪',
    category: 'commercial'
  },
  minimarket: {
    name: 'Minimarket',
    baseCost: 5570,
    baseIncome: 376,
    costMultiplier: 1.179,
    incomeMultiplier: 1.255,
    icon: '🏪',
    category: 'commercial'
  },
  local_shop: {
    name: 'Negozio di Quartiere',
    baseCost: 8030,
    baseIncome: 527,
    costMultiplier: 1.181,
    incomeMultiplier: 1.26,
    icon: '🏪',
    category: 'commercial'
  },
  boutique: {
    name: 'Boutique',
    baseCost: 11600,
    baseIncome: 738,
    costMultiplier: 1.184,
    incomeMultiplier: 1.265,
    icon: '🏪',
    category: 'commercial'
  },
  concept_store: {
    name: 'Concept Store',
    baseCost: 16700,
    baseIncome: 1030,
    costMultiplier: 1.187,
    incomeMultiplier: 1.27,
    icon: '🏪',
    category: 'commercial'
  },
  showroom: {
    name: 'Showroom',
    baseCost: 24000,
    baseIncome: 1450,
    costMultiplier: 1.189,
    incomeMultiplier: 1.275,
    icon: '🏪',
    category: 'commercial'
  },
  flagship_store: {
    name: 'Flagship Store',
    baseCost: 34700,
    baseIncome: 2040,
    costMultiplier: 1.192,
    incomeMultiplier: 1.28,
    icon: '🏪',
    category: 'commercial'
  },
  commercial_gallery: {
    name: 'Galleria Commerciale',
    baseCost: 49900,
    baseIncome: 2860,
    costMultiplier: 1.195,
    incomeMultiplier: 1.285,
    icon: '🏪',
    category: 'commercial'
  },
  home_garden: {
    name: 'Orto Domestico',
    baseCost: 72000,
    baseIncome: 4030,
    costMultiplier: 1.197,
    incomeMultiplier: 1.29,
    icon: '🌾',
    category: 'agricultural'
  },
  urban_garden: {
    name: 'Orto Urbano',
    baseCost: 104000,
    baseIncome: 5670,
    costMultiplier: 1.2,
    incomeMultiplier: 1.295,
    icon: '🌾',
    category: 'agricultural'
  },
  smallholding: {
    name: 'Podere',
    baseCost: 150000,
    baseIncome: 7980,
    costMultiplier: 1.202,
    incomeMultiplier: 1.3,
    icon: '🌾',
    category: 'agricultural'
  },
  farm: {
    name: 'Fattoria',
    baseCost: 216000,
    baseIncome: 11200,
    costMultiplier: 1.205,
    incomeMultiplier: 1.305,
    icon: '🌾',
    category: 'agricultural'
  },
  modern_farmhouse: {
    name: 'Cascina Moderna',
    baseCost: 311000,
    baseIncome: 15800,
    costMultiplier: 1.208,
    incomeMultiplier: 1.31,
    icon: '🌾',
    category: 'agricultural'
  },
  agri_estate: {
    name: 'Tenuta Agricola',
    baseCost: 448000,
    baseIncome: 22300,
    costMultiplier: 1.21,
    incomeMultiplier: 1.315,
    icon: '🌾',
    category: 'agricultural'
  },
  agri_company: {
    name: 'Azienda Agricola',
    baseCost: 645000,
    baseIncome: 31500,
    costMultiplier: 1.213,
    incomeMultiplier: 1.32,
    icon: '🌾',
    category: 'agricultural'
  },
  rural_coop: {
    name: 'Cooperativa Rurale',
    baseCost: 930000,
    baseIncome: 44400,
    costMultiplier: 1.216,
    incomeMultiplier: 1.325,
    icon: '🌾',
    category: 'agricultural'
  },
  agrifood_district: {
    name: 'Distretto Agroalimentare',
    baseCost: 1340000,
    baseIncome: 62700,
    costMultiplier: 1.218,
    incomeMultiplier: 1.33,
    icon: '🌾',
    category: 'agricultural'
  },
  craft_workshop: {
    name: 'Laboratorio Artigiano',
    baseCost: 1930000,
    baseIncome: 88600,
    costMultiplier: 1.221,
    incomeMultiplier: 1.335,
    icon: '🏭',
    category: 'industrial'
  },
  workshop: {
    name: 'Officina',
    baseCost: 2780000,
    baseIncome: 125000,
    costMultiplier: 1.224,
    incomeMultiplier: 1.34,
    icon: '🏭',
    category: 'industrial'
  },
  small_manufacture: {
    name: 'Piccola Manifattura',
    baseCost: 4010000,
    baseIncome: 177000,
    costMultiplier: 1.226,
    incomeMultiplier: 1.345,
    icon: '🏭',
    category: 'industrial'
  },
  factory: {
    name: 'Fabbrica',
    baseCost: 5780000,
    baseIncome: 250000,
    costMultiplier: 1.229,
    incomeMultiplier: 1.35,
    icon: '🏭',
    category: 'industrial'
  },
  production_plant: {
    name: 'Impianto Produttivo',
    baseCost: 8330000,
    baseIncome: 354000,
    costMultiplier: 1.231,
    incomeMultiplier: 1.355,
    icon: '🏭',
    category: 'industrial'
  },
  plant: {
    name: 'Stabilimento Produttivo',
    baseCost: 11999999,
    baseIncome: 500000,
    costMultiplier: 1.234,
    incomeMultiplier: 1.36,
    icon: '🏭',
    category: 'industrial'
  },
  industrial_complex: {
    name: 'Complesso Industriale',
    baseCost: 17300000,
    baseIncome: 708000,
    costMultiplier: 1.237,
    incomeMultiplier: 1.365,
    icon: '🏭',
    category: 'industrial'
  },
  manufacturing_hub: {
    name: 'Polo Manifatturiero',
    baseCost: 24899999,
    baseIncome: 1000000,
    costMultiplier: 1.239,
    incomeMultiplier: 1.37,
    icon: '🏭',
    category: 'industrial'
  },
  industrial_district: {
    name: 'Distretto Industriale',
    baseCost: 36000000,
    baseIncome: 1420000,
    costMultiplier: 1.242,
    incomeMultiplier: 1.375,
    icon: '🏭',
    category: 'industrial'
  },
  money_changer: {
    name: 'Cambiavalute',
    baseCost: 51799999,
    baseIncome: 2010000,
    costMultiplier: 1.244,
    incomeMultiplier: 1.38,
    icon: '🏦',
    category: 'financial'
  },
  bank_branch: {
    name: 'Sportello Bancario',
    baseCost: 74700000,
    baseIncome: 2850000,
    costMultiplier: 1.247,
    incomeMultiplier: 1.385,
    icon: '🏦',
    category: 'financial'
  },
  local_branch: {
    name: 'Filiale Locale',
    baseCost: 108000000,
    baseIncome: 4040000,
    costMultiplier: 1.25,
    incomeMultiplier: 1.39,
    icon: '🏦',
    category: 'financial'
  },
  regional_bank: {
    name: 'Banca Regionale',
    baseCost: 155000000,
    baseIncome: 5730000,
    costMultiplier: 1.252,
    incomeMultiplier: 1.395,
    icon: '🏦',
    category: 'financial'
  },
  national_bank: {
    name: 'Banca Nazionale',
    baseCost: 224000000,
    baseIncome: 8130000,
    costMultiplier: 1.255,
    incomeMultiplier: 1.4,
    icon: '🏦',
    category: 'financial'
  },
  investment_fund: {
    name: 'Fondo d'Investimento',
    baseCost: 322000000,
    baseIncome: 11499999,
    costMultiplier: 1.258,
    incomeMultiplier: 1.405,
    icon: '🏦',
    category: 'financial'
  },
  finance_company: {
    name: 'Società Finanziaria',
    baseCost: 464000000,
    baseIncome: 16399999,
    costMultiplier: 1.26,
    incomeMultiplier: 1.41,
    icon: '🏦',
    category: 'financial'
  },
  banking_group: {
    name: 'Gruppo Bancario',
    baseCost: 669000000,
    baseIncome: 23199999,
    costMultiplier: 1.263,
    incomeMultiplier: 1.415,
    icon: '🏦',
    category: 'financial'
  },
  financial_holding: {
    name: 'Holding Finanziaria',
    baseCost: 965000000,
    baseIncome: 32999999,
    costMultiplier: 1.266,
    incomeMultiplier: 1.42,
    icon: '🏦',
    category: 'financial'
  },
  inn: {
    name: 'Locanda',
    baseCost: 1390000000,
    baseIncome: 46799999,
    costMultiplier: 1.268,
    incomeMultiplier: 1.425,
    icon: '🏨',
    category: 'tourism'
  },
  boutique_hotel: {
    name: 'Boutique Hotel',
    baseCost: 2000000000,
    baseIncome: 66499999,
    costMultiplier: 1.271,
    incomeMultiplier: 1.43,
    icon: '🏨',
    category: 'tourism'
  },
  city_hotel: {
    name: 'Hotel di Città',
    baseCost: 2890000000,
    baseIncome: 94499999,
    costMultiplier: 1.273,
    incomeMultiplier: 1.435,
    icon: '🏨',
    category: 'tourism'
  },
  resort: {
    name: 'Resort',
    baseCost: 4160000000,
    baseIncome: 134000000,
    costMultiplier: 1.276,
    incomeMultiplier: 1.44,
    icon: '🏨',
    category: 'tourism'
  },
  luxury_resort: {
    name: 'Resort di Lusso',
    baseCost: 6000000000,
    baseIncome: 191000000,
    costMultiplier: 1.279,
    incomeMultiplier: 1.445,
    icon: '🏨',
    category: 'tourism'
  },
  grand_hotel: {
    name: 'Grand Hotel',
    baseCost: 8650000000,
    baseIncome: 271000000,
    costMultiplier: 1.281,
    incomeMultiplier: 1.45,
    icon: '🏨',
    category: 'tourism'
  },
  tourist_village: {
    name: 'Villaggio Turistico',
    baseCost: 12500000000,
    baseIncome: 386000000,
    costMultiplier: 1.284,
    incomeMultiplier: 1.455,
    icon: '🏨',
    category: 'tourism'
  },
  hotel_chain: {
    name: 'Catena Alberghiera',
    baseCost: 18000000000,
    baseIncome: 548000000,
    costMultiplier: 1.286,
    incomeMultiplier: 1.46,
    icon: '🏨',
    category: 'tourism'
  },
  hospitality_empire: {
    name: 'Impero dell'Ospitalità',
    baseCost: 25900000000,
    baseIncome: 780000000,
    costMultiplier: 1.289,
    incomeMultiplier: 1.465,
    icon: '🏨',
    category: 'tourism'
  },
  office_building: {
    name: 'Palazzina Uffici',
    baseCost: 37300000000,
    baseIncome: 1110000000,
    costMultiplier: 1.292,
    incomeMultiplier: 1.47,
    icon: '🌆',
    category: 'metro'
  },
  office_tower: {
    name: 'Torre Uffici',
    baseCost: 53800000000,
    baseIncome: 1580000000,
    costMultiplier: 1.294,
    incomeMultiplier: 1.475,
    icon: '🌆',
    category: 'metro'
  },
  business_complex: {
    name: 'Complesso Direzionale',
    baseCost: 77500000000,
    baseIncome: 2250000000,
    costMultiplier: 1.297,
    incomeMultiplier: 1.48,
    icon: '🌆',
    category: 'metro'
  },
  skyscraper: {
    name: 'Grattacielo',
    baseCost: 112000000000,
    baseIncome: 3200000000,
    costMultiplier: 1.3,
    incomeMultiplier: 1.485,
    icon: '🌆',
    category: 'metro'
  },
  panoramic_skyscraper: {
    name: 'Grattacielo Panoramico',
    baseCost: 161000000000,
    baseIncome: 4550000000,
    costMultiplier: 1.302,
    incomeMultiplier: 1.49,
    icon: '🌆',
    category: 'metro'
  },
  business_district: {
    name: 'Distretto Direzionale',
    baseCost: 232000000000,
    baseIncome: 6480000000,
    costMultiplier: 1.305,
    incomeMultiplier: 1.495,
    icon: '🌆',
    category: 'metro'
  },
  twin_tower: {
    name: 'Torre Gemella',
    baseCost: 334000000000,
    baseIncome: 9220000000,
    costMultiplier: 1.308,
    incomeMultiplier: 1.5,
    icon: '🌆',
    category: 'metro'
  },
  corporate_center: {
    name: 'Centro Direzionale',
    baseCost: 482000000000,
    baseIncome: 13100000000,
    costMultiplier: 1.31,
    incomeMultiplier: 1.505,
    icon: '🌆',
    category: 'metro'
  },
  corporate_skyline: {
    name: 'Skyline Corporativo',
    baseCost: 695000000000,
    baseIncome: 18700000000,
    costMultiplier: 1.313,
    incomeMultiplier: 1.51,
    icon: '🌆',
    category: 'metro'
  },
  private_dock: {
    name: 'Molo Privato',
    baseCost: 1000000000000,
    baseIncome: 26600000000,
    costMultiplier: 1.315,
    incomeMultiplier: 1.515,
    icon: '🚢',
    category: 'port'
  },
  cargo_terminal: {
    name: 'Terminal Merci',
    baseCost: 1440000000000,
    baseIncome: 38000000000,
    costMultiplier: 1.318,
    incomeMultiplier: 1.52,
    icon: '🚢',
    category: 'port'
  },
  port_dock: {
    name: 'Scalo Portuale',
    baseCost: 2080000000000,
    baseIncome: 54100000000,
    costMultiplier: 1.321,
    incomeMultiplier: 1.525,
    icon: '🚢',
    category: 'port'
  },
  commercial_port: {
    name: 'Porto Commerciale',
    baseCost: 3000000000000,
    baseIncome: 77100000000,
    costMultiplier: 1.323,
    incomeMultiplier: 1.53,
    icon: '🚢',
    category: 'port'
  },
  industrial_port: {
    name: 'Porto Industriale',
    baseCost: 4320000000000,
    baseIncome: 110000000000,
    costMultiplier: 1.326,
    incomeMultiplier: 1.535,
    icon: '🚢',
    category: 'port'
  },
  logistics_hub: {
    name: 'Hub Logistico',
    baseCost: 6220000000000,
    baseIncome: 157000000000,
    costMultiplier: 1.329,
    incomeMultiplier: 1.54,
    icon: '🚢',
    category: 'port'
  },
  global_logistics_hub: {
    name: 'Hub Logistico Globale',
    baseCost: 8970000000000,
    baseIncome: 223000000000,
    costMultiplier: 1.331,
    incomeMultiplier: 1.545,
    icon: '🚢',
    category: 'port'
  },
  international_port_network: {
    name: 'Rete Portuale Internazionale',
    baseCost: 12900000000000,
    baseIncome: 318000000000,
    costMultiplier: 1.334,
    incomeMultiplier: 1.55,
    icon: '🚢',
    category: 'port'
  },
  maritime_empire: {
    name: 'Impero Marittimo',
    baseCost: 18600000000000,
    baseIncome: 454000000000,
    costMultiplier: 1.336,
    incomeMultiplier: 1.555,
    icon: '🚢',
    category: 'port'
  },
  startup: {
    name: 'Start-up',
    baseCost: 26900000000000,
    baseIncome: 647000000000,
    costMultiplier: 1.339,
    incomeMultiplier: 1.56,
    icon: '🏛️',
    category: 'empire'
  },
  emerging_company: {
    name: 'Azienda Emergente',
    baseCost: 38700000000000,
    baseIncome: 923000000000,
    costMultiplier: 1.342,
    incomeMultiplier: 1.565,
    icon: '🏛️',
    category: 'empire'
  },
  corporation: {
    name: 'Società per Azioni',
    baseCost: 55800000000000,
    baseIncome: 1320000000000,
    costMultiplier: 1.344,
    incomeMultiplier: 1.57,
    icon: '🏛️',
    category: 'empire'
  },
  multinational: {
    name: 'Multinazionale',
    baseCost: 80400000000000,
    baseIncome: 1880000000000,
    costMultiplier: 1.347,
    incomeMultiplier: 1.575,
    icon: '🏛️',
    category: 'empire'
  },
  diversified_multinational: {
    name: 'Multinazionale Diversificata',
    baseCost: 116000000000000,
    baseIncome: 2680000000000,
    costMultiplier: 1.35,
    incomeMultiplier: 1.58,
    icon: '🏛️',
    category: 'empire'
  },
  conglomerate: {
    name: 'Conglomerato',
    baseCost: 167000000000000,
    baseIncome: 3820000000000,
    costMultiplier: 1.352,
    incomeMultiplier: 1.585,
    icon: '🏛️',
    category: 'empire'
  },
  global_conglomerate: {
    name: 'Conglomerato Globale',
    baseCost: 241000000000000,
    baseIncome: 5460000000000,
    costMultiplier: 1.355,
    incomeMultiplier: 1.59,
    icon: '🏛️',
    category: 'empire'
  },
  corporate_empire: {
    name: 'Impero Corporativo',
    baseCost: 347000000000000,
    baseIncome: 7790000000000,
    costMultiplier: 1.357,
    incomeMultiplier: 1.595,
    icon: '🏛️',
    category: 'empire'
  },
  global_economic_dominion: {
    name: 'Dominio Economico Globale',
    baseCost: 500000000000000,
    baseIncome: 11100000000000,
    costMultiplier: 1.36,
    incomeMultiplier: 1.6,
    icon: '🏛️',
    category: 'empire'
  },
}

export const CATEGORIES: BuildingCategory[] = [
  { key: 'residential', name: 'Residenziale', icon: '🏠', unlockPrestige: 0, description: "Il punto di partenza di ogni impero.", buildings: ['shack', 'house_small', 'duplex', 'house_medium', 'house_large', 'house_garden', 'house_view', 'luxury_residence', 'private_estate'] },
  { key: 'commercial', name: 'Commerciale', icon: '🏪', unlockPrestige: 4, description: "Il commercio muove la città.", buildings: ['stall', 'kiosk', 'minimarket', 'local_shop', 'boutique', 'concept_store', 'showroom', 'flagship_store', 'commercial_gallery'] },
  { key: 'agricultural', name: 'Agricola', icon: '🌾', unlockPrestige: 10, description: "La terra è ricchezza, se sai coltivarla.", buildings: ['home_garden', 'urban_garden', 'smallholding', 'farm', 'modern_farmhouse', 'agri_estate', 'agri_company', 'rural_coop', 'agrifood_district'] },
  { key: 'industrial', name: 'Industriale', icon: '🏭', unlockPrestige: 18, description: "Produzione su scala industriale.", buildings: ['craft_workshop', 'workshop', 'small_manufacture', 'factory', 'production_plant', 'plant', 'industrial_complex', 'manufacturing_hub', 'industrial_district'] },
  { key: 'financial', name: 'Finanziaria', icon: '🏦', unlockPrestige: 28, description: "Il denaro genera denaro.", buildings: ['money_changer', 'bank_branch', 'local_branch', 'regional_bank', 'national_bank', 'investment_fund', 'finance_company', 'banking_group', 'financial_holding'] },
  { key: 'tourism', name: 'Turistica', icon: '🏨', unlockPrestige: 40, description: "Ospitalità d'élite per chi ha già dimostrato valore.", buildings: ['inn', 'boutique_hotel', 'city_hotel', 'resort', 'luxury_resort', 'grand_hotel', 'tourist_village', 'hotel_chain', 'hospitality_empire'] },
  { key: 'metro', name: 'Metropolitana', icon: '🌆', unlockPrestige: 55, description: "Domina lo skyline della città.", buildings: ['office_building', 'office_tower', 'business_complex', 'skyscraper', 'panoramic_skyscraper', 'business_district', 'twin_tower', 'corporate_center', 'corporate_skyline'] },
  { key: 'port', name: 'Portuale', icon: '🚢', unlockPrestige: 75, description: "Le rotte commerciali del mondo passano da qui.", buildings: ['private_dock', 'cargo_terminal', 'port_dock', 'commercial_port', 'industrial_port', 'logistics_hub', 'global_logistics_hub', 'international_port_network', 'maritime_empire'] },
  { key: 'empire', name: 'Impero', icon: '🏛️', unlockPrestige: 100, description: "Il vertice assoluto del potere economico.", buildings: ['startup', 'emerging_company', 'corporation', 'multinational', 'diversified_multinational', 'conglomerate', 'global_conglomerate', 'corporate_empire', 'global_economic_dominion'] },
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
// La curva di prestige guadagnato E le soglie di sblocco delle categorie crescono
// entrambe in modo superlineare: più prestige hai, più ce ne vuole per il prossimo
// traguardo. Reset rapidi rendono poco, reset pazienti rendono molto di più.
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

// ─── Categorie: sblocco progressivo per prestige ───

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
