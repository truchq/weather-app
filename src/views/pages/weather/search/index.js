import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, FlatList, Keyboard, Dimensions, Text, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { ActivityIndicator, Colors } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icons from 'react-native-vector-icons/FontAwesome';

import weatherHandler from '../../../../states/modules/weather/handlers'
import Item from './ItemSearch'

const PADDING_CONTENT = 32
const { width, height } = Dimensions.get('window')

export default ({ keywords, loading, networkConnected }) => {

  const [keyword, setKeyword] = useState('');
  const [iconInput, setIconInput] = useState('magnify');
  const [data, setData] = useState(keywords)
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
    searchAction(value)
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
    hideHistory()
    searchAction(keyword)
  }

  const queryHistoryLocal = () => {
    const filters = keywords?.filter((k) => {
      return k.keyword?.indexOf(keyword) !== -1
    }) || []
    if (filters?.length) {
      setData(filters)
      return true
    }
    setData(keywords)
  }
  useEffect(() => {
    queryHistoryLocal()
  }, [keyword])
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
  useEffect(() => {
    setData(keywords)
  }, [keywords])
  const renderItem = useCallback(({ item: { keyword }, index }) => (
    <Item keyword={keyword} onPress={selectKeyword} onRemove={onRemove} />
  ), []);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setKeyword}
        value={keyword}
        onSubmitEditing={onSearch}
        onFocus={onFocus}
        style={{ shadowOpacity: 0 }}
        icon={iconInput}
        onIconPress={hideHistory}
      />
      {!!keyword && iconInput === 'arrow-left' && (
        <TouchableOpacity onPress={onSearch} style={styles.enterKeyword}>
          <Icons name="search" size={20} color="#777D71" />
          <Text style={styles.txtKeyword}>{keyword}</Text>
        </TouchableOpacity>
      )}
      {loading && (<ActivityIndicator animating={true} color={Colors.red800} />)}
      <Animated.View style={[{ width: width - PADDING_CONTENT }, style]}>
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={data}
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
  },
  enterKeyword: {
    flexDirection: 'row',
    paddingTop: 8,
    alignItems: 'center',
    paddingBottom: 8
  },
  txtKeyword: {
    paddingHorizontal: 12
  }
})
