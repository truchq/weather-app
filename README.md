# Mobile Testing Challenge

Setup React Native following this guide: [React Native Setup](https://facebook.github.io/react-native/docs/getting-started).

## Problem solved:
- Support IOS, Android
- Setup Hermes improve start-up time, decreased memory usage, and smaller app size.
- Using Reanimated 2 creating smooth animations and interactions that runs on the UI thread.
- Setup project to build with 3 environment development, staging, production.
- If the network is not available, the application will auto request the query right after the network back.
- Using redux manage state app
- Using redux-persist to cache the result
- Using redux-saga manage side effect
- Using react-native-fast-image to cache Image
- Using react-native-config to expose config variables
- Using React memo, useCallback prevent re-render.

## Run project:
Install dependencies, make sure [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) was installed
```sh
yarn update
```

Start project in development
```sh
yarn ios (for Android)
yarn android (for iOS)
```

Start project in production
```sh
yarn androidProduction (for Android)
yarn iosProduction (for iOS)
```

Start project in staging
```sh
yarn androidStaging (for Android)
yarn iosStaging (for iOS)
```


## Additional
[Flipper](https://fbflipper.com) can help more easier to debug the app.

[VSCode](https://code.visualstudio.com/) is recommended.