import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo'
import { useDispatch } from 'react-redux'
import commonHandler from './states/modules/common/handlers'

import Weather from './views/pages/weather';

const Root = () => {
  const dispatch = useDispatch();
  const mapAction = (dispatch) => ({
    ...commonHandler(dispatch)
  })
  const {
    setNetworkAction,
  } = mapAction(dispatch)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkAction(state.isConnected)
    });
    return () => {
      unsubscribe();
    }
  }, [])
  return (
    <PaperProvider>
      <Weather />
    </PaperProvider>
  );
};

export default Root;
