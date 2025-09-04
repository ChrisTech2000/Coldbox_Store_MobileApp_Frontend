import moize from 'moize';

import HttpClient from './HttpClient';

import ColdtivateService from './ColdtivateService';

// eslint-disable-next-line
// @ts-ignore
function EntireDatasetPreloader<K extends number, V extends NonNullable<unknown>>(
  loadAllDatums: () => Promise<V[]>,
  key: string = 'id'
) {
  const getK = (obj: V) => {
    const objKey = key in obj ? key : 'id';
    // eslint-disable-next-line
    // @ts-ignore
    return `${obj[objKey]}`;
  };
  const listLoader = moize.promise(loadAllDatums);
  const dictLoader = moize.promise(async () => {
    const arr = await listLoader();
    return Object.fromEntries(arr.map((obj) => [getK(obj), obj])) as { [key: string]: V };
  });

  return {
    getById: async (id: K) => {
      const dict = await dictLoader();
      return dict[`${id}`];
    },
    getByIds: async (ids: Array<K>) => {
      const dict = await dictLoader();
      return ids.map((id) => dict[`${id}`]);
    },
    getAll: () => listLoader(),
    getAllAsMap: () => dictLoader(),
    some: async (predicate: (value: V) => boolean) => (await listLoader()).some(predicate),
    find: async (predicate: (value: V) => boolean) => (await listLoader()).find(predicate),
    clearCache: (): void => {
      listLoader.clear();
      dictLoader.clear();
    },
  };
}

class DataloaderService extends HttpClient {
  ///
  // Getters
  ///

  // Dataloader based getters
  readonly users = EntireDatasetPreloader(async () => await ColdtivateService.getUsers());
  readonly companies = EntireDatasetPreloader(async () => {
    const companies = await ColdtivateService.getCompanies();
    return companies ?? [];
  });
  readonly marketplaceCompanies = EntireDatasetPreloader(async () => {
    const companies = await ColdtivateService.getCompanies({ isMarketplace: true });
    return companies ?? [];
  });
  readonly crops = EntireDatasetPreloader(async () => {
    const crops = await ColdtivateService.getAllCrops();
    return crops ?? [];
  });
  readonly coolingUnits = EntireDatasetPreloader(async () => {
    const coolingUnits = await ColdtivateService.getCoolingUnits({});
    return coolingUnits ?? [];
  });
  readonly farmers = EntireDatasetPreloader(async () => {
    const farmers = await ColdtivateService.getFarmers();
    return farmers ?? [];
  });

  public clearAllCaches(): void {
    this.users.clearCache();
    this.companies.clearCache();
    this.marketplaceCompanies.clearCache();
    this.crops.clearCache();
    this.coolingUnits.clearCache();
    this.farmers.clearCache();
  }
}

export default new DataloaderService();
