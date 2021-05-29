import React from 'react'
import { StyleSheet, Text } from 'react-native'

const index = ({size = 13, color, children}) => {
  return (
    <Text style={{
      fontSize: size,
      color
    }}>{children}</Text>
  )
}

export default React.memo(index)

const styles = StyleSheet.create({})
