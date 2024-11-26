import { View, Text, StyleSheet } from 'react-native'
import React, { useRef } from 'react';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


const ItemPincher = () => {
    const scale = useSharedValue(1);

    const pinchHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            scale.value = Math.max(1, Math.min(event.scale, 3)); // Limit scale between 1x and 3x
          },
          onEnd: () => {
            scale.value = withSpring(1); // Smoothly reset scale
          }
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
      }));  

      return (
        <View style={styles.container}>
          <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.View style={[styles.box, animatedStyle]}>
              <Text style={styles.text}>Pinch Me!</Text>
            </Animated.View>
          </PinchGestureHandler>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    box: {
      width: 200,
      height: 100,
      backgroundColor: 'tomato',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default ItemPincher