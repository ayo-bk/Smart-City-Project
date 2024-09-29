import React, { useEffect, useState, useRef } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  Button,
  Text,
  Modal as NativeModal,  // Alias pour éviter les conflits
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform, 
  ScrollView,
  TextInput,
  Image,
  Alert,
  Switch,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  TrafficCone,
  UserRound,
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
  SquareArrowOutUpRight,
  Aperture ,
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

  // URL de l'API backend
  const BACKEND_URL = "http://192.168.1.89:3000";


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
      console.error(
        "Erreur lors de la récupération des bancs-poubelles:",
        error
      );
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
      console.error(
        "Erreur lors de la récupération des bouches d'incendie:",
        error
      );
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
    geo_point_2d: string; // Coordonnées sous forme de chaîne "latitude,longitude"
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

  // const [isFilterVisible, setIsFilterVisible] = useState(false); // Mathis qui a mis ça en com (venant de Sacha)
  // const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]); // Mathis qui a mis ça en com (venant de Sacha)

  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<null | { id: number; latitude: number; longitude: number }>(null);

  const [isReportVisible, setIsReportVisible] = useState(false);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false); // Modale pour les options photo
  const [image, setImage] = useState<string | null>(null);    
  const [images, setImages] = useState<string[]>([]); // Tableau pour stocker plusieurs images


  // const profileModalRef = useRef(null); // Mathis qui a mis ça en com (venant de Sacha)
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleTypeSelect = (value: string) => setSelectedType(value);
  const handleTypePress = () => setIsTypeModalVisible(true);
  const handleTypeClose = () => setIsTypeModalVisible(false);
  
    // Gestion de la modal de signalement
  // const handleProfilePress = () => setIsReportVisible(true); // Mathis qui a mis ça en com (venant de Sacha)
      
  const handleBackToReport = () => {
    setIsPhotoModalVisible(false);  // Fermer la modale de photos
    setIsReportVisible(true);       // Réouvrir la modale de signalement
  };
  
  // États pour gérer les champs type et description
  const [selectedType, setSelectedType] = useState<string | null>(null); // Pour le type
  const [description, setDescription] = useState<string>(''); // Pour la description

  // Fonction pour réinitialiser les champs après la publication
  const resetForm = () => {
    setSelectedType(null); // Réinitialiser le type
    setDescription(''); // Réinitialiser la description
    setImages([]); // Réinitialiser les images
  };

  const handleProfileClose = () => {
    setIsReportVisible(false);
    setImages([]); // Réinitialiser les images
    resetForm(); // Réinitialiser les champs après la fermeture ou la validation
    // Réinitialiser d'autres champs si nécessaire
  };

  // Fonction de publication du signalement
  const handleSubmit = () => {
    Alert.alert("Merci", "Votre signalement a bien été publié !");
    handleProfileClose(); // Fermer la modale et réinitialiser les champs
  };

  // Fonction pour prendre une photo
  const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert("Veuillez accepter la permission d'utiliser la caméra.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]); // Ajoute l'image au tableau
      setIsPhotoModalVisible(false); // Fermer la modale de photo
      setIsReportVisible(true); // Réouvrir la modale de signalement
    }
  };

  // Fonction pour choisir une image dans la galerie
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]); // Ajoute l'image au tableau
      setIsPhotoModalVisible(false); // Fermer la modale de photo
      setIsReportVisible(true); // Réouvrir la modale de signalement
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
  // const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);

  const [selectedFilters, setSelectedFilters] = useState({
    toilets: false,
    bench_trash: false,
    fire_hydratants: false,
    lights: false,
    abris: false,
  });

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

  const handlePhotoPress = () => {
    setIsReportVisible(false); // Fermer la modale de signalement
    setIsPhotoModalVisible(true); // Ouvrir la modale pour les photos
  };

  const handleProfilePress = () => {
    setIsProfileVisible(true);
  };

  // const handleProfileClose = () => { // Mathis qui a mis ça en com (venant de dev de base)
  //   setIsProfileVisible(false);
  // };

  const handleFilterPress = () => {
    setIsFilterVisible(true);
  };

  const handleFilterClose = () => {
    setIsFilterVisible(false);
  };

  // const handleFilterChange = (filter: Filter, isSelected: boolean) => {
  //   if (isSelected) {
  //     setSelectedFilters([...selectedFilters, filter]);
  //   } else {
  //     setSelectedFilters(selectedFilters.filter((item) => item !== filter));
  //   }
  // };

  type FilterName =
    | "toilets"
    | "bench_trash"
    | "fire_hydratants"
    | "lights"
    | "abris";

  const handleFilterChange = (filterName: FilterName) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleFilterApply = () => {
    console.log("Selected filters:", selectedFilters);
    setIsFilterVisible(false);
  };

  const handleFilterReset = () => {
    setSelectedFilters({
      toilets: false,
      bench_trash: false,
      fire_hydratants: false,
      lights: false,
      abris: false,
    });
  };

  const fetchFilteredData = async () => {
    try {
      let toiletsData = [];
      let benchTrashData = [];
      let fireHydrantData = [];
      let lightsData = [];
      let abrisData = [];

      if (selectedFilters.toilets) {
        const response = await axios.get(`${BACKEND_URL}/toilets`);
        toiletsData = response.data.data;
      }

      if (selectedFilters.bench_trash) {
        const response = await axios.get(`${BACKEND_URL}/bench_trash`);
        benchTrashData = response.data.data;
      }

      if (selectedFilters.fire_hydratants) {
        const response = await axios.get(`${BACKEND_URL}/fire_hydratants`);
        fireHydrantData = response.data.data;
      }

      if (selectedFilters.lights) {
        const response = await axios.get(`${BACKEND_URL}/lights`);
        lightsData = response.data.data;
      }

      if (selectedFilters.abris) {
        const response = await axios.get(`${BACKEND_URL}/abris`);
        abrisData = response.data.data;
      }

      // Combiner toutes les données récupérées
      setToilets(toiletsData);
      setBenchTrash(benchTrashData);
      setFireHydrants(fireHydrantData);
      setLights(lightsData);
      setAbris(abrisData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données filtrées :",
        error
      );
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
    
    <View className="flex-1">
      {/* ----------------------------------------------------------------------- */}
      {/* Modal Profile */}
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
      {/* ----------------------------------------------------------------------- */}
      {/* Modal Filter */}
      <Modal
        visible={isFilterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleFilterClose}
      >
        <View className="bg-white flex-1 py-14 px-10">
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
                  value={selectedFilters.toilets}
                  onValueChange={() => handleFilterChange("toilets")}
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
                  value={selectedFilters.abris}
                  onValueChange={() => handleFilterChange("abris")}
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
                  value={selectedFilters.fire_hydratants}
                  onValueChange={() => handleFilterChange("fire_hydratants")}
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
                  value={selectedFilters.bench_trash}
                  onValueChange={() => handleFilterChange("bench_trash")}
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
                  value={selectedFilters.lights}
                  onValueChange={() => handleFilterChange("lights")}
                  trackColor={{ false: "#FFFFFF", true: "#127CFF" }}
                />
              </View>
            </View>
          </View>
          {/* ----------------------------------------------------------------------- */}
          {/* Boutons Réinitialiser et Valider  */}
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
                className="w-36 h-10 items-center flex-1 justify-center bg-blue-500 rounded-full"
              >
                <Text className="text-center text-xl text-white">Valider</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                onPress={pickImage}
                className="w-36 h-10 items-center flex-1 justify-center bg-blue-500 rounded-full"
              >
                <Text className="text-center text-xl text-white">
                  Choose photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takeImage}
                className="w-36 h-10 items-center flex-1 justify-center bg-blue-500 rounded-full"
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
        {selectedFilters.abris &&
          abris.map((abri, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(abri.geo_point_2d.split(",")[0]),
                longitude: parseFloat(abri.geo_point_2d.split(",")[1]),
              }}
              title={abri.LIB_LEVEL}
              description="Abribus"
            //   onPress={() => {
            //   setSelectedMarker(marker);
            //   setIsReportVisible(true);
            // }}
            >
              <BusFront size={30} color="blue" />
            </Marker>
          ))}

        {/* Poubelles et bancs */}
        {selectedFilters.bench_trash &&
          benchTrash.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(item.geo_point_2d.split(",")[0]),
                longitude: parseFloat(item.geo_point_2d.split(",")[1]),
              }}
              title={item.LIB_LEVEL}
              description="Banc ou poubelle"
              //   onPress={() => {
            //   setSelectedMarker(marker);
            //   setIsReportVisible(true);
            // }}
            >
              <Trash size={30} color="gray" />
            </Marker>
          ))}

        {/* Bouche d'incendie */}
        {selectedFilters.fire_hydratants &&
          fireHydrants.map((hydrant, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(hydrant["Geo Point"].split(",")[0]),
                longitude: parseFloat(hydrant["Geo Point"].split(",")[1]),
              }}
              title={hydrant.object_name}
              description={hydrant.Type}
              //   onPress={() => {
            //   setSelectedMarker(marker);
            //   setIsReportVisible(true);
            // }}
            >
              <FireExtinguisher size={30} color="red" />
            </Marker>
          ))}

        {/* Lumières */}
        {selectedFilters.lights &&
          lights.map((light, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(light.geo_point_2d.split(",")[0]),
                longitude: parseFloat(light.geo_point_2d.split(",")[1]),
              }}
              title={light["Libellé de la famille de luminaire"]}
              description="Luminaire public"
            //     onPress={() => {
            //   setSelectedMarker(marker);
            //   setIsReportVisible(true);
            // }}
            >
              <Lightbulb size={30} color="yellow" />
            </Marker>
          ))}

        {/* Toilettes */}
        {selectedFilters.toilets &&
          toilets.map((toilet, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(toilet.geo_point_2d.split(",")[0]),
                longitude: parseFloat(toilet.geo_point_2d.split(",")[1]),
              }}
              title={toilet.Type}
              description={`Accès PMR : ${toilet.ACCES_PMR}`}
              //   onPress={() => {
            //   setSelectedMarker(marker);
            //   setIsReportVisible(true);
            // }}
            >
              <Bath size={30} color="blue" />
            </Marker>
          ))}
      </MapView>
      {/* ----------------------------------------------------------------------- */}
      {/* Button Profile */}
      <TouchableOpacity
        className="absolute top-20 right-5 p-3 bg-blue-500 rounded-full items-center"
        onPress={handleProfilePress}
      >
        <UserRound size={24} color="white" />
      </TouchableOpacity>
      {/* ----------------------------------------------------------------------- */}
      {/* Button Filter */}
      <TouchableOpacity
        className=" absolute bottom-32 right-5 p-4 bg-white rounded-full items-center justify-center mb-2"
        onPress={handleFilterPress}
      >
        <SlidersHorizontal size={24} color="black" />
      </TouchableOpacity>
      {/* ----------------------------------------------------------------------- */}
      {/* Button Locate */}
      <TouchableOpacity
        className=" absolute bottom-16 right-5 p-4 bg-white rounded-full items-center justify-center "
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
        onRequestClose={() => setIsReportVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          {/* Première couche: Clic sur la zone transparente pour fermer la modale */}
          <TouchableWithoutFeedback onPress={handleProfileClose}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              {/* Deuxième couche: Contenu de la modale */}
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View className="bg-white rounded-t-3xl p-4">
                  <Text className="text-center text-lg font-semibold mb-6">
                    NOUVEAU SIGNALLEMENT
                  </Text>

                  {/* Détails du signalement */}
                  <View className="flex-row items-center bg-gray-100 p-4 rounded-lg mb-6">
                    <BusFront size={24} color="black" strokeWidth={2} />
                    <View className="ml-3">
                      <Text className="font-semibold">Arrêt de bus</Text>
                      <Text className="text-blue-500">54 rue Lafontaine</Text>
                    </View>
                  </View>

                  {/* Sélection du type */}
                  <TouchableOpacity
                    className="flex-row justify-between items-center py-4 border-b border-gray-300"
                    onPress={handleTypePress}
                  >
                    <RNPickerSelect
                      onValueChange={(value) => setSelectedType(value)} // Utilise setSelectedType
                      placeholder={{ label: "Sélectionner un type...", value: null }}
                      value={selectedType} // Ajoute la valeur sélectionnée ici
                      items={[
                        { label: "Vitre cassée", value: "Vitre cassée" },
                        { label: "Panneau d’affichage", value: "Panneau d’affichage" },
                        { label: "Banc inutilisable", value: "Banc inutilisable" },
                      ]}
                      style={{
                        inputIOS: {
                          fontSize: 18,
                        },
                      }}
                    />
                    <Plus size={24} color="black" strokeWidth={2} />
                  </TouchableOpacity>

                  {/* Champ de texte pour la description */}
                  <View className="flex-row justify-between items-center py-4 border-b border-gray-300">
                    <TextInput
                      style={{
                        fontSize: 18,
                        flex: 1, // Remplir l'espace disponible
                      }}
                      multiline
                      numberOfLines={4}
                      onChangeText={(text) => setDescription(text)}
                      placeholder="Ajouter une description ici"
                      placeholderTextColor="rgba(0, 0, 0, 0.2)" // Définit la couleur du placeholder en gris

                      value={description} // Ajoute la valeur ici
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <Plus size={24} color="black" strokeWidth={2} />
                  </View>


                   {/* Section pour l'ajout de photos */}
                  <View className="mt-6">
                    <Text className="text-lg mb-3">Photo</Text>
                    
                    <View className="flex-row justify-around">
                      {/* Afficher les images sélectionnées */}
                      {images.map((img, index) => (
                        <Image key={index} source={{ uri: img }} style={{ width: 60, height: 60 }} />
                      ))}

                      {/* Afficher les carrés gris restants */}
                      {[...Array(3 - images.length)].map((_, index) => (
                        <TouchableOpacity key={index} onPress={handlePhotoPress} className="bg-gray-100 p-5 rounded-lg items-center justify-center">
                          <ImagePlus size={24} color="black" strokeWidth={2} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>


                  {/* Bouton pour publier le signalement */}
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("Merci", "Votre signalement a bien été publié !");
                      handleSubmit(); // Appelle la fonction pour fermer et réinitialiser la modale
                    }}
                    className="bg-blue-500 py-4 rounded-full mt-10 mb-3"
                  >
                    <Text className="text-center text-white text-lg">Publier</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        visible={isPhotoModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPhotoModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '40%' }}>
            <TouchableOpacity onPress={handleBackToReport}>
              <ArrowLeft size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-center text-lg font-semibold mb-6">PHOTO</Text>

            {/* Option pour ouvrir la galerie */}
            <TouchableOpacity
              onPress={pickImage}
              className="flex-row items-center py-4 bg-gray-100 rounded-lg mb-3 px-3"
            >
              <SquareArrowOutUpRight size={24} color="black" strokeWidth={2} />
              <Text className="text-lg ml-3">Ouvrir depuis la Galerie</Text>
            </TouchableOpacity>

            {/* Option pour prendre une photo */}
            <TouchableOpacity
              onPress={takeImage}
              className="flex-row items-center py-4 bg-gray-100 rounded-lg px-3"
            >
              <Aperture size={24} color="black" strokeWidth={2} />
              <Text className="text-lg ml-3">Prendre une photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}
