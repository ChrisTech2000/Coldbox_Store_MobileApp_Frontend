import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { FileUtility } from '#ui/lib/file';
import reportCrash from '#ui/lib/reportCrash';

import InAppNotifications from '#common/InAppNotifications';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { DEFAULT_CROP_VALUES } from '#screens/Dashboard/Main/Marketplace/utils';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { MovementCrate, type CoolingUnit } from '#types/global';

type CheckInDataProps = {
  companyName: string;
  coolingUnit: CoolingUnit | null;
  currency: string;
  movement: GetMovementsHistoryResponse[number];
  dismissModal: () => void;
};

export function CheckInData(props: CheckInDataProps) {
  const { companyName, coolingUnit, currency, movement, dismissModal } = props;

  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const generatePDF = useCallback(async () => {
    setIsProcessing(true);

    try {
      const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { width: 90%; background-color: #ffffff; margin: 0 auto; padding: 10px; border-radius: 5px; }
            .title { font-size: 20px; font-weight: bold; margin-bottom: 10px; }
            .section { display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 10px; }
            .column { width: 30%; }
            .label { font-weight: bold; }
            .value { font-size: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }
            th { background-color: #f2f2f2; }
            .total-row { background-color: #f2f2f2; font-weight: bold; }
            .button { margin-top: 10px; padding: 10px 20px; background-color: #007bff; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; }
            .button:hover { background-color: #0056b3; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="title">${t('Dashboard.History.pdfModal.checkIn.title')}</div>

            <div class="section">
              <div class="column">
                <div class="label">${t('Dashboard.History.pdfModal.checkIn.codeLabel')}</div>
                <div class="value">${movement.code}</div>
              </div>
              <div class="column">
                <div class="label">${t('Dashboard.History.pdfModal.checkIn.companyLabel')}</div>
                <div class="value">${companyName}</div>
              </div>
              <div class="column">
                <div class="label">${t('Dashboard.History.pdfModal.checkIn.coolingUnitLabel')}</div>
                <div class="value">${coolingUnit?.name ?? ''}</div>
              </div>
            </div>

            <div class="section">
              <div class="column">
                <div class="label">${t('Dashboard.Marketplace.owner')}</div>
                <div class="value">${movement.checkin?.ownerName}</div>
              </div>
              <div class="column">
                <div class="label">${t('Dashboard.History.pdfModal.checkIn.operatorLabel')}</div>
                <div class="value">${movement.operator}</div>
              </div>
              <div class="column">
                <div class="label">${t('Dashboard.History.pdfModal.dateLabel')}</div>
                <div class="value">${dateFmt(movement.date.toString(), 'MMM dd yyyy')}</div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>${t('Dashboard.History.pdfModal.checkIn.cropLabel')}</th>
                  <th>${t('Dashboard.History.pdfModal.checkIn.numberOfCratesLabel')}</th>
                  <th>${t('Dashboard.History.pdfModal.weightLabel')}</th>
                  <th>${t('Dashboard.History.pdfModal.checkIn.priceLabel', { currency })}</th>
                </tr>
              </thead>
              <tbody>
                ${movement.checkin?.crates
                  .reduce(
                    (acc, curr) => {
                      if (!acc.find((crop) => crop?.id === curr.crop?.id)) {
                        acc.push(curr.crop);
                      }
                      return acc;
                    },
                    [] as Array<MovementCrate['crop']>
                  )
                  .map((crop) => {
                    const crates = movement.checkin?.crates.filter(
                      (crate) => crate.cropId === crop?.id
                    );
                    const totalWeight = crates.reduce(
                      (acc, current) => (acc += current.initialWeight),
                      0
                    );
                    const totalPrice = (
                      (coolingUnit?.commonPricingType?.value ?? 0) * crates.length
                    ).toFixed(2);

                    return `
                                <tr>
                                  <td>${crop?.name ?? ''}</td>
                                  <td>${crates.length}</td>
                                  <td>${totalWeight}</td>
                                  <td>${totalPrice}</td>
                                </tr>
                              `;
                  })
                  .join('')}
                <tr class="total-row">
                  <td>${t('Dashboard.History.pdfModal.checkIn.totalLabel')}</td>
                  <td>${movement.checkin?.crates.length}</td>
                  <td>${movement.checkin?.crates.reduce((acc, current) => (acc += current.initialWeight), 0)}</td>
                  <td>${((coolingUnit?.commonPricingType?.value ?? 0) * movement.checkin?.crates.length).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

      const fileName = t('Dashboard.History.pdfModal.downloadName', { code: movement.code });

      await FileUtility.createPdfFromHtml(html, fileName);

      toast.show(t('Dashboard.History.pdfModal.successMessage'), { type: 'md_success' });
      dismissModal();
    } catch (exception) {
      toast.show(t('Dashboard.History.pdfModal.errorMessage'), {
        type: 'md_danger',
      });
      reportCrash(exception as Error, {
        extras: {
          errorContext: 'PDF Generation',
          hasMovementCheckIn: !!movement.checkin.crates.length,
          coolingUnitDataPresent: !!coolingUnit,
        },
      });
    } finally {
      setIsProcessing(false);
    }
  }, [t, toast, movement, coolingUnit, currency, companyName]);

  return (
    <React.Fragment>
      <View tw="flex flex-row space-x-1">
        <View tw="w-1/3">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.History.pdfModal.checkIn.codeLabel')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {movement.code}
          </Text>
        </View>

        <View tw="w-1/3">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.History.pdfModal.checkIn.companyLabel')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {companyName}
          </Text>
        </View>

        <View tw="w-1/3">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.History.pdfModal.checkIn.coolingUnitLabel')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {coolingUnit?.name ?? ''}
          </Text>
        </View>
      </View>

      <View tw="flex flex-row space-x-1">
        <View tw="w-1/3">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.Marketplace.owner')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {movement.checkin?.ownerName}
          </Text>
        </View>

        <View tw="w-1/3">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.History.pdfModal.checkIn.operatorLabel')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {movement.operator}
          </Text>
        </View>

        <View tw="w-1/3">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.History.pdfModal.dateLabel')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {dateFmt(movement.date.toString(), 'MMM dd yyyy')}
          </Text>
        </View>
      </View>

      <ScrollView tw="max-h-72" showsVerticalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header tw="bg-gray-200 space-x-1">
            <DataTable.Title numberOfLines={2}>
              {t('Dashboard.History.pdfModal.checkIn.cropLabel')}
            </DataTable.Title>
            <DataTable.Title numeric numberOfLines={2}>
              {t('Dashboard.History.pdfModal.checkIn.numberOfCratesLabel')}
            </DataTable.Title>
            <DataTable.Title numeric numberOfLines={2}>
              {t('Dashboard.History.pdfModal.weightLabel')}
            </DataTable.Title>
            <DataTable.Title numeric numberOfLines={2}>
              {t('Dashboard.History.pdfModal.checkIn.priceLabel', { currency })}
            </DataTable.Title>
          </DataTable.Header>

          {movement.checkin?.crates
            .reduce(
              (acc, curr) => {
                if (!acc.find((crop) => crop?.id === curr.crop?.id)) {
                  acc.push(curr.crop);
                }
                return acc;
              },
              [] as Array<MovementCrate['crop']>
            )
            .map((crop, index) => {
              const crates = movement.checkin?.crates.filter((crate) => crate.cropId === crop?.id);
              return (
                <DataTable.Row key={`${crop?.name || DEFAULT_CROP_VALUES.name}-${index}`}>
                  <DataTable.Cell>{crop?.name || DEFAULT_CROP_VALUES.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{crates.length}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {crates.reduce((acc, current) => (acc += current.initialWeight), 0)}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {((coolingUnit?.commonPricingType?.value ?? 0) * crates.length).toFixed(2)}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}

          <DataTable.Row tw="bg-gray-200">
            <DataTable.Cell>
              <Text tw="font-bold">{t('Dashboard.History.pdfModal.checkIn.totalLabel')}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text tw="font-bold">{movement.checkin?.crates.length}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text tw="font-bold">
                {movement.checkin?.crates.reduce((acc, curr) => (acc += curr.initialWeight), 0)}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text tw="font-bold">
                {(
                  (coolingUnit?.commonPricingType?.value ?? 0) * movement.checkin?.crates.length
                ).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ScrollView>

      <Button tw="mt-4" mode="contained" onPress={generatePDF} disabled={isProcessing}>
        {t('Dashboard.History.pdfModal.downloadButton')}
      </Button>
    </React.Fragment>
  );
}
