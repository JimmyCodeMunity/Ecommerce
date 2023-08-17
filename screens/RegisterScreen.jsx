import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios'


//firebase authentication setup
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './firebase-config';

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BlurView } from "@react-native-community/blur";
import FastImage from "react-native-fast-image";

const RegisterScreen = () => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigation = useNavigation();


  


  const handleRegister = () => {
    axios
      .post('http://192.168.2.107:3000/register', { name, email, password })
      .then(response => {
        handleLogin();
        Alert.alert('Success', response.data.message);
      })
      .catch(error => {
        Alert.alert('Error', error.response.data.error);
      });
  };

  const handleLogin = () => {
    // Perform login logic here
    navigation.navigate("Login");
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
          <View style={styles.logo}>
            <Image
              source={require("../assets/logo.jpg")}
              style={styles.profileImage}
            />
            <Text style={styles.logotext}>Cloud CBD</Text>
          </View>

          <View style={styles.form}>
          <Text style={{color:'orange',fontSize:30,marginBottom:20}}>Register</Text>
          <TextInput
              style={styles.input}
              placeholder="Enter username"
              
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              
              onChangeText={setEmail}
            />

            
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.btncontainer}>
              <TouchableOpacity onPress={handleRegister} style={styles.btn}>
                <Text style={styles.btntext}>Create account</Text>
              </TouchableOpacity>

              

              
              <TouchableOpacity onPress={handleLogin}>
              <Text style={{color:'orange',fontSize:15,marginTop:12,}}>Already have account?Login</Text>
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
    backgroundColor: "#ffffff",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  logocontainer: {
    height: "70%",
    backgroundColor: "orange",
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-5%",
  },
  logotext: {
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 27,
    paddingVertical: 12,
  },
  form: {
    backgroundColor: "#ffffff",
    width: "80%",
    height: "90%",
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginTop:'10%',
    
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
  btn:{
    borderWidth:1,
    borderColor:'white',
    backgroundColor:'orange',
    borderRadius:9,
    width:200,
    alignItems:'center',
    padding:12,
    paddingVertical:15,
    marginTop:20,
    marginBottom:20,

  },
  btncontainer:{
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
  },
  btntext:{
    color:'#ffffff',
    fontWeight:'bold',
    fontSize:20,
  }
});

export default RegisterScreen;
