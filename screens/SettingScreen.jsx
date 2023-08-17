// GeneralSettings.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity,SafeAreaView,Share } from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const GeneralSettings = ({navigation,route}) => {
  const {email} = route.params;

  const handleShare = () => {
    const message = "Share this Awesome App!!";
    const url = "https://www.mentheal.co.ke";

    Share.share({
      message: message,
      url: url,
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  const settingsOptions = [
    { title: 'Visit website', onPress: () => console.log('Wi-Fi pressed'),icon:'globe' },
    { title: 'Become a manufacturer', onPress: () => console.log('Bluetooth pressed'),icon:'user' },
    { title: 'Rate Us on google', onPress: () => console.log('Cellular pressed'),icon:'star' },
    { title: 'Share app', onPress: handleShare,icon:'share' },
    // Add more settings options as needed
  ];
   //logout function start
   const logout = async () => {
    // Perform any necessary logout actions (e.g., clear user session, reset state)

    // Remove user token or session data from AsyncStorage
    try {
      await AsyncStorage.removeItem("userToken"); // Replace 'userToken' with your specific token or session key
      // Navigate to the login or authentication screen
      // Example using react-navigation:
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };



  

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.settings}>
      <Text style={styles.sectionHeaderText}><FeatherIcon name="settings" size={20} color="black" /> General</Text>
      <View style={{ backgroundColor:'#f1f1f1',width:'100%',justifyContent:"center",height:100,paddingHorizontal:12, }}>
        <Text style={{ fontSize:18,fontWeight:'bold',marginTop:20, }}>{email}</Text>
      </View>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity key={index} style={styles.settingItem} onPress={option.onPress}>
          <Text style={styles.settingText}><FeatherIcon name={option.icon} size={20} color="black" /> {option.title}</Text>
        </TouchableOpacity>
      ))}
      <View>
      <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={{ fontSize:23,color:'black' }}><FeatherIcon name="power" size={20} color="black" /> Logout</Text>
        </TouchableOpacity>

      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 30,
    flex:1,
  },
  sectionHeaderText: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  settingItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  logout: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
   
  },
  settingText: {
    fontSize: 18,
    color: '#000000',
  },
  settings:{
    flexGrow : 2,
    paddingVertical:30,
    paddingHorizontal:20,
  }
});

export default GeneralSettings;
