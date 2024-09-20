import { createNanoEvents, type Unsubscribe } from 'nanoevents';
import { useEffect, useLayoutEffect, useRef } from 'react';

export const APP_EVENTS = {
  DISPATCH_CU_PROMPT: 'DISPATCH_CU_PROMPT',
  DISPATCH_CU_FORM_MODAL: 'DISPATCH_CU_FORM_MODAL',
  DISPATCH_SENSOR_PROMPT: 'DISPATCH_SENSOR_PROMPT',
  DISPATCH_SENSOR_MODAL: 'DISPATCH_SENSOR_MODAL',
  DISPATCH_SENSOR_DATUMS: 'DISPATCH_SENSOR_DATUMS',
  DISPATCH_MAPS_TAB_MODAL: 'DISPATCH_MAPS_TAB_MODAL',
  DISPATCH_NOTIFICATION_OPEN_SURVEY: 'DISPATCH_NOTIFICATION_OPEN_SURVEY',
  DISPATCH_NOTIFICATION_OPEN_COMMODITY_MODAL: 'DISPATCH_NOTIFICATION_OPEN_COMMODITY_MODAL',
  DISPATCH_CHECK_IN_TEMPERATURE_ALERT: 'DISPATCH_CHECK_IN_TEMPERATURE_ALERT',
  DISPATCH_MARKETPLACE_COMPANY_MODAL: 'DISPATCH_MARKETPLACE_COMPANY_MODAL',
  DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL: 'DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL',
  DISPATCH_MARKETPLACE_FILTERS_FORM_SUBMISSION: 'DISPATCH_MARKETPLACE_FILTERS_FORM_SUBMISSION',
  DISPATCH_MARKETPLACE_FILTERS_FORM_RESET: 'DISPATCH_MARKETPLACE_FILTERS_FORM_RESET',
} as const;

export const emitter = createNanoEvents();

export function useAppEventListener<T extends Array<unknown>>(
  eventName: keyof typeof APP_EVENTS,
  cb: (...args: T) => void
) {
  const savedCallback = useRef(cb);

  useLayoutEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    let unsub: Unsubscribe | undefined = undefined;
    if (typeof savedCallback.current === 'function') {
      unsub = emitter.on(eventName, savedCallback.current);
    }
    return () => {
      unsub?.();
    };
  }, []);
}
