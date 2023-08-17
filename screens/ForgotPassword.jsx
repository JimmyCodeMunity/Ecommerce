import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BlurView } from "@react-native-community/blur";
import FastImage from "react-native-fast-image";

const ForgotScreen = () => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [newpassword, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // Perform login logic here
    navigation.navigate("Login", { username});
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    // Simulate a delay for the splash screen (optional)
    setTimeout(() => {
      setAnimationLoaded(true);
      // Navigate to the main screen or any other screen after the splash screen
      // Replace 'MainScreen' with your desired screen component
      // navigation.navigate('MainScreen');
    }, 6000); // Delay in milliseconds (adjust as needed)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logocontainer}>
        

        <View style={styles.form}>
          <Text style={{ color: "#fff", fontSize: 23, marginBottom: 12 }}>
            Forgot Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="current email"
            value={email}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newpassword}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={newpassword}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.btncontainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.btn}>
              <Text style={styles.btntext}>Reset</Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress={handleLogin}>
              <Text style={{ color: "#fff", fontSize: 15, marginTop: 12 }}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRegister}>
              <Text style={{ color: "#fff", fontSize: 15, marginTop: 12 }}>
                Create Account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  logocontainer: {
    height: "70%",
    backgroundColor: "#fff",
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-10%",
  },
  logotext: {
    textAlign: "center",
    fontWeight: 23,
    fontSize: 27,
    paddingVertical: 12,
  },
  form: {
    backgroundColor: "orange",
    width: "80%",
    height: "90%",
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    borderBottomColor: "#ccc",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    paddingVertical: 12,
  },
  logo: {
    marginTop: "50%",
  },
  btn: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    width: 200,
    alignItems: "center",
    padding: 12,
    paddingVertical: 15,
    marginTop: 20,
  },
  btncontainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ForgotScreen;
