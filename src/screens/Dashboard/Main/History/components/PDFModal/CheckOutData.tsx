import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import InAppNotifications from '#common/InAppNotifications';
import { savePDF } from '#ui/lib/pdf';

type CheckOutDataProps = {
  movement: GetMovementsHistoryResponse[number];
  dismissModal: () => void;
};

export function CheckOutData({ movement, dismissModal }: CheckOutDataProps) {
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
          .divider { width: 60%; background-color: #cccccc; height: 1px; margin: 10px 0; }
          .button { margin-top: 10px; padding: 10px 20px; background-color: #007bff; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; }
          .button:hover { background-color: #0056b3; }
          .section-end { display: flex; flex-direction: row; justify-content: flex-end; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="title">Check-Out Data</div>

          <div class="section">
            <div class="column">
              <div class="label">${t('Dashboard.History.pdfModal.coolingUserLabel')}</div>
              <div class="value">${movement.owner}</div>
            </div>
            <div class="column">
              <div class="label">${t('Dashboard.History.pdfModal.checkOut.checkOutLabel')}</div>
              <div class="value">${movement.code}</div>
            </div>
            <div class="column">
              <div class="label">${t('Dashboard.History.pdfModal.dateLabel')}</div>
              <div class="value">${dateFmt(movement.date.toString(), 'MMM dd yyyy')}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>${t('Dashboard.History.pdfModal.checkOut.idLabel')}</th>
                <th>${t('Dashboard.History.pdfModal.checkOut.itemLabel')}</th>
                <th>${t('Dashboard.History.pdfModal.weightLabel')}</th>
              </tr>
            </thead>
            <tbody>
              ${movement.cratesCheckin
                .map(
                  (crate) => `
                <tr>
                  <td>${crate.tag}</td>
                  <td>${crate.name}</td>
                  <td>${crate.weight}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div>
            <div class="section-end">
              <div class="label">${t('Dashboard.History.pdfModal.weightLabel')}:&nbsp;</div>
              <div class="value">${movement.cratesWeight}</div>
            </div>
            <div class="section-end">
              <div class="label">${t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:&nbsp;</div>
              <div class="value">${movement.totalPrice.toFixed(2)}</div>
            </div>
            <div class="section-end">
              <div class="label">${t('Dashboard.History.pdfModal.checkOut.discountLabel')}:&nbsp;</div>
              <div class="value">${movement.discount.toFixed(2)}</div>
            </div>
            <div class="section-end">
              <div class="label">${t('Dashboard.History.pdfModal.checkOut.totalPrice')}:&nbsp;</div>
              <div class="value">${(movement.totalPrice - movement.discount).toFixed(2)}</div>
            </div>
          </div>

          <div class="divider"></div>
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
  }, [t, toast, movement]);

  return (
    <React.Fragment>
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
            {t('Dashboard.History.pdfModal.checkOut.checkOutLabel')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {movement.code}
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

      <ScrollView tw="max-h-[80%]" showsVerticalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header tw="bg-gray-200">
            <DataTable.Title>{t('Dashboard.History.pdfModal.checkOut.idLabel')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.History.pdfModal.checkOut.itemLabel')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.History.pdfModal.weightLabel')}</DataTable.Title>
          </DataTable.Header>

          {movement.cratesCheckin.map((crate, index) => (
            <DataTable.Row key={`${crate.name}-${index}`}>
              <DataTable.Cell>{crate.tag}</DataTable.Cell>
              <DataTable.Cell>{crate.name}</DataTable.Cell>
              <DataTable.Cell numeric>{crate.weight}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <View tw="items-end space-y-2 pr-12 w-full">
          <Text>
            {t('Dashboard.History.pdfModal.weightLabel')}: {movement.cratesWeight}
          </Text>
          <Divider tw="w-[60%] bg-grey-300" />
          <Text variant="TextBold" tw="font-bold">
            {t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:{' '}
            {movement.calculatedPrice.toFixed(2)}
          </Text>
          <Divider tw="w-[60%] bg-grey-300" />
          <Text variant="TextBold" tw="font-bold">
            {t('Dashboard.History.pdfModal.checkOut.discountLabel')}: {movement.discount.toFixed(2)}
          </Text>
          <Divider tw="w-[60%] bg-grey-300" />
          <Text variant="TextBold" tw="font-bold">
            {t('Dashboard.History.pdfModal.checkOut.totalPrice')}: {movement.totalPrice.toFixed(2)}
          </Text>
        </View>
      </ScrollView>

      <Button tw="mt-4" mode="contained" onPress={generatePDF}>
        {t('Dashboard.History.pdfModal.downloadButton')}
      </Button>
    </React.Fragment>
  );
}
