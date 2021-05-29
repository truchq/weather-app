import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WarningNetwork = () => {
  return (
    <View style={styles.warningNetwork}>
      <Text>No internet connected.Please check you network</Text>
    </View>
  )
}

export default React.memo(WarningNetwork)

const styles = StyleSheet.create({
  warningNetwork: {
    backgroundColor: '#FD665C',
    padding: 16,
    paddingTop: 20,
  },
})
