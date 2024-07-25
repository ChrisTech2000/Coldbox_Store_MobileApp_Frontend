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

### Android Emulator

If you need the `debug.keystore` file, you can [download it](https://github.com/react-native-community/react-native-template-typescript/blob/main/template/android/app/debug.keystore) and then move it to the `/android/app` folder.

### Configuring Mapbox Credentials

#### Prerequisites

To use Mapbox services, you need to obtain two types of access tokens from the Mapbox dashboard:

1. **Public Key**: This is the default public token, easily obtainable from the dashboard's access tokens section. It starts with `pk.ey`.
2. **Secret Key**: This key must be created in the dashboard. You can name it whatever you want. Ensure it has the scope `Downloads:Read`. It starts with `sk.ey`.

The public key is used to access Mapbox API features, while the secret key is required for downloading dependencies for Android and iOS.

#### Steps to Obtain Access Tokens

1. **Public Key**:

   - Navigate to the Mapbox dashboard.
   - Go to the access tokens section.
   - Locate the public token (it starts with `pk.ey`).

2. **Secret Key**:
   - In the Mapbox dashboard, go to the access tokens section.
   - Create a new token and assign it a name of your choice.
   - Ensure the token has the `Downloads:Read` scope.
   - Save the generated secret token (it starts with `sk.ey`).

#### Setting up Android

1. **Check for the `gradle.properties` file**

   Ensure that you have the file `~/.gradle/gradle.properties` on your machine.

   If the file does not exist, create it by following these steps:

   ```sh
   cd ~/.gradle
   touch gradle.properties
   ```

2. **Edit `gradle.properties`**

   Open the `gradle.properties` file and add the following line to include your Mapbox Downloads Token:

   ```
   MAPBOX_DOWNLOADS_TOKEN=sk.ey...
   ```

   Replace _sk.ey..._ with your actual Mapbox token.

#### Setting up iOS

1. **Check for the `.netrc` file**

   Ensure that you have the file `.netrc` in your user directory.

   If the file does not exist, create it by following these steps:

   ```sh
   cd ~
   touch .netrc
   ```

2. **Edit `.netrc`**

   Open the `.netrc` file and add the following lines to include your Mapbox credentials:

   ```
   machine api.mapbox.com
      login mapbox
      password sk.ey...
   ```

   Replace _sk.ey..._ with your actual Mapbox token.

#### Rebuild

After this, repeat the installation process (from 2nd step).
