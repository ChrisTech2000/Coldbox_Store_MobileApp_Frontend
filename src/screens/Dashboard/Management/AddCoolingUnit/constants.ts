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

export type PowerSourcesIds = 'generator' | 'grid' | 'pvpanels' | 'biomass' | 'hybrid' | string;

export const POWER_SOURCES: Record<PowerSourcesIds, string> = {
  generator: 'Generator',
  grid: 'Grid',
  pvpanels: 'PV Panels',
  biomass: 'Biomass',
  hybrid: 'Hybrid',
};

export type ElectricityStorageIds = 'battery' | 'thermal storage' | 'hybrid' | 'none' | string;

export const ELECTRICITY_STORAGE: Record<ElectricityStorageIds, string> = {
  battery: 'Batteries',
  'thermal storage': 'Thermal storage / Icepacks',
  hybrid: 'Hybrid',
  none: 'None',
};
