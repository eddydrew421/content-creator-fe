import { PinchGestureHandler, Gesture, GestureDetector } from 'react-native-gesture-handler';

import { ImageSourcePropType, View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import Animated, {  useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
    imageSize: number,
    stickerSource: ImageSource
}

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  
//1. Drag functionality using sharedValue + Gestures 
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
  });

  //update the style
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  })
  
  const scaleImage = useSharedValue(imageSize);

  
  //gesture handler - double tap to 2x scale image, if it's already 2x, scale back to original
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
        if(scaleImage.value !== imageSize * 2) {
            scaleImage.value = scaleImage.value * 2;
        } else {
            scaleImage.value = Math.round(scaleImage.value / 2);
        }
    })

    //image style handler
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        }
    })

  return (
    <GestureDetector gesture={drag}>
     
        <Animated.View style={[containerStyle, { top: -350 }]}>
            <GestureDetector gesture={doubleTap}>
                <Animated.Image 
                    source={stickerSource as ImageSourcePropType} 
                    resizeMode={"contain"}
                    style={ [imageStyle, { width: imageSize, height: imageSize }] } 
                />
            </GestureDetector>
        </Animated.View>

    </GestureDetector>  

  )
}
