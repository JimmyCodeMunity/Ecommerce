import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Button,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Card } from "react-native-paper";
import AntIcon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
//import Svg, { Path } from 'react-native-svg';
import FeatherIcon from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import GeneralSettings from "./SettingScreen";
import CarouselCard from "../components/Card";
import Test from "../components/Test";
import Categories from "../components/Categories";




const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LandingScreen = ({ navigation, route }) => {
  const { email, role } = route.params;
  const [products, setProducts] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brand, setBrands] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [ip, setIp] = useState("192.168.8.153");
  const [trending, setTrending] = useState([1, 2, 3]);

  const [animationLoaded, setAnimationLoaded] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get("https://api-test-self-six.vercel.app/productlist");
      setProducts(response.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrandData();
  }, []);

  const fetchBrandData = async () => {
    try {
      const response = await axios.get(`https://api-test-self-six.vercel.app/fetchbrands`);
      setBrands(response.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchManufacturer();
  }, []);

  const fetchManufacturer = async () => {
    try {
      const response = await axios.get(`https://api-test-self-six.vercel.app/manufdata`);
      setManufacturer(response.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  // ... existing code ...

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchData(); // Fetch the updated data
    } catch (error) {
      console.log(error);
    }
    setIsRefreshing(false);
  };

  const categories = [

    {
      id: 2,
      title: "Computers and laptops",
      color: "#FF6347",
      image: require("../assets/chair.png"),
      icon: "log-in",
    },
    {
      id: 3,
      title: "Accessories",
      color: "#4169E1",
      image: require("../assets/jewel.png"),
      icon: "search",
    },
    {
      id: 4,
      title: "Cloths",
      color: "#32CD32",
      image: require("../assets/elec.png"),
    },
    {
      id: 5,
      title: "Shoes",
      color: "#FF8C00",
      image: require("../assets/cloth.png"),
    },
    {
      id: 6,
      title: "Gifts",
      color: "#FF8C00",
      image: require("../assets/cloth.png"),
    },
    {
      id: 7,
      title: "Pet Care",
      color: "#FF8C00",
      image: require("../assets/cloth.png"),
    },
    {
      id: 8,
      title: "Mobile and Tablets",
      color: "#FF8C00",
      image: require("../assets/cloth.png"),
    },
    {
      id: 9,
      title: "Music and Gaming",
      color: "#FF8C00",
      image: require("../assets/cloth.png"),
    },
    {
      id: 10,
      title: "Others",
      color: "#FF8C00",
      image: require("../assets/cloth.png"),
    },
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

  const goToCart = () => {
    navigation.navigate("Cart", { email, role });
  };

  const handleSearch = () => {
    navigation.navigate("searchResults", { searchQuery, email });
  };

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLogoutConfirm, setLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    // Simulate a delay for the splash screen (optional)
    setTimeout(() => {
      setAnimationLoaded(true);
      // Navigate to the main screen or any other screen after the splash screen
      // Replace 'MainScreen' with your desired screen component
      // navigation.navigate('MainScreen');
    }, 2000); // Delay in milliseconds (adjust as needed)
  }, []);



  return (
    <SafeAreaView
      className="bg-white align-center flex-1"
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.top}>
        <View style={styles.menu}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <FeatherIcon name="menu" size={25} color="orange" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>


            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => setLogoutConfirm(true)}
            >
              <FeatherIcon name="log-in" size={25} color="orange" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.search, { paddingHorizontal: 15 }]}>
          <View>
            <Image source={require('../assets/logo.jpg')} style={{ height: 30, width: 30 }} className="rounded-full" />
          </View>
          <View style={styles.searchcont}>
            <TextInput
              style={styles.input}
              placeholder="Search Item by manufacturer,location,price,product"
              placeholderTextColor="#ccc"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity onPress={handleSearch}>
            <FeatherIcon name="search" size={25} color="orange" />
          </TouchableOpacity>
        </View>
      </View>

      {/**categories */}
      <ScrollView
        vertical={true}
        style={styles.container1}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>


          <CarouselCard data={trending} />


          <View>
            <Text
              style={{
                position: "absolute",
                color: "#ffffff",
                fontSize: 25,
                fontWeight: "bold",
                right: "70%",
                bottom: "60%",
              }}
            >
              Searching
            </Text>
            <Text
              style={{
                position: "absolute",
                color: "#ffffff",
                fontSize: 25,
                fontWeight: "bold",
                right: "60%",
                bottom: "40%",
              }}
            >
              for a product?
            </Text>
          </View>
        </View>


        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10, color: 'orange' }}>
              <FeatherIcon name="star" size={25} color="orange" />Featured Manufacturers
            </Text>
          </View>

          <View>

          </View>
        </View>





        <View>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 15 }}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            style={styles.cats}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.cardContainer} horizontal={true}>
              {manufacturer.map((manufacturer) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("manufacturers", {
                      manName: manufacturer.username,
                      manImage: manufacturer.picture,
                      mancat1: manufacturer.category,


                      email,
                    })
                  }
                  key={manufacturer._id}
                >
                  <View className="space-y-1 mr-4" key={manufacturer.id}>


                    <Image className="rounded-full"
                      source={{ uri: manufacturer.picture }}
                      style={{
                        height: 70, width: 70, borderWidth: 3, borderColor: 'orange', borderStyle: 'dotted'
                      }}
                      resizeMode="cover"
                    />
                    <Text className="text-neutral-600 mt-3">

                      {manufacturer.username.length > 8 ? manufacturer.username.slice(0, 8) + '...' : manufacturer.username}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>





        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 5 }}>
              Product Categories
            </Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
              <Text style={{ fontSize: 13, marginTop: 10, color: "orange" }}>
                View More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/**Categories goes here */}
        <Categories email={email}/>

        <View className="mb-3">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 5 }}>
                Brands you love
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Brands")}>
                <Text style={{ fontSize: 13, marginTop: 10, color: "orange" }}>
                  View More
                </Text>
              </TouchableOpacity>
            </View>
          </View>




          {/**Brands go here */}
          <View>
            <ScrollView
              
              style={styles.cats}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.cardContainer} horizontal={true}>
                {brand.map((brand) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("BrandView", {
                        brandName: brand.brandname,
                        brandImage: brand.image,
                        brandcat1: brand.subcategories,
                        brandcategories: brand.subcategories,

                        email,
                      })
                    }
                    key={brand._id}
                  >
                    <View className="space-y-1 mr-4" key={brand.id}>


                      <Image
                        className="rounded-2xl"
                        source={{ uri: brand.brandimage }}
                        style={{
                          height: 90,
                          width: 70,
                          borderWidth: 0.9,
                          borderColor: 'black'

                        }}
                        resizeMode="cover"
                      />
                      <Text className="text-center text-neutral-600">

                        {brand.brandname.length > 8 ? brand.brandname.slice(0, 8) + '...' : brand.brandname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>






        {/**End of brands */}
        <Modal
          isVisible={isBottomSheetVisible}
          onBackdropPress={() => setBottomSheetVisible(false)}
          style={styles.modalContainer}
        >
          <View
            style={[
              styles.bottomSheetContainer1,
              { height: windowHeight * 0.9 },
            ]}
          >
            <TouchableOpacity onPress={() => setBottomSheetVisible(false)}>
              <FeatherIcon name="x" size={30} color="orange" />
            </TouchableOpacity>
            {
              <View style={styles.logmenu}>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btntext}>Cart</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </Modal>

        <Modal
          isVisible={isLogoutConfirm}
          onBackdropPress={() => setLogoutConfirm(false)}
          style={styles.modalContainer}
        >
          <View
            style={[
              styles.bottomSheetContainer2,
              { height: windowHeight * 0.2 },
            ]}
          >
            <TouchableOpacity onPress={() => setLogoutConfirm(false)}>
              <FeatherIcon name="x" size={30} color="orange" />
            </TouchableOpacity>
            {
              <View style={styles.logmenu}>
                <TouchableOpacity style={styles.logbtn} onPress={logout}>
                  <Text style={styles.btntext}>Logout</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </Modal>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  top: {
    backgroundColor: "#ffffff",
    height: 120,
    width: "100%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,

  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 18,
  },
  search: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  searchcont: {
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    borderRadius: 15,
    marginVertical: 10,
    width: "80%",
    borderColor: "orange",
    borderWidth: 1,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingVertical: 12,
    height: 120,
  },
  card: {
    backgroundColor: "#ffffff",

    padding: 5,
    margin: 5,
    minWidth: 80,
    borderRadius: 12,
    alignItems: "center",
    minHeight: 80,
  },
  carditem: {
    backgroundColor: "orange",
    borderRadius: 15,
    height: 170,
    padding: 15,
    width: "100%",
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  fav: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1, // Adjust the zIndex to position the close icon above the image
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  container1: {
    paddingHorizontal: 15,
  },
  image1: {
    height: "70%",
    backgroundColor: "#fff",
    width: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  card1: {
    flex: 1,
    height: 250,
    backgroundColor: "#fff",
    width: 150,

    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 12,
    marginTop: 10,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 10,
  },
  deals: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
    height: "50%",
  },
  bottomSheetContainer: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000000",
    shadowOpacity: 1.2,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  bottomSheetContainer1: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  bottomSheetContainer2: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  logbtn: {
    backgroundColor: "orange",
    height: 60,
    width: "60%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#ffffff",
  },
  logmenu: {
    alignItems: "center",
    justifyContent: "center",
  },
  btntext: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#fff",
  },
});

export default LandingScreen;
