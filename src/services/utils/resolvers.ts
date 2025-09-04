import DataloaderService from '#services/DataloaderService';

export const resolveCropInfo = async (cropId: number) => {
  const crop = await DataloaderService.crops.getById(cropId);

  return {
    id: cropId,
    name: crop?.name ?? '',
  };
};

export const resolveOwnerName = async (
  ownedByUserId?: number | null,
  onBehalfOfCompanyId?: number | null
): Promise<string> => {
  if (onBehalfOfCompanyId) {
    const company = await DataloaderService.marketplaceCompanies.getById(onBehalfOfCompanyId);
    return company?.name ?? '';
  }

  if (ownedByUserId) {
    const user = await DataloaderService.users.getById(ownedByUserId);
    return user ? `${user.firstName ?? ''} ${user.lastName ?? ''}` : '';
  }

  return '';
};
