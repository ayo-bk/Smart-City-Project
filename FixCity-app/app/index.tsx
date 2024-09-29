import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
  Button,
  Image,
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
  UserRound,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

type Filter =
  | "Toilettes"
  | "Arrêts de bus"
  | "Bouche d'incendie"
  | "Poubelle"
  | "Lumière";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  // URL de l'API backend
  const BACKEND_URL = 'http://192.168.1.89:3000'

  // ABRIS
  // Définir l'interface pour le type de données des abris
  interface Abri {
    LIB_LEVEL: string;
    geo_point_2d: string;
  }

  const [abris, setAbris] = useState<Abri[]>([]);

  // Fonction pour récupérer les données des abris depuis le backend
  const fetchAbris = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/abris`);
      setAbris(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des abris:", error);
    }
  };

   // Récupérer les abris au chargement du composant
   useEffect(() => {
    fetchAbris();
  }, []);

  // BANCS-POUBELLES
  // Définir l'interface pour le type de données des bancs-poubelles
  interface BenchTrash {
    LIB_LEVEL: string;
    geo_point_2d: string;
  }

  const [benchTrash, setBenchTrash] = useState<BenchTrash[]>([]);

  // Fonction pour récupérer les données des bancs-poubelles depuis le backend
  const fetchBenchTrash = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/bench_trash`);
      setBenchTrash(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des bancs-poubelles:", error);
    }
  };

   // Récupérer les bancs-poubelles au chargement du composant
   useEffect(() => {
    fetchBenchTrash();
  }, []);

  // BOUCHES D'INCENDIE
  // Définir l'interface pour le type de données des bouches d'incendie
  interface FireHydrant {
    OBJECTID: string;
    object_name: string;
    Type: string;
    "Geo Point": string;
  }

  const [fireHydrants, setFireHydrants] = useState<FireHydrant[]>([]);

  // Fonction pour récupérer les données des bouches d'incendie depuis le backend
  const fetchFireHydrants = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/fire_hydratants`);
      setFireHydrants(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des bouches d'incendie:", error);
    }
  };

   // Récupérer les bouches d'incendie au chargement du composant
   useEffect(() => {
    fetchFireHydrants();
  }, []);

  // LUMIÈRES
  // Définir l'interface pour le type de données des lumières
  interface Light {
    "Libellé de la famille de luminaire": string;
    geo_point_2d: string;  // Coordonnées sous forme de chaîne "latitude,longitude"
  }

  const [lights, setLights] = useState<Light[]>([]);

  // Fonction pour récupérer les données des lumières depuis le backend
  const fetchLights = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/lights`);
      setLights(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des lumières:", error);
    }
  };

   // Récupérer les lumières au chargement du composant
   useEffect(() => {
    fetchLights();
  }, []);

  // TOILETTES
  // Définir l'interface pour le type de données des toilettes
  interface Toilet {
    Type: string;
    ACCES_PMR: string;
    geo_point_2d: string;
  }

  const [toilets, setToilets] = useState<Toilet[]>([]);

  // Fonction pour récupérer les données des toilettes depuis le backend
  const fetchToilets = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/toilets`);
      setToilets(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des toilettes:", error);
    }
  };

   // Récupérer les toilettes au chargement du composant
   useEffect(() => {
    fetchToilets();
  }, []);

  const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Veuillez accepter la permission d&apos;utiliser la camera ");
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
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const profileModalRef = useRef(null);

  const getLocation = async () => {
    setRegion({
      latitude: 48.85781676584989,
      longitude: 2.2950763090818325,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  const handleProfilePress = () => {
    setIsProfileVisible(true);
  };

  const handleProfileClose = () => {
    setIsProfileVisible(false);
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
        ref={profileModalRef}
        visible={isProfileVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleProfileClose}
      >
        <TouchableWithoutFeedback onPress={handleProfileClose}>
          <View className="flex-1 bg-transparent">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-t-3xl absolute bottom-0 left-0 right-0 p-4">
                <View className="items-center justify-center mb-7 mt-3">
                  <TouchableOpacity
                    className="absolute left-0 p-2 bg-blue-500 rounded-full "
                    onPress={handleProfilePress}
                  >
                    <UserRound size={30} color="white" />
                  </TouchableOpacity>
                  <Text className="text-2xl font-bold">Roxanne Thiemmen</Text>
                </View>
                <View className="mb-4">
                  <Text className="font-bold text-lg">Mes Signalements</Text>
                </View>
                {/* Signalement 1 */}
                <View className="bg-gray-200 p-1 rounded-3xl mb-3 items-center flex-row gap-2">
                  <View className="items-center">
                    <BusFront size={34} color="black" strokeWidth={1.5} />
                  </View>
                  <View className="">
                    <Text className="font-bold">Arrêt de bus</Text>
                    <Text className="text-blue-500">54 rue Lafontaine</Text>
                    <Text className="italic text-sm ">
                      "La vitre de l'abribus est cassée."
                    </Text>
                  </View>
                </View>

                {/* Signalement 2 */}
                <View className="bg-gray-100 p-4 rounded-lg mb-3">
                  <View className="flex-row items-center mb-2">
                    <TrafficCone size={24} color="black" />
                    <Text className="ml-2 font-bold">Voierie</Text>
                  </View>
                  <Text className="text-gray-600">38 rue Waldeck Rousseau</Text>
                  <Text className="text-gray-600">
                    "Il manque beaucoup de pavés sur les trottoirs. C'est
                    dangereux pour les talons aiguilles."
                  </Text>
                </View>

                {/* Signalement 3 */}
                <View className="bg-gray-100 p-4 rounded-lg mb-3">
                  <View className="flex-row items-center mb-2">
                    <Bath size={24} color="black" />
                    <Text className="ml-2 font-bold">Toilettes</Text>
                  </View>
                  <Text className="text-gray-600">52 avenue de la Marne</Text>
                  <Text className="text-gray-600">"À déboucher."</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
                <Text className="text-center text-xl text-white">
                  Choose photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takeImage}
                className="w-36 h-10 items-center flex-1 justify-center bg-blue-500 rounded-full "
              >
                <Text className="text-center text-xl text-white">
                  Take photo
                </Text>
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

        {/* Arrêts de bus */}
        {abris.map((abri, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(abri.geo_point_2d.split(',')[0]),
              longitude: parseFloat(abri.geo_point_2d.split(',')[1]),
            }}
            title={abri.LIB_LEVEL}
            description="Abribus"
          >
            <BusFront size={30} color="grey" strokeWidth={2}/>
          </Marker>
        ))}

        {/* Poubelles et bancs */}
        {benchTrash.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(item.geo_point_2d.split(',')[0]),
              longitude: parseFloat(item.geo_point_2d.split(',')[1]),
            }}
            title={item.LIB_LEVEL}
            description="Poubelle"
          >
            <Trash size={30} color="gray" />
          </Marker>
        ))}

        {/* Bouche d'incendie */}
        {fireHydrants.map((hydrant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(hydrant["Geo Point"].split(',')[0]),
              longitude: parseFloat(hydrant["Geo Point"].split(',')[1]),
            }}
            title={hydrant.object_name}
            description={hydrant.Type}
          >
            <FireExtinguisher size={30} color="red" />
          </Marker>
        ))}

        {/* Lumières */}
        {lights.map((light, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(light.geo_point_2d.split(',')[0]),
              longitude: parseFloat(light.geo_point_2d.split(',')[1]),
            }}
            title={light["Libellé de la famille de luminaire"]}
            description="Lumière"
          >
            <Lightbulb size={30} color="yellow" />
          </Marker>
        ))}

        {/* Toilettes */}
        {toilets.map((toilet, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(toilet.geo_point_2d.split(',')[0]),
              longitude: parseFloat(toilet.geo_point_2d.split(',')[1]),
            }}
            title={toilet.Type}
            description={`Accès PMR : ${toilet.ACCES_PMR}`}
          >
            <Bath size={30} color="blue" />
          </Marker>
        ))}

      </MapView>
      <TouchableOpacity
        className="absolute top-20 right-5 p-3 bg-blue-500 rounded-full items-center"
        onPress={handleProfilePress}
      >
        <UserRound size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        className=" absolute bottom-32 right-5 p-4 bg-white rounded-full items-center justify-center mb-2"
        onPress={handleFilterPress}
      >
        <SlidersHorizontal size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        className=" absolute bottom-16 right-5 p-4 bg-white rounded-full items-center justify-center "
        onPress={getLocation}
      >
        <LocateFixed size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
