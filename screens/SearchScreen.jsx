import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import LottieView from 'lottie-react-native';
import FeatherIcon from "react-native-vector-icons/Feather";

const SearchResultsScreen = ({ route }) => {
  const { searchQuery } = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.2.107:3000/productlistsearch/${searchQuery}`
      );
      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const renderSearchResult = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => openModal(item)}
        key={item._id}
      >
        <View>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
        <View>
          <Text style={styles.productName}>Product Name: {item.productname}</Text>
          <Text style={styles.productPrice}>Price: {item.price}</Text>
          <Text style={styles.productManufacturer}>Manufacturer: {item.sellername}</Text>
          <Text style={styles.productLocation}>Location: {item.location}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ fontWeight: 'bold', paddingHorizontal: 10, fontSize: 20, paddingVertical: 20 }}>
          Search results for ...{searchQuery}
        </Text>
      </View>

      {/* Conditional rendering based on the 'loading' state */}
      {loading ? (
        // Display the LottieView while loading is true
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LottieView
            source={require('../assets/basket.json')} // Replace with your actual animation file
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <Text>Loading...</Text>
        </View>
      ) : (
        // Display the FlatList when loading is false
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.contentContainer}
        />
      )}

      {/* Modal to display selected product details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedProduct !== null}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <FeatherIcon name="x" size={35} color="orange" />
            </TouchableOpacity>

            <View style={styles.productDetails}>
              <Image source={{ uri: selectedProduct?.image }} style={styles.modalImage} />
              <Text style={styles.modalProductName}>{selectedProduct?.productname}</Text>
              <Text style={styles.modalProductPrice}>Price: {selectedProduct?.price}</Text>
              <Text style={styles.modalProductManufacturer}>Manufacturer: {selectedProduct?.sellername}</Text>
              <Text style={styles.modalProductLocation}>Location: {selectedProduct?.location}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
  },
  productManufacturer: {
    fontSize: 14,
    color: "gray",
  },
  productLocation: {
    fontSize: 14,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  modalProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalProductPrice: {
    fontSize: 14,
  },
  modalProductManufacturer: {
    fontSize: 14,
    color: 'gray',
  },
  modalProductLocation: {
    fontSize: 14,
    color: 'gray',
  },
  productDetails: {
    alignItems: 'center',
  },
});

export default SearchResultsScreen;
