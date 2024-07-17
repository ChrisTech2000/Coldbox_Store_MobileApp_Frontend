export const COOLING_UNIT_TYPES = {
  FARM_GATE_STORAGE_ROOM: 'farm-gate-storage-room',
  MARKET_STORAGE_ROOM: 'market-storage-room',
  MOVABLE_UNIT: 'movable-unit',
  OTHER: 'other',
} as const;

export const PRICING_TYPE = {
  PER_DAY: 'PERIODICITY',
  FIXED: 'FIXED',
} as const;

export const METRIC_UNITS = {
  KG: 'KILOGRAMS',
  CRATES: 'CRATES',
} as const;

export const REFRIGERANTS: Array<string> = [
  'R290',
  'R-410A',
  'R-407C',
  'R717',
  'R600',
  'R600A',
  'R601',
  'R601A',
  'Other',
];

export type PowerSourcesIds = 'generator' | 'grid' | 'pvpanels' | 'biomass' | 'hybrid';

export const POWER_SOURCES: Record<PowerSourcesIds, string> = {
  generator: 'Generator',
  grid: 'Grid',
  pvpanels: 'PV Panels',
  biomass: 'Biomass',
  hybrid: 'Hybrid',
};

export type ElectricityStorageIds = 'battery' | 'thermal storage' | 'hybrid' | 'none';

export const ELECTRICITY_STORAGE: Record<ElectricityStorageIds, string> = {
  battery: 'Batteries',
  'thermal storage': 'Thermal storage / Icepacks',
  hybrid: 'Hybrid',
  none: 'None',
};

export type PvPanelsTypes =
  | 'monocrystalline'
  | 'polycrystalline'
  | 'amorphous'
  | 'concentrated'
  | 'other'
  | 'none';

export const PV_PANELS_TYPES: Record<PvPanelsTypes, string> = {
  monocrystalline: 'Monocrystalline Solar Panels (Mono - SI)',
  polycrystalline: 'Polycrystalline Solar Panels (p - Si)',
  amorphous: 'Thin - Film: Amorphous Silicon Solar Panels (A - SI)',
  concentrated: 'Concentrated PV Cell (CVP)',
  other: 'Other',
  none: 'None',
};
