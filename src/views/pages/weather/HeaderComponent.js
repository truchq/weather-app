import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HeaderComponent = ({ weathers, keywordCurrent }) => {
  if (weathers.length) {
    return (
      <View style={styles.keywordContent}>
        <Text style={styles.keyword}>{keywordCurrent?.city || keywordCurrent?.country} </Text>
        <Text size={20}>weather forecast</Text>
      </View>
    )
  }
  return null
}

export default React.memo(HeaderComponent)

const styles = StyleSheet.create({
  keywordContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  keyword: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#E74B2E',
    paddingTop: 5
  }

})
