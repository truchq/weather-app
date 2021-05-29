import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'

const EmptyComponent = () => {
  return (
    <View style={styles.emptyContent}>
      <IonIcons name="search-outline" size={50} color="#777D71" />
      <Text>Results not found</Text>
    </View>
  )
}

export default React.memo(EmptyComponent)

const styles = StyleSheet.create({
  emptyContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
})
