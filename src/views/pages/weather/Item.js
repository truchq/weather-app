import React from 'react'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import { IMAGE_DOMAIN } from '../../../configs'
import Text from '../../components/Text'
const Item = ({ dt, weather: { main, description, icon }, clouds }) => {
  const timeToMillisecond = dt * 1000
  const dddd = moment(timeToMillisecond).format('dddd');
  const day = moment(timeToMillisecond).format('DD');
  return (
    <View style={styles.container}>
      <View style={styles.rightContent}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text size={45}>{clouds}</Text><Text size={12}>%</Text>
        </View>
        <Text>{main}</Text>
        <Text>{description}</Text>
      </View>
      <View style={styles.midContent}>
        <View style={styles.image}>
          <FastImage
            style={styles.icon}
            source={{
              uri: `${IMAGE_DOMAIN}/img/wn/${icon}@2x.png`
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
      <View style={styles.leftContent}>
        <Text size={30}>{day}</Text>
        <Text size={16}>{dddd}</Text>
      </View>
    </View>
  )
}

export default React.memo(Item)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 0.4,
  },
  rightContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  leftContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: 150, height: 150
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined
  },
})
