import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Icon } from 'react-native-paper';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { dateFmt, useTranslationUtils } from '#i18n/utils';

import { Text } from './Text';

export type DateRangeStoreType = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
};

export const createDataRangeStore = () =>
  create<DateRangeStoreType>((set) => ({
    startDate: null,
    endDate: null,
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),
  }));

type DateRangePickerWithStoreProps = {
  useDateRangeStore: UseBoundStore<StoreApi<DateRangeStoreType>>;
};

export const DateRangePickerWithStore = ({ useDateRangeStore }: DateRangePickerWithStoreProps) => {
  const { t } = useTranslationUtils();

  const { startDate, endDate, setStartDate, setEndDate } = useDateRangeStore();

  const [isStartDateCalendarOpen, setIsStartDateCalendarOpen] = useState<boolean>(false);
  const [isEndDateCalendarOpen, setIsEndDateCalendarOpen] = useState<boolean>(false);

  const onStartDateChange = useCallback((date: Date) => {
    setIsStartDateCalendarOpen(false);
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    setStartDate(start);
  }, []);

  const onEndDateChange = useCallback((date: Date) => {
    setIsEndDateCalendarOpen(false);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    setEndDate(end);
  }, []);

  const onClearEndDateChange = useCallback(() => {
    setIsEndDateCalendarOpen(false);
    setEndDate(null);
  }, []);

  const onClearStartDateChange = useCallback(() => {
    setIsEndDateCalendarOpen(false);
    setStartDate(null);
  }, []);

  return (
    <View tw="flex flex-row items-center space-x-2">
      <TouchableOpacity
        tw="flex flex-row items-center"
        onPress={() => setIsStartDateCalendarOpen(true)}
      >
        <Text variant="TextMedium" tw="text-base mr-1">
          {startDate
            ? dateFmt(startDate.toISOString(), 'dd/MM/yyyy')
            : t('components.datePicker.placeholder')}
        </Text>
        <Icon source="calendar" size={16} />
      </TouchableOpacity>
      <DatePicker
        date={startDate ?? new Date()}
        mode="date"
        open={isStartDateCalendarOpen}
        modal
        maximumDate={endDate ?? undefined}
        onConfirm={onStartDateChange}
        onCancel={onClearStartDateChange}
        cancelText={t('components.datePicker.clearButtonLabel')}
        confirmText={t('components.datePicker.confirmButtonLabel')}
      />

      <Text> - </Text>

      <TouchableOpacity
        tw="flex flex-row items-center"
        onPress={() => setIsEndDateCalendarOpen(true)}
      >
        <Text variant="TextMedium" tw="text-base mr-1">
          {endDate
            ? dateFmt(endDate.toISOString(), 'dd/MM/yyyy')
            : t('components.datePicker.placeholder')}
        </Text>
        <Icon source="calendar" size={16} />
      </TouchableOpacity>
      <DatePicker
        date={endDate ?? new Date()}
        mode="date"
        open={isEndDateCalendarOpen}
        modal
        minimumDate={startDate ?? undefined}
        onConfirm={onEndDateChange}
        onCancel={onClearEndDateChange}
        cancelText={t('components.datePicker.clearButtonLabel')}
        confirmText={t('components.datePicker.confirmButtonLabel')}
      />
    </View>
  );
};
