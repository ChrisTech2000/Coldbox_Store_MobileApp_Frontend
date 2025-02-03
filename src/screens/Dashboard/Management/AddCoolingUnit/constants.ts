export const COOLING_UNIT_TYPES = {
  FARM_GATE_STORAGE_ROOM: 'FARM_GATE_STORAGE_ROOM',
  MARKET_STORAGE_ROOM: 'MARKET_STORAGE_ROOM',
  MOVABLE_UNIT: 'MOVABLE_UNIT',
  OTHER: 'OTHER',
} as const;

export type CoolingUnitTypes = keyof typeof COOLING_UNIT_TYPES;

export const PRICING_TYPE = {
  PER_DAY: 'PERIODICITY',
  FIXED: 'FIXED',
} as const;

export const METRIC_UNITS = {
  KG: 'KILOGRAMS',
  CRATES: 'CRATES',
} as const;

export const REFRIGERANTS = [
  'R290',
  'R-410A',
  'R-407C',
  'R717',
  'R600',
  'R600A',
  'R601',
  'R601A',
  'Other',
] as const;

export type RefrigerantTypes = (typeof REFRIGERANTS)[number];

export const POWER_SOURCES = {
  generator: 'Generator',
  grid: 'Grid',
  pvpanels: 'PV Panels',
  biomass: 'Biomass',
  hybrid: 'Hybrid',
} as const;

export type PowerSourcesIds = keyof typeof POWER_SOURCES;

export const ELECTRICITY_STORAGE = {
  battery: 'Batteries',
  'thermal storage': 'Thermal storage / Icepacks',
  hybrid: 'Hybrid',
  none: 'None',
} as const;

export type ElectricityStorageIds = keyof typeof ELECTRICITY_STORAGE;

export const PV_PANELS_TYPES = {
  monocrystalline: 'Monocrystalline Solar Panels (Mono - SI)',
  polycrystalline: 'Polycrystalline Solar Panels (p - Si)',
  amorphous: 'Thin - Film: Amorphous Silicon Solar Panels (A - SI)',
  concentrated: 'Concentrated PV Cell (CVP)',
  other: 'Other',
  none: 'None',
} as const;

export type PvPanelsTypes = keyof typeof PV_PANELS_TYPES;

export const THERMAL_STORAGE_TYPES = {
  'phase change material': 'Phase Change Materials(e.g., parrafin wax)',
  'ice block storage': 'Iceblocks Storage',
  'chilled water storage': 'Chilled Water Storage',
  other: 'Other',
  none: 'None',
} as const;

export type ThermalStorageTypes = keyof typeof THERMAL_STORAGE_TYPES;

export const BATTERY_TYPES = {
  'lead acid': 'Lead acid batteries',
  'lithium ion': 'Lithium ion batteries',
  'nickel based': 'Nickel based batteries',
  flow: 'Flow batteries',
  other: 'Other',
  none: 'None',
} as const;

export type BatteryTypes = keyof typeof BATTERY_TYPES;

export const SENSOR_TYPES = ['ecozen', 'ubibot', 'figorr', 'victron'] as const;

export type SensorTypes = (typeof SENSOR_TYPES)[number];
