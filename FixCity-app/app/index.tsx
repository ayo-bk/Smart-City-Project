import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import React, { useState, useEffect } from 'react';
import { Button, View, Platform, Alert, Dimensions, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function Index() {
  const [region, setRegion] = useState({
    latitude: 48.85781676584989,
    longitude: 2.2950763090818325,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState([
    {
      id : 1,
      latitude: 48.85781676584989,
      longitude: 2.2950763090818325,
    },
    {
      id : 2,
      latitude: 48.85181499513845, 
      longitude:2.3054006502971864,
    },

  ]);
  
  const getLocation = async () => {
    // Ask for location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    // Get the current location
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    const { latitude, longitude } = location.coords;

    // Update the map's region to the user's location
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };
  return (
    <View style={styles.container}>

      <MapView
        style={{flex : 1}}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {location.map((marker) => (
          <Marker
          key={marker.id}
          coordinate={{
            latitude : marker.latitude,
            longitude  : marker.longitude
          }}
          title="wsh les bggg"
          description="c'est michou"
        />
        ))}
        
          {/* <Image
            source={require("../assets/images/react-logo.png")}
            style={{ width: 26, height: 28 }}
            resizeMode="center"
          /> */}

      <Button title="Go to my location" onPress={getLocation} />

      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Go to my location" onPress={getLocation} />
      </View>
    </View>
    
      
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

