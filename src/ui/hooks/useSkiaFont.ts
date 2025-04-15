import { useFont as useFontLoader } from '@shopify/react-native-skia';

import Roboto from '#assets/fonts/Roboto-Regular.ttf';
import NotoSansDevanagari from '#assets/fonts/NotoSansDevanagari-VariableFont.ttf';
import NotoSansOriya from '#assets/fonts/NotoSansOriya-VariableFont.ttf';
import NotoSansGujarati from '#assets/fonts/NotoSansGujarati-VariableFont.ttf';
import NotoSansArabic from '#assets/fonts/NotoSansArabic-VariableFont.ttf';

import { LanguageManager } from '#i18n/utils';

export default function useSkiaFont(fontSize?: number) {
  switch (LanguageManager.read()) {
    case 'hi':
      return useFontLoader(NotoSansDevanagari, fontSize);
    case 'or':
      return useFontLoader(NotoSansOriya, fontSize);
    case 'gu':
      return useFontLoader(NotoSansGujarati, fontSize);
    case 'ar':
      return useFontLoader(NotoSansArabic, fontSize);
    default:
      return useFontLoader(Roboto, fontSize);
  }
}
