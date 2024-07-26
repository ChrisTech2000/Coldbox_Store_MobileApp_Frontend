// eslint-disable-next-line @typescript-eslint/no-var-requires
//import { platformSelect } from "nativewind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // error: platformSelect({
        //   ios: "platformColor(systemRed)",
        //   android: "platformColor(?android:colorError)",
        //   default: "red",
        // }), // TODO: try to make this work (currently throws an error related to the import)
        green: {
          primary: 'rgb(7, 133, 126)',
          transparency: 'rgba(7, 133, 126, 0.1)',
        },
      },
    },
  },
  plugins: [],
};
