import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MapComponent from '@/components/shared/MapComponent'
import CircleButton from '@/components/CircleButton'
import IconButton from '@/components/IconButton'

export default function DiscoverScreen() {
  return (
    <GestureHandlerRootView style={styles.container}>
        <View style={{flex: 1, width: '100%'}}>
          <MapComponent />
          <CircleButton />
        </View>
    </GestureHandlerRootView>


  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      justifyContent: 'center',
      alignItems: 'center',
    }

  });