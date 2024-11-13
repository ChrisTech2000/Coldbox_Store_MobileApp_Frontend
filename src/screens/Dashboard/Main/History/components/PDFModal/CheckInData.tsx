import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { type CoolingUnit } from '#types/global';
import InAppNotifications from '#common/InAppNotifications';
import { savePDF } from '#ui/lib/pdf';

type CheckInDataProps = {
  companyName: string;
  coolingUnit: CoolingUnit | null;
  currency: string;
  movement: GetMovementsHistoryResponse[number];
  dismissModal: () => void;
};

export function CheckInData({
  companyName,
  coolingUnit,
  currency,
  movement,
  dismissModal,
}: CheckInDataProps) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const generatePDF = useCallback(async () => {
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
                <div class="label">${t('Dashboard.History.pdfModal.coolingUserLabel')}</div>
                <div class="value">${movement.owner}</div>
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
                ${movement.movementCrops
                  .map((crop) => {
                    const crates = movement.cratesCheckin.filter(
                      (crate) => crate.name === crop.name
                    );
                    const totalWeight = crates.reduce((acc, current) => (acc += current.weight), 0);
                    const totalPrice = (
                      (coolingUnit?.commonPricingType.value ?? 0) * crates.length
                    ).toFixed(2);

                    return `
                                <tr>
                                  <td>${crop.name}</td>
                                  <td>${crates.length}</td>
                                  <td>${totalWeight}</td>
                                  <td>${totalPrice}</td>
                                </tr>
                              `;
                  })
                  .join('')}
                <tr class="total-row">
                  <td>${t('Dashboard.History.pdfModal.checkIn.totalLabel')}</td>
                  <td>${movement.cratesCheckin.length}</td>
                  <td>${movement.cratesWeight}</td>
                  <td>${((coolingUnit?.commonPricingType.value ?? 0) * movement.cratesCheckin.length).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    const fileName = t('Dashboard.History.pdfModal.downloadName', { code: movement.code });

    try {
      await savePDF(html, fileName);
      toast.show(t('Dashboard.History.pdfModal.successMessage'), {
        type: 'md_success',
      });
      dismissModal();
    } catch {
      toast.show(t('Dashboard.History.pdfModal.errorMessage'), {
        type: 'md_danger',
      });
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
            {t('Dashboard.History.pdfModal.coolingUserLabel')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {movement.owner}
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

      <ScrollView tw="max-h-[70%]" showsVerticalScrollIndicator={false}>
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

          {movement.movementCrops.map((crop, index) => {
            const crates = movement.cratesCheckin.filter((crate) => crate.name === crop.name);

            return (
              <DataTable.Row key={`${crop.name}-${index}`}>
                <DataTable.Cell>{crop.name}</DataTable.Cell>
                <DataTable.Cell numeric>{crates.length}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {crates.reduce((acc, current) => (acc += current.weight), 0)}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {((coolingUnit?.commonPricingType.value ?? 0) * crates.length).toFixed(2)}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}

          <DataTable.Row tw="bg-gray-200">
            <DataTable.Cell>
              <Text tw="font-bold">{t('Dashboard.History.pdfModal.checkIn.totalLabel')}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text tw="font-bold">{movement.cratesCheckin.length}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text tw="font-bold">{movement.cratesWeight}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text tw="font-bold">
                {(
                  (coolingUnit?.commonPricingType.value ?? 0) * movement.cratesCheckin.length
                ).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ScrollView>

      <Button tw="mt-4" mode="contained" onPress={generatePDF}>
        {t('Dashboard.History.pdfModal.downloadButton')}
      </Button>
    </React.Fragment>
  );
}
