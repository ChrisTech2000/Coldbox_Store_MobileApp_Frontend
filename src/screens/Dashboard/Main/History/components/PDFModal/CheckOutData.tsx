import React, { useCallback } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { useToast } from 'react-native-toast-notifications';

type CheckOutDataProps = {
  movement: GetMovementsHistoryResponse[number];
  dismissModal: () => void;
};

export function CheckOutData({ movement, dismissModal }: CheckOutDataProps) {
  const { t } = useTranslationUtils();
  const toast = useToast();

  const generatePDF = useCallback(async () => {
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${t('Dashboard.History.pdfModal.checkOut.title')}</h1>
          <p><strong>${t('Dashboard.History.pdfModal.coolingUserLabel')}:</strong> ${movement.farmer}</p>
          <p><strong>${t('Dashboard.History.pdfModal.checkOut.checkOutLabel')}:</strong> ${movement.code}</p>
          <p><strong>${t('Dashboard.History.pdfModal.dateLabel')}:</strong> ${dateFmt(movement.date.toString(), 'MMM dd yyyy')}</p>
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
                <tr key="${crate.name}">
                  <td>${crate.tag}</td>
                  <td>${crate.name}</td>
                  <td>${crate.weight}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
          <p><strong>${t('Dashboard.History.pdfModal.weightLabel')}:</strong> ${movement.cratesWeight}</p>
          <p><strong>${t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:</strong> ${movement.totalPrice.toFixed(2)}</p>
          <p><strong>${t('Dashboard.History.pdfModal.checkOut.discountLabel')}:</strong> ${movement.discount.toFixed(2)}</p>
          <p><strong>${t('Dashboard.History.pdfModal.checkOut.totalPrice')}:</strong> ${(movement.totalPrice - movement.discount).toFixed(2)}</p>
        </body>
      </html>
    `;

    const PDFOptions = {
      html,
      fileName: t('Dashboard.History.pdfModal.downloadName', { code: movement.code }),
      directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) throw new Error();
      toast.show(t('Dashboard.History.pdfModal.successMessage'), {
        type: 'success',
      });
      dismissModal();
    } catch {
      toast.show(t('Dashboard.History.pdfModal.errorMessage'), {
        type: 'danger',
      });
    }
  }, [t, toast, movement]);

  return (
    <View tw="w-[90%] bg-white mx-5 px-3 py-1 rounded-sm h-auto space-y-2">
      <Text variant="TitleMedium">{t('Dashboard.History.pdfModal.checkOut.title')}</Text>

      <View tw="flex flex-row space-x-1">
        <View tw="w-1/3">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.History.pdfModal.coolingUserLabel')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {movement.farmer}
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

      <ScrollView>
        <DataTable>
          <DataTable.Header tw="bg-gray-200">
            <DataTable.Title tw="">
              {t('Dashboard.History.pdfModal.checkOut.idLabel')}
            </DataTable.Title>
            <DataTable.Title>{t('Dashboard.History.pdfModal.checkOut.itemLabel')}</DataTable.Title>
            <DataTable.Title numeric>{t('Dashboard.History.pdfModal.weightLabel')}</DataTable.Title>
          </DataTable.Header>

          {movement.cratesCheckin.map((crate, index) => (
            <DataTable.Row key={`${crate.name}-${index}`}>
              <DataTable.Cell>{crate.tag}</DataTable.Cell>
              <DataTable.Cell>{crate.name}</DataTable.Cell>
              <DataTable.Cell numeric>{crate.weight}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      <View tw="items-end space-y-2 pr-12 w-full">
        <Text>
          {t('Dashboard.History.pdfModal.weightLabel')}: {movement.cratesWeight}
        </Text>
        <Divider tw="w-[60%] bg-grey-300" />
        <Text variant="TextBold" tw="font-bold">
          {t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:{' '}
          {movement.totalPrice.toFixed(2)}
        </Text>
        <Divider tw="w-[60%] bg-grey-300" />
        <Text variant="TextBold" tw="font-bold">
          {t('Dashboard.History.pdfModal.checkOut.discountLabel')}: {movement.discount.toFixed(2)}
        </Text>
        <Divider tw="w-[60%] bg-grey-300" />
        <Text variant="TextBold" tw="font-bold">
          {t('Dashboard.History.pdfModal.checkOut.totalPrice')}:{' '}
          {(movement.totalPrice - movement.discount).toFixed(2)}
        </Text>
      </View>

      <Divider tw="w-full bg-grey-300" />

      <Button tw="my-2" mode="contained" onPress={generatePDF}>
        {t('Dashboard.History.pdfModal.downloadButton')}
      </Button>
    </View>
  );
}
