import React, { useRef, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import RNModal from "react-native-modal";
import {
  View,
  Text,
  Modal as NativeModal, // Alias pour éviter les conflits
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  Button,
  Image,
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
  UserRound,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors"; // Constance des couleurs
import * as ImagePicker from "expo-image-picker";
import Report from "@/components/Report";

type Filter =
  | "Toilettes"
  | "Arrêts de bus"
  | "Bouche d'incendie"
  | "Poubelle"
  | "Lumière";

type Value = {
  label: string;
  value: string;
};

export default function Index() {
  // États liés à la région et aux marqueurs
  const [image, setImage] = useState<string | null>(null);

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

  // États liés à la gestion des modales et des filtres
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<null | {
    id: number;
    latitude: number;
    longitude: number;
  }>(null);
  const [isReportVisible, setIsReportVisible] = useState(false);
  const profileModalRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  // États liés à la sélection du type et à la description
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");

  // Gestion de la modal de type
  const handleTypeSelect = (value: string) => setSelectedType(value);
  const handleTypePress = () => setIsTypeModalVisible(true);
  const handleTypeClose = () => setIsTypeModalVisible(false);

  // Gestion de la modal de signalement
  const handleSignalPress = () => setIsReportVisible(true);
  const handleSignalClose = () => setIsReportVisible(false);

  // Gestion de la région actuelle  const [isProfileVisible, setIsProfileVisible] = useState(false);

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
                    <Text className="text-2xl ">Roxanne Thiemmen</Text>
                  </View>
                  <View className="mb-4">
                    <Text className="text-lg">MES SIGNALEMENTS</Text>
                  </View>
                  <View className="flex-col gap-3">
                    {/* Signalement Arrêt de bus */}
                    <View className="bg-gray-200 p-2 rounded-3xl items-center flex-row gap-2">
                      <View className="items-center">
                        <BusFront size={34} color="black" strokeWidth={1.5} />
                      </View>
                      <View>
                        <Text className="font-bold">Arrêt de bus</Text>
                        <Text className="text-blue-500">54 rue Lafontaine</Text>
                        <Text className="italic text-sm">
                          "La vitre de l'abribus est cassée."
                        </Text>
                      </View>
                    </View>

                    {/* Signalement voieris */}
                    <View className="bg-gray-200 p-2 rounded-3xl items-center flex-row gap-2">
                      <View className="items-center">
                        <TrafficCone
                          size={34}
                          color="black"
                          strokeWidth={1.5}
                        />
                      </View>
                      <View>
                        <Text className="font-bold">Voierie</Text>
                        <Text className="text-blue-500">
                          38 rue Waldeck Rousseau
                        </Text>
                        <Text className="italic text-sm">
                          "Il manque des pavés sur les trottoirs.{"\n"}C'est
                          dangereux pour les talons aiguilles."
                        </Text>
                      </View>
                    </View>

                    {/* Signalement toilettes */}
                    <View className="bg-gray-200 p-2 rounded-3xl mb-4 items-center flex-row gap-2">
                      <View className="items-center">
                        <Bath size={34} color="black" strokeWidth={1.5} />
                      </View>
                      <View>
                        <Text className="font-bold">Toilettes</Text>
                        <Text className="text-blue-500">
                          52 avenue de la Marne
                        </Text>
                        <Text className="italic text-sm">"À déboucher."</Text>
                      </View>
                    </View>
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
                  <Text className="text-center text-xl text-white">
                    Valider
                  </Text>
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
          className=" absolute bottom-8 right-5 p-4 bg-white rounded-full items-center mb-10 justify-center "
          onPress={getLocation}
        >
          <LocateFixed size={24} color="black" />
        </TouchableOpacity>

        <Modal
          ref={profileModalRef}
          visible={isReportVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleSignalClose}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            {/* Première couche: Clic sur la zone transparente pour fermer la modale */}
            <TouchableWithoutFeedback onPress={handleSignalClose}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0)",
                  justifyContent: "flex-end",
                }}
              >
                {/* Deuxième couche: Contenu de la modale */}
                <TouchableWithoutFeedback
                  onPress={Keyboard.dismiss}
                  accessible={false}
                >
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
                        onValueChange={(value) => handleTypeSelect(value)}
                        placeholder={{
                          label: "Sélectionner un type...",
                          value: null,
                        }}
                        items={[
                          { label: "Vitre cassée", value: "Vitre cassée" },
                          {
                            label: "Panneau d’affichage",
                            value: "Panneau d’affichage",
                          },
                          {
                            label: "Banc inutilisable",
                            value: "Banc inutilisable",
                          },
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
                        onSubmitEditing={Keyboard.dismiss}
                      />
                      <Plus size={24} color="black" strokeWidth={2} />
                    </View>

                    {/* Section pour l'ajout de photos */}
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

                    {/* Bouton pour publier le signalement */}
                    <TouchableOpacity
                      onPress={() => {
                        alert("Merci \n Votre signalement a bien été publié !");
                        handleProfileClose();
                      }}
                      className="bg-blue-500 py-4 rounded-full mt-10 mb-3"
                    >
                      <Text className="text-center text-white text-lg">
                        Publier
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
