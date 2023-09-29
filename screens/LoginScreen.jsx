import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";

//firebase setup

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BlurView } from "@react-native-community/blur";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [email, setEmail] = useState("jenner@gmail.com");
  const [password, setPassword] = useState("123456");
  const [role, setRole] = useState("");
  const navigation = useNavigation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkInternetConnection();
  }, []);

  const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    setIsConnected(netInfoState.isConnected);
    setIsLoading(false);
  };

  const handleLogin = () => {
    
    setLoading(true);
    axios
      .post("https://api-test-self-six.vercel.app/login", { email, password })
      .then((response) => {
        handleSuccess();
        setShowSnackbar(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleForgot = () => {
    navigation.navigate("Forgot");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleSuccess = () => {
    navigation.navigate("Landing", { email });
    setLoading(false);
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
      {animationLoaded ? (
        <View style={styles.logocontainer}>
          <View style={styles.logo}>
            <Image
              source={require("../assets/logo.jpg")}
              style={styles.profileImage}
            />
            <Text style={styles.logotext}>Cloud CBD</Text>
          </View>

          <View style={styles.form}>
            <Text style={{ color: "#fff", fontSize: 23, marginBottom: 12 }}>
              Login
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />

            <View style={styles.btncontainer}>
              <TouchableOpacity onPress={handleLogin} style={styles.btn}>
                {loading ? (
                  <ActivityIndicator size="small" color="black" />
                ) : (
                  <Text style={styles.btntext}>Login</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgot}>
                <Text style={{ color: "#fff", fontSize: 15, marginTop: 12 }}>
                  Forgot Password
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
      ) : (
        <LottieView
          source={require("../assets/anim.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            console.log("Animation finished");
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
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
    fontWeight: "bold",
    fontSize: 27,
    paddingVertical: 12,
  },
  form: {
    backgroundColor: "orange",
    width: "80%",
    height: "60%",
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
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
  snackbar: {
    backgroundColor: "orange",
    marginBottom: 20,
  },
});

export default LoginScreen;
