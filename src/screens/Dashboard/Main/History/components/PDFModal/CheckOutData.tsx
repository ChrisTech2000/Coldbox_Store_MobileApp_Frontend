import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { FileUtility } from '#ui/lib/file';
import reportCrash from '#ui/lib/reportCrash';

import InAppNotifications from '#common/InAppNotifications';
import { cropTranslationLookup, getDefaultCropValues } from '#i18n/transl/misc/crops';
import { LanguageManager, dateFmt, useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { GetMovementsHistoryResponse } from '#types/api.responses';

type CheckOutDataProps = {
  movement: GetMovementsHistoryResponse[number];
  dismissModal: () => void;
};

export function CheckOutData(props: CheckOutDataProps) {
  const { movement, dismissModal } = props;

  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const farmerCountry = useDashboardStore(useShallow((store) => store.farmerCountry));

  const locale = LanguageManager.read();

  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const generatePDF = useCallback(async () => {
    setIsProcessing(true);

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

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
              <div class="label">${t('Dashboard.Marketplace.owner')}</div>
              <div class="value">${movement.checkout?.crates[0].ownerName}</div>
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
              ${movement.checkout?.crates
                .map(
                  (crate) => `
                <tr>
                  <td>${crate.tag}</td>
                  <td>${find(translationMap, {
                    name: crate.crop?.name ?? '',
                    country: companyCountry || farmerCountry || undefined,
                    locale,
                  })}</td>
                  <td>${crate.affectedWeight}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div>
            <div class="section-end">
              <div class="label">${t('Dashboard.History.pdfModal.weightLabel')}:&nbsp;</div>
              <div class="value">${movement.checkout?.crates.reduce((acc, curr) => (acc += curr.affectedWeight ?? 0), 0)}</div>
            </div>
            <div class="section-end">
              <div class="label">${t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:&nbsp;</div>
              <div class="value">${movement.checkout?.calculatedPrice.toFixed(2)}</div>
            </div>
            <div class="section-end">
              <div class="label">${t('Dashboard.History.pdfModal.checkOut.discountLabel')}:&nbsp;</div>
              <div class="value">${movement.checkout?.discount.toFixed(2)}</div>
            </div>
            <div class="section-end">
              <div class="label">${t('Dashboard.History.pdfModal.checkOut.totalPrice')}:&nbsp;</div>
              <div class="value">${movement.checkout?.totalPrice.toFixed(2)}</div>
            </div>
          </div>

          <div class="divider"></div>
        </div>
      </body>
    </html>
  `;

      const unsanitizedCode = movement.code;
      const code = unsanitizedCode.replace(/#/g, '');
      const fileName = t('Dashboard.History.pdfModal.downloadName', { code });

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
          hasMovementCheckOut: !!movement.checkout.crates.length,
        },
      });
    } finally {
      setIsProcessing(false);
    }
  }, [t, toast, movement, dismissModal, companyCountry, farmerCountry, locale]);

  const tableDatums = useMemo(() => {
    if (!movement.checkout?.crates) return [];

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    return movement.checkout.crates.map((crate) => ({
      ...crate,
      crop: {
        ...crate.crop,
        name: find(translationMap, {
          name: crate.crop?.name || '',
          country: companyCountry || farmerCountry || undefined,
          locale,
        }),
      },
    }));
  }, [movement, companyCountry, farmerCountry, locale]);

  return (
    <React.Fragment>
      <View tw="flex flex-row space-x-1">
        <View tw="w-1/3">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.Marketplace.owner')}
          </Text>
          <Text variant="TextMedium" numberOfLines={1}>
            {movement.checkout?.crates[0].ownerName}
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

      <ScrollView tw="max-h-72" showsVerticalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header tw="bg-gray-200">
            <DataTable.Title>{t('Dashboard.History.pdfModal.checkOut.idLabel')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.History.pdfModal.checkOut.itemLabel')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.History.pdfModal.weightLabel')}</DataTable.Title>
          </DataTable.Header>

          {tableDatums.map((crate, index) => (
            <DataTable.Row key={`${crate.crop?.name ?? ''}-${index}`}>
              <DataTable.Cell>{crate.tag}</DataTable.Cell>
              <DataTable.Cell>{crate.crop?.name ?? getDefaultCropValues(t).name}</DataTable.Cell>
              <DataTable.Cell numeric>{crate.affectedWeight ?? 0}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <View tw="items-end space-y-2 pr-12 w-full">
          <Text>
            {t('Dashboard.History.pdfModal.weightLabel')}:{' '}
            {movement.checkout?.crates.reduce((acc, curr) => (acc += curr.affectedWeight ?? 0), 0)}
          </Text>
          <Divider tw="w-[60%] bg-grey-300" />
          <Text variant="TextBold" tw="font-bold">
            {t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:{' '}
            {movement.checkout?.calculatedPrice.toFixed(2)}
          </Text>
          <Divider tw="w-[60%] bg-grey-300" />
          <Text variant="TextBold" tw="font-bold">
            {t('Dashboard.History.pdfModal.checkOut.discountLabel')}:{' '}
            {movement.checkout?.discount.toFixed(2)}
          </Text>
          <Divider tw="w-[60%] bg-grey-300" />
          <Text variant="TextBold" tw="font-bold">
            {t('Dashboard.History.pdfModal.checkOut.totalPrice')}:{' '}
            {movement.checkout?.totalPrice.toFixed(2)}
          </Text>
        </View>
      </ScrollView>

      <Button tw="mt-4" mode="contained" onPress={generatePDF} disabled={isProcessing}>
        {t('Dashboard.History.pdfModal.downloadButton')}
      </Button>
    </React.Fragment>
  );
}
