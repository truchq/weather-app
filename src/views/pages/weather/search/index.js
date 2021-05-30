import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, FlatList, Keyboard, Dimensions } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { ActivityIndicator, Colors } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import weatherHandler from '../../../../states/modules/weather/handlers'
import Item from './ItemSearch'
import useDebounce from '../../../../utils/useDebounce'
const { width, height } = Dimensions.get('window')

export default ({ keywords, loading, networkConnected }) => {
  const [keyword, setKeyword] = useState('');
  const [iconInput, setIconInput] = useState('magnify');
  const dispatch = useDispatch();
  const mapAction = (dispatch, props) => ({
    ...weatherHandler(dispatch)
  })
  const {
    searchAction,
    removeKeyWordAction
  } = mapAction(dispatch)

  const selectKeyword = (value) => {
    hideHistory()
    setKeyword(value)
  }
  const onRemove = (item) => {
    removeKeyWordAction(item)
  }
  
  const keyExtractor = (item) => (`weather-key-${item.keyword}`);

  const onSearch = () => {
    if (!networkConnected) {
      return false
    }
    if (!keyword) {
      return false
    }
    searchAction(keyword)
  }

  // debounce prevent request to the server
  const debouncedChangeKeyword = useDebounce(keyword, 1000);
  useEffect(() => {
    if(keyword){
      hideHistory()
    }
    onSearch()
  }, [debouncedChangeKeyword])
  useEffect(() => {
    onSearch()
  }, [networkConnected])

  // Show history input search forcus
  const onFocus = () => {
    heightHistory.value = height
    setIconInput('arrow-left')
  }
  const heightHistory = useSharedValue(0)
  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(heightHistory.value, {
        duration: 400
      })
    }
  })
  // Hide list history
  const hideHistory = () => {
    setIconInput('magnify')
    heightHistory.value = 0
    Keyboard.dismiss()
  }
  
  const renderItem = useCallback(({ item: { keyword }, index }) => (
    <Item keyword={keyword} onPress={selectKeyword} onRemove={onRemove} />
  ), []);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setKeyword}
        value={keyword}
        onSubmitEditing={Keyboard.dismiss}
        onFocus={onFocus}
        style={{ shadowOpacity: 0 }}
        icon={iconInput}
        onIconPress={hideHistory}
      />
      {loading && (<ActivityIndicator animating={true} color={Colors.red800} />)}
      <Animated.View style={[{ width: width - 32 }, style]}>
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={keywords}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onScroll={Keyboard.dismiss}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  }
})
