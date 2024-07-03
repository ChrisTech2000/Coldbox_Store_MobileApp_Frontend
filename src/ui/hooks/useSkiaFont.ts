import { useFont as useFontLoader } from '@shopify/react-native-skia';

import Roboto from '#assets/fonts/Roboto-Regular.ttf';

export default function useSkiaFont(fontSize?: number) {
  return useFontLoader(Roboto, fontSize);
}
