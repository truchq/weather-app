import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';

const ItemSearch = ({ keyword, onPress, onRemove }) => {
  const onRemoveKeyword = () => onRemove(keyword)
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onPress.bind(this, keyword)} style={styles.rowKeyword}>
        <Icon name="history" size={20} color="#777D71" />
        <Text style={styles.txtKeyword}>{keyword}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemoveKeyword} style={styles.btnRemove}>
        <IonIcons name="close-outline" size={35} color="#777D71" />
      </TouchableOpacity>
    </View>
  )
}

export default React.memo(ItemSearch)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  btnClose: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowKeyword: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    //backgroundColor: 'red'

  },
  txtKeyword: {
    fontSize: 13,
    paddingLeft: 14,
    paddingVertical: 10
  },
  btnRemove: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
})
