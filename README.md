# Getting Started

## Installation

```sh
# 1st step
yarn install

# 2nd step
cd ios
bundle install
bundle exec pod install
```

## Dev env

```sh
# start metro (mandatory)
yarn start

# reset cache (if needed)
yarn start --reset-cache

# run iOS emulator (optional)
yarn ios

# run android emulator (optional)
yarn android

# remove all watchers and running processes
watchman watch-del-all
watchman shutdown-server
```

#### Android Emulator

If you need the `debug.keystore` file, you can [download it](https://github.com/react-native-community/react-native-template-typescript/blob/main/template/android/app/debug.keystore) and then move it to the `/android/app` folder.
