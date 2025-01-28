import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Icon } from 'react-native-paper';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import InAppNotifications from '#common/InAppNotifications';
import type { TranslationLocales } from '#i18n/constants';

import { cn } from '../lib/cn';
import { Text } from './Text';

export type DateRangeStoreType = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  reset: () => void;
};

export const createDataRangeStore = () =>
  create<DateRangeStoreType>((set) => ({
    startDate: null,
    endDate: null,
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),
    reset: () => set({ startDate: null, endDate: null }),
  }));

type DateRangePickerWithStoreProps = {
  initialStartDate?: Date;
  initialEndDate?: Date;
  separator?: boolean;
  showSelectionTitle?: boolean;
  useDateRangeStore: UseBoundStore<StoreApi<DateRangeStoreType>>;
  variant?: 'text' | 'contained';
  locale: TranslationLocales;
};

export const DateRangePickerWithStore = ({
  useDateRangeStore,
  separator,
  showSelectionTitle,
  variant = 'text',
  initialEndDate,
  initialStartDate,
  locale,
}: DateRangePickerWithStoreProps) => {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const { startDate, endDate, setStartDate, setEndDate } = useDateRangeStore();

  const [isStartDateCalendarOpen, setIsStartDateCalendarOpen] = useState<boolean>(false);
  const [isEndDateCalendarOpen, setIsEndDateCalendarOpen] = useState<boolean>(false);

  const validateDateRange = useCallback(
    (selectedDate: Date, isStartDate: boolean) => {
      if (isStartDate && endDate && selectedDate > endDate) {
        toast.show(t('components.datePicker.startDateError'), { type: 'md_danger' });
        return false;
      }
      if (!isStartDate && startDate && selectedDate < startDate) {
        toast.show(t('components.datePicker.endDateError'), { type: 'md_danger' });
        return false;
      }
      return true;
    },
    [startDate, endDate, t]
  );

  const onStartDateChange = useCallback(
    (date: Date) => {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      if (!validateDateRange(start, true)) {
        setIsStartDateCalendarOpen(false);
        return;
      }

      setIsStartDateCalendarOpen(false);
      setStartDate(start);
    },
    [validateDateRange, setStartDate]
  );

  const onEndDateChange = useCallback(
    (date: Date) => {
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      if (!validateDateRange(end, false)) {
        setIsEndDateCalendarOpen(false);
        return;
      }

      setIsEndDateCalendarOpen(false);
      setEndDate(end);
    },
    [validateDateRange, setEndDate]
  );

  const onClearEndDateChange = useCallback(() => {
    setIsEndDateCalendarOpen(false);
    setEndDate(null);
  }, [setEndDate]);

  const onClearStartDateChange = useCallback(() => {
    setIsStartDateCalendarOpen(false);
    setStartDate(null);
  }, [setStartDate]);

  useEffect(() => {
    if (initialStartDate && !startDate) {
      const start = new Date(initialStartDate);
      start.setHours(0, 0, 0, 0);
      setStartDate(start);
    }

    if (initialEndDate && !endDate) {
      const end = new Date(initialEndDate);
      end.setHours(23, 59, 59, 999);
      setEndDate(end);
    }
  }, [initialStartDate, initialEndDate]);

  const defaultDate = useMemo(() => new Date(), []);

  return (
    <View tw="flex flex-row flex-wrap items-center">
      <View tw={variant === 'contained' ? 'mr-6' : ''}>
        {showSelectionTitle && (
          <Text variant="TextMedium" tw="text-base my-2">
            {t('components.datePicker.startDateSelection')}
          </Text>
        )}
        <TouchableOpacity
          tw={cn(
            'flex flex-row items-center',
            variant === 'contained' && 'bg-gray-200 rounded-md p-1 w-32'
          )}
          onPress={() => setIsStartDateCalendarOpen(true)}
        >
          <Text variant="TextMedium" tw="text-base mr-1">
            {startDate
              ? dateFmt(startDate.toISOString(), 'dd/MM/yyyy')
              : t('components.datePicker.placeholder')}
          </Text>
          {variant === 'text' && <Icon source="calendar" size={16} />}
        </TouchableOpacity>
      </View>
      <DatePicker
        locale={locale}
        title={t('components.datePicker.heading')}
        date={startDate ?? defaultDate}
        mode="date"
        open={isStartDateCalendarOpen}
        modal
        onConfirm={onStartDateChange}
        onCancel={onClearStartDateChange}
        cancelText={t('components.datePicker.clearButtonLabel')}
        confirmText={t('components.datePicker.confirmButtonLabel')}
      />

      {separator && <Text> - </Text>}

      <View>
        {showSelectionTitle && (
          <Text variant="TextMedium" tw="text-base my-2">
            {t('components.datePicker.endDateSelection')}
          </Text>
        )}
        <TouchableOpacity
          tw={cn(
            'flex flex-row items-center',
            variant === 'contained' && 'bg-gray-200 rounded-md p-1 w-32'
          )}
          onPress={() => setIsEndDateCalendarOpen(true)}
        >
          <Text variant="TextMedium" tw="text-base mr-1">
            {endDate
              ? dateFmt(endDate.toISOString(), 'dd/MM/yyyy')
              : t('components.datePicker.placeholder')}
          </Text>
          {variant === 'text' && <Icon source="calendar" size={16} />}
        </TouchableOpacity>
      </View>

      <DatePicker
        locale={locale}
        title={t('components.datePicker.heading')}
        date={endDate ?? defaultDate}
        mode="date"
        open={isEndDateCalendarOpen}
        modal
        onConfirm={onEndDateChange}
        onCancel={onClearEndDateChange}
        cancelText={t('components.datePicker.clearButtonLabel')}
        confirmText={t('components.datePicker.confirmButtonLabel')}
      />
    </View>
  );
};
