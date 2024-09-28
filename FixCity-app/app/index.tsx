import React, { useRef, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from 'expo-image-picker';
import {
  View,
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
import { Colors } from "@/constants/Colors"; // Constance des couleurs
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type Filter =
  | "Toilettes"
  | "Arrêts de bus"
  | "Bouche d'incendie"
  | "Poubelle"
  | "Lumière";


  export default function Index() {
    // États liés à la région et aux marqueurs
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
  
    // États liés à la gestion des modales et des filtres
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
    const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<null | { id: number; latitude: number; longitude: number }>(null);

    // États pour gérer les modales et l'image
    const [isReportVisible, setIsReportVisible] = useState(false);
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false); // Modale pour les options photo
    const [image, setImage] = useState<string | null>(null);    
    const [images, setImages] = useState<string[]>([]); // Tableau pour stocker plusieurs images


    const profileModalRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(true);

    // Gestion de la modal de type
    const handleTypeSelect = (value: string) => setSelectedType(value);
    const handleTypePress = () => setIsTypeModalVisible(true);
    const handleTypeClose = () => setIsTypeModalVisible(false);
  
    // Gestion de la modal de signalement
    const handleProfilePress = () => setIsReportVisible(true);
      
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


    // Fonction pour fermer la modale de signalement et réinitialiser les champs
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


    // Gestion de la région actuelle
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



    // Gestion de la modal des filtres
    const handleFilterPress = () => setIsFilterVisible(true);
    const handleFilterClose = () => setIsFilterVisible(false);
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
    const handleFilterReset = () => setSelectedFilters([]);
  
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
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




    </View>
    </KeyboardAvoidingView>
  );
}
