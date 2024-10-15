import { Translator, dateFmt } from '#i18n/utils';
import SMSService from '#services/SmsService';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EMovementType } from '#types/global';

export async function sendSMS(
  userContact: string,
  movement: GetMovementsHistoryResponse[number],
  companyName: string,
  price: string,
  t: Translator
) {
  const movementType = t(
    `Dashboard.History.stringTemplates.movementType.${movement.movementType === EMovementType.IN ? 'checkIn' : 'checkOut'}`
  );

  const movementTypeForDate = t(
    `Dashboard.History.stringTemplates.movementType.${movement.movementType === EMovementType.IN ? 'checkedIn' : 'checkedOut'}`
  );

  const crops = movement.movementCrops.map((crop) => crop.name).join(', ');
  const date = dateFmt(movement.date.toString(), 'dd/MM/yyyy HH:mm a');

  const message = t('Dashboard.History.stringTemplates.sendSMS', {
    companyName,
    movementType,
    code: movement.code,
    crops,
    weight: movement.cratesWeight,
    movementTypeForDate,
    date,
    price,
    farmersName: movement.owner,
  });

  await SMSService.sendSMS({
    phoneNumber: userContact,
    message,
  });
}
