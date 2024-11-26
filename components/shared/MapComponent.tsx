import MapView, { Marker, LatLng } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationSubscription } from 'expo-location';

type Props = {
  location: LatLng;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

const MapComponent = () => {
  //default location - SF
  const [location, setLocation] = useState<LatLng | null>(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //for exact location
  const [locationSubscription, setLocationSubscription] = useState<LocationSubscription | null>(null);

  useEffect(() => {
    const getLocationAsync = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await getCurrentPositionAsync();
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setRegion({
          ...region,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        //for continuous tracking of user's location
        const subscription = await Location.startLocationUpdatesAsync('locationSubscription', (location) => {
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setRegion({
            ...region,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }, {
          // You can also pass options to startLocationUpdatesAsync
          accuracy: Location.Accuracy.Highest,
        });

        setLocationSubscription(subscription);
      }
    };
    getLocationAsync();
  }, []);

  useEffect(() => {
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [locationSubscription]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
        minZoomLevel={10}
        maxZoomLevel={20}
        showsMyLocationButton={true}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsIndoors={false}
        showsTraffic={false}
        showsIndoorLevelPicker={false}
        loadingEnabled={true}
        loadingIndicatorColor="#fff"
        loadingBackgroundColor="#333"
        moveOnMarkerPress={true}
        onPress={(e) => console.log(e.nativeEvent.coordinate)}
        onRegionChange={(region) => setRegion(region)}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="This is your current location"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '80%',
  },
});

export default MapComponent;