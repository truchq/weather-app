import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import store from './src/states/store'
import Root from './src/Root';
import { ActivityIndicator, Colors } from 'react-native-paper';

const Loading = () => (
  <ActivityIndicator animating={true} color={Colors.red800} />
)
const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate loading={<Loading />} persistor={store.persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
