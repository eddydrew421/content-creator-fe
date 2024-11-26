import { StyleSheet, View, Text } from 'react-native';
import ProfileEditScreen from '../screens/EditProfile';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ProfileEditScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
