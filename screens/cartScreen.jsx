import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from "react-native";
import axios from "axios";
import LottieView from 'lottie-react-native';

const MyCart = ({route}) => {
  const [products, setProducts] = useState([]);
  const {email} = route.params;
  const [loading,setLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width;
const cardWidth = windowWidth / 2 - 20;


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.2.116:3000/cartuser/${email}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //remove item from cart
  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://192.168.2.116:3000/delcart/${itemId}`);
      // Item deleted successfully, update the products state by filtering out the deleted item
      setProducts((prevProducts) =>
        prevProducts.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderProductCard = ({ item }) => {
    return (

      <TouchableOpacity
        onPress={() => {
          // Handle card press
        }}
        style={styles.card}
      >
        <Image
          source={{ uri: item.itemImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.itemName}</Text>
          <Text style={styles.price}>Price: {item.itemPrice}</Text>
          <Text style={styles.price}>Id: {item.itemManufacturer}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              removeItem(item._id); // Call removeItem function with the item ID
            }}
          >
            <Text style={styles.addToCartButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    {loading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LottieView
            source={require('../assets/basket.json')} // Replace with your actual animation file
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <Text>Loading...</Text>
        </View>
      
      ):(
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.cardContainer}
      />

      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cardContainer: {
    alignItems: "stretch",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  detailsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "orange",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MyCart;
