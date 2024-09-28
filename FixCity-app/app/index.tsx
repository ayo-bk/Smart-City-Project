import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
  TouchableWithoutFeedback,
} from "react-native";
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
  ImagePlus,
  Plus,
} from "lucide-react-native";

type Filter =
  | "Toilettes"
  | "Arrêts de bus"
  | "Bouche d'incendie"
  | "Poubelle"
  | "Lumière";




  

export default function Index() {
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

  const [selectedMarker, setSelectedMarker] = useState<null | { id: number; latitude: number; longitude: number }>(null);
  const [isReportVisible, setIsReportVisible] = useState(false);
  const profileModalRef = useRef(null);

  const handleProfilePress = () => {
    setIsReportVisible(true);
  };

  const handleProfileClose = () => {
    setIsReportVisible(false);
  };

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
          <View className="flex-row gap-3 items-center justify-center mt-16">
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
            title="azeaeazeaeaea"
            description="c'est michou"
            onPress={() => {
              setSelectedMarker(marker);
              setIsReportVisible(true);
            }}
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



  <Modal
        ref={profileModalRef}
        visible={isReportVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleProfileClose}
      >
        <TouchableWithoutFeedback onPress={handleProfileClose}>
          <View className="flex-1 bg-transparent">


            <TouchableWithoutFeedback>
              <View className="bg-white rounded-t-3xl absolute bottom-0 left-0 right-0 p-4">
                


                <Text className="text-center text-lg font-semibold mb-6">NOUVEAU SIGNALLEMENT</Text>



                <View className="flex-row items-center bg-gray-100 p-4 rounded-lg mb-6">
                  <BusFront size={24} color="black" strokeWidth={2} />
                  <View className="ml-3">
                    <Text className="font-semibold">Arrêt de bus</Text>
                    <Text className="text-blue-500">54 rue Lafontaine</Text>
                  </View>
                </View>




                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-300">
                  <Text className="text-lg">Type</Text>
                  <Plus size={24} color="black" strokeWidth={2} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-300">
                  <Text className="text-lg">Description</Text>
                  <Plus size={24} color="black" strokeWidth={2} />
                </TouchableOpacity>



                <View className="mt-6">
                  <Text className="text-lg mb-3">Photo</Text>
                  <View className="flex-row justify-around">
                    <TouchableOpacity className="bg-gray-100 p-5 rounded-lg items-center justify-center">
                    <ImagePlus size={24} color="black" strokeWidth={2} />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-100 p-5 rounded-lg items-center justify-center">
                    <ImagePlus size={24} color="black" strokeWidth={2} />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-100 p-5 rounded-lg items-center justify-center">
                    <ImagePlus size={24} color="black" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                </View>



                <TouchableOpacity
                  onPress={() => {
                    alert("Merci \n Votre signalement a bien été publié !");
                    handleProfileClose();
                  }}
                  className="bg-blue-500 py-4 rounded-full mt-10 mb-3"
                >
                  <Text className="text-center text-white text-lg">Publier</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
