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

const LandingScreen = ({ navigation, route }) => {
  const { email, role } = route.params;
  const [products, setProducts] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brand, setBrands] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [ip, setIp] = useState("192.168.8.153");

  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://192.168.2.107:3000/productlist");
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
      const response = await axios.get(`http://192.168.2.107:3000/fetchbrands`);
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
      const response = await axios.get(`http://192.168.2.107:3000/manufdata`);
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
      title: "Furniture",
      color: "#FF6347",
      image: require("../assets/chair.png"),
      icon: "log-in",
    },
    {
      id: 3,
      title: "Jewellery",
      color: "#4169E1",
      image: require("../assets/jewel.png"),
      icon: "search",
    },
    {
      id: 4,
      title: "Electronics",
      color: "#32CD32",
      image: require("../assets/elec.png"),
    },
    {
      id: 5,
      title: "Cloths",
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

  const renderProductCards = () => {
    return products.map((product) => (
      <ScrollView
        style={styles.deals}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("View", {
              itemName: product.productname,
              itemImage: product.image,
              itemPrice: product.price,
              itemManufacturer: product.sellername,

              email,
            })
          }
          key={product._id}
        >
          <View style={styles.card1} key={product.id}>
            <TouchableOpacity
              onPress={() => setBottomSheetVisible(true)}
              style={{ top: 10, left: 10, position: "absolute", zIndex: 1 }}
            >
              <FeatherIcon name="heart" size={35} color="orange" />
            </TouchableOpacity>

            {loading ? (
              // Display the LottieView while loading is true
              <View style={styles.imageLoader}>
                <ActivityIndicator
                  size="large"
                  color="orange"
                  style={{
                    width: 10,
                    height: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </View>
            ) : (
              // Display the product details when loading is false
              <Image
                source={{ uri: product.image }}
                style={styles.image1}
                resizeMode="cover"
              />
            )}
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Kshs.{product.price}
            </Text>
            <Text>{product.productname}</Text>
            <Text>Manufacturer:{product.sellername}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    ));
  };

  return (
    <SafeAreaView
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

        <View style={styles.search}>
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
          <Image
            style={styles.carditem}
            source={require("../assets/opas.png")}
          />
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
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 ,color:'orange'}}>
            <FeatherIcon name="star" size={25} color="orange" />Featured Manufacturers
            </Text>
          </View>

          <View>
            
          </View>
        </View>
        <ScrollView
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
                  <View style={styles.card} key={manufacturer.id}>
                    

                    <Image
                      source={{ uri: manufacturer.picture }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <Text>{manufacturer.username}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>





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

        <ScrollView
          style={styles.cats}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.cardContainer} horizontal={true}>
            {categories.map((item) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Category", {
                    categoryName: item.title,
                    categoryImage: item.image,
                    email,
                  })
                }
                key={item.id}
              >
                <View style={styles.card} key={item.id}>
                  <Text>{item.title}</Text>
                  <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 5 }}>
                Brands
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

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
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
                  <View style={styles.card} key={brand.id}>
                    <Text>{brand.brandname}</Text>

                    <Image
                      source={{ uri: brand.brandimage }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
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
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  top: {
    backgroundColor: "#ffffff",
    height: 120,
    width: "100%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical:20,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop:18,
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
    borderWidth: 1,
    borderColor: "orange",
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
