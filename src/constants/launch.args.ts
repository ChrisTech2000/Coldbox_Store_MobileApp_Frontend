import { LaunchArguments } from 'react-native-launch-arguments';

type AppLaunchArgs = {
  isE2E?: boolean; // flag to indicate if app is running in E2E test mode
  localeE2E?: string; // locale override for E2E tests
};

const launchArgs = LaunchArguments.value<AppLaunchArgs>();

export default {
  ...launchArgs,
  isE2E: launchArgs?.isE2E ?? false,
} satisfies AppLaunchArgs;
