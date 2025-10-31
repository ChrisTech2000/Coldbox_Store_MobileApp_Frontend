import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Recaptcha from 'react-native-recaptcha-that-works';
import RecaptchaService from '#services/RecaptchaService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export interface RecaptchaModalRef {
  show: () => Promise<void>;
  hide: () => void;
}

interface RecaptchaModalProps {
  onVerify: (token: string) => Promise<void>;
  onError?: (error: string) => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

const RecaptchaModal = forwardRef<RecaptchaModalRef, RecaptchaModalProps>(
  ({ onVerify, onError, onCancel }, ref) => {
    const insets = useSafeAreaInsets();
    const recaptchaRef = useRef<React.ComponentRef<typeof Recaptcha>>(null);
    const recaptchaProps = RecaptchaService.getRecaptchaProps();

    useImperativeHandle(ref, () => ({
      show: async () => {
        if (!RecaptchaService.isRecaptchaEnabled() || !recaptchaProps) {
          await onVerify('');
          return;
        }
        recaptchaRef.current?.open(); // <-- open the library's own modal
      },
      hide: () => recaptchaRef.current?.close(),
    }));

    if (!RecaptchaService.isRecaptchaEnabled() || !recaptchaProps) return null;

    return (
      <Recaptcha
        ref={recaptchaRef}
        siteKey={recaptchaProps.siteKey}
        baseUrl={recaptchaProps.baseUrl} // e.g. https://app.yourcompany.com (MUST match Console)
        lang={recaptchaProps.languageCode}
        size="invisible"
        theme="light" // or 'dark'
        onVerify={onVerify}
        onExpire={() => onError?.('reCAPTCHA verification expired')}
        onError={() => onError?.('reCAPTCHA verification failed')}
        onClose={() => onCancel?.()}
        modalProps={{ style: { paddingTop: 100, justifyContent: 'center' } }}
        webViewProps={{
          // Enable better touch handling
          androidLayerType: 'hardware',
          scrollEnabled: false,
          bounces: false,
          injectedJavaScript: `
          const interval = setInterval(() => {
            const iFrames = document.querySelectorAll('iframe');
            let lastDivWithIFrame = null;

            iFrames.forEach((iframe) => {
              const parentDiv = iframe.parentElement;

              if (parentDiv.tagName.toLowerCase() === 'div') {
                const zIndex = window.getComputedStyle(parentDiv).zIndex;
                const width = parentDiv.style.width;

                if (zIndex === "2000000000" && width.includes('px')) {
                  lastDivWithIFrame = parentDiv;
                }
              }
            });

            if (lastDivWithIFrame) {
              lastDivWithIFrame.style.marginTop = "${insets.top}px";
              // Ensure pointer events are enabled
              lastDivWithIFrame.style.pointerEvents = "auto";
              clearInterval(interval);
            }
          }, 500);

          // Ensure all reCAPTCHA elements can receive touch events
          // Add touch delay to prevent double-firing
          document.addEventListener('touchstart', function(e) {
            e.stopPropagation();
          }, { passive: false });

          true;
        `,
        }}
      />
    );
  }
);

RecaptchaModal.displayName = 'RecaptchaModal';
export default RecaptchaModal;
