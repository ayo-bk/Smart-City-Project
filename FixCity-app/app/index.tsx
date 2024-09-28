import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Switch, Button, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  TrafficCone,
  SlidersHorizontal,
  LocateFixed,
  BusFront,
  ArrowLeft,
  Trash,
  Bath,
  Lightbulb,
  FireExtinguisher,
} from "lucide-react-native";
import * as ImagePicker from 'expo-image-picker';


type Filter =
  | "Toilettes"
  | "Arrêts de bus"
  | "Bouche d'incendie"
  | "Poubelle"
  | "Lumière";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Veuillez accepter la permission d&apos;utiliser la camera ');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    // J'ai pas besoin de permission pour accéder à la galerie
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const [region, setRegion] = useState({
    latitude: 48.85781676584989,
    longitude: 2.2950763090818325,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState([
    {
      id: 1,
      latitude: 48.85781676584989,
      longitude: 2.2950763090818325,
    },
    {
      id: 2,
      latitude: 48.85181499513845,
      longitude: 2.3054006502971864,
    },
  ]);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);

  const getLocation = async () => {
    setRegion({
      latitude: 48.85781676584989,
      longitude: 2.2950763090818325,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  const handleFilterPress = () => {
    setIsFilterVisible(true);
  };

  const handleFilterClose = () => {
    setIsFilterVisible(false);
  };

  const handleFilterChange = (filter: Filter, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFilters([...selectedFilters, filter]);
    } else {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    }
  };

  const handleFilterApply = () => {
    console.log("Selected filters:", selectedFilters);
    setIsFilterVisible(false);
  };

  const handleFilterReset = () => {
    setSelectedFilters([]);
  };

  return (
    <View className="flex-1">
      <Modal
        visible={isFilterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleFilterClose}
      >
        <View className="bg-white flex-1 py-14 px-10 ">
          <View className="mb-4">
            <TouchableOpacity onPress={handleFilterClose}>
              <ArrowLeft size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-center mt-5">
              Filtrer les éléments affichés
            </Text>
          </View>
          <View className="flex gap-4 mt-5">
            {/* Toilettes */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Bath size={44} color="black" strokeWidth={1} />
                <Text className="ml-2 text-2xl">Toilettes</Text>
              </View>
              <View>
                <Switch
                  value={selectedFilters.includes("Toilettes")}
                  onValueChange={(value) =>
                    handleFilterChange("Toilettes", value)
                  }
                  trackColor={{ false: "#FFFFFF", true: "#127CFF" }}
                />
              </View>
            </View>

            {/* Arrêts de bus */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <BusFront size={44} color="black" strokeWidth={1} />
                <Text className="ml-2 text-2xl">Arrêts de bus</Text>
              </View>
              <View>
                <Switch
                  value={selectedFilters.includes("Arrêts de bus")}
                  onValueChange={(value) =>
                    handleFilterChange("Arrêts de bus", value)
                  }
                  trackColor={{ false: "#FFFFFF", true: "#127CFF" }}
                />
              </View>
            </View>

            {/* Bouche d'incendie */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <FireExtinguisher size={44} color="black" strokeWidth={1} />
                <Text className="ml-2 text-2xl">Bouche d'incendie</Text>
              </View>
              <View>
                <Switch
                  value={selectedFilters.includes("Bouche d'incendie")}
                  onValueChange={(value) =>
                    handleFilterChange("Bouche d'incendie", value)
                  }
                  trackColor={{ false: "#FFFFFF", true: "#127CFF" }}
                />
              </View>
            </View>

            {/* Bancs-Poubelle */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Trash size={44} color="black" strokeWidth={1} />
                <Text className="ml-2 text-2xl">Poubelle</Text>
              </View>
              <View>
                <Switch
                  value={selectedFilters.includes("Poubelle")}
                  onValueChange={(value) =>
                    handleFilterChange("Poubelle", value)
                  }
                  trackColor={{ false: "#FFFFFF", true: "#127CFF" }}
                />
              </View>
            </View>

            {/* Lumière */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Lightbulb size={44} color="black" strokeWidth={1} />
                <Text className="ml-2 text-2xl">Lumière</Text>
              </View>
              <View>
                <Switch
                  value={selectedFilters.includes("Lumière")}
                  onValueChange={(value) =>
                    handleFilterChange("Lumière", value)
                  }
                  trackColor={{ false: "#FFFFFF", true: "#127CFF" }}
                />
              </View>
            </View>
          </View>

          {/* Buttons for Apply and Reset */}
          <View className="flex-col gap-3 items-center justify-center mt-16">
            <View className="flex-row"> 
            
            <TouchableOpacity
              onPress={handleFilterReset}
              className="w-36 h-10 items-center flex-1 justify-center border-blue-500 rounded-full border"
              >
              <Text className="text-center text-xl text-blue-500">
                Réinitialiser
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFilterApply}
              className="w-36 h-10 items-center flex-1 justify-center bg-blue-500 rounded-full "
              >
              <Text className="text-center text-xl text-white">Valider</Text>
            </TouchableOpacity>
            </View>
            <View className="flex-row">
            <TouchableOpacity
              onPress={pickImage}
              className="w-36 h-10 items-center flex-1 justify-center bg-blue-500 rounded-full "
              >
              <Text className="text-center text-xl text-white">Choose photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takeImage}
              className="w-36 h-10 items-center flex-1 justify-center bg-blue-500 rounded-full "
              >
              <Text className="text-center text-xl text-white">Take photo</Text>
            </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>

      <MapView
        className="flex-1"
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {location.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title="wsh les bggg"
            description="c'est michou"
          >
            <TrafficCone size={30} color="orange" />
          </Marker>
        ))}
      </MapView>
      <View className="absolute bottom-10 right-5 flex-col ">
        <TouchableOpacity
          className="p-5 bg-white rounded-full items-center mb-3 justify-center "
          onPress={handleFilterPress}
        >
          <SlidersHorizontal size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          className="p-5 bg-white rounded-full items-center mb-10 justify-center "
          onPress={getLocation}
        >
          <LocateFixed size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

