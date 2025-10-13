import { useRef, useCallback, useMemo } from 'react';
import RecaptchaService from '#services/RecaptchaService';
import type { RecaptchaModalRef } from '#ui/components/RecaptchaModal';

interface UseRecaptchaOptions {
  onVerify: (token: string | null) => Promise<void>;
  onError?: (error: string) => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

export const useRecaptcha = (options: UseRecaptchaOptions) => {
  const recaptchaRef = useRef<RecaptchaModalRef>(null);
  const { onVerify, onError, onCancel } = options;

  const showRecaptcha = useCallback(async () => {
    if (RecaptchaService.isRecaptchaEnabled()) {
      recaptchaRef.current?.show();
    } else {
      await onVerify(null);
    }
  }, [onVerify]);

  const handleVerify = useCallback(
    async (token: string) => {
      await onVerify(token || null);
    },
    [onVerify]
  );

  const handleError = useCallback(
    async (error: string) => {
      if (onError) {
        await onError(error);
      }
    },
    [onError]
  );

  const handleCancel = useCallback(async () => {
    if (onCancel) {
      await onCancel();
    }
  }, [onCancel]);

  const isRecaptchaEnabled = useMemo(() => {
    return RecaptchaService.isRecaptchaEnabled();
  }, []);

  return {
    recaptchaRef,
    showRecaptcha,
    handleVerify,
    handleError,
    handleCancel,
    isRecaptchaEnabled,
  };
};
