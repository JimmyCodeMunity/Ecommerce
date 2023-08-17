import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FeatherIcon from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import AntIcon from "react-native-vector-icons/AntDesign";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";

const ProfileScreen = ({ navigation, route }) => {
  const { email, role } = route.params;
  const [image, setImage] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState('');
  const [name,setName] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://172.20.10.6:3000/userdata/${email}`
      );
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Image
              source={require("../assets/logo.jpg")}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.name}></Text>
        <Text style={styles.username}></Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.profiledata}>
          <FeatherIcon name="user" size={20} color="orange" />
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Email:
          </Text>
          <Text
            style={{ marginBottom: 40 }}
            onPress={() => setMenuVisible(true)}
          >
            {email}
          </Text>

          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Username:
          </Text>
          <Text style={{ marginBottom: 40 }}>Opas.{user._id}</Text>

          <FeatherIcon name="phone" size={20} color="orange" />
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Phone:
          </Text>
          <Text style={{ marginBottom: 40 }}>Reseller</Text>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.updatebtn}
              onPress={() => setMenuVisible(true)}
            >
              <Text style={styles.btntext}>
                <FeatherIcon name="edit" size={20} color="white" />
                Update
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deletebtn}>
              <Text style={styles.btntext}>
                <FeatherIcon name="trash" size={20} color="white" />
                delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        isVisible={isMenuVisible}
        onBackdropPress={() => setMenuVisible(false)}
        style={styles.modalContainer}
      >
        <View
          style={[styles.bottomSheetContainer, { height: windowHeight * 0.9 }]}
        >
          <TouchableOpacity onPress={() => setMenuVisible(false)}>
            <AntIcon name="close" color="orange" size={50} />
          </TouchableOpacity>
          {
            <View style={styles.profiledata2}>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: "bold",
                  color: "orange",
                  marginBottom: 10,
                }}
              >
                Edit my details
              </Text>
              <FeatherIcon name="user" size={20} color="orange" />
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
              >
                Email:
              </Text>
              <TextInput
                value={email}
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
              />

              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
              >
                Username
              </Text>
              <TextInput
                value={email}
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
              />

              <FeatherIcon name="phone" size={20} color="orange" />
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
              >
                Phone:
              </Text>
              <TextInput
                value={email}
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
              />

              <View style={{ width: "60%", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.updatebtn}
                  onPress={() => setMenuVisible(true)}
                >
                  <Text style={styles.btntext}>
                    <FeatherIcon name="save" size={20} color="white" />
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  header: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  bottom: {
    height: "80%",
    backgroundColor: "#fff",
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  profiledata: {
    height: "90%",
    backgroundColor: "#fff",
    width: "85%",
    marginBottom: "50%",
    borderRadius: 25,
    padding: 40,
  },
  updatebtn: {
    backgroundColor: "orange",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 15,
    width: "80%",
  },
  deletebtn: {
    backgroundColor: "red",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: "60%",
  },
  btntext: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  profiledata2: {
    height: "90%",
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 25,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignSelf: "stretch",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
});

export default ProfileScreen;
