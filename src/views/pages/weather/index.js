import React, { useCallback } from 'react'
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { useSelector, shallowEqual } from 'react-redux'
import Search from './search'
import Item from './Item'
import WarningNetwork from './WarningNetwork'
import EmptyComponent from './EmptyComponent'
import HeaderComponent from './HeaderComponent'

export default () => {
  const { keywords, weathers, loading, networkConnected, keywordCurrent } = useSelector((state) => {
    const { weather: { keywords, data: { daily = [], keyword }, loading }, common: { networkConnected } } = state
    return {
      keywords,
      weathers: daily,
      loading,
      networkConnected,
      keywordCurrent: keyword
    }
  }, shallowEqual)

  const renderItem = useCallback(({ item: { dt, weather: [weather], clouds } }) => (
    <Item dt={dt} weather={weather} clouds={clouds} />
  ), []);
  const keyExtractor = useCallback((item) => `weather-key-${item.dt}`, []);

  return (
    <SafeAreaView style={styles.container}>
      {!networkConnected && (<WarningNetwork />)}
      <View style={styles.container}>
        <Search keywords={keywords} loading={loading} networkConnected={networkConnected} />
        <FlatList
          data={weathers}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={<EmptyComponent />}
          ListHeaderComponent={<HeaderComponent weathers={weathers} keywordCurrent={keywordCurrent} />}
        />
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#DFDDC5',
    paddingHorizontal: 16
  },
})
