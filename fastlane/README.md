fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android test

```sh
[bundle exec] fastlane android test
```



### android build

```sh
[bundle exec] fastlane android build
```

Build the app

### android publish_to_play_store

```sh
[bundle exec] fastlane android publish_to_play_store
```

Publish the app

### android staging

```sh
[bundle exec] fastlane android staging
```

Submit a new Staging Build to the Play Store

This will also deploy just for the staging group.

### android production

```sh
[bundle exec] fastlane android production
```

Submit a new Production Build to the Play Store

This will also deploy just for the production group.

----


## iOS

### ios test

```sh
[bundle exec] fastlane ios test
```



### ios build

```sh
[bundle exec] fastlane ios build
```

Build the app

### ios publish_to_testflight

```sh
[bundle exec] fastlane ios publish_to_testflight
```

Publish to Testflight

### ios staging

```sh
[bundle exec] fastlane ios staging
```

Submit a new Staging Build

This build is intended to be submitted to TestFlight.

### ios production

```sh
[bundle exec] fastlane ios production
```

Submit a new Production Build

This build is intended to be submitted to the app store.

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
